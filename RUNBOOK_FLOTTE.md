# Runbook flotte - Phase 10

Derniere mise a jour: 2026-08-07

But: permettre a une personne peu technique de remonter et depanner la flotte sans aide orale.

## 1) Portee du runbook

Ce document couvre deux cas:
- Cas A (local): debug de la flotte via Docker Compose sur le poste de travail.
- Cas B (CI/VM): debug d un echec de deploiement via runner et vm-prod.

Si vous ne savez pas quel cas choisir:
- Commencez par le Cas A.
- Si le code local est OK mais le deploiement ne part pas, passez au Cas B.

## 2) Prerequis minimum

### 2.1 Cas A (local)

- Docker installe
- Docker Compose installe
- Fichier .env present a la racine du repo

Verification (copier-coller):

```bash
docker --version
docker compose version
test -f .env && echo "OK .env" || echo "Missing .env"
```

Attendu:
- `OK .env`

### 2.2 Cas B (CI/VM)

- Acces GitHub Actions du repo
- Runner de deploiement en ligne
- Acces SSH a vm-prod

Verification rapide (si acces SSH disponible):

```bash
ssh <user>@<vm-prod-host> "docker --version && docker compose version"
```

Attendu:
- version Docker et version Compose affichees sans erreur.

## 3) Procedure simple de remise en route (Cas A)

### 3.1 Remonter la flotte

```bash
docker compose -f compose.prod.yml --env-file .env up -d --scale api=1 --scale front=1 --scale worker=1 postgres api worker front
docker compose -f compose.prod.yml --env-file .env ps
```

Attendu:
- `front`, `api`, `postgres` en etat `Up` (idealement healthy).

### 3.2 Verifier la sante

```bash
curl -sS -o /dev/null -w "front_health=%{http_code}\n" http://127.0.0.1:8080/health
curl -sS -o /dev/null -w "api_via_front=%{http_code}\n" http://127.0.0.1:8080/api/messages
```

Attendu:
- `front_health=200`
- `api_via_front=200`

Si un code est different de 200:
- Passez a la section 4 (diagnostic guide).

## 4) Diagnostic guide (Cas A)

Executer ces 3 commandes, dans cet ordre:

1) Etat des conteneurs
```bash
docker compose -f compose.prod.yml --env-file .env ps
```

2) Logs recents
```bash
docker compose -f compose.prod.yml --env-file .env logs --tail=120 api front worker postgres
```

3) Re-test HTTP
```bash
curl -sS -o /dev/null -w "front_health=%{http_code}\n" http://127.0.0.1:8080/health
curl -sS -o /dev/null -w "api_via_front=%{http_code}\n" http://127.0.0.1:8080/api/messages
```

Interpretation rapide:
- `front_health=200` et `api_via_front=000`: probleme de communication front -> api.
- `front_health!=200`: probleme front.
- `api_via_front=500`: API accessible mais erreur metier (souvent DB).

## 5) Corrections prêtes a copier (Cas A)

### 5.1 Front ou API indisponible

```bash
docker compose -f compose.prod.yml --env-file .env up -d api front
docker compose -f compose.prod.yml --env-file .env ps
```

### 5.2 DB indisponible

```bash
docker compose -f compose.prod.yml --env-file .env up -d postgres
docker compose -f compose.prod.yml --env-file .env logs --tail=80 postgres
```

### 5.3 Retour etat nominal complet

```bash
docker compose -f compose.prod.yml --env-file .env up -d --scale api=1 --scale front=1 --scale worker=1 postgres api worker front
curl -sS -o /dev/null -w "front_health=%{http_code}\n" http://127.0.0.1:8080/health
curl -sS -o /dev/null -w "api_via_front=%{http_code}\n" http://127.0.0.1:8080/api/messages
```

## 6) Les 6 pannes de reference (phase 9 -> phase 10)

| Panne | Symptome au tableau | Cause probable | Manoeuvre de reparation | Chronometrage |
| :---- | :---- | :---- | :---- | :---- |
| Redemarrage API | carre API pale/vide court instant | process API interrompu | `docker restart <api_container>` | retour 200: 1s, total: 2s |
| Redemarrage PostgreSQL | erreurs API temporaires | DB indisponible | `docker restart <postgres_container>` | retour 200: 1s |
| Pause/reprise API | micro-coupure | process fige par pause | `docker unpause <api_container>` | retour 200: 0s, total: 6s |
| Pause worker | impact limite sur `/api/messages` | worker suspendu | `docker unpause <worker_container>` | non chronometre |
| Redemarrage front | front indisponible court instant | process front redemarre | `docker restart <front_container>` | non chronometre |
| Kill worker puis relance | worker absent puis revient | process worker tue | `docker start <worker_container>` | non chronometre |

## 7) Debug deploiement runner/vm-prod (Cas B)

Utiliser cette section si la pipeline deploy est rouge ou si la VM ne se met pas a jour.

### 7.1 Verifier la pipeline

Checklist:
- Le workflow `verify` est vert.
- Le workflow de deploiement est lance.
- Le job runner de deploiement est bien pris par le runner attendu.

Si le job est en attente infinie:
- probable runner offline ou label non correspondant.

### 7.2 Verifier sur la VM

```bash
ssh <user>@<vm-prod-host> "cd /srv/flotte && docker compose -f compose.prod.yml --env-file .env ps"
ssh <user>@<vm-prod-host> "cd /srv/flotte && docker compose -f compose.prod.yml --env-file .env logs --tail=120 api front worker postgres"
```

### 7.3 Retablir rapidement sur la VM

```bash
ssh <user>@<vm-prod-host> "cd /srv/flotte && docker compose -f compose.prod.yml --env-file .env up -d --scale api=1 --scale front=1 --scale worker=1 postgres api worker front"
```

Puis verifier depuis votre poste (ou depuis la VM selon exposition reseau).

## 8) Check passation (obligatoire phase 10)

Contrainte actuelle:
- Projet de groupe (Make + Thi Van Anh).
- Passation externe non realisee a ce stade.

Etat:
- Runbook pret.
- Passation en attente (interne puis externe).

Trace de passation (a completer quand un testeur execute vraiment le runbook):
- Mode: groupe
- Testeur:
- Heure de debut:
- Heure de fin:
- Incident rejoue:
- Blocage #1 observe:
- Blocage #2 observe:
- Correction apportee au runbook apres test:
- Resultat final: front=... et api/messages=...
- Validation externe (autre equipage): en attente

Critere de sortie:
- relancer la flotte de zero en suivant seulement ce document,
- traiter au moins 1 panne sans aide orale,
- retrouver un etat nominal (front 200 + api/messages 200),
- noter si la validation externe est faite ou toujours en attente.
