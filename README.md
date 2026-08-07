# Bataille des Navires

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

