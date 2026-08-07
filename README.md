# Bataille des Navires

[![Deploy](https://github.com/thivananhnguyen/bataille-navire/actions/workflows/deploy.yml/badge.svg)](https://github.com/thivananhnguyen/bataille-navire/actions/workflows/deploy.yml)
[![Verify](https://github.com/thivananhnguyen/bataille-navire/actions/workflows/verify.yml/badge.svg)](https://github.com/thivananhnguyen/bataille-navire/actions/workflows/verify.yml)

## Team
- Nom: Bataille des Navires
- Couleur: #0071BC
- Membres: Make, Thi Van Anh
- Carres: 3
- Pavillon: Impossible devient possible
- Repository: https://github.com/thivananhnguyen/bataille-navire

## Objectif du Projet
Application composee de 3 services distincts (front, api, worker) avec une base PostgreSQL, un pipeline CI/CD, et un deploiement progressif par phases.

## Etape / Phase 3

### Objectif
Faire tourner trois services distincts avec trois images et trois cycles de vie independants:
- front
- api
- worker

### Architecture (Phase 3)
- front: interface web + proxy vers api
- api: logique metier + acces base PostgreSQL
- worker: traitement en tache de fond (cleanup periodique)
- db: image officielle postgres:16-alpine

### Fichiers Cles
- compose production: compose.prod.yml
- compose dev: docker-compose.yml
- Dockerfile front: front/Dockerfile
- Dockerfile api: api/Dockerfile
- Dockerfile worker: worker/Dockerfile

### Regles Image
- Une image par service
- Pas de tag latest
- Format image production:
  - ${REGISTRY}/${GROUPE_SLUG}-front:${TAG}
  - ${REGISTRY}/${GROUPE_SLUG}-api:${TAG}
  - ${REGISTRY}/${GROUPE_SLUG}-worker:${TAG}

### Variables d'Environnement (extrait)
- REGISTRY
- GROUPE_SLUG
- GROUPE_DISPLAY
- TAG
- DB_PASSWORD
- TABLEAU_URL

### Verifications Phase 3
1. Verification syntax compose prod:
	- docker compose -f compose.prod.yml --env-file .env config
2. Demarrage flotte en local:
	- docker compose -f compose.prod.yml --env-file .env up -d
3. Verification etat services:
	- docker compose -f compose.prod.yml ps
4. Cas TABLEAU_URL vide:
	- Les services demarrent quand meme
	- Un warning explicite apparait dans les logs
5. Cas DB_PASSWORD absent:
	- Le demarrage doit echouer immediatement (pas de demarrage silencieux)

### Script de Controle
- scripts/compose_prod_check.sh

### Etat Actuel
- API, worker, compose prod: en place
- Frontend: integre dans la branche technique
- Phase 4: deploiement flotte complete par push (valide)
- Phase 5: pavillon persistant (en validation finale)

## Lancement Rapide (local)
```bash
docker compose up -d --build
docker compose ps
```

## Lancement Production-like (local)
```bash
docker compose -f compose.prod.yml --env-file .env up -d
docker compose -f compose.prod.yml ps
```

## Phase 5 - Pavillon persistant

### Ce qui est implemente
- Route API `POST /pavillon` pour enregistrer le message du pavillon
- Validation: message non vide et longueur maximum 140 caracteres
- Ecriture dans `PAVILLON_FICHIER` (par defaut `/data/pavillon.txt`)
- Volume Docker nomme `pavillon_data` monte sur `/data` pour survivre au redeploiement
- Le pouls API relit ce fichier et renvoie `pavillon` au tableau

### Test de validation (3 gestes)
1. Hisser le pavillon:

```bash
curl -X POST http://localhost:3000/pavillon \
	-H "Content-Type: application/json" \
	-d '{"pavillon":"Impossible devient possible"}'
```

2. Verifier que le pavillon est visible au tableau
3. Lancer un vrai push pour redeployer via pipeline, puis verifier le meme pavillon au moins 15 secondes apres le redeploiement

## Phase 7 - Route de travail et saturation

### Ce qui est implemente
- La route `GET /travail` fait un travail reel: lecture en base, calcul CPU court, ecriture d'un evenement en base
- En cas de dependance indisponible (exemple DB), la route retourne `503`
- Un script de salve est fourni: `scripts/phase7_salve.sh`
- Le service `worker` expose aussi `GET /travail` (appel API + calcul CPU) et envoie son pulse
- Le service `front` expose `GET /travail` (appel API + calcul CPU), `GET /health`, proxy `/api/*`, et envoie son pulse

### Test rapide
```bash
TABLEAU_URL=https://services-battle.vercel.app \
GROUPE="Bataille des Navires" \
SERVICE=api \
NOMBRE=200 \
SALVES=5 \
./scripts/phase7_salve.sh
```

Resultat attendu: le carre API peut passer pale sous salve, puis redevenir plein quand le retard se resorbe.

### Journal de bord Phase 7 (2026-08-07)

Verification code et tests:
- `npm test -- --runInBand` (api): 12/12 tests unitaires OK
- `npm run test:integration -- --runInBand` (api): echec local attendu sans PostgreSQL sur `127.0.0.1:5432`

Verification runtime locale (Docker Compose, API_PORT=3010):
1. DB active, appel `GET /travail`:
- Statut HTTP observe: `200 OK`
2. DB arretee (`docker compose stop postgres`), appel `GET /travail`:
- Statut HTTP observe: `503 Service Unavailable`
3. DB redemarree (`docker compose start postgres`), appel `GET /travail`:
- Statut HTTP observe: `200 OK`

Salve manuelle envoyee vers Services Battle:
```bash
TABLEAU_URL=https://services-battle.vercel.app \
GROUPE="Bataille des Navires" \
SERVICE=api \
NOMBRE=200 \
SALVES=2 \
./scripts/phase7_salve.sh
```

Sortie observee:
- `salve 1/2 sent`
- `salve 2/2 sent`

Critere vise Phase 7:
- Le carre API doit palir sous salve puis redevenir plein quand le retard se resorbe.

## Phase 6 (skip temporaire)

Decision prise: on avance vers Phase 7/8 avant de finaliser les sondes de verite de la phase 6.

Risque accepte temporairement:
- L'endpoint API `/health` est encore basique (il ne valide pas encore la dependance DB de facon stricte).

Plan de retour Phase 6:
- Revenir juste apres Phase 8 pour brancher health profond DB et test associe.

## Phase 8 - Plus d'exemplaires et carnet de flotte

### Objectif
- Mesurer avant/apres la duplication (`api=1` puis `api=3`) et consigner les chiffres dans le carnet.

### Script de mesure
- Script ajoute: `scripts/phase8_measure.sh`
- Ce script:
	- lance la stack compose prod,
	- mesure un throughput local sur `/travail` avec `api=1` puis `api=3`,
	- estime le temps de convergence local,
	- affiche la taille des images,
	- imprime des lignes pre-remplies pour le carnet.

### Execution
```bash
chmod +x scripts/phase8_measure.sh
./scripts/phase8_measure.sh
```

Options utiles:
```bash
REQUESTS=500 CONCURRENCY=40 FRONT_PORT=8080 ./scripts/phase8_measure.sh
```

### Carnet de flotte (a remplir)
| Ce qu'on mesure | Avant | Apres | Ce qui a change entre les deux |
| :---- | :---- | :---- | :---- |
| Taille de chaque image | api: 57.2 MB, front: 55.1 MB, worker: 55.1 MB | idem (images identiques pendant la mesure) | Mesure locale via `docker image inspect` |
| Duree entre le push et le dernier carre a jour | - | 3s (convergence locale compose) | Approximation locale mesuree par `scripts/phase8_measure.sh` |
| Coups encaisses par pouls, avec un exemplaire | 230 rps (proxy) | - | REQUESTS=3000, CONCURRENCY=40 |
| Coups encaisses par pouls, avec trois exemplaires | - | 230 rps (proxy) | scale api=3 (limitation probable cote front/worker/local) |
| Nombre de coups avant que le carre ne palisse | <= 50 coups (observation visuelle) | <= 50 coups (observation visuelle) | Mesure manuelle sur tableau (service `api`, salve unique) |
| Temps de retour a un carre plein apres une salve de mille coups | 5s | 4s | Mesure manuelle sur tableau apres salve 1000 (`SERVICE=api`, `NOMBRE=1000`, `SALVES=1`) |

### Verification terrain Phase 8
1. Lancer d'abord la mesure locale avec `scripts/phase8_measure.sh`.
2. Envoyer des salves tableau en `api=1`, noter le point de bascule pale.
3. Passer en `api=3` (`docker compose -f compose.prod.yml --env-file .env up -d --scale api=3`) et refaire la meme salve.
4. Noter les deltas dans le carnet (avant/apres) et garder aussi les chiffres decevants.

## Journal de bord Phase 9 - Tirage et manoeuvre (2026-08-07)

Contexte:
- Stack locale: `api=1`, `front=1`, `worker=1`, `postgres=1`
- Sonde utilisee pour valider le retour: `GET /api/messages` via le front local (`http://127.0.0.1:8080`)

### Entrees de journal (une ligne par panne testee)

| Incident | Symptome observe | Cause trouvee | Action de remediation | Resultat | Chronometrage |
| :---- | :---- | :---- | :---- | :---- | :---- |
| Redemarrage API | `GET /api/messages` ne repond plus pendant le redemarrage | Process API interrompu | `docker restart <api_container>` | Retour a `200` | Retour `200`: 1s, manoeuvre totale: 2s |
| Redemarrage PostgreSQL | Erreurs temporaires cote API (indisponibilite DB) | PostgreSQL non disponible pendant restart | `docker restart <postgres_container>` | Retour a `200` | Retour `200`: 1s, manoeuvre totale: 1s |
| Pause puis reprise API | Micro-coupure volontaire pendant la pause | Process fige par `docker pause` | `docker unpause <api_container>` | `200` immediat apres reprise | Retour `200`: 0s, manoeuvre totale: 3s |
| Pause worker | Worker suspendu (impact direct limite sur `/api/messages`) | Conteneur worker mis en pause | `docker unpause <worker_container>` | Worker repris, service principal reste accessible | Non chronometre |
| Redemarrage front | `GET /health` passe temporairement en erreur pendant reboot | Process front redemarre | `docker restart <front_container>` | `GET /health` revient a `200` | Non chronometre |
| Kill worker puis relance | Worker arrete brutalement | Process tue (`docker kill`) | `docker start <worker_container>` | Recuperation confirmee apres relance manuelle | Non chronometre |

### Note utile
- Un essai de deconnexion/reconnexion reseau API a parfois fait perdre l'alias reseau `api` sur ce poste local. Ce cas est garde comme observation de debug, mais il n'est pas utilise pour le chronometrage principal afin de garder des mesures reproductibles.
- Mesure (2026-08-07): incidents chronometres executes en local via script shell (`restart api`, `restart postgres`, `pause/unpause api`) pour mise a jour rapide du journal.

## Phase 10 - Runbook de la flotte

Objectif couvert:
- Document exploitable par une autre equipe sans contexte oral.
- Procedure de remontee de flotte depuis zero.
- Premiere triade de diagnostic quand un carre s'eteint.
- Tableau des 6 pannes avec symptome/cause/manoeuvre/temps.

Livrable cree:
- `RUNBOOK_FLOTTE.md`

Etat actuel:
- Projet de groupe (Make + Thi Van Anh).
- Le runbook couvre deux parcours: debug local Docker Compose et debug CI/VM (runner + vm-prod).
- Passation interne non realisee pour le moment (section prete a etre completee).
- Validation externe (autre equipage) en attente.

## Phase 11 - Mesure branchee sur la flotte

Objectif couvert:
- Chaque service de la flotte expose ses metriques (`api`, `front`, `worker`).
- Prometheus est configure pour scraper les trois services.
- La definition du dashboard Grafana est versionnee en JSON dans le repo.

Fichiers ajoutes/modifies:
- `compose.prod.yml`: services `prometheus` et `grafana`
- `observability/prometheus/prometheus.yml`: cibles de scrape
- `observability/grafana/provisioning/datasources/prometheus.yml`: datasource pre-provisionnee
- `observability/grafana/provisioning/dashboards/dashboard.yml`: provider dashboards
- `observability/grafana/dashboards/bataille-navire-phase11.json`: export dashboard
- `front/server.js`: endpoint `/metrics` + instrumentation `/travail`
- `worker/src/index.js`: endpoint `/metrics` + instrumentation `/travail`
- `api/src/observability/metrics.js`: `service_hits_handled_total`, `service_dependency_up`
- `api/src/controllers/messagesController.js`: remontee d'etat de dependance DB

Lancement local (phase 11):
```bash
docker compose -f compose.prod.yml --env-file .env up -d postgres api worker front prometheus grafana
```

Verification rapide:
```bash
curl -s http://127.0.0.1:9090/api/v1/targets | grep -E 'api:3000|front:8080|worker:3002'
curl -s http://127.0.0.1:8080/metrics | head -n 20
curl -s http://127.0.0.1:3002/metrics | head -n 20
```

Metriques ciblees (J3 + Phase 11):
- Metriques J3 conservees:
	- Disponibilite cible (up):
		- `up{job=~"api|front|worker"}`
	- Debit HTTP (requetes par seconde):
		- `sum(rate(http_requests_total[1m])) by (job, route)`
	- Latence p95 (histogramme):
		- `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (job, le))`
- Coups encaisses par service et par seconde:
	- `sum(rate(service_hits_handled_total[1m])) by (service)`
- Duree de `/travail` en histogramme (buckets), pour ne pas masquer les pics:
	- `sum(rate(http_request_duration_seconds_bucket{route="/travail"}[1m])) by (job, le)`
- Nombre d'exemplaires repondants par service:
	- `sum(up{job=~"api|front|worker"}) by (job)`
- Etat de dependance par service en 0/1:
	- `avg(service_dependency_up) by (service, dependency)`

Etat actuel:
- Metriques HTTP + histogramme de `/travail` disponibles sur les 3 services.
- Metrique `service_dependency_up` disponible pour distinguer dependances KO/OK.
- Dashboard exporte et versionne dans le repo.

## Phase 12 - Quatre panneaux de diagnostic

Objectif couvert:
- Nommer une panne sans ouvrir un terminal, avec 4 panneaux maximum.
- Repondre en moins de 10 secondes aux 4 questions de phase 12:
	1. Le service recoit-il du trafic ?
	2. Repond-il, et avec quelle latence ?
	3. Ses dependances sont-elles en etat OK ?
	4. La version tournee est-elle celle attendue ?

Livrable cree:
- `observability/grafana/dashboards/bataille-navire-phase12.json`

Panneaux retenus (dashboard phase 12):
- Trafic recu: `sum(rate(service_hits_handled_total[1m])) by (service)`
- Reponse /travail (latence p95): `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{route="/travail"}[5m])) by (job, le))`
- Etat dependances (0/1): `avg(service_dependency_up) by (service, dependency)`
- Version deployee par service: `max(service_build_info) by (service, version)`

Instrumentation supplementaire phase 12:
- Nouvelle metrique `service_build_info{service,version}` exposee sur `api`, `front`, `worker`.

Validation rapide:
```bash
curl -s http://127.0.0.1:19090/api/v1/query?query=max(service_build_info)%20by%20(service,version)
curl -s http://127.0.0.1:19090/api/v1/query?query=sum(rate(service_hits_handled_total%5B1m%5D))%20by%20(service)
curl -s http://127.0.0.1:19090/api/v1/query?query=avg(service_dependency_up)%20by%20(service,dependency)
```

Mesure locale (2026-08-07, ports 8082/19090/13001):
- Charge injectee avant mesure: `front=220`, `worker=180`, `api=100` appels `/travail`.
- Panel 1 (coups/s): `front=3.88`, `worker=0`, `api=0` (fenetre `rate[1m]`, peut retomber a 0 hors fenetre active).
- Panel 2 (latence p95 `/travail`): `front=0.0098s`, `worker=0.0093s`, `api=NaN` (pas assez d'echantillons sur la fenetre au moment de la requete).
- Panel 3 (dependances): `front->api=1`, `worker->api=1`, `api->postgres=1`.
- Panel 4 (version): `front=dev`, `worker=dev`, `api=dev`.

## Phase 13 - Manifestes Kubernetes de la flotte

Objectif couvert:
- Porter la flotte sur cluster Kubernetes avec un fichier par objet.
- Garder l'etat persistant (base + pavillon) via PVC.
- Exposer le front via Ingress.
- Renforcer la securite des workloads applicatifs.

Dossier des manifestes:
- `k8s/phase13/namespace.yaml`
- `k8s/phase13/configmap.yaml`
- `k8s/phase13/secret.yaml`
- `k8s/phase13/pvc-postgres.yaml`
- `k8s/phase13/pvc-pavillon.yaml`
- `k8s/phase13/deployment-postgres.yaml`
- `k8s/phase13/service-postgres.yaml`
- `k8s/phase13/deployment-api.yaml`
- `k8s/phase13/service-api.yaml`
- `k8s/phase13/deployment-worker.yaml`
- `k8s/phase13/service-worker.yaml`
- `k8s/phase13/deployment-front.yaml`
- `k8s/phase13/service-front.yaml`
- `k8s/phase13/ingress-front.yaml`

Deploiement cluster (phase 13):
```bash
kubectl apply -f k8s/phase13/namespace.yaml
kubectl apply -f k8s/phase13/configmap.yaml -f k8s/phase13/secret.yaml
kubectl apply -f k8s/phase13/pvc-postgres.yaml -f k8s/phase13/pvc-pavillon.yaml
kubectl apply -f k8s/phase13/deployment-postgres.yaml -f k8s/phase13/service-postgres.yaml
kubectl apply -f k8s/phase13/deployment-api.yaml -f k8s/phase13/service-api.yaml
kubectl apply -f k8s/phase13/deployment-worker.yaml -f k8s/phase13/service-worker.yaml
kubectl apply -f k8s/phase13/deployment-front.yaml -f k8s/phase13/service-front.yaml
kubectl apply -f k8s/phase13/ingress-front.yaml
```

Hardening applique (api/front/worker):
- `securityContext.runAsNonRoot: true`
- `securityContext.allowPrivilegeEscalation: false`
- `securityContext.readOnlyRootFilesystem: true`
- Mount `emptyDir` sur `/tmp` pour conserver un espace ecriture minimal.

Strategie image immuable:
- Les 3 deployments applicatifs utilisent des references image pinnees par digest (`image@sha256:...`) au lieu de tags mutables.

Validation reelle (k3d todo-cluster, 2026-08-07):
```bash
kubectl -n flotte get pods,svc,ingress,pvc
kubectl -n flotte rollout status deploy/postgres --timeout=180s
kubectl -n flotte rollout status deploy/api --timeout=180s
kubectl -n flotte rollout status deploy/front --timeout=180s
kubectl -n flotte rollout status deploy/worker --timeout=180s
```

Resultats observes:
- Objets cluster presents: pods, services, ingress et PVC crees dans le namespace `flotte`.
- Avec images locales en tags `:dev` importees en k3d, les workloads demarrent et les checks health passent.
- Apres passage en images pinnees par digest, le rollout local peut echouer en `ErrImagePull/ImagePullBackOff` si ces digests ne sont pas publies sur le registry cible.

Condition de succes finale (environnement cible):
1. Publier les 3 images (api/front/worker) sur le registry.
2. Recuperer les digests publies reellement disponibles.
3. Mettre a jour les manifests avec ces digests.
4. Verifier que les trois commandes `kubectl -n flotte rollout status deploy/{api,front,worker}` retournent `successfully rolled out`.

Notes importantes:
- Le fichier `k8s/phase13/secret.yaml` est volontairement sans valeurs sensibles (champ vide) pour eviter tout secret en clair dans le repo.
- Creer la vraie secret au deploiement via `kubectl create secret ... --dry-run=client -o yaml | kubectl apply -f -`.
- Le pavillon est persiste dans le PVC `pavillon-data`, monte sur `/data` pour `api`, `front`, `worker`.
- L'Ingress expose `front` sur l'hote `bataille-navire.local` (adapter selon votre ingress controller).

## Phase 14 - Mise a jour pendant le feu

Le but de cette phase est simple: changer de version pendant que la charge continue, sans extinction visible.

Contexte de tir:
- Flotte deja portee sur Kubernetes (phase 13).
- Rolling update actif sur les deployments (`maxSurge`/`maxUnavailable` + probes readiness/liveness).

Ce qu'on a lance (local k3d, 2026-08-07):
- 420 requetes `GET /health` vers l'ingress `bataille-navire.local`, cadence ~80 ms.
- A la 40e requete, injection d'une nouvelle version (`VERSION=phase14-pass-1786133213`) sur `api`, `front`, `worker`.
- Suivi des 3 rollouts avec `kubectl -n flotte rollout status`.

Ce qui est sorti:
- Requetes totales: 420
- Requetes en erreur (HTTP != 200): 0
- Rollout `api`, `front`, `worker`: `successfully rolled out`
- Duree du rollout: 39s
- Fenetre complete de test: 42s

Incident reel avant le run final:
- Premier essai en echec (timeout) avec `api` en `CrashLoopBackOff`.
- Cause: `DB_PASSWORD` manquant dans le secret runtime.
- Correction: recreation de `flotte-secrets`, puis relance complete du test.

Dernier releve du carnet (mesure locale):

| La facon de livrer | Carres eteints pendant la livraison | Coups perdus | Duree totale |
| :---- | :---- | :---- | :---- |
| docker compose up -d sur la machine cible | 0 extinction complete observee, mais micro-coupures pendant recreation | 3/420 | 59s (recreation), 63s (fenetre test) |
| Rolling update sur le cluster | 0 observe sur la sonde health | 0/420 | 38s (rollout), 42s (fenetre test) |

Question cle:
- Combien de coups une livraison coute-t-elle vraiment ?
- L'ecart entre les deux lignes (compose vs rolling update) est le resume de la phase.

