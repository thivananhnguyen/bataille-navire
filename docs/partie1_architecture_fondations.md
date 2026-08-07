![][image1]

**Initiation à la méthodologie DevOps, Gitlab CI/CD et conteneurisation Docker  Partie 1 : Architecture & Fondations** 

**Accueil et Présentation** 

**Qui suis-je ?** 

Rapide présentation : parcours, ce que je fais au quotidien avec le DevOps et Docker, l'objectif de ces 5 jours avec vous. 

**Et vous ?** 

Qu'avez-vous déjà fait avec Docker ? 

Qu'avez-vous fait en termes de mises en production ? Quels ont été vos pires soucis/bugs en production ? 

**Sondage rapide** : qui a déjà mis quelque chose en production ? Qui a déjà utilisé Docker au quotidien ? 

**Objectifs de la formation** 

Voilà une vue d'ensemble des notions que l'on va apprendre ensemble. 

1\. **Maîtriser l'architecture DevOps et plus particulièrement Docker** : comprendre comment les pièces s'assemblent 

2\. **Être opérationnel** : repartir avec des compétences directement applicables 

**Notre projet pour ce cours \- Todo API** 

Voilà le projet fil rouge que nous allons construire : 

**En 5 jours, on dockerise, on met en pipeline et on déploie notre propre API de gestion de tâches (Todo API).** Un projet volontairement simple côté code : l'objet du cours n'est pas la complexité applicative, mais de vivre toute la chaîne DevOps dessus, de A à Z, jusqu'à une mise en prod surveillée. 

Chaque jour, on ajoutera une couche : 

**J1** : l'API Node.js tourne dans une stack Docker complète (Dockerfile, networks, volumes, docker-compose, image publiée) 

**J2** : on approfondit Docker (debug, optimisation d'images, healthchecks) et on ouvre sur l'orchestration 

**J3** : théorie CI/CD et DevOps, premier pipeline simple pour s'échauffer  
**J4** : pipeline GitLab-CI complet sur notre Todo API (tests, build, push, secrets) ; QCM 

Dans la semaine : déploiement sur Kubernetes, monitoring, rédaction d'une procédure de déploiement 

**J5** : projets de groupe démo finale du projet en groupe 

Le jour 5, chaque groupe démontre son pipeline de bout en bout : un git push , et l'app part en prod sur Kubernetes, surveillée. 

**Comment on travaille** 

**50/50.** Moitié théorie, moitié pratique, et les deux sont entrelacés. Pas deux heures de slides suivies de deux heures de TP. On alterne. 

**Participation active** : "Coupez"-moi la parole ��, pas de monologue d'enseignant, le but est que l'on discute et construise ensemble \! 

**Découpage des chapitres** : chaque section commence par **L'essentiel**, ce que tout le monde repart en maîtrisant. Puis on pousse plus loin, avec de la matière pour ceux qui avancent vite. On ajuste le curseur ensemble, en direct, selon le rythme du groupe. 

**Le matin on suit, l'après-midi on construit.** Les quatre premiers chapitres se font ensemble, au même rythme. À partir du projet fil rouge, chacun avance sur son propre dépôt : les notions sont expliquées sur des exemples neutres, et les transposer sur son projet fait partie du travail. Personne n'est censé boucler les dix chapitres, ils sont calibrés pour ça. 

**Planning de la Journée** 

1\. **Introduction DevOps et Architecture** : les 3 piliers du DevOps, le cycle DevOps, l'architecture type 

2\. **Les containers Linux sous le capot** : namespaces, cgroups, et un conteneur fabriqué à la main sans Docker 

3\. **Installation des Outils** : Docker Desktop, Node.js, Git, VS Code, compte de registry 

4\. **Architecture Docker et concepts de base** : daemon, client, registry, les commandes qui font tourner tout ça, et pour finir la construction de notre première image 

5\. **Le projet fil rouge Todo API** *(après-midi)* : le socle, une API de gestion de tâches qui répond, puis **Écrire un Dockerfile de production** : layers, cache, multi-stage, utilisateur non-root 

6\. **Networks et Volumes** : faire communiquer les conteneurs, faire survivre les données 

7\. **Docker Compose et la configuration** : toute la stack dans un fichier, configuration par variables d'environnement 

8\. **Un second service, en Python** : une stack polyglotte branchée sur la même base 9\. **Publier l'image et redéployer** : le registry, et une stack qui démarre sans code source 10\. **Mesurer et optimiser** : taille d'image, nombre de couches, temps de build à froid et à chaud **Vue d'ensemble \- Points abordés dans cette Partie** Aperçu rapide de tout ce qui est vu aujourd'hui  
�� **Théories** 

**Concepts DevOps fondamentaux** 

Définition du DevOps (collaboration Dev \+ Ops) 

Les 3 piliers : Culture, Automation, Measurement 

> > > > Le cycle DevOps en 8 étapes (Plan, Code, Build, Test, Release, Deploy, Operate, Monitor) Architecture DevOps type avec feedback loop 

**La nature d'un container Linux** 

Un conteneur est un processus, pas une machine 

Les namespaces (pid, net, mnt, uts, ipc, user) : ce que le processus a le droit de voir Les cgroups : ce que le processus a le droit de consommer 

Le système de fichiers en couches (chroot, overlayfs) 

Conteneurs vs machines virtuelles, et les cas où la VM reste le bon choix 

**Introduction à Docker** 

Problématique du "ça marche sur ma machine" 

> > > > Avantages de Docker (rapidité, multiplateforme, isolation, déploiement facilité) Architecture client / daemon / registry 

Docker vs Kubernetes vs Docker Swarm 

**Terminologie Docker essentielle** 

Dockerfile : script de construction d'image 

Image : snapshot immuable et exécutable 

Container : instance en cours d'exécution 

Registry, Volume, Network : les trois autres briques du vocabulaire 

La relation entre tous ces concepts 

**Le Dockerfile de production** 

Les instructions qui comptent, et CMD vs ENTRYPOINT 

Layers et cache de build : pourquoi l'ordre des lignes change tout 

.dockerignore , utilisateur non-root, images de base épinglées 

Multi-stage builds et réduction de la taille d'image 

Spécificités Node.js et spécificités Python 

**Les Networks Docker** 

Pourquoi deux conteneurs ne se voient pas par défaut 

Les drivers bridge, host, none 

La résolution DNS par nom de service sur un network custom 

Isolation entre networks 

**Les Volumes Docker** 

Problématique de la persistance des données 

Les 3 types de montage (volumes, bind mounts, tmpfs)  
Différence entre volumes nommés et anonymes 

Syntaxes \-v vs \--mount 

Partage de données entre conteneurs 

**Docker Compose et configuration** 

Orchestration de services multi-conteneurs 

Syntaxe du fichier docker-compose.yml 

Services, networks, volumes 

Commandes principales (build, up, down) 

Gestion des dépendances entre services (depends\_on) et ses limites Configuration par variables d'environnement, .env et secrets 

Ouverture sur les bonnes pratiques de conteneurisation en production **Publication et redéploiement** 

Push d'images vers un registry public ou privé 

Tags d'images et versionnement sémantique 

Pull et redéploiement depuis le registry 

**Métriques et optimisation d'images** 

Taille d'une image, nombre de couches, poids de chaque couche Build à froid contre build à chaud : ce que le cache fait gagner 

Temps écoulé entre le lancement d'un conteneur et sa première réponse Ce qu'une optimisation fait gagner, et le cas où elle fait régresser 

️ **Mises en pratique** 

**Fabriquer un container à la main, sans Docker** 

Récupération d'un rootfs minimal 

Isolation du système de fichiers avec chroot 

Isolation des processus, du réseau et du hostname avec unshare Limitation de la mémoire avec un cgroup, et le processus qui se fait tuer **Découverte des commandes de base** 

docker pull : récupérer une image depuis un registry 

docker create puis docker start , et pourquoi docker run fait les deux docker ps , docker ps \-a , docker logs , docker exec 

docker stop , docker rm , docker rmi et la différence entre les trois Cycle de vie complet d'un conteneur 

**Installation et configuration de l'environnement** 

Installation de Docker Desktop 

> > > > Vérification avec docker \--version et hello-world 

Configuration de VS Code avec extensions Docker 

Configuration Git (user.name, user.email)  
**Manipulation via terminal** 

Commandes bash essentielles (pwd, cd, ls, mkdir, touch, cat) 

Navigation dans le système de fichiers 

Exécution de commandes dans les conteneurs (docker exec) 

**Navigation dans Docker Desktop** 

Exploration de l'interface (Containers, Images, Volumes) 

> > > > Visualisation des logs graphiquement 

Gestion des conteneurs depuis l'interface 

**Premier Dockerfile et image** 

Création d'un Dockerfile pour une app Node.js 

Build d'une image avec docker build \-t 

Compréhension des layers lors du build 

Exposition de ports avec \-p (mapping host:container) 

**Exercice Networks** 

Création d'un network custom 

Deux conteneurs qui se pinguent par leur nom 

Inspection du network et de ses IPs 

Démonstration de l'isolation entre deux networks 

**Exercice Volumes** 

Création d'un volume nommé avec docker volume create 

Montage du volume sur plusieurs conteneurs 

Écriture et lecture de données partagées 

Test de persistance après suppression des conteneurs 

Inspection avec docker volume inspect 

**Stack complète en docker-compose** 

Configuration d'une stack Node.js \+ base de données 

Configuration des ports, des networks et des environnements 

Utilisation de docker compose up/down/build 

**Todo API : le projet de l'après-midi** 

Chapitre 5 : API CRUD dockerisée en Node.js, avec un Dockerfile de production optimisé 

Chapitre 6 : Ajout d'une base PostgreSQL, volumes de persistance, communication via network 

Chapitre 7 : Orchestration de la stack en docker-compose, configuration entièrement par variables d'environnement 

Chapitre 8 : Service en Python branché sur la même stack (calcul, agrégation ou transformation de données) 

Chapitre 9 : Publication des images sur un registry, puis redéploiement depuis le registry  
Chapitre 10 : Mesure de la taille d'image, optimisation des layers, inspection des temps de build et de startup 

**1 \- Introduction DevOps et Architecture L'essentiel** 

**Qu'est-ce que le DevOps ?** 

Le DevOps, c'est faire collaborer les développeurs (Dev) et les opérationnels (Ops) pour livrer du code plus vite et plus sûrement. 

Quel est le problème quand Dev et Ops ne se parlent pas ? 

1\. **Définir et configurer une architecture DevOps** 

Une architecture DevOps est un ensemble d'outils et de pratiques qui permettent aux équipes de développement et d'opérations de collaborer efficacement. 

Avec Docker, on peut créer des conteneurs pour nos applications, ce qui facilite leur déploiement et leur gestion. Nous creuserons cela un peu plus tard. 

2\. **Automatisation du cycle de vie d'une application** 

Grâce au CI / CD (Intégration Continue / Déploiement Continu) sur GitHub, vous pouvez automatiser le processus de test et de déploiement de votre application. 

Cela signifie que chaque fois que vous apportez des modifications, des tests unitaires sont exécutés automatiquement pour s'assurer que tout fonctionne avant de déployer les changements \! 

3\. **Outils, techniques** 

Nous les observerons au fil de ce cours. 

4\. **Supervision et Performance des Applications** 

Il est essentiel de surveiller nos applications et notre infrastructure pour garantir leur disponibilité, leurs performances, éviter les imprévus. 

Des outils de monitoring peuvent nous alerter en cas de problème. 

Sur le dernier projet nous pourrons expérimenter cela. 

Le terme n'est pas sorti de nulle part : il vient de la DevOpsDays de Gand en 2009, une conférence montée par Patrick Debois pour réunir deux mondes qui s'ignoraient. Depuis, c'est devenu un mot-valise que tout le monde met sur sa fiche de poste, ce qui rend d'autant plus utile de savoir ce qu'il y a vraiment dedans. 

**Les 3 piliers du DevOps** 

1\. **Culture** 

Collaboration entre équipes 

Responsabilité partagée 

Feedback continu 

2\. **Automation** 

Tests automatisés 

Déploiement automatique  
Infrastructure as Code 

3\. **Measurement** 

Métriques de performance 

Monitoring applicatif 

> > > > Alerting intelligent 

**Architecture DevOps type** 

Développeur → Git → CI/CD → Tests → Build → Deploy → Monitoring / Server ↑ ↓ 

└──────────────── Feedback Loop ────────────────────────────┘

Ce qui compte dans ce schéma, c'est la flèche du bas. Sans elle, on a juste une chaîne de montage : le code part, et personne ne sait ce qu'il devient. La boucle de retour, c'est ce qui transforme une suite d'outils en méthode de travail. 

**Le cycle DevOps** 

1\. **Plan** : Définir les features 

2\. **Code** : Développer 

3\. **Build** : Compiler/packager 

4\. **Test** : Valider automatiquement 

5\. **Release** : Préparer la mise en production 

6\. **Deploy** : Mettre en production 

7\. **Operate** : Maintenir en conditions opérationnelles 

8\. **Monitor** : Observer et mesurer 

Sur ces huit étapes, notre journée d'aujourd'hui couvre surtout **Build** et **Deploy** : on apprend à empaqueter une application de façon reproductible. Le reste de la semaine remontera la chaîne, jusqu'à ce que le cycle tourne tout seul. 

**Pour les curieux** 

*Comment on sait qu'une équipe "fait bien" du DevOps ? À quoi ça se mesure, concrètement ?* 

Il existe une réponse chiffrée, et elle est publique. Le programme de recherche DORA (DevOps Research and Assessment, aujourd'hui hébergé par Google Cloud) interroge chaque année des dizaines de milliers d'équipes et publie un rapport, l'Accelerate State of DevOps Report. Sa conclusion la plus reprise tient en quatre métriques. 

**Les 4 métriques DORA ?** Quatre indicateurs qui, mis ensemble, prédisent assez bien la performance d'une équipe de livraison logicielle. 

**Deployment frequency** : à quelle fréquence on met en production. Les équipes les plus performantes déploient plusieurs fois par jour, les moins performantes une fois par mois ou moins. 

**Lead time for changes** : le temps entre un commit et sa mise en production. On parle de moins d'une heure d'un côté, de plusieurs mois de l'autre. 

**Change failure rate** : la proportion de déploiements qui cassent quelque chose.   
**Time to restore service** : le temps qu'il faut pour se remettre debout quand ça casse. 

Le point contre-intuitif, et c'est celui qui vaut le détour : les deux premières métriques (la vitesse) et les deux dernières (la stabilité) ne s'opposent pas. On aurait envie de croire qu'aller vite fait casser plus souvent. Les données disent l'inverse, les équipes qui déploient le plus souvent sont aussi celles qui cassent le moins. La raison est mécanique : de petits déploiements fréquents sont plus faciles à tester, à comprendre et à annuler qu'un gros déploiement trimestriel. 

Deux autres notions vous suivront toute votre carrière, autant les poser maintenant. 

**Infrastructure as Code (IaC) ?** Décrire ses serveurs, ses réseaux et ses services dans des fichiers versionnés au lieu de les configurer à la main. Un Dockerfile et un docker compose.yml , c'est déjà de l'Infrastructure as Code. 

**SRE ?** Site Reliability Engineering, l'approche formalisée par Google (le livre est en accès libre) : traiter l'exploitation comme un problème de logiciel, avec des objectifs de fiabilité chiffrés (les SLO) et un budget d'erreur assumé. 

Côté carrière, c'est un domaine où les certifications ont encore du poids : la Certified Kubernetes Administrator de la CNCF, ou les certifications cloud (AWS, Azure, GCP) sont régulièrement demandées sur les offres DevOps et pèsent réellement sur les grilles de salaire. On reparlera de Kubernetes en fin de semaine. 

**2 \- Les containers Linux : ce qu'il y a sous le capot L'essentiel** 

*Quand vous tapez docker run nginx , qu'est-ce qui se passe vraiment sur votre machine ? Une mini machine virtuelle qui démarre quelque part ? Un logiciel qui s'installe comme n'importe quel programme ?* 

Ni l'un ni l'autre. Ce qui démarre, c'est un processus Linux tout à fait normal, visible depuis votre machine hôte, qui tourne sur le même noyau (kernel) que le reste de votre système. La seule différence avec un processus classique, c'est qu'on lui a mis des œillères : il croit être seul sur la machine, avoir son propre système de fichiers, son propre réseau, ses propres utilisateurs. Cette illusion, ce sont trois mécanismes du noyau Linux qui la fabriquent : les namespaces, les cgroups, et un système de fichiers en couches. Avant de reparler de Docker, on va comprendre ces trois briques, parce que tout le reste du cours (isolation, limites de ressources, sécurité) en découle directement. 

**Les namespaces : l'illusion d'être seul** 

Un conteneur n'est isolé que parce que le noyau lui montre une vue partielle et cloisonnée de la réalité. Ce mécanisme s'appelle les namespaces (espaces de noms) : une fonctionnalité du noyau Linux qui permet de faire croire à un groupe de processus qu'ils sont seuls à voir une ressource du système (une liste de processus, une interface réseau, un point de montage...), alors que d'autres processus, ailleurs sur la même machine, en voient une version complètement différente. 

**Namespace ?** Un mécanisme du noyau Linux qui cloisonne la vue d'une ressource système (processus, réseau, points de montage...) pour un groupe de processus donné, sans dupliquer le matériel ni le noyau. 

Il en existe plusieurs sortes, chacune cloisonnant une ressource différente :  
**Instant Notions : les namespaces qu'on va manipuler aujourd'hui** 

**pid** : cloisonne la liste des processus visibles. Dans son propre namespace pid, un processus peut se croire PID 1, même s'il est PID 48213 côté hôte. 

**net** : cloisonne les interfaces réseau, les routes, les ports. Un conteneur peut écouter sur le port 80 sans entrer en conflit avec un serveur qui écoute déjà sur le port 80 côté hôte. 

**mnt** : cloisonne les points de montage, donc la vue du système de fichiers. C'est ce qui permet à un conteneur de voir sa propre racine / sans voir celle de l'hôte. 

**uts** : cloisonne le hostname et le nom de domaine. On peut changer le hostname à l'intérieur sans toucher à celui de la machine hôte. 

**ipc** : cloisonne les mécanismes de communication entre processus (mémoire partagée, files de messages). 

**user** : cloisonne la correspondance entre utilisateurs. Un processus peut être "root" à l'intérieur de son namespace tout en étant un utilisateur non privilégié côté hôte. C'est la brique centrale des conteneurs rootless, qu'on retrouve un peu plus loin. 

Le point important à retenir : les namespaces ne créent rien de nouveau, ils **cachent**. Le noyau reste unique, partagé par tous les conteneurs et par l'hôte. C'est la différence fondamentale avec une machine virtuelle, on y revient dans un instant. 

**Les cgroups : la laisse sur les ressources** 

Isoler la vue d'un processus, c'est bien, mais rien n'empêche encore ce processus de manger toute la RAM ou tout le CPU de la machine. C'est le rôle des cgroups (control groups) : une fonctionnalité du noyau qui permet de regrouper des processus et de leur appliquer des limites et une comptabilité sur leur consommation de ressources (CPU, mémoire, IO disque, réseau). 

**cgroup ?** Un mécanisme du noyau Linux qui limite, priorise et mesure la consommation de ressources (CPU, RAM, IO) d'un groupe de processus. 

La version actuelle, cgroup v2, est documentée dans la documentation officielle du noyau Linux. Concrètement, ça se manipule comme un système de fichiers virtuel monté sous  /sys/fs/cgroup/ : on crée un dossier, on écrit une valeur dans un fichier comme memory.max , et le noyau applique la limite à tous les processus rattachés à ce cgroup. Si un processus dépasse la limite mémoire fixée, le noyau ne négocie pas : il le tue (c'est ce qu'on appelle un OOM-kill, Out Of Memory kill). On va le déclencher nous-mêmes dans quelques minutes. 

Namespaces et cgroups répondent à deux questions différentes et complémentaires : *qu'est-ce que ce processus a le droit de voir ?* (namespaces) et *combien de ressources a-t-il le droit de consommer ?* (cgroups). 

**Le système de fichiers en couches** 

Reste un dernier problème : d'où vient le / que voit un conteneur une fois isolé par son namespace mnt ? Il faut bien un dossier réel, quelque part sur le disque de l'hôte, qui serve de racine. Deux mécanismes s'enchaînent historiquement pour construire ça. 

Le plus ancien, c'est le chroot : une commande qui change la racine / apparente d'un processus vers un sous-dossier arbitraire. Un processus chrooté dans /mon-dossier croit que /mon dossier est la racine du système, et ne peut pas remonter au-dessus. C'est simple, ça existe depuis des décennies, mais ce n'est **pas** de l'isolation de sécurité : chroot ne touche ni aux  
processus visibles, ni au réseau, ni aux utilisateurs. On le vérifie nous-mêmes juste en dessous. 

**pivot\_root ?** Un appel système plus robuste que chroot, utilisé en interne par les outils de conteneurisation modernes (dont Docker) pour basculer complètement la racine du système de fichiers d'un processus, en rendant l'ancienne racine inaccessible plutôt que simplement masquée. 

Enfin, pour éviter de dupliquer des gigaoctets de fichiers identiques à chaque image, Docker construit ce dossier racine en empilant des couches en lecture seule les unes sur les autres, avec  overlayfs comme pilote de stockage par défaut. Chaque instruction d'un Dockerfile ajoute une couche ; au démarrage d'un conteneur, une dernière couche en lecture-écriture vient se poser au sommet de la pile. On reparlera d'overlayfs plus tard dans le programme quand on regardera le détail des layers d'une image. 

**Conteneur vs machine virtuelle : le scénario qui tranche** 

*Imaginez : on doit lancer 50 instances d'une même application pour un test de charge, un vendredi après-midi, avant une mise en prod le lundi.* 

Avec des **machines virtuelles**, chaque instance embarque son propre noyau complet, démarre un système d'exploitation entier (BIOS virtuel, init, services système) avant même de lancer l'application. Comptez 30 secondes à 2 minutes de démarrage par VM, et plusieurs gigaoctets de disque chacune, puisqu'un noyau complet et un OS complet doivent être dupliqués à chaque fois. 50 VMs, c'est potentiellement plusieurs centaines de Go et un bon quart d'heure avant d'avoir tout le monde debout. 

Avec des **conteneurs**, on saute la case démarrage d'OS : le noyau est déjà là, partagé, déjà démarré, c'est celui de la machine hôte. Un conteneur, c'est juste un processus qu'on lance avec des œillères (namespaces) et une laisse (cgroups) autour. Démarrage en moins d'une seconde, poids en dizaines ou centaines de Mo par image (souvent bien moins avec une image de base légère). 50 conteneurs démarrent en quelques secondes. 

Ce gain de poids et de vitesse a un prix : la frontière d'isolation. Une VM est isolée au niveau matériel par un hyperviseur, avec son propre noyau : une faille dans le noyau d'une VM ne donne, en théorie, pas directement accès à l'hôte ni aux autres VMs. Un conteneur partage le même noyau que l'hôte et que tous les autres conteneurs de la machine : une faille noyau exploitée depuis un conteneur peut, dans le pire cas, permettre d'en sortir. C'est pour ça que la VM reste le bon choix quand on héberge du code de plusieurs clients qui ne se font pas confiance entre eux (isolation multi-tenant forte, hébergeurs cloud), quand on doit faire tourner un noyau différent de celui de l'hôte (un workload Windows sur un hôte Linux, par exemple), ou quand une exigence de conformité impose une frontière matérielle et pas seulement logicielle. 

**Instant Notions : conteneur vs VM en un coup d'œil** 

**Démarrage** : conteneur, moins d'une seconde. VM, 30 secondes à 2 minutes. **Poids** : conteneur, dizaines à centaines de Mo. VM, plusieurs Go (OS \+ noyau complets). 

**Isolation** : conteneur, cloisonnement logiciel sur un noyau partagé. VM, cloisonnement matériel via un hyperviseur, noyau dédié. 

**Bon choix VM** : multi-tenant non fiable, noyau différent requis, conformité exigeant une frontière matérielle.  
**Ce matin, on construit un conteneur à la main (sans Docker)** 

Avant de retoucher à Docker, on va fabriquer notre propre mini-conteneur avec les seuls outils du noyau Linux : pas de docker , pas de Dockerfile , juste chroot , unshare et les cgroups. L'objectif n'est pas de retenir ces commandes par cœur, mais de voir de vos propres yeux que Docker n'a rien de magique : c'est un empilement de ces mêmes briques, avec une jolie interface autour. 

�� Ces commandes sont des fonctionnalités du noyau **Linux** : elles ne fonctionnent pas nativement sur macOS ni Windows, puisque ces systèmes n'ont pas ce noyau. Si votre machine est un Mac ou un PC Windows, le plus simple est une VM Linux légère (WSL2 sous Windows fait très bien l'affaire, ou une VM Multipass/UTM). Sinon, on suit la démo à l'écran et on la rejoue juste après la section suivante, une fois Docker installé, dans un conteneur "privilégié" lancé avec  docker run \-it \--rm \--privileged alpine sh . Le comble de l'exercice, oui : utiliser Docker comme bac à sable Linux pour recréer un conteneur sans Docker. 

**Étape 1 : se procurer un système de fichiers racine** 

On a besoin d'un dossier qui contienne un mini système Linux complet (un /bin , un /etc , un  /lib ...) pour servir de racine à notre futur conteneur. Deux chemins classiques existent :  debootstrap, un outil qui installe un système Debian minimal dans un sous-dossier, ou plus simple et plus rapide pour l'exercice du jour, récupérer directement l'archive alpine-minirootfs publiée officiellement par Alpine Linux, une distribution ultra-légère taillée pour les conteneurs. 

\# On crée un dossier de travail, avec un sous-dossier dédié au futur rootfs mkdir \-p \~/mini-container/rootfs 

cd \~/mini-container 

\# On télécharge l'archive minirootfs d'Alpine (quelques Mo seulement, contre plusieurs 

\# centaines de Mo pour une image Ubuntu ou Debian complète) 

curl \-L \-o alpine-minirootfs.tar.gz \\ 

https://dl-cdn.alpinelinux.org/alpine/latest-stable/releases/x86\_64/alpine minirootfs-3.20.3-x86\_64.tar.gz 

\# On extrait l'archive DANS rootfs/ : ce dossier va devenir la racine "/" de notre conteneur 

tar \-xzf alpine-minirootfs.tar.gz \-C rootfs 

**Devrait afficher**, en tapant ls rootfs : une arborescence Linux classique, bin , etc , home ,  lib , root , sbin , usr , var ... Ce dossier va littéralement devenir le / de notre mini-conteneur. 

**Étape 2 : chroot seul, et sa limite** 

On isole d'abord juste la vue du système de fichiers, avec chroot : 

sudo chroot rootfs /bin/sh

**Devrait afficher** : un prompt / \# tout neuf. On tape ls / , on voit le contenu d'Alpine et non celui de la machine hôte : le système de fichiers est bien cloisonné. 

Maintenant, le piège. On tape ps aux (ou ps si ps aux n'est pas reconnu selon la version de busybox) :   
**Devrait afficher** : la liste complète des processus de la machine **hôte**, pas seulement ceux du chroot. Rien à voir avec un conteneur isolé : chroot ne touche ni au namespace pid, ni au réseau, ni aux utilisateurs, seulement à la vue du système de fichiers. C'est exactement la limite qu'on annonçait plus haut. 

On sort avec exit . 

**Étape 3 : chroot \+ unshare, la vraie isolation** 

On combine maintenant chroot avec unshare, la commande qui crée de nouveaux namespaces pour le processus qu'elle lance : 

sudo unshare \--pid \--fork \--mount-proc \--uts \--net \-- chroot rootfs /bin/sh 

\--pid : nouveau namespace pid, notre shell devient PID 1 dans son propre monde 

\--fork : indispensable avec \--pid , pour que le processus qui obtient le nouveau namespace soit bien celui qu'on lance 

\--mount-proc : remonte un /proc propre au nouveau namespace pid (sinon ps continuerait de lire l'ancien /proc de l'hôte) 

\--uts : nouveau namespace pour le hostname 

\--net : nouveau namespace réseau, vide au départ 

Une fois dans le shell obtenu, on teste : 

hostname mon-conteneur-a-la-main 

ps aux

**Devrait afficher** : pour hostname , aucune erreur, et si on ouvre un second terminal côté hôte pour taper hostname , on voit que le hostname de la machine hôte n'a pas bougé (namespace uts cloisonné). Pour ps aux , cette fois une poignée de processus seulement, essentiellement  /bin/sh en PID 1 : c'est la preuve concrète du cloisonnement pid. 

On peut aussi taper ip addr (busybox l'embarque) : **devrait afficher** uniquement l'interface lo (loopback), aucune interface réseau vers l'extérieur. Le namespace net est bien vide, notre mini conteneur n'a aucune connectivité, exactement comme un vrai conteneur Docker sans réseau attaché. 

On sort avec exit . 

**Étape 4 : la laisse cgroup, et la démo qui tue** 

Dernière brique : on limite la mémoire disponible avec un cgroup, et on regarde le noyau appliquer la sanction.   
\# On crée un cgroup dédié à l'exercice (un simple sous-dossier sous le point de montage cgroup v2) 

sudo mkdir /sys/fs/cgroup/demo-mini-container 

\# On fixe une limite mémoire volontairement basse : 20 Mo 

echo 20M | sudo tee /sys/fs/cgroup/demo-mini-container/memory.max 

\# On lance un shell isolé, on l'attache au cgroup en écrivant son PID dans cgroup.procs, 

\# puis on tente d'allouer 200 Mo d'un coup, dix fois la limite fixée sudo unshare \--fork \--pid \--mount-proc \-- sh \-c ' 

echo $$ | sudo tee /sys/fs/cgroup/demo-mini-container/cgroup.procs python3 \-c "a \= bytearray(200 \* 1024 \* 1024)" 

' 

**Devrait afficher** : le message Killed , le processus Python meurt avant même de terminer son allocation. En tapant dmesg | tail côté hôte juste après, on voit une ligne mentionnant Memory cgroup out of memory ou oom-kill : c'est le noyau qui a appliqué la limite fixée dans  memory.max , pas une erreur applicative. C'est très exactement ce que Docker fait derrière un  docker run \--memory 20m . 

*Qu'est-ce qui se passerait si on avait fixé la limite à 500 Mo au lieu de 20 Mo ?* Le processus tiendrait la charge, aucun kill : la limite n'est un problème que quand on la dépasse réellement, elle est totalement transparente en dessous. 

On nettoie derrière nous : 

sudo rmdir /sys/fs/cgroup/demo-mini-container

À ce stade, on a recréé à la main les trois ingrédients d'un conteneur : une vue de système de fichiers isolée, des processus et un réseau cloisonnés, une consommation de ressources bridée. Tout ce que Docker ajoute par-dessus, c'est de l'orchestration et de l'ergonomie autour de ces mêmes appels noyau. 

**Creusons** 

**Ce que fait Docker avec les mêmes briques** 

Quand on tape docker run , Docker n'invente rien de plus que ce qu'on vient de faire à la main. La partie qui orchestre concrètement la création des namespaces, l'application des limites cgroups et le pivot\_root vers le système de fichiers de l'image s'appelle runc : un outil en ligne de commande bas niveau, développé à l'origine sous le nom libcontainer chez Docker puis donné à la communauté, dont le rôle unique est de démarrer un conteneur conforme à une spécification standardisée. 

Cette spécification, c'est l'OCI Runtime Specification, portée par l'Open Container Initiative. Elle décrit, dans un format texte standardisé ( config.json ), quelles namespaces créer, quelles limites cgroups appliquer, quel rootfs monter. L'intérêt : n'importe quel outil qui sait produire ou lire ce format (Docker, mais aussi Podman, Kubernetes via containerd...) peut faire tourner le même conteneur, sans être lié à l'implémentation Docker.   
**OCI ?** Open Container Initiative : une organisation qui définit des standards ouverts pour le format des images et des runtimes de conteneurs, afin qu'ils soient interchangeables entre outils. 

**Pourquoi \--privileged est dangereux** 

On a utilisé docker run \--privileged plus haut pour rejouer l'exercice sur une machine sans noyau Linux natif. Il faut bien comprendre ce que ce flag fait réellement : il désactive une bonne partie des restrictions de sécurité qu'on vient de voir. Un conteneur privilégié a accès à tous les   
périphériques de l'hôte, peut charger des modules noyau, et peut dans de nombreux cas remonter jusqu'au système de fichiers de l'hôte lui-même. Concrètement, un conteneur privilégié compromis, c'est une machine hôte compromise. C'est un flag pratique pour un exercice pédagogique en salle de classe, jamais acceptable pour un conteneur qui tourne en production sans raison impérieuse et documentée. 

**Voir dans un conteneur qui tourne déjà : nsenter** 

Autre outil bas niveau utile à connaître : nsenter, qui permet d'entrer dans les namespaces d'un processus déjà en cours d'exécution, y compris ceux d'un conteneur Docker déjà lancé, sans passer par docker exec . C'est ce genre d'outil qu'on utilise pour du débogage bas niveau, par exemple inspecter les tables de routage réseau exactes d'un conteneur depuis l'hôte, ou diagnostiquer un conteneur dont le processus principal ne répond plus mais dont les namespaces existent toujours. 

**Les conteneurs rootless** 

On a mentionné le namespace user plus haut : c'est la brique qui permet à un processus d'être "root" à l'intérieur de son conteneur tout en étant un utilisateur non privilégié côté hôte. C'est le principe des conteneurs rootless : faire tourner le démon Docker lui-même, et les conteneurs qu'il lance, sans jamais avoir besoin de droits root sur la machine hôte. L'intérêt en sécurité est direct : si un attaquant s'échappe d'un conteneur rootless, il atterrit sur un utilisateur non privilégié de l'hôte, pas sur root. C'est de plus en plus la configuration recommandée en production, même si elle a quelques limitations (certains ports privilégiés sous 1024, certaines fonctionnalités réseau avancées). 

**3 \- Installation des Outils** 

On sait maintenant ce qu'il y a vraiment sous un conteneur. À partir de là, tout le reste de la journée se passe les mains dans le terminal, donc prenons dix minutes pour que tout le monde ait exactement le même outillage sur sa machine. C'est le moment de régler les problèmes d'installation, pas dans deux heures au milieu du projet. 

**L'essentiel** 

**Les prérequis** 

**Sondage rapide :** Qui a déjà installé Docker ? Node.js ? Git ? Quelle est votre stack principale / vos stacks acquises ?  
**Installation guidée** 

1\. **Docker Desktop** (+ Docker terminal) 

**Vérification de la présence de Docker** 

\# Vérification 

docker \--version 

docker compose version 

\# Test rapide 

docker run hello-world 

**Pour installer :** 

Aller sur le site officiel de Docker : https://www.docker.com/get-started 

Télécharger selon votre OS. 

Suivre les instructions d'installations spécifique à l'OS. 

Docker sera présent en version Desktop et dans le terminal. 

**"Hello world ne marche pas chez moi"** 

Si certaines personnes ont un message contenant 401 unauthorized, c'est que la requête fonctionne, mais que l'accès est non autorisé. Il faut se connecter : 

Sur terminal (Git Bash ou Powershell) : 

docker login \-u \<mon\_username\> 

2\. **Installez Docker sur VSCode** 

Cela permet d'avoir un support langage, pendant qu'on rédige nos fichiers docker. Pratique pour avoir les bonnes couleurs et de l'aide. 

Nous pouvons également faire un lien vers des remote registeries. 

3\. **Node.js (v18+)** (normalement vous l'avez \!) 

\# Via nvm (recommandé) 

curl \-o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash 

nvm install 18 

nvm use 18 

\# Vérification 

node \--version 

npm \--version 

4\. **Git & GitLab / Github** 

\# Configuration 

git config \--global user.name "Votre Nom" 

git config \--global user.email "email@example.com"

5\. **VS Code \+ Extensions**   
Docker 

GitLens 

ESLint 

REST Client 

**Un compte de registry, à créer maintenant** 

En fin de journée, on publiera nos images en ligne. Autant créer le compte tout de suite pendant qu'on est dans la phase installation : un compte gratuit sur Docker Hub, le registry public opéré par Docker, où l'on dépose et récupère des images. 

**Registry ?** Un dépôt d'images Docker, l'équivalent de npm pour les paquets Node ou de PyPI pour les paquets Python. 

Une fois le compte créé, on vérifie que la connexion passe depuis le terminal : 

docker login 

\# Devrait afficher : Login Succeeded

**Environnement de secours** 

S'il y a trop de problèmes pour l'installation locale, voici une alternative : 

**GitHub Codespaces** comme backup : 

1\. Créer un compte GitHub si nécessaire 

2\. Utiliser un repo test, fait par vos soins 

3\. Lancer un Codespace 

**Instant Cheat Sheet \! \=\> Terminal cheat sheet** 

Pour les personnes ayant besoin d'un rappel sur bash 

Comment naviguer dans le système de fichiers ? 

pwd : savoir où on se trouve 

cd chemin\_du\_dossier : aller dans un dossier (et cd .. pour revenir au dossier parent) ls, ou ls \-l, ou ls \-la : lister les éléments 

Commandes de manipulation de fichiers : 

mkdir nom\_de\_dossier : créer un dossier 

touch nom\_du\_fichier.txt : créer un fichier 

cat nom\_du\_fichier : afficher le contenu du fichier 

Commandes très pratiques : 

ajouter \--help à la suite de la commande sur laquelle on se pose des questions 

écrire man le\_nom\_de\_ma\_commande pour en savoir plus sur la commande (man veut dire manual)   
On peut éditer nos fichiers directement dans le terminal ? 

\-\> Oui, carrément : des outils d'éditions de texte comme nano et vim permettent de manipuler nos fichiers. Je conseille vim, que j'utilise beaucoup \! (mais c'est une question d'habitude) 

**On va plus loin** 

*Docker Desktop, c'est quoi exactement ? Et pourquoi ça demande autant de RAM sur mon Mac ?* 

Bonne question, et la réponse explique pas mal de bizarreries de la journée. Le moteur Docker est un logiciel Linux : il s'appuie sur les namespaces et les cgroups du noyau Linux, qui n'existent tout simplement pas sur macOS ni sur Windows. Donc sur ces deux systèmes, Docker Desktop démarre discrètement une machine virtuelle Linux légère, et c'est elle qui fait tourner vos conteneurs. Le client docker de votre terminal parle à un daemon qui vit dans cette VM. 

Trois conséquences très concrètes : 

Les montages de dossiers depuis votre machine vers le conteneur (les bind mounts, vus plus loin) traversent une frontière de système de fichiers, ce qui les rend nettement plus lents sur macOS et Windows que sur Linux. Si un npm install monté depuis l'hôte rame, c'est ça. 

La mémoire allouée à cette VM est réglable dans les préférences de Docker Desktop, et c'est le premier endroit où regarder quand un build échoue avec un message d'épuisement mémoire. 

Sur Windows, WSL 2 (Windows Subsystem for Linux, une couche qui fait tourner un vrai noyau Linux dans Windows) sert de moteur. Travailler depuis un dossier WSL plutôt que depuis C:\\Users\\... change radicalement les performances. 

Il existe aussi des alternatives à Docker Desktop, utiles à connaître parce que la licence Docker Desktop est payante pour les entreprises de plus de 250 personnes : 

Podman : un moteur compatible avec les mêmes commandes, sans daemon permanent et capable de tourner sans privilèges root. 

Colima : une VM Linux minimaliste pour macOS, pilotée en ligne de commande. 

Rancher Desktop : une alternative graphique complète, qui embarque en plus un Kubernetes local dont on reparlera en fin de semaine. 

Ces outils exposent la même interface en ligne de commande, donc tout ce qu'on apprend aujourd'hui reste valable si vous basculez sur l'un d'eux. 

**4 \- Architecture Docker et concepts de base L'essentiel** 

On ne le nomme plus : Fireship \! Si vous voulez démystifier un sujet rapidement allez sur sa chaîne. Pour le cours du jour : Docker in 100 Seconds 

De nos jours, le développement d'applications ne se limite pas à l'écriture de code. La multiplicité des langages, des cadres, des architectures et des interfaces discontinues entre les outils pour chaque étape du cycle de vie crée une énorme complexité.  
�� Docker simplifie et accélère votre flux de travail, tout en donnant aux développeurs la liberté d'innover en choisissant leurs outils, leurs piles d'applications et leurs environnements de déploiement pour chaque projet. 

Les conteneurs sont une unité logicielle standardisée qui permet aux développeurs d'isoler leur application de son environnement, ce qui résout le problème du "ça marche sur ma machine". 

Pourquoi docker ? \-\> Why Docker | Docker 

Très bonne ressource à suivre : Docker Simplified: A Hands-On Guide for Absolute Beginners **Pourquoi utiliser Docker en tant que développeur ?** 

Avantages de Docker : 

Rapidité: Démarrage et arrêt rapides de l'application. 

Multiplateforme: Fonctionne sur n'importe quel système. 

Construction et destruction rapides des conteneurs. 

Configuration facile: Évite les problèmes d'installation manuelle des dépendances. Environnements isolés: Maintient la propreté de l'espace de travail. 

Déploiement facilité: Simplifie la mise en ligne du projet sur le serveur 

Le but principal est de pouvoir reproduire les environnements : faire un Dockerfile personnalisé, pour que n'importe qui le réutilise pour build son environnement grâce à cet immuable snapshot. On met cette image en ligne pour que n'importe qui puisse la récupérer et générer son propre container. 

Ensuite, si le projet doit être une infrastructure composée de plusieurs applications, on pourra toutes les conteneuriser et les orchestrer pour qu'elles cohabitent dans un même environnement, malgré leurs différences. 

C'est faisable en utilisant Docker Compose, mais on a également des outils tels que Kubernetes pour faire ce travail. Kubernetes simplifie la gestion des applications, améliore la disponibilité et facilite la mise à l'échelle, le tout grâce à une automatisation intelligente. 

Imaginez **Kubernetes** comme un chef d'orchestre pour vos applications. Vous avez plusieurs applications emballées dans des conteneurs, et Kubernetes s'occupe de les déployer, de les mettre à l'échelle (ajuster automatiquement le nombre de copies en fonction de la demande), et de s'assurer qu'elles fonctionnent correctement. Il gère également la répartition du trafic entre les différentes parties de votre application, garantissant une disponibilité continue. 

**Docker Swarm** est une autre technologie liée à la gestion de conteneurs, mais elle se concentre spécifiquement sur l'orchestration de conteneurs Docker. Contrairement à Kubernetes, qui est plus complexe et offre une gamme plus étendue de fonctionnalités, Docker Swarm est une solution d'orchestration plus légère et plus simple, développée directement par Docker. 

Nous verrons cela plus tard. 

Pour l'instant, comprenons-mieux comment s'articule un environnement Docker seul.  
**L'architecture Docker : qui parle à qui** 

Quand on tape une commande docker , elle ne s'exécute jamais toute seule : elle traverse toute une chaîne d'outils, chacun avec un rôle précis. C'est exactement la chaîne qu'on a reconstituée à la main dans la section précédente, avec des noms officiels cette fois. 

**Instant Notions : les 4 maillons de la chaîne Docker** 

**Docker CLI (Command Line Interface)** : le programme docker qu'on tape dans le terminal. Il ne fait quasiment rien lui-même : il traduit la commande en requête HTTP et l'envoie plus loin. 

**dockerd** : le démon Docker, un processus qui tourne en permanence en arrière-plan, reçoit les requêtes du CLI (via un socket Unix ou une API réseau), et gère les images, les volumes, les networks. 

**containerd** : le runtime de haut niveau auquel dockerd délègue la gestion du cycle de vie des conteneurs (démarrage, arrêt, supervision), et qui gère aussi le téléchargement des images depuis un registry. 

**runc** : le runtime bas niveau qu'on a déjà croisé en creusant plus haut, celui qui appelle réellement le noyau pour créer les namespaces, poser les cgroups, et démarrer le processus du conteneur. 

À l'autre bout de la chaîne, il y a le **registry** : un serveur qui stocke et distribue des images Docker. Le plus connu est Docker Hub, le registry public par défaut, mais une entreprise peut très bien héberger son propre registry privé. 

Donc quand on tape docker run nginx : le CLI transmet la demande à dockerd, dockerd vérifie si l'image nginx existe déjà localement, sinon demande à containerd de la télécharger depuis Docker Hub, puis containerd déclenche runc pour effectivement démarrer le conteneur avec les namespaces et cgroups qu'on a manipulés à la main juste avant. 

**Docker : Les trois termes les plus importants \!** 

**Dockerfile** : 

Script qui décrit les étapes de construction d'une image Docker. 

**Image** : 

Snapshot (ou instantané de stockage, permet de réaliser une copie de données stockées sur un système de stockage, ou une copie des modifications apportées à ces données) immuable et exécutable d'une application et de son environnement. (**template for running containers**) 

**Container** : 

Instance en cours d'exécution d'une image Docker, isolée et portable. (running process)  
**Visuellement : Dockerfile, Image, Container** 

**![][image2]**  
**![][image3]**Mais j'ai pas compris, c'est quoi une image ? 

C'est comme un modèle ou un "plan" qui contient tout ce qu'il faut pour faire fonctionner une application : le code, les bibliothèques, les dépendances et les configurations nécessaires **Une image est en lecture seule et ne change pas** : elle sert simplement de base. À partir de cette image, Docker peut créer un conteneur (une instance en cours d'exécution de l'image), c'est-à-dire un environnement isolé où l'application tourne vraiment  
Cela permet de garantir que l'application marchera toujours pareil, peu importe où on la lance On crée souvent une image à partir d'un fichier spécial appelé Dockerfile, qui décrit étape par étape comment construire l'image 

**Les six notions à connaître par cœur** 

Le trio Dockerfile / Image / Container est le cœur du réacteur, mais trois autres notions complètent le programme du jour. On les pose maintenant en une ligne chacune, deux d'entre elles reviendront en profondeur un peu plus tard dans la journée. 

**Instant Notions : les 6 concepts de base de Docker** 

**Container** : une instance en cours d'exécution d'une image, isolée par namespaces et cgroups, comme on vient de le voir. 

**Image** : le template immuable en lecture seule à partir duquel on crée des containers. 

**Registry** : le serveur qui stocke et distribue des images (Docker Hub en est l'exemple public par défaut). 

**Dockerfile** : le script texte qui décrit, étape par étape, comment construire une image. 

**Volume** : un mécanisme de stockage géré par Docker, en dehors du système de fichiers en couches du conteneur, qui permet aux données de survivre à la suppression du conteneur. On y reviendra en détail plus loin dans le programme. 

**Network** : le mécanisme qui permet à des conteneurs de communiquer entre eux et avec l'extérieur, en s'appuyant sur les namespaces réseau vus juste avant. On l'approfondit aussi plus tard dans la journée. 

**On prend les commandes en main** 

Assez de théorie, place au terminal. L'objectif : tourner autour du cycle de vie d'un conteneur avec  hello-world , puis avec nginx , en comprenant bien ce que fait chaque commande, et surtout ce qui les distingue les unes des autres. 

**Vérification de la présence de Docker** 

\# Vérification que Docker et Docker Compose sont bien installés docker \--version 

docker compose version 

\# Test rapide : télécharge et lance une image minimaliste qui affiche un message de bienvenue 

docker run hello-world

**Côté Docker Desktop** 

L'application est relativement explicite : sur notre gauche on constate les onglets pour voir les Conteneurs, les Images, les Volumes (qu'on approfondit plus tard aujourd'hui), etc. 

**docker pull : télécharger sans lancer** 

*Qu'est-ce qui se passe si on veut juste récupérer une image, sans démarrer de conteneur tout de suite ?* C'est exactement ce que fait docker pull : il va chercher l'image sur le registry (Docker Hub par défaut) et la stocke localement, sans rien exécuter.   
docker pull nginx 

**Devrait afficher** : une série de lignes Pulling fs layer / Download complete / Pull complete pour chaque couche de l'image, puis un résumé Status: Downloaded newer image for nginx:latest . 

Pour obtenir la liste des images qu'on a en local, faire la commande docker images . On voit une liste d'images, dont celle qu'on vient tout juste de télécharger : 

REPOSITORY TAG IMAGE ID CREATED SIZE 

nginx latest 9b45b64f2f6e 3 weeks ago 192MB 

hello-world latest 1b44b5a3e06a 14 months ago 10.1kB 

Maintenant il suffit de copier le code présent en colonne "IMAGE ID" si on veut cibler précisément cette image dans une commande. 

**Instant ménage** 

Parmi les lignes listées, on voit un détail qui pourra vous servir dans le futur : la colonne Size. Il se peut qu'un jour la mémoire de votre ordi soit trop rempli / pollué. Le détail se trouve plus loin dans le cours. 

**docker create puis docker start , versus docker run** 

Deux façons d'obtenir un conteneur en cours d'exécution existent, et il faut sentir la différence.  docker create fabrique un conteneur à partir d'une image, mais ne le démarre pas : c'est comme préparer une voiture dans le garage, moteur éteint. docker start démarre ensuite un conteneur déjà créé (ou déjà arrêté). 

\# On crée le conteneur, sans le démarrer : on lui donne un nom pour le retrouver facilement 

docker create \--name mon-nginx \-p 5000:80 nginx 

\# On le démarre séparément 

docker start mon-nginx 

**Devrait afficher** : pour docker create , un long identifiant hexadécimal (l'ID du conteneur créé). Pour docker start , le nom du conteneur, mon-nginx , en confirmation. 

docker run , qu'on utilisait plus tôt avec hello-world , fait les deux étapes d'un coup : il crée le conteneur ET le démarre immédiatement. C'est le raccourci qu'on utilise 95% du temps, mais savoir qu'il cache un create \+ start aide à comprendre des messages d'erreur du type "conteneur déjà créé" quand on relance deux fois la même commande avec le même \--name . 

**Observer ce qui tourne : docker ps** 

Pour obtenir les instances docker lancées, exécuter la commande docker ps : docker ps  
**Devrait afficher** : une ligne pour mon-nginx , avec sa colonne STATUS marquée Up X seconds . Le conteneur hello-world lancé tout à l'heure, lui, n'apparaît **pas** : il a déjà terminé son travail (afficher un message) et s'est arrêté. Pour voir aussi les conteneurs arrêtés, il faut ajouter \-a : 

docker ps \-a 

**Devrait afficher** : cette fois hello-world apparaît aussi, avec un STATUS du type Exited (0) 5 minutes ago . C'est un piège classique en début d'apprentissage : "j'ai lancé un conteneur mais  docker ps ne le montre pas" veut souvent juste dire qu'il s'est déjà arrêté, pas qu'il a disparu. 

**docker logs et docker exec** 

Pour voir ce qu'un conteneur a affiché depuis son démarrage, sans y entrer : docker logs mon-nginx 

**Devrait afficher** : les logs d'accès et d'erreur de nginx, généralement vides juste après le démarrage tant qu'aucune requête n'est arrivée. 

Pour exécuter une commande **à l'intérieur** d'un conteneur déjà en cours d'exécution, sans passer par nsenter à la main cette fois : 

docker exec \-it mon-nginx sh 

**Devrait afficher** : un prompt \# à l'intérieur du conteneur nginx. On peut taper ls /usr/share/nginx/html pour voir les fichiers servis par défaut, puis exit pour ressortir sans arrêter le conteneur. 

Et si l'on veut tout combiner en une seule commande, pour create \+ start \+ lancer le terminal dans notre container :  

docker run \-it \--name mon-nginx \-p 5000:80 nginx sh

**Exposer les bons ports** 

**Attends, je dois exposer 2 ports différents ?** 

Docker nous permet de lancer un environnement virtuel, isolé au sein de notre ordi. Pour qu'il soit accessible au port local de notre ordi, on va exposer ce fameux environnement virtuel sur un port pour docker   
![][image4]**Donc la bonne méthode, c'est de lancer :** 

docker run \-p 5000:80 nginx 

5000 : c'est le port sur notre machine 

80 : c'est le port à l'intérieur du conteneur (nginx écoute sur le port 80 par défaut) 

le nom juste après : celui de l'image, trouvée grâce à la commande docker images lancée dans le terminal 

maintenant ouvrir localhost:5000 sur navigateur, et cela devrait fonctionner \! **Comment désactiver les ports ?** 

Vous l'aurez peut-être constaté, si on ferme la page, le projet continue de tourner. Il faut donc : 

soit aller dans Docker Desktop pour désactiver les ports 

soit stopper le processus depuis le terminal 

\# Lister l'activité Docker 

docker ps 

\# Stopper 

docker stop NOM\_DU\_CONTENEUR

**docker stop versus docker rm** 

*Une fois qu'on a stoppé le conteneur avec docker stop , est-ce qu'il a disparu ?* Non : docker stop arrête proprement le processus principal du conteneur (il envoie un signal SIGTERM , laisse quelques secondes, puis SIGKILL si besoin), mais le conteneur existe toujours, à l'état "exited", avec tout son système de fichiers en couche d'écriture intact. On peut d'ailleurs le relancer avec  docker start sans rien perdre.   
**SIGTERM et SIGKILL ?** Deux signaux que Linux envoie à un processus pour lui demander de s'arrêter. SIGTERM est poli : il prévient le programme, qui peut fermer ses connexions et finir ce qu'il fait avant de rendre la main. SIGKILL est brutal : le noyau tue le processus sur place, sans lui laisser la moindre chance de se préparer. D'où l'ordre choisi par Docker : on demande gentiment, puis on force. 

Pour supprimer réellement le conteneur (son état, son système de fichiers en couche d'écriture, ses métadonnées), il faut docker rm : 

docker stop mon-nginx 

docker rm mon-nginx 

**Devrait afficher** : le nom du conteneur en confirmation à chaque commande. Après le rm ,  docker ps \-a ne montre plus mon-nginx du tout. 

**docker rm versus docker rmi** 

Dernier piège classique de vocabulaire : docker rm supprime un **conteneur**. docker rmi (remove image) supprime une **image**. Confondre les deux donne des messages d'erreur qui semblent absurdes au début. 

\# Supprime l'image nginx en local (le template), pas un conteneur en particulier 

docker rmi nginx

**Devrait afficher** : une erreur du type image is being used by stopped container si un conteneur (même arrêté) référence encore cette image. C'est volontaire : Docker refuse de supprimer une image tant qu'un conteneur, même éteint, en dépend encore, pour éviter de casser un docker start ultérieur. Il faut d'abord supprimer le conteneur avec docker rm , puis l'image avec docker rmi . 

*Que se passe-t-il si on tente docker rmi sur une image utilisée par un conteneur qui tourne encore, cette fois activement ?* Le refus est encore plus strict : impossible de supprimer l'image tant que le conteneur n'est ni stoppé, ni supprimé. 

**Instant Cheat Sheet \!** 

**Le cycle de vie complet d'un conteneur** 

Un conteneur Docker traverse un nombre d'états limité, et connaître leurs noms exacts aide à lire  docker ps \-a sans deviner : 

**Instant Notions : les états d'un conteneur** 

**created** : le conteneur existe (après docker create ), mais n'a jamais tourné. **running** : le processus principal du conteneur est actif. 

**paused** : le conteneur est gelé ( docker pause ), tous ses processus sont suspendus par le noyau sans être arrêtés, comme une VM mise en veille. 

**exited** : le processus principal s'est arrêté, proprement ( docker stop ) ou de lui-même (fin de programme, crash).   
**dead** : un état plus rare, atteint quand Docker n'a pas réussi à arrêter proprement le conteneur, généralement après une erreur du daemon lui-même. 

**docker inspect : la fiche d'identité complète** 

Pour aller au-delà du résumé de docker ps , docker inspect sort toute la configuration d'un conteneur ou d'une image au format JSON : adresse IP interne, variables d'environnement, montages de volumes, politique de redémarrage, tout y est. 

docker inspect mon-nginx 

**Devrait afficher** : un objet JSON de plusieurs centaines de lignes. Pour ne récupérer qu'un champ précis sans tout lire à la main, on peut filtrer avec \--format : 

docker inspect \--format\='{{.State.Status}}' mon-nginx 

**Devrait afficher** : juste running (ou l'état courant), sans le reste du JSON. **Faire le ménage : docker system df et docker system prune** 

Après quelques jours de manipulation, le disque se remplit d'images, de conteneurs arrêtés et de couches inutilisées. docker system df donne un état des lieux : 

docker system df 

**Devrait afficher** un tableau avec, par catégorie (Images, Containers, Local Volumes, Build Cache), l'espace total utilisé et l'espace réellement récupérable. 

Exemple :  

![][image5]  
Pour nettoyer, docker system prune supprime tout ce qui n'est plus utilisé par aucun conteneur actif : conteneurs arrêtés, réseaux orphelins, images sans conteneur associé, cache de build. 

docker system prune

**Devrait afficher** une demande de confirmation ( y/N ), puis la liste de ce qui a été supprimé et l'espace récupéré. �� Ajouter \-a supprime en plus **toutes** les images non utilisées par un conteneur actif, pas seulement celles sans aucun conteneur du tout : à manier avec prudence sur une machine partagée. 

Pour contrôler ça de manière plus granulaire :  

Une bonne partie des Gb perdus sera due à des images, containers, volumes... non utilisés qui polluent votre disque dur. Voilà comment les nettoyer :    
docker builder prune \-af \# reclaims build cache (always safe) docker image prune \-f \# removes dangling (untagged) images only docker container prune \-f \# removes STOPPED containers only 

D'autres commandes, un peu plus dangereuses, à vérifier d'abord (ne pas supprimer quelque chose par accident) :  

docker system prune \-a \# ⚠️ removes ALL images not used by a running container 

\# → any stopped project's images will be 

wiped 

docker volume prune \-a \# ⚠️ removes unused volumes → DATA LOSS if a DB volume 

\# isn't currently attached to a running 

container 

**Ce qui casse quand on oublie \-d** 

Sans l'option \-d (detached, en arrière-plan), docker run attache le terminal au conteneur : le prompt reste bloqué tant que le conteneur tourne, et fermer le terminal (ou faire Ctrl+C ) envoie un signal d'arrêt au conteneur. Beaucoup de "mon conteneur s'est arrêté tout seul" viennent de là. Pour laisser tourner nginx en tâche de fond, on tape plutôt : 

docker run \-d \-p 5000:80 \--name mon-nginx nginx

**Les pièges de nommage et du tag latest** 

Deux derniers réflexes à prendre tout de suite. D'abord, donner un nom explicite à ses conteneurs avec \--name plutôt que de laisser Docker générer un nom aléatoire du type  hopeful\_turing : ça évite de chercher un ID à rallonge dans docker ps à chaque commande. 

Ensuite, se méfier du tag latest . Si on ne précise pas de tag après le nom d'une image ( nginx plutôt que nginx:1.27 ), Docker utilise latest par défaut. Le problème : latest n'a **aucune signification particulière**, c'est juste un tag comme un autre que les mainteneurs d'une image 

mettent généralement à jour vers leur dernière version stable, mais rien ne le garantit techniquement. Deux docker pull nginx à deux mois d'écart peuvent très bien récupérer deux versions différentes sans qu'on s'en rende compte, ce qui casse la reproductibilité qu'on cherche justement à obtenir avec Docker. Le bon réflexe en production : toujours épingler une version précise, nginx:1.27-alpine plutôt que nginx . 

**On construit notre première image** 

Jusqu'ici, tous les conteneurs qu'on a lancés venaient d'images écrites par quelqu'un d'autre :  hello-world , nginx . Il est temps de fabriquer la nôtre. Et cette toute petite application va servir de point de départ au projet de l'après-midi : autant la construire ensemble, une fois, pour que personne ne parte avec un trou dans les fondations.   
**On crée le projet Node.js** 

On part d'un dossier vide, avec son propre dépôt git et son package.json : 

mkdir projet-docker 

cd projet-docker 

git init 

npm init 

npm init pose une série de questions (nom, version, description...) : les valeurs par défaut conviennent très bien pour aujourd'hui, il suffit de valider avec Entrée à chaque ligne. On installe ensuite Express, le framework qui simplifie l'écriture de routes HTTP en Node.js : 

npm install express 

Le package.json généré doit contenir un script start , sinon rien de ce qui suit ne fonctionnera : c'est cette ligne que npm start ira chercher tout à l'heure, et c'est aussi elle que le conteneur exécutera plus tard. 

{ 

"name": "mon-app", 

"version": "1.0.0", 

"description": "Ma toute premiere app Node conteneurisee", 

"main": "src/index.js", 

"scripts": { 

"start": "node src/index.js" 

}, 

"dependencies": { 

"express": "^4.19.2" 

} 

} 

node\_modules ne doit jamais être versionné avec git : trop volumineux, et de toute façon reconstructible à tout moment avec npm install . On pose donc un .gitignore avant d'aller plus loin : 

node\_modules 

Reste à créer le fichier qui contient réellement l'application : 

mkdir src 

touch src/index.js

Et on y écrit ce code, une seule route qui répond en JSON :   
const app \= require("express")(); 

app.get("/", (req, res) \=\> res.json({ message: "Bonjouuuur :)" })); const port \= process.env.PORT || 3000; 

app.listen(port, () \=\> 

console.log(\`app listening on http://localhost:${port}\`) 

); 

**On vérifie que l'app tourne, sans Docker** 

Avant même de penser à Docker, on s'assure que l'app tourne toute seule, sur la machine, avec la commande que le package.json vient de définir : 

npm start 

**Devrait afficher** : 

\> mon-app@1.0.0 start 

\> node src/index.js 

app listening on http://localhost:3000 

En ouvrant http://localhost:3000 dans le navigateur, on doit voir la réponse JSON  {"message":"Bonjouuuur :)"} . Une fois la vérification faite, on arrête le serveur ( Ctrl+C ) : l'objectif maintenant, c'est de faire tourner exactement la même chose, mais depuis un conteneur. 

**Le Dockerfile minimal** 

À la racine du projet, dans un fichier nommé Dockerfile (sans extension), on écrit ceci : 

\# Image officielle qui embarque déjà Node.js et npm : 

https://hub.docker.com/\_/node 

FROM node:18 

\# Tout ce qui suit (COPY, RUN, CMD) s'exécute depuis ce dossier, à l'intérieur du conteneur 

WORKDIR /app 

\# On copie d'abord les fichiers qui décrivent les dépendances : RUN npm install en a besoin 

COPY package\*.json ./ 

\# Installation des dépendances, dans l'environnement Linux du conteneur, pas celui de la machine 

RUN npm install 

\# Le reste du code source arrive maintenant 

COPY . .  
\# On documente le port sur lequel l'app écoute à l'intérieur du conteneur EXPOSE 3000 

\# Démarre le conteneur avec la même commande qu'on vient de tester à la main CMD \["npm", "start"\] 

**Le .dockerignore** 

Un deuxième fichier à poser à côté du premier, .dockerignore : le même principe que le  .gitignore de tout à l'heure, mais cette fois pour ce que docker build envoie à Docker (le contexte de build). Sans lui, node\_modules partirait aussi dans l'image, alors que la ligne RUN npm install du Dockerfile va de toute façon le reconstruire de zéro à l'intérieur du conteneur. 

node\_modules 

**On construit l'image et on lance le conteneur** 

Place à la construction de l'image, avec docker build et un nom explicite pour la retrouver facilement : 

docker build \-t mon-app . 

**Devrait afficher** : une série d'étapes numérotées, une par instruction du Dockerfile ( FROM ,  WORKDIR , COPY ...), puis une ligne finale du type Successfully tagged mon-app:latest . 

Reste à lancer un conteneur à partir de cette image fraîchement construite, avec le mapping de port qu'on connaît déjà : 

docker run \-p 3000:3000 mon-app 

**Devrait afficher** : sans \-d , le terminal reste attaché et affiche en direct app listening on http://localhost:3000 , exactement comme tout à l'heure en local, sauf que cette fois la commande tourne à l'intérieur du conteneur. Depuis un autre terminal, on peut vérifier : 

curl http://localhost:3000 

**Devrait afficher** : 

{"message":"Bonjouuuur :)"}

La même réponse est aussi visible en ouvrant http://localhost:3000 dans le navigateur. �� **Le piège numéro un : des ports qui ne se parlent pas** 

*Le conteneur tourne, docker ps l'affiche même en Up , mais le navigateur n'affiche jamais rien et  curl reste bloqué ou renvoie une erreur de connexion. D'où ça vient ?* 

Trois nombres doivent désigner le même port, et un seul suffit à tout casser s'il diverge : 

le port sur lequel l'app écoute réellement dans src/index.js ( process.env.PORT || 3000 )   
le port documenté par EXPOSE dans le Dockerfile 

le port de droite dans \-p 3000:3000 , celui à l'intérieur du conteneur 

Beaucoup de squelettes Node.js trouvés en ligne écoutent par défaut sur 8080 plutôt que 3000 . Si on copie ce genre de code sans y toucher, mais qu'on garde EXPOSE 3000 et \-p 3000:3000 , le mapping pointe vers un port sur lequel, à l'intérieur du conteneur, rien n'écoute vraiment : le tout 

tourne, sans jamais planter, et pourtant rien ne répond jamais côté navigateur. EXPOSE ne fait d'ailleurs que documenter cette intention, il n'ouvre rien tout seul : le vrai mapping se joue entièrement au \-p . La seule solution, c'est de vérifier que ces trois nombres racontent la même histoire. 

Voilà, une image construite à la main, un conteneur qui tourne, une réponse JSON dans le navigateur : ce socle est prêt à être malmené, agrandi et corrigé cet après-midi. 

**Mise en pratique \- Après-midi : le projet fil rouge Todo API** 

Le matin, on a suivi : DevOps, containers Linux, installation, architecture Docker, et une petite app Node.js "hello" qu'on a fait tourner ensemble, en live, dans un premier Dockerfile. Cet après-midi, le rythme change complètement : c'est fini de suivre, il est temps de construire. Chaque chapitre qui vient apporte une notion nouvelle, network, volume, Compose, registry... et le travail, c'est de la transposer soi-même sur son propre projet, pas de recopier un exemple. Let's go, on fait grandir cette app "hello" jusqu'à en faire une vraie stack \! 

**Le projet** 

On part de l'app Node.js "hello" du matin, dockerisée à la truelle avec un Dockerfile minimal. En fin de journée, cette app est devenue une API de gestion de tâches, avec : 

une API de tâches (CRUD complet) branchée sur une base PostgreSQL dont les données survivent à un redémarrage, 

**PostgreSQL ?** Un système de gestion de base de données relationnelle open source, l'un des plus utilisés en production. 

toute la configuration de l'application pilotée par des variables d'environnement, pas une ligne en dur dans le code, 

un réseau isolé, où la base de données n'est plus joignable depuis la machine hôte, 

un second service, écrit en Python, le langage généraliste très utilisé côté data et outillage, branché sur la même base, 

les images de l'application publiées sur un registry puis redéployées sans une seule ligne de code source en local. 

**Registry ?** Un serveur qui stocke des images Docker et les rend téléchargeables, l'équivalent d'un GitHub mais pour des images plutôt que du code. 

En sortie de journée, on doit pouvoir remplir un tableau de métriques observables : la taille de chaque image, le temps de build à froid et à chaud, le temps jusqu'à la première réponse HTTP, et le nombre de couches de chaque Dockerfile.  
**Ce que vous allez rendre** 

Le projet démarré cet après-midi, c'est un repository Git **public**, qui contient à terme : un README complet, qui explique comment lancer le projet et ce qu'il fait,   
le code source de l'API Node.js : un CRUD qui manipule des Task , chacune avec au minimum un id , un status et une description , 

une dockerisation complète du projet, avec les bonnes pratiques vues chapitre après chapitre. 

Nouveauté par rapport à ce qu'on connaît déjà : le README contient une section **Journal de bord**, avec une entrée par chapitre. Chaque entrée note ce qui a été mesuré et ce qui a cassé, et pourquoi. C'est là, par écrit, que se répondent les questions posées dans chaque chapitre. Cette section est notée au même titre que le code. 

Voilà à quoi ressemble une entrée bien remplie, pour fixer le format : 

**Le socle** : CRUD testé avec les 3 cas demandés, tous passent. Premier accroc : un POST avec une description de 50 000 caractères faisait planter le process, avant l'ajout d'une limite de taille explicite dans la validation. 

Je le rappelle : le dépôt est **noté sur ses commits autant que sur son résultat**. Des commits fréquents et atomiques, un commit égale un changement logique, jamais de git add . en aveugle mais un ajout fichier par fichier, une branche dès que plusieurs sujets avancent en parallèle. 

**Le socle : la Todo API** 

**Avant de coder :** le dépôt se note sur ses commits autant que sur son résultat final. Un commit dès que les routes répondent, un autre quand la validation des entrées est en place : deux changements logiques, deux commits, chacun avec ses fichiers ajoutés explicitement. 

Il est temps de transformer l'app "hello" du matin en un vrai CRUD de tâches. On commence volontairement sans aucune base de données : un tableau en mémoire suffit pour valider les routes avant de brancher quoi que ce soit de persistant. On construit avec Express, le framework HTTP minimaliste sur lequel tourne l'immense majorité des API Node.js en production. 

**Express ?** Une couche fine au-dessus de Node.js qui gère le routage HTTP (quelle fonction répond à quelle URL) et les middlewares, des fonctions qui interceptent chaque requête, par exemple pour la validation ou la gestion d'erreurs. 

**Structure du projet visée** 

todo-api/ 

├── src/ 

│ ├── routes/ 

│ │ └── tasks.js 

│ ├── models/ 

│ │ └── task.js 

│ ├── middleware/ 

│ │ └── errorHandler.js 

│ └── app.js 

├── tests/ \# on s'en servira plus tard dans la semaine │ ├── unit/  
│ │ └── task.test.js 

│ └── integration/ 

│ └── api.test.js 

├── Dockerfile 

├── .dockerignore 

├── .gitignore 

├── package.json 

└── README.md 

**Les 5 routes REST, sous /api/tasks** 

**CRUD et REST ?** CRUD, c'est l'acronyme des quatre opérations de base sur une donnée : Create, Read, Update, Delete. REST (Representational State Transfer) est le style d'architecture qui les expose en HTTP, où chaque URL désigne une ressource et où c'est le verbe HTTP ( POST , GET , PUT , DELETE ) qui dit ce qu'on veut en faire. 

POST /api/tasks : créer une tâche 

GET /api/tasks : lister toutes les tâches 

GET /api/tasks/:id : voir une tâche 

PUT /api/tasks/:id : modifier une tâche 

DELETE /api/tasks/:id : supprimer une tâche 

**Le modèle de données d'une Task** 

**UUID ?** Universally Unique Identifier. Un identifiant généré aléatoirement, assez long pour qu'on puisse en créer des milliards sans jamais tomber deux fois sur le même. Pratique ici : chaque tâche reçoit son id sans avoir besoin d'un compteur central qui saurait où on en est. 

{ 

id: "uuid", 

description: "string", 

status: "string", 

createdAt: "timestamp", 

updatedAt: "timestamp" 

} 

**src/app.js , le câblage de l'application** 

Voilà le fichier qui assemble tout : les middlewares de sécurité et de parsing JSON, une route  /health pour vérifier que le serveur répond, le montage des routes de tâches, et un gestionnaire d'erreurs central. 

Deux de ces middlewares méritent un mot, puisqu'ils arrivent sans prévenir dans les imports.  helmet positionne une série d'en-têtes HTTP de sécurité que les navigateurs savent lire, et cors autorise (ou refuse) les appels venant d'un autre domaine que celui qui sert l'API. 

**CORS ?** Cross-Origin Resource Sharing. La règle du navigateur qui empêche, par défaut, une page servie par un domaine d'appeler une API hébergée sur un autre domaine. Le middleware sert à ouvrir explicitement cette porte quand c'est voulu. 

const express \= require('express');  
const cors \= require('cors'); 

const helmet \= require('helmet'); 

const taskRoutes \= require('./routes/tasks'); 

const errorHandler \= require('./middleware/errorHandler'); 

const app \= express(); 

// Middleware 

app.use(helmet()); 

app.use(cors()); 

app.use(express.json()); 

// Health check 

app.get('/health', (req, res) \=\> { 

res.json({ status: 'ok', timestamp: new Date() }); 

}); 

// Routes 

app.use('/api/tasks', taskRoutes); 

// Error handling 

app.use(errorHandler); 

module.exports \= app;

Reste à écrire trois fichiers, et c'est le travail de cette phase : 

src/routes/tasks.js : les 5 routes ci-dessus, qui appellent le modèle et renvoient du JSON. 

src/models/task.js : le stockage en mémoire des tâches, un simple tableau suffit pour l'instant. 

src/middleware/errorHandler.js : un middleware qui transforme toute erreur en réponse JSON propre, jamais un stacktrace brut envoyé au client. 

**Trois cas à valider avant d'enchaîner sur la suite** 

Une création suivie d'un GET /api/tasks renvoie bien la tâche créée, avec un id généré. 

Un GET /api/tasks/:id sur un identifiant inexistant renvoie un 404 propre, jamais un crash du process. 

Un POST avec un corps JSON malformé, ou une description de plusieurs dizaines de milliers de caractères, est refusé avec un 400 clair, sans jamais faire tomber le serveur. 

**La grille de notation** 

10% : API CRUD fonctionnelle et robuste aux entrées invalides 

15% : Dockerfile de production (image épinglée, multi-stage, utilisateur non-root,  .dockerignore ) 

10% : persistance PostgreSQL via volume nommé, données qui survivent à un redémarrage 10% : isolation réseau (network custom, base non exposée sur l'hôte) 

10% : configuration entièrement externalisée ( .env non commité, .env.example présent, rien en dur)   
10% : stack complète pilotée par docker-compose, démarrable en une commande 10% : service Python de statistiques branché sur la stack et robuste 

15% : images publiées sur un registry et stack redéployable sans code source local 5% : tableau de métriques rempli, optimisations mesurées et justifiées 

5% : rigueur du dépôt (commits atomiques et fréquents, README et journal de bord à jour) 

**5 \- Écrire un Dockerfile de production** 

Ce matin, on a écrit un Dockerfile en quelques minutes : une image de base, un WORKDIR , une copie des fichiers, un npm install , un CMD . Il a suffi à faire tourner l'app hello, puis la Todo API qu'on vient de transformer en CRUD complet. C'est un bon brouillon, pas un Dockerfile de production. À partir d'ici, l'après-midi passe en autonomie totale : chacun avance sur son propre projet, à son rythme. On va comprendre ce qui distingue un Dockerfile qui "marche sur ma machine" d'un Dockerfile qu'on peut réellement déployer, et pourquoi l'ordre des lignes à l'intérieur n'a rien d'anodin. Et on le fait maintenant, avant de brancher plusieurs conteneurs entre eux et d'orchestrer toute la stack : une image mal construite propage ses défauts partout où elle est réutilisée, autant la solidifier à la source. 

**L'essentiel du Dockerfile de production** 

Le Dockerfile est un script texte qui contient une série d'instructions permettant de construire une image Docker. Il spécifie l'environnement de travail, les dépendances, les étapes nécessaires à la configuration d'une application à l'intérieur d'un conteneur Docker : sélection d'une image de base, définition du répertoire de travail, copie des fichiers du projet, installation des dépendances, etc. 

**Les instructions qui comptent** 

FROM : l'image de base sur laquelle on construit. Toujours la première instruction (sauf ARG avant, cas particulier qu'on verra plus loin). 

WORKDIR : le répertoire de travail à l'intérieur du conteneur. Toutes les commandes suivantes ( COPY , RUN , CMD ) s'exécutent depuis là. 

COPY : copie des fichiers depuis notre machine (le build context) vers l'image. 

ADD : fait la même chose que COPY , mais avec des super-pouvoirs en plus (extraction automatique d'archives .tar , récupération d'une URL distante). Le souci, c'est que ces super-pouvoirs sont rarement ce qu'on veut, et ils rendent le comportement moins prévisible. La bonne pratique, c'est COPY par défaut, et ADD seulement quand on a explicitement besoin d'extraire une archive locale. 

RUN : exécute une commande pendant le build (installer des paquets, compiler, etc.). Chaque RUN crée une nouvelle couche. 

ENV : définit une variable d'environnement, disponible au build et au runtime. 

ARG : définit une variable disponible seulement pendant le build (pas dans le conteneur final). Pratique pour paramétrer un build sans polluer le runtime.  
EXPOSE : documente le port sur lequel l'application écoute. Attention, ça ne publie rien tout seul : c'est de la documentation pour qui lit le Dockerfile, le vrai mapping de port se fait au  docker run \-p . 

USER : change l'utilisateur qui exécute les instructions suivantes et le processus final. Par défaut, sans USER , tout tourne en root à l'intérieur du conteneur. On y revient juste après. 

CMD vs ENTRYPOINT : les deux définissent ce qui se lance au démarrage du conteneur. CMD donne une commande par défaut, qu'on peut écraser facilement au docker run ( docker run mon-image autre-commande ). ENTRYPOINT fixe la commande de façon plus rigide : ce qu'on passe au docker run s'ajoute en argument plutôt que de remplacer. En pratique, la combinaison la plus courante est ENTRYPOINT pour fixer le binaire, CMD pour donner les arguments par défaut. Pour nos Dockerfiles du jour, un CMD seul suffit. 

HEALTHCHECK : permet à Docker de vérifier périodiquement que le conteneur est vraiment en bonne santé (pas juste "démarré", mais "répond correctement"). On creusera ça plus tard avec le monitoring, mais on peut déjà en glisser un dans nos Dockerfiles. 

**Build context ?** L'ensemble des fichiers du dossier (et sous-dossiers) envoyés au démon Docker au moment du docker build . C'est pour ça qu'on ne doit jamais lancer docker build depuis un dossier contenant des gigas de fichiers inutiles : tout part dans le context, même ce qu'on ne COPY pas explicitement. 

**Les layers et le cache de build** 

Chaque instruction d'un Dockerfile ( RUN , COPY , ADD ...) crée une couche (*layer*) dans l'image. Docker garde ces couches en cache : si une instruction et son contexte n'ont pas changé depuis le dernier build, Docker réutilise la couche telle quelle au lieu de la refaire. Et dès qu'**une** couche change, **toutes les couches suivantes** doivent être reconstruites, même si elles, individuellement, n'ont pas changé. 

C'est là que l'ordre des instructions devient une vraie question de perf. Prenons un Dockerfile Node.js écrit "dans le désordre" : 

**Avant (mauvais ordre) :** 

FROM node:22-alpine 

WORKDIR /app 

COPY . . 

RUN npm ci 

CMD \["node", "src/server.js"\]

Ici, COPY . . copie tout le projet, code source inclus. Résultat : à chaque fois qu'on modifie une seule ligne de code (même un console.log pour debug), la couche COPY . . change, donc le cache est invalidé, donc RUN npm ci doit se refaire en entier. Sur un projet avec des dizaines de dépendances, ça veut dire retélécharger et réinstaller tout node\_modules à chaque modification de code. Sur une CI, ça peut transformer un rebuild de 5 secondes en rebuild de 2 minutes. 

**Après (bon ordre) :**   
FROM node:22-alpine 

WORKDIR /app 

COPY package\*.json ./ 

RUN npm ci 

COPY . . 

CMD \["node", "src/server.js"\] 

Là, on copie d'abord uniquement package.json et package-lock.json ( package\*.json matche les deux). Tant qu'on ne touche pas aux dépendances, cette couche ne change pas, donc  RUN npm ci reste en cache. Ce n'est qu'ensuite qu'on copie le reste du code avec COPY . . . Résultat concret : un rebuild après une modification de code source réutilise le cache jusqu'à RUN npm ci inclus, et ne refait que la copie du code (quasi instantané) plutôt que la réinstallation complète des dépendances. 

�� La règle générale : **on met le moins changeant en premier**. Les dépendances changent rarement (on ajoute un package une fois de temps en temps), le code source change à chaque commit. Donc dépendances avant, code après. 

**.dockerignore : ce qu'on oublie souvent** 

On l'a vu, docker build envoie tout le build context au démon Docker, et un COPY . . copie tout ce contexte dans l'image. Sans filtre, ça inclut potentiellement node\_modules/ , .git/ , des fichiers .env avec des secrets, des logs... 

Un fichier .dockerignore à la racine du projet fonctionne comme un .gitignore : chaque ligne exclut un fichier ou dossier du build context. 

node\_modules 

.git 

.env 

\*.log 

npm-debug.log\* 

.DS\_Store 

dist 

coverage

*Qu'est-ce qui se passe concrètement si on oublie node\_modules dans le .dockerignore ?* Deux problèmes en cascade. D'abord, le build context grossit énormément (des dizaines voire centaines de Mo), donc chaque docker build commence par un envoi de contexte plus lent. Ensuite, et c'est pire : le COPY . . écrase le node\_modules fraîchement installé par RUN npm ci avec celui de la machine hôte, potentiellement compilé pour un autre OS ou une autre architecture (typiquement : des modules natifs compilés sur un Mac qui ne fonctionnent pas dans le conteneur Linux). Résultat : l'appli plante au démarrage avec une erreur de binding natif, souvent difficile à diagnostiquer si on ne pense pas tout de suite au .dockerignore . 

**Les Images, plus en détail** 

Définition : l'image est un package léger et autonome qui contient tout le nécessaire pour exécuter une application, y compris : 

le code, 

les bibliothèques,   
les dépendances, 

les variables d'environnement, 

les fichiers de configuration 

Les images sont construites à partir d'un ensemble d'instructions définies dans un Dockerfile. Elles sont immuables, ce qui signifie qu'une fois créées, elles ne sont pas modifiées. Les conteneurs Docker sont ensuite créés à partir de ces images et représentent l'instance en cours d'exécution de l'application. 

Pour créer une image : 

docker build \-t NomDeMonImage source/de/fichiers 

\# Exemple: 

docker build \-t NomDeMonImage . 

\# Bonnes pratiques: 

docker build \-t mon\_pseudo/nom-de-mon-projet:1.0 .

Erreur courante : l'oubli du . à la fin de la commande 

l'usage de \-t permet de donner un nametag à l'image 

un bon réflexe de donner mon pseudo suivi du nom de l'app 

on remarque qu'il suit les étapes de mon Dockerfile 

**Devrait afficher** : une ligne par instruction du Dockerfile, préfixée d'un numéro d'étape du type  \[2/6\] WORKDIR /app , puis un naming to docker.io/library/... en fin de build. En relançant immédiatement la même commande, les étapes inchangées affichent CACHED : c'est le cache de couches qu'on vient de voir en action. 

**Ce qui fait qu'un Dockerfile est prêt pour la prod** 

Le Dockerfile de ce matin fait le strict minimum : il construit une image qui démarre. Un Dockerfile de prod ajoute une poignée d'instructions qui, une par une, ferment une faille ou évitent un piège classique. Le tableau résume chacune, avec ce qu'elle garantit et ce qui casse si on l'oublie. 

| Instruction  | Ce qu'elle garantit  | Ce qui casse sans elle |
| :---- | :---- | :---- |
| Image de base épinglée ( node:22.14.0-  alpine , jamais  node:latest ) | Le même Dockerfile produit la même image demain  comme aujourd'hui | Un build qui marchait hier peut casser sans qu'on ait touché une ligne de code |
| COPY package\*.json ./ avant COPY . . | Le cache de la couche  d'installation survit à un  changement du seul code applicatif | Chaque commit sur le code force une réinstallation  complète des dépendances |

| Instruction  | Ce qu'elle garantit  | Ce qui casse sans elle |
| ----- | :---- | ----- |
| npm ci \--omit=dev  plutôt que npm  install | Installation strictement  reproductible depuis le lock file, sans les dépendances de dev en trop | Des versions qui dérivent d'une install à l'autre, une image  gonflée d'outils inutiles en prod |
| USER (un utilisateur  non privilégié) | Le process final tourne avec des droits limités | Sans USER , tout tourne en  root : une faille applicative devient un accès root dans le conteneur |
| EXPOSE \<port\> | Documente le port d'écoute pour quiconque lit le  Dockerfile | Rien ne casse techniquement, mais l'information se perd, et un outil d'inspection d'image ne la retrouve nulle part |
| HEALTHCHECK | Docker (et l'orchestrateur, plus tard) distingue un  conteneur "démarré" d'un conteneur qui répond  vraiment | Un conteneur planté en boucle mais toujours affiché "Up",  personne n'est alerté |
| CMD en forme exec  ( \["node", "app.js"\] ) | Le process applicatif  devient le PID 1 et reçoit  correctement SIGTERM  pour un arrêt propre | En forme shell, un shell  intermédiaire prend le PID 1 et ne relaie pas toujours le signal : l'arrêt traîne ou coupe le  process brutalement |

Trois de ces instructions se lisent mieux avec un petit fragment sous les yeux : 

\# Utilisateur non privilégié : le process final n'a plus les droits root USER node 

\# Forme exec (tableau JSON) : le process devient PID 1, il reçoit SIGTERM correctement 

CMD \["node", "app.js"\] 

\# Sonde toutes les 30s que l'app répond vraiment, pas juste qu'elle a démarré HEALTHCHECK \--interval=30s \--timeout=3s \\ 

CMD node \-e "require('http').get('http://localhost:4000/health', r \=\> process.exit(r.statusCode \=== 200 ? 0 : 1))"

**Pourquoi node:22-alpine et pas node:22 tout court ?** Alpine est une distribution Linux ultra-légère (quelques Mo contre plusieurs centaines pour une Debian classique). Moins de composants installés, c'est aussi moins de surface d'attaque niveau sécurité.   
*Pourquoi épingler node:22-alpine plutôt que node:latest ou même node:alpine sans version ?* Parce que latest change dans le temps : le build qui marchait hier peut casser demain sans qu'on ait touché une ligne de code, simplement parce que l'image de base a changé sous nos pieds. Épingler une version précise ( 22-alpine , voire 22.14.0-alpine pour être encore plus strict), c'est garantir que le même Dockerfile produit la même image, aujourd'hui comme dans six mois. 

**Le multi-stage build, le principe** 

Un Dockerfile en une seule étape garde dans l'image finale des choses dont on n'a plus besoin au runtime : les outils de build éventuels, le cache du gestionnaire de paquets, parfois des fichiers de config qui ne servent qu'à la compilation. Le multi-stage build résout ça : on utilise plusieurs FROM dans le même Dockerfile, chacun démarrant une étape (*stage*) indépendante, et on ne copie dans 

l'image finale que ce dont on a réellement besoin, via COPY \--from=\<nom\_du\_stage\> . Le mécanisme, réduit à l'essentiel : 

FROM node:22.14.0-alpine AS builder 

\# ... installation complète et étape de build ... 

FROM node:22.14.0-alpine 

\# On ne récupère que le résultat, rien des outils qui ont servi à le produire COPY \--from=builder /app/dist ./dist 

Le premier stage installe tout, y compris les dépendances de dev, et fait le travail de build. Le second repart d'une image fraîche et ne rapatrie que le strict nécessaire : aucun outil de compilation, aucun cache de téléchargement, aucune trace du premier stage. 

*Le gain, c'est vraiment mesurable ou c'est juste une histoire de propreté ?* Vérifions avec docker images après avoir buildé une version simple et une version multi-stage du même projet : 

docker build \-t mon-image:simple \-f Dockerfile.simple . 

docker build \-t mon-image:multistage \-f Dockerfile.multistage . docker images | grep mon-image 

Devrait afficher quelque chose comme : 

REPOSITORY TAG IMAGE ID SIZE 

mon-image simple a1b2c3d4e5f6 187MB 

mon-image multistage f6e5d4c3b2a1 142MB

Sur un projet Node.js simple sans étape de build, l'écart reste modeste (on élimine surtout le cache npm et les fichiers temporaires). Mais dès qu'il y a une vraie étape de compilation (TypeScript, Webpack, un framework front à builder), l'écart explose : le stage builder peut peser 500 Mo à 1 Go avec tous les outils de compilation, alors que le stage final ne garde que le résultat compilé et les dépendances de prod, souvent 5 à 10 fois plus petit.   
**Checklist "Dockerfile de prod"** 

Avant de considérer un Dockerfile comme prêt pour la production : 

image de base épinglée sur une version précise, jamais latest 

utilisateur non-root ( USER ) 

aucun secret copié dans une couche, même supprimé après (une couche supprimée reste dans l'historique de l'image, voir docker history plus loin) 

.dockerignore présent et à jour ( node\_modules , .git , .env , fichiers de logs...) multi-stage build dès qu'il y a une étape de compilation ou des outils de dev 

un seul processus par conteneur (pas de serveur web \+ base de données \+ cron dans le même Dockerfile : chaque service a le sien) 

CMD en forme exec ( \["node", "src/server.js"\] ), jamais en forme shell ( "node src/server.js" ), pour une gestion correcte des signaux d'arrêt 

**À votre tour** 

**Rappel notation :** chaque phase franchie mérite son propre commit. Si le Dockerfile part en plusieurs itérations (un premier jet, puis une optimisation), ce sont deux commits distincts, pas un seul fourre-tout. 

Le Dockerfile qu'on a écrit ce matin pour l'app hello, devenue Todo API, reste un brouillon de développement. Il est temps de le transformer en Dockerfile de production. Cinq choses doivent être vraies à la sortie, chacune vérifiable par une commande précise : 

L'image de base est épinglée sur une version précise. On vérifie en lisant la ligne FROM du Dockerfile : aucune trace de latest ni de tag flottant sans version. 

Le .dockerignore est complet. On liste la racine de l'image avec docker run \--rm mon image ls \-a , et rien de ce qui n'a rien à faire là ne doit apparaître : ni .git , ni .env , ni fichier de log. Le second signe qui ne trompe pas, c'est la ligne transferring context en début de build : elle doit se compter en dizaines de kilo-octets, pas en dizaines de méga octets. 

Le process final ne tourne pas en root. On vérifie avec docker run \--rm \-it mon-image sh \-c whoami , qui ne doit jamais répondre root . 

Le build est multi-stage, et l'image finale ne contient plus les dépendances de développement. On le vérifie sur une dépendance qui n'a rien à faire en production, par exemple docker run \--rm mon-image ls node\_modules | grep \-c jest , qui doit répondre 0 si un outil de test traîne dans le package.json . 

L'ordre des instructions protège le cache. On modifie uniquement un fichier de code applicatif, on relance le build, et la ligne d'installation des dépendances doit afficher CACHED dans la sortie. 

Deux mesures à relever avant et après ce travail : la taille de l'image ( docker images ), et le temps de build à froid ( time docker build \--no-cache \-t mon-image . ) comparé au temps de build à chaud, une fois le cache chaud ( time docker build \-t mon-image . ). Ces mesures rejoignent la section Journal de bord du README, aux côtés de celles des autres chapitres.  
**Le contrôle avant de passer à la suite** 

Trois scénarios à rejouer avant d'enchaîner : 

Nominal : l'image se build sans erreur, le conteneur démarre, et l'API répond correctement sur son endpoint habituel. C'est la preuve que le passage en Dockerfile de prod n'a rien cassé au passage. 

Limite, sur le cache de build : on modifie uniquement le code applicatif (jamais  package.json ), on relance le build, et l'étape d'installation des dépendances doit rester  CACHED . Si elle se relance, l'ordre des instructions est encore à revoir. 

Adverse : docker run \--rm \-it mon-image sh \-c whoami ne doit jamais afficher root . Si c'est le cas, n'importe quelle faille dans le code applicatif (une dépendance vulnérable, une injection) donne à un attaquant un accès root à l'intérieur du conteneur, avec accès à tout ce que ce conteneur peut voir ou monter : c'est la différence entre un incident contenu et une porte grande ouverte. 

**On pousse plus loin** 

**Distroless et scratch** : Alpine, c'est déjà petit, mais il reste un shell, un gestionnaire de paquets, quelques utilitaires système. Les images distroless de Google vont plus loin : elles ne contiennent que le runtime applicatif strictement nécessaire (par exemple le runtime Node.js) et rien d'autre, 

pas même un shell. Résultat : image encore plus petite, et surtout surface d'attaque réduite au minimum (pas de sh disponible pour un attaquant qui obtiendrait un accès). Encore plus radical,  scratch est une image littéralement vide, réservée aux binaires compilés statiquement (typiquement du Go) qui n'ont besoin d'aucune dépendance système. 

**docker build \--no-cache** : force un rebuild complet en ignorant tout le cache de couches. Utile pour vérifier qu'un build reste reproductible depuis zéro, ou pour forcer la récupération d'une version plus récente d'une dépendance système que le cache masquerait sinon. 

**BuildKit et le cache de dépendances** : le moteur de build par défaut de Docker aujourd'hui s'appelle BuildKit. Il apporte, entre autres, les cache mounts : un cache persistant entre builds, indépendant du cache de couches classique. Par exemple, pour ne jamais retélécharger les paquets npm ou pip d'un build à l'autre, même quand le lock file change : 

RUN \--mount=type=cache,target=/root/.npm \\ 

npm ci \--omit=dev 

**Les builds multi-architecture** : une image buildée sur un Mac Apple Silicon (architecture ARM64) ne tourne pas nécessairement sur un serveur x86\_64 classique, et inversement. docker buildx permet de builder une même image pour plusieurs architectures en une seule commande, et de publier une image "manifeste" qui pointe automatiquement vers la bonne variante selon la machine qui la télécharge : 

docker buildx build \--platform linux/amd64,linux/arm64 \-t mon-pseudo/mon image:1.0 \--push .

**Le scan de vulnérabilités** : docker scan , historique, est aujourd'hui remplacé par Docker Scout, intégré nativement à Docker Desktop et au CLI :   
docker scout cves mon-image:multistage 

Autre option très utilisée en CI, Trivy, un scanner open source qui couvre à la fois les vulnérabilités des paquets système, des dépendances applicatives, et les erreurs de configuration : 

trivy image mon-image:multistage 

**docker history pour lire les couches** : chaque couche d'une image reste inspectable, même si le fichier qu'elle contenait a été supprimé dans une couche suivante. C'est exactement pour ça qu'on ne doit jamais faire un COPY .env . suivi d'un RUN rm .env en pensant avoir nettoyé : le  .env reste lisible dans la couche COPY . 

docker history mon-image:multistage

Devrait afficher la liste des couches, leur taille individuelle, et la commande qui les a créées : de quoi repérer immédiatement une couche anormalement grosse, ou une commande qui n'aurait jamais dû laisser de trace dans l'image finale. 

**6 \- Networks et Volumes : faire communiquer, faire persister** 

On sait maintenant construire une image et lancer un conteneur. Mais un conteneur tout seul, c'est une île : il ne parle à personne, et tout ce qu'il écrit disparaît dès qu'on le supprime. Dans un vrai projet, on a toujours plusieurs conteneurs (une API, une base de données, un cache) qui doivent se parler, et des données (comptes utilisateurs, uploads, logs) qui doivent survivre bien plus longtemps que le conteneur qui les a créées. C'est exactement ce que résolvent les networks (la communication) et les volumes (la persistance). Deux briques qu'on retrouve dans absolument tous les projets Docker en production. 

**L'essentiel des networks** 

**C'est quoi un network Docker ?** 

Un network Docker est un réseau virtuel qui permet à des conteneurs de communiquer entre eux de manière isolée et sécurisée. C'est Docker qui gère toute la couche réseau à notre place, pour connecter des conteneurs (ou au contraire les isoler) sans toucher à la configuration réseau de la machine hôte. Sans network, des conteneurs sont comme des îles isolées qui ne peuvent pas se parler. 

Dès qu'on lance plusieurs conteneurs qui doivent collaborer (API, base de données, cache), ils doivent pouvoir échanger des données. Le network Docker crée un pont de communication entre eux. 

**Pourquoi utiliser des networks Docker ?** 

**Le problème, sans network personnalisé :**   
\# Un conteneur qui joue le rôle d'un service web, il répond vraiment sur le port 80 

docker run \-d \--name example-web nginx 

\# Un second conteneur, celui qui va essayer de joindre le premier docker run \-dit \--name example-client alpine sh 

Depuis le client, on tente de joindre le service web par son nom : 

docker exec example-client wget \-qO- http://example-web 

Devrait échouer avec wget: bad address 'example-web' . Les deux conteneurs tournent pourtant sur la même machine : ils atterrissent chacun sur le bridge par défaut, où aucun nom n'est résolu. Le premier ne sait tout simplement pas que le second existe. 

**La solution, avec un network :** 

\# On repart propre 

docker rm \-f example-web example-client 

\# On crée un network dédié 

docker network create example-network 

\# Et on relance les deux conteneurs dessus 

docker run \-d \--name example-web \--network example-network nginx docker run \-dit \--name example-client \--network example-network alpine sh 

Maintenant, le client peut viser le service web directement par son nom, plus besoin de connaître une IP qui change à chaque redémarrage : 

docker exec example-client wget \-qO- http://example-web 

Devrait afficher la page d'accueil HTML de nginx, celle qui commence par \<\!DOCTYPE html\> et contient Welcome to nginx\! . Le nom example-web a été résolu tout seul vers la bonne adresse IP : c'est le network custom qui fait ce travail. 

Un peu de ménage avant de continuer : 

docker rm \-f example-web example-client 

docker network rm example-network

**Les 4 types de networks Docker** 

**1\. Bridge (par défaut)** 

Le network le plus courant, celui qu'on utilise dans la grande majorité des projets Les conteneurs sur le même host peuvent communiquer entre eux 

Isolés du réseau externe (sauf si des ports sont exposés avec \-p ) 

Docker crée automatiquement un bridge network appelé "bridge" au démarrage du daemon   
Cas d'usage : isoler une stack applicative (API \+ base de données \+ cache) du reste de la machine, tout en laissant ses conteneurs se parler 

**2\. Host** 

Le conteneur partage directement le réseau de la machine hôte : aucune isolation réseau 

Performance maximale, pas de traduction de ports (NAT), le conteneur écoute directement sur les ports de l'hôte 

**NAT ?** Network Address Translation. Le mécanisme qui réécrit les adresses et les ports au passage d'une frontière réseau : c'est lui qui fait qu'un \-p 5000:80 redirige le port 5000 de la machine vers le port 80 du conteneur. En mode host, cette réécriture disparaît, d'où le gain de performance. 

Cas d'usage : outils de mesure de performance réseau, ou services qui ont besoin d'un accès réseau bas niveau (reste rare en usage courant) 

Attention aux conflits de ports : si le conteneur écoute sur le port 3000, aucun autre processus de l'hôte ne peut l'utiliser en même temps 

**3\. None** 

Aucun réseau du tout, le conteneur est complètement isolé 

Cas d'usage : des tâches de calcul pur qui ne doivent avoir aucun accès réseau (traitement de fichiers, script de migration ponctuel, sandbox de sécurité) 

**4\. Overlay** 

Pour Docker Swarm ou Kubernetes (orchestration multi-serveurs) 

Permet à des conteneurs qui tournent sur des machines physiques différentes de communiquer comme s'ils étaient sur le même réseau local 

On le retrouvera dès qu'on passera à un orchestrateur : hors périmètre pour cette introduction, mais bon à garder en tête, on y revient plus tard dans le programme 

**Bridge par défaut, network custom : la vraie différence** 

*Pourquoi prendre systématiquement le réflexe de créer un network custom, même pour deux malheureux conteneurs ?* 

Sur le bridge par défaut (celui que Docker crée tout seul, littéralement nommé "bridge"), les conteneurs se voient bien au niveau réseau, mais impossible de se joindre par leur nom : il faut connaître leur adresse IP interne, qui change à chaque redémarrage. Sur un bridge network personnalisé (celui qu'on crée soi-même avec docker network create ), Docker active en plus un petit serveur DNS interne : chaque conteneur devient joignable par son nom, exactement comme un nom de domaine sur internet. 

**DNS ?** Domain Name System. Le service qui traduit un nom lisible ("example-api-2") en adresse IP réelle. Docker en fait tourner une version miniature à l'intérieur de chaque network custom. 

C'est LA raison pour laquelle on crée toujours un network custom en pratique : sans lui, il faut bricoler avec des adresses IP qui bougent à chaque redémarrage. Avec lui, api peut simplement viser database sans jamais se soucier de l'IP réelle.  
**Comment ça marche concrètement** 

**DNS automatique.** Quand plusieurs conteneurs rejoignent le même network custom, Docker active ce petit DNS interne dont on vient de parler. C'est exactement ce qu'on vient de vérifier avec example-api et example-api-2 : aucun des deux n'a eu besoin de connaître l'adresse IP de l'autre, le nom a suffi. 

Ce mécanisme s'applique à n'importe quelle paire de conteneurs qui doivent collaborer : une API et une base de données, un frontend et un backend, un service de cache et l'application qui s'en sert. Tant qu'ils sont sur le même network custom, le nom du conteneur fait office d'adresse stable, qui ne bouge jamais, même après un redémarrage. 

**Isolation réseau** 

Des conteneurs sur des networks différents ne peuvent PAS communiquer entre eux, sauf configuration explicite. 

| Network  | Conteneurs présents  | Qui peut parler à qui |
| :---- | :---- | :---- |
| Network A  | api, db  | api parle à db |
| Network B  | front, worker  | front parle à worker |

Et api ne peut jamais joindre front ou worker : ils ne partagent aucun network en commun. **Commandes essentielles** 

Voilà la référence complète des commandes docker network : 

\# Lister les networks 

docker network ls 

\# Créer un network 

docker network create mon-network 

\# Inspecter un network (voir quels conteneurs sont dessus) 

docker network inspect mon-network 

\# Connecter un conteneur existant à un network 

docker network connect mon-network mon-conteneur 

\# Déconnecter un conteneur d'un network 

docker network disconnect mon-network mon-conteneur 

\# Supprimer un network (aucun conteneur ne doit l'utiliser) 

docker network rm mon-network 

\# Nettoyer tous les networks non utilisés 

docker network prune  
**Exercice guidé : deux conteneurs qui se parlent par leur nom** 

**Objectif :** créer deux conteneurs qui communiquent via un network personnalisé, puis constater ce qui se passe quand un troisième en est exclu. 

**Étape 1, créer le network :** 

docker network create app-network 

**Étape 2, lancer un conteneur "serveur" :** 

docker run \-dit \--name serveur \--network app-network alpine sh **Étape 3, lancer un conteneur "client" :** 

docker run \-dit \--name client \--network app-network alpine sh 

Alpine embarque déjà ping (fourni par BusyBox) : pas besoin d'installer quoi que ce soit pour l'étape suivante, ce qui évite les surprises d'un apk add qui échoue selon la version de l'image. 

**Étape 4, tester la communication :** 

docker exec client ping \-c 3 serveur 

Devrait afficher trois réponses, du style : 

PING serveur (172.X.X.X): 56 data bytes 

64 bytes from 172.X.X.X: seq=0 ttl=64 time=0.XXX ms 

**Étape 5, inspecter le network :** 

docker network inspect app-network 

Devrait afficher les deux conteneurs listés, chacun avec son adresse IP interne. **Étape 6, tester l'isolation :** 

\# On crée un second network 

docker network create other-network 

\# On lance un conteneur sur cet autre network 

docker run \-dit \--name isole \--network other-network alpine sh 

\# On tente de pinguer depuis le client 

docker exec client ping \-c 3 isole

Devrait échouer avec un message du type ping: bad address 'isole' : les conteneurs sur des networks différents ne se voient pas, exactement comme prévu par la théorie. 

**Nettoyage :**   
docker stop serveur client isole 

docker rm serveur client isole 

docker network rm app-network other-network

**L'essentiel des volumes** 

L'inconvénient des conteneurs Docker, c'est qu'ils sont tous isolés les uns des autres, et que si on les ferme, on perd toutes les données calculées dynamiquement à l'intérieur. 

**Comment rendre les données persistantes et partageables, indépendamment de la vie des conteneurs ?** C'est le rôle d'un volume Docker : un espace de stockage géré par Docker, qui vit en dehors du système de fichiers éphémère du conteneur. 

**À quoi sert un volume Docker ?** 

**Persistance des données.** Les conteneurs Docker sont éphémères : si on supprime ou recrée un conteneur, tout ce qui est stocké à l'intérieur (dans le système de fichiers du conteneur) est perdu. �� Un volume permet de stocker des données de façon persistante, indépendamment du cycle de vie du conteneur. Par exemple, si une application écrit des fichiers dans /stuff , ces fichiers restent disponibles même si on détruit et recrée le conteneur. 

**Partage de données.** Un volume peut être monté dans plusieurs conteneurs en même temps. Cela permet de partager des fichiers ou des données entre plusieurs services ou applications qui tournent dans des conteneurs différents. 

**Séparation des données et de l'application.** Le volume est stocké sur l'hôte Docker, dans un emplacement géré par Docker (généralement sous /var/lib/docker/volumes ). Cela sépare clairement les données de l'application, ce qui facilite la sauvegarde, la migration ou la gestion des données sans toucher à l'application elle-même. 

**Sécurité et portabilité.** Les volumes sont isolés du système de fichiers principal de l'hôte, ce qui réduit les risques de conflits ou de suppression accidentelle. Ils sont aussi plus portables que les montages de type "bind" (qui lient un dossier précis de l'hôte). 

**Voilà ce qu'il se passe, visuellement** 

**Trois façons de monter du stockage** 

Le volume nommé n'est pas la seule option. Docker propose trois types de montage : le volume nommé, le bind mount qui pointe vers un dossier précis de l'hôte, et le tmpfs mount qui vit uniquement en mémoire. 

| Type de  montage | Où sont stockées les données  | Cas d'usage typique |
| :---- | :---- | :---- |
| Volume  nommé  ( docker  volume  create ) | Géré par Docker, dans  /var/lib/docker/volumes | Persistance de données  d'application : base de données, uploads, logs qui doivent  survivre au conteneur |

| Type de  montage | Où sont stockées les données  | Cas d'usage typique |
| :---- | :---- | :---- |
| Bind mount  (dossier de  l'hôte) | N'importe où sur le système de fichiers de l'hôte, chemin choisi par nous | Développement en local : on édite le code sur son poste, le conteneur voit les changements immédiatement |
| tmpfs  (mémoire) | Uniquement en RAM, jamais écrit sur disque | Données sensibles et  temporaires (secrets en clair pendant un calcul), performance maximale, rien ne doit persister |

**\-v ou \--mount ? On tranche.** \-v (ou \--volume ) est la syntaxe historique, compacte mais ambiguë : docker run \-v shared-stuff:/stuff mon\_conteneur . Elle mélange dans la même écriture volume nommé et bind mount, et elle crée silencieusement un dossier manquant sur l'hôte si on se trompe de chemin. \--mount est la syntaxe moderne, plus verbeuse mais explicite :  docker run \--mount source=shared-stuff,target=/stuff mon\_conteneur . Elle nomme chaque paramètre ( source , target , type ) et refuse un chemin hôte inexistant plutôt que de le créer par erreur. Le réflexe à prendre : \--mount par défaut, c'est plus clair à lire et moins piégeux. \-v reste très courant en legacy, donc il faut savoir le lire. 

**Partager des données grâce aux volumes** 

Prenons un volume Docker nommé shared-stuff : 

docker volume create shared-stuff 

Une fois un conteneur lancé avec docker run , l'option \--mount lie le volume créé au conteneur : docker run \--mount source\=shared-stuff,target\=/stuff mon\_conteneur

**Que faire d'un volume ensuite ?** 

**Stocker des données d'application.** Le volume sert à y ranger tout ce qu'une application doit conserver : bases de données, fichiers de configuration, fichiers utilisateurs, logs, etc. 

**Sauvegarder ou restaurer.** On peut sauvegarder le contenu du volume (par exemple pour des backups réguliers) ou le restaurer sur un autre hôte ou environnement. 

**Partager entre plusieurs conteneurs.** Si plusieurs conteneurs ont besoin d'accéder aux mêmes données, le même volume se monte dans chacun d'eux. 

**Nettoyer ou supprimer.** Un volume devenu inutile se supprime avec docker volume rm shared-stuff (après avoir arrêté et supprimé les conteneurs qui l'utilisent). 

**Instant Cheat Sheet \! Manipuler le volume** 

Concrètement, voilà ce qu'on peut faire sur un volume, dans un terminal (référence complète :  docker volume ) : 

Voir le contenu d'un volume, depuis un shell dans le conteneur :   
docker exec \-it mon\_conteneur sh 

ls /stuff 

Copier un fichier depuis le volume vers la machine hôte : 

docker cp mon\_conteneur:/stuff/nom\_du\_fichier ./local\_destination/ Copier un fichier de la machine hôte vers le volume : 

docker cp ./mon\_fichier mon\_conteneur:/stuff 

Lister tous les volumes Docker : 

docker volume ls 

Inspecter un volume pour voir où il est stocké sur l'hôte : 

docker volume inspect shared-stuff 

Supprimer le volume, après avoir supprimé tous les conteneurs qui l'utilisent : 

docker rm mon\_conteneur 

docker volume rm shared-stuff 

Sauvegarder le contenu du volume : 

docker run \--rm \\ 

\-v shared-stuff:/stuff \\ 

\-v $(pwd):/backup \\ 

alpine \\ 

tar czf /backup/backup-stuff.tar.gz \-C /stuff . 

Restaurer une sauvegarde dans le volume : 

docker run \--rm \\ 

\-v shared-stuff:/stuff \\ 

\-v $(pwd):/backup \\ 

alpine \\ 

tar xzf /backup/backup-stuff.tar.gz \-C /stuff

**Exercice guidé : un volume qui survit à ses conteneurs** 

**Objectif :** créer un volume partagé, écrire dedans depuis un premier conteneur, le lire depuis un second, puis vérifier que les données restent lisibles après suppression complète des deux conteneurs. 

On commence par créer le volume, depuis le terminal de la machine :   
\# Si un volume du même nom traîne d'un essai précédent 

docker volume rm todo-logs 

\# Le volume partagé 

docker volume create todo-logs 

On lance ensuite un premier conteneur qui monte ce volume sur son dossier /data . La syntaxe courte \-v est utilisée ici parce que c'est celle qu'on croise partout, y compris dans les fichiers de configuration qu'on verra au chapitre suivant : 

docker run \-it \--name todo-writer \-v todo-logs:/data node:22-alpine sh 

Le prompt qui s'affiche est maintenant celui de l'intérieur du conteneur. On y écrit deux fichiers, puis on ressort : 

cd /data 

echo "mon premier log" \> first\_log.log 

echo "mon second log: $(date)" \> second\_log.log 

exit 

De retour sur la machine, on lance un second conteneur, totalement distinct du premier, qui monte le même volume : 

docker run \-it \--name todo-reader \-v todo-logs:/data node:22-alpine sh Et depuis l'intérieur de ce second conteneur : 

cd /data 

cat first\_log.log 

cat second\_log.log 

exit 

Devrait afficher le contenu des deux fichiers, prouvant que todo-reader voit ce que todo writer a écrit, sans que les deux conteneurs aient jamais communiqué directement. 

On supprime maintenant les deux conteneurs, purement et simplement : docker rm todo-writer todo-reader 

Et on recrée un tout nouveau conteneur, qui n'a jamais existé avant, en le pointant sur le même volume nommé : 

docker run \-it \--name todo-checker \-v todo-logs:/data node:22-alpine shToujours depuis l'intérieur du conteneur :   
cd /data 

cat first\_log.log 

cat second\_log.log 

exit

Devrait afficher exactement le même contenu qu'avant, alors que todo-writer et todo-reader n'existent plus du tout. C'est la preuve concrète que le volume vit indépendamment des conteneurs qui le montent : il survit à leur suppression complète, seule sa propre suppression explicite ( docker volume rm ) ferait disparaître les données. 

**Au boulot sur la Todo API** 

**Côté dépôt :** deux missions, deux commits séparés. La persistance et le réseau sont deux changements de nature différente : ils ne racontent pas la même histoire dans l'historique, et un  git log qui les distingue facilite grandement un futur revert ciblé. 

**Mission A, la persistance** 

Pour l'instant, les tâches de l'API ne vivent qu'en mémoire : un redémarrage du conteneur les efface toutes. On branche PostgreSQL (un système de gestion de base de données relationnelle open source) dans son propre conteneur, avec un volume nommé pour ses données, et l'API s'y connecte. 

Pas de fichier de configuration tout prêt cette fois : Postgres se lance avec un docker run et les bonnes options, à la main, une par une (image officielle, variables d'environnement pour le nom de la base, l'utilisateur et le mot de passe, volume nommé monté sur le répertoire où Postgres stocke ses données). On sent vite le nombre d'options qui s'accumulent sur une seule ligne de commande : c'est exactement la douleur que le chapitre suivant va résoudre, et c'est voulu. 

Détail qui va compter tout de suite après : sans network custom, ce nouveau conteneur Postgres atterrit sur le bridge par défaut, comme n'importe quel docker run sans \--network . L'API ne pourra donc pas le joindre par un nom, seulement par son IP interne (visible avec docker network inspect bridge ou docker inspect ). Cette limite est volontaire : elle rejoue très concrètement ce qu'on vient d'apprendre sur le bridge par défaut, avant que la Mission B ne la corrige pour de bon. 

**Ce qui doit être vrai à la sortie :** 

un conteneur Postgres tourne, avec un nom stable et un volume nommé qui lui est dédié 

l'API sait se connecter à cette base (un client adapté à la stack du projet, par exemple pg côté Node.js) et y écrit vraiment les tâches créées, plus seulement en mémoire 

une tâche créée via l'API est encore là après un docker stop puis docker start du conteneur Postgres 

une tâche créée via l'API est encore là même après un docker rm du conteneur Postgres suivi d'un tout nouveau docker run pointant sur le même volume nommé 

**Vérification :**   
\# On crée une tâche 

curl \-X POST http://localhost:3000/api/tasks \\ 

\-H "Content-Type: application/json" \\ 

\-d '{"title":"Tâche persistante","status":"todo"}' 

\# On arrête puis on relance le conteneur Postgres 

docker stop \<conteneur-postgres\> 

docker start \<conteneur-postgres\> 

\# La tâche doit toujours être là 

curl http://localhost:3000/api/tasks 

Dans le Journal de bord du README, notons la commande docker run complète utilisée pour lancer Postgres, ainsi que l'IP interne trouvée pour connecter l'API, et une phrase sur le nombre d'étapes manuelles que ça représente comparé à ce qu'on imagine possible avec un seul fichier. 

**Mission B, l'isolation réseau** 

L'API et la base tournent, mais la base reste jointe par une IP interne fragile, et pire, si elle publie son port avec \-p 5432:5432 , n'importe quel processus sur la machine peut s'y connecter. On corrige les deux problèmes d'un coup avec un network custom nommé. 

**Ce qui doit être vrai à la sortie :** 

l'API et la base de données sont toutes les deux sur un même network Docker créé explicitement, et rejoignable par son nom 

l'API se connecte à la base par son nom de conteneur, plus jamais par une IP 

le conteneur Postgres ne publie plus aucun port vers la machine hôte : \-p 5432:5432 a disparu de sa commande de lancement 

toutes les routes CRUD de l'API continuent de répondre normalement 

**Vérification :** 

\# Toutes les routes doivent continuer à répondre normalement 

curl http://localhost:3000/api/tasks 

\# Depuis la machine hôte, un client Postgres ne doit plus rien trouver psql \-h localhost \-U todo\_user \-d todo\_db

**psql ?** Le client en ligne de commande officiel de PostgreSQL, pour envoyer des requêtes SQL directement à une base. Sans lui sous la main, une simple vérification de port avec nc \- zv localhost 5432 (l'utilitaire réseau netcat , présent sur la plupart des systèmes) fait aussi l'affaire : elle doit échouer. 

Dans le Journal de bord du README, notons la commande docker network create utilisée, le nom exact retenu pour le network, et le résultat de la tentative de connexion depuis l'hôte après la fermeture du port : ce qui s'affiche, et pourquoi c'est le comportement attendu.   
**Ce qui casse si...** 

**Cas nominal, les données survivent au conteneur.** On supprime complètement le conteneur Postgres ( docker rm , pas seulement un stop ) puis on en relance un tout nouveau, pointé sur le même volume nommé. Les tâches créées avant la suppression doivent toujours apparaître dans l'API. Si elles ont disparu, le volume n'était probablement pas monté au bon chemin (celui où Postgres écrit réellement ses données). 

**Cas limite, supprimer un conteneur n'est pas supprimer un volume.** On teste les deux séparément, pour de vrai. D'abord docker rm sur le conteneur Postgres suivi d'un nouveau  docker run sur le même volume : les données sont toujours là. Puis, sur un volume de test jetable, docker volume rm : cette fois les données ont disparu pour de bon, aucun conteneur ne peut les récupérer. La différence entre les deux commandes est exactement la frontière entre "je change de conteneur" et "je perds mes données". 

**Cas adverse, la base meurt en pleine écriture.** On lance un docker kill sur le conteneur Postgres pendant qu'une requête POST /api/tasks est en cours côté API. L'API doit renvoyer une erreur HTTP exploitable au client (un code 500 avec un message clair, par exemple), jamais planter silencieusement ni rester bloquée indéfiniment sans réponse. 

**Cas de vérification d'isolation, la base ne doit plus être joignable depuis l'hôte.** Une fois la Mission B terminée (port retiré, network custom en place), un client Postgres lancé directement depuis la machine hôte, hors de tout conteneur, ne doit plus pouvoir joindre la base du tout : connexion refusée ou timeout. Si la connexion aboutit encore, le port 5432:5432 traîne probablement encore quelque part dans la commande de lancement. 

**Creusons** 

*Le volume, une fois créé, il vit où exactement sur la machine ?* 

Sur Linux, un volume nommé vit littéralement dans  

/var/lib/docker/volumes/\<nom\_du\_volume\>/\_data . On peut aller y jeter un œil avec les droits root, mais on ne devrait jamais y toucher à la main : c'est le rôle de Docker, pas le nôtre. Sur Docker Desktop (macOS, Windows), ce chemin existe à l'intérieur de la petite machine virtuelle Linux que Docker Desktop fait tourner en coulisses, pas directement sur le système de fichiers local : docker volume inspect reste le bon réflexe pour retrouver un volume, plutôt que d'aller fouiller le disque. 

**Les pilotes de volume.** Par défaut, tout volume Docker utilise le pilote local : les données restent sur le disque de la machine qui fait tourner le conteneur. D'autres pilotes de volume existent, sous forme de plugins, pour stocker les données ailleurs : sur un partage réseau NFS ou CIFS, ou directement sur un disque cloud (Amazon EBS, Azure Disk...). L'intérêt : un volume qui ne dépend plus d'une seule machine physique, utile dès qu'on veut qu'un conteneur redémarré sur un autre serveur retrouve ses données. C'est typiquement ce que gère un orchestrateur comme Kubernetes en coulisses. 

**Le piège classique du bind mount qui masque node\_modules .** Quand on monte tout un dossier de code avec un bind mount ( \- .:/code ), ça écrase aussi le node\_modules installé pendant le build de l'image avec celui, souvent absent, du poste local. Résultat : le conteneur démarre, cherche ses dépendances, et ne les trouve plus. La parade classique consiste à ajouter un second montage qui protège spécifiquement node\_modules du bind mount du dossier parent, pour qu'il garde la version installée dans l'image plutôt que celle (ou l'absence) du poste local.  
**Permissions et UID quand le conteneur tourne en non-root.** Un conteneur qui déclare USER node (bonne pratique de sécurité vue au chapitre précédent) écrit ses fichiers dans le volume avec l'UID de cet utilisateur, disons 1000\. Si l'utilisateur local n'a pas le même UID, les fichiers du volume appartiennent alors à un inconnu du point de vue de l'hôte, avec des Permission denied dès qu'on essaie de les éditer en local. Deux parades : aligner l'UID du conteneur sur celui de l'hôte au moment du build ( \--build-arg UID=$(id \-u) ), ou lancer le conteneur avec \--user $(id \-u):$(id \-g) pour du développement en local. 

**docker volume prune , la commande qui peut coûter cher.** Elle supprime tous les volumes qui ne sont rattachés à aucun conteneur, même arrêté. Le piège : un volume de backup jamais monté sur un conteneur qui tourne, ou un volume nommé dont le conteneur a disparu autrement qu'en  

down , tombe dans le filet. Avant de lancer un prune , un docker volume ls suivi d'un docker volume inspect sur les volumes suspects évite bien des mauvaises surprises. 

**Performance des bind mounts sur macOS et Windows.** Sur ces deux systèmes, Docker Desktop fait tourner les conteneurs dans une machine virtuelle Linux : un bind mount doit donc traverser une couche de traduction de système de fichiers entre le disque macOS ou Windows et cette VM. Historiquement, ça se traduisait par des lenteurs sensibles sur les gros dossiers (un  node\_modules de plusieurs dizaines de milliers de fichiers, typiquement). Docker a beaucoup travaillé le sujet, notamment avec VirtioFS sur macOS, qui réduit fortement le temps des opérations de système de fichiers par rapport à l'ancien mode gRPC FUSE. Sur Windows, le même type de gain vient de faire tourner un projet directement dans le système de fichiers natif de WSL2 plutôt que sur un chemin /mnt/c/... . Le réflexe à garder : sur un gros projet, un volume nommé pour node\_modules est souvent plus rapide qu'un bind mount complet, en plus de régler le piège d'écrasement vu plus haut. 

Sauvegarder et restaurer un volume, comme vu dans l'Instant Cheat Sheet plus haut, prend tout son sens dès qu'on migre une base d'un hôte à un autre : on sauvegarde le volume source dans une archive, on la transporte, on la restaure dans un volume neuf sur la machine cible. C'est une 

opération manuelle, mais c'est exactement le mécanisme que des outils de sauvegarde plus élaborés automatisent en coulisses. 

Une ligne de commande pour créer un network, une autre pour créer un volume, plusieurs options \-e à empiler pour Postgres, et il faut refaire tout ça dans le bon ordre à chaque redémarrage de la stack : ça commence à faire beaucoup à retenir et à retaper. C'est précisément le problème que Docker Compose règle, en décrivant toute cette stack dans un seul fichier. Et c'est justement la suite. 

**7 \- Docker Compose et la configuration : toute la stack dans un fichier** 

Au chapitre précédent, l'API et Postgres tournaient déjà ensemble, mais à la main : un docker network create , un docker volume create , puis deux docker run à rallonge avec \-- network , \--mount , une option \-e par variable, dans le bon ordre, sans jamais se tromper de nom de conteneur. Ça fonctionne, mais ça devient vite intenable : à chaque redémarrage de la machine, il faut retaper les mêmes dix lignes, et le jour où un troisième service s'ajoute, ça grimpe encore. Ce qui manque, c'est un seul fichier qui décrit toute la stack, et une seule commande pour la faire tourner. C'est exactement le rôle de Docker Compose.  
**L'essentiel de docker-compose** 

"C'est bien drôle de passer sa vie à taper des commandes dans le terminal, mais il n'y a pas plus rapide ?" 

Eh bien si : au lieu de retenir plusieurs commandes complexes par projet, il existe un moyen de standardiser les règles dans un fichier nommé docker-compose.yml . 

Docker Compose est l'outil officiel Docker qui décrit une stack multi-conteneurs (services, réseaux, volumes) dans un seul fichier YAML, puis la pilote avec une poignée de commandes au lieu d'une dizaine de docker run , docker network create et docker volume create tapés à la main. 

**YAML ?** Un format de fichier texte fait pour être lisible par un humain, où la structure se lit à l'indentation plutôt qu'aux accolades. C'est le format de configuration le plus répandu dans l'écosystème DevOps : on le retrouvera à l'identique dans les pipelines et dans Kubernetes plus tard dans la semaine. Sa contrepartie : l'indentation compte vraiment, un espace de trop et le fichier devient invalide. Voici un guide pas à pas pour créer et configurer un  docker-compose.yml , utile pour revoir les mêmes notions posées différemment. 

Un fichier docker-compose.yml repose sur trois grandes clés, toujours au même niveau :  services (un bloc par conteneur qu'on veut faire tourner), networks (les réseaux custom sur lesquels ces services discutent) et volumes (les volumes nommés pour la persistance). Par défaut, Compose crée déjà un network qui relie tous les services d'un même fichier entre eux : networks ne devient obligatoire que si on veut en isoler certains ou en nommer un précisément. 

Un docker-compose.yml peut se structurer de la sorte : 

services: 

web: 

build: . 

ports: 

\- "5000:5000" 

volumes: 

\- .:/code 

cache: 

image: redis:7 

**Redis ?** Redis est un système de stockage clé-valeur en mémoire, utilisé ici pour illustrer la clé image . On le retrouvera comme cache dans un vrai contexte applicatif, mais ce n'est pas le sujet du jour. 

**Aparté : et la ligne version: '3.8' qu'on voit partout ?** On croise encore beaucoup d'exemples en ligne qui commencent par version: '3.8' ou similaire. Cette clé est  désormais obsolète depuis Compose V2 : l'outil sélectionne automatiquement le schéma le plus récent et ignore cette valeur, avec juste un avertissement si elle traîne encore. Autant la retirer directement de ses propres fichiers, c'est ce qu'on fait dans tous les exemples de ce cours. 

Voici un exemple plus complet, cette fois avec une appli qui sert un blog et sa base de données, pour voir les mêmes clés à l'œuvre sur une stack qui fait vraiment quelque chose : 

services: 

blog:  
build: . 

ports: 

\- "8000:80" 

environment: 

\- APP\_ENV=production 

\- DB\_HOST=mysql 

depends\_on: 

\- mysql 

mysql: 

image: mysql:8 

environment: 

MYSQL\_DATABASE: blogdb 

MYSQL\_USER: blog\_user 

MYSQL\_PASSWORD: blog\_pass 

volumes: 

\- mysql\_data:/var/lib/mysql 

volumes: 

mysql\_data: 

**MySQL ?** MySQL est un système de gestion de base de données relationnelle open source, comme Postgres mais avec ses propres outils et sa propre syntaxe d'administration. 

Deux services seulement ici, et c'est déjà suffisant pour voir toutes les clés qui comptent. Un troisième service, un quatrième, ça ne change rien au principe : c'est toujours un bloc de plus sous services , avec les mêmes clés. 

Quelques clés méritent qu'on s'y attarde, parce qu'elles cachent des pièges classiques. 

**build vs image .** image: mysql:8 télécharge une image déjà construite depuis un registre (Docker Hub ici). build: . construit l'image depuis un Dockerfile présent dans le répertoire indiqué, exactement comme un docker build . manuel. Un service a l'un ou l'autre, rarement les deux à la fois. 

**depends\_on et son piège.** Dans l'exemple, blog attend mysql . Sauf que depends\_on attend seulement que le *conteneur* mysql ait démarré, pas que *MySQL à l'intérieur* soit prêt à accepter des connexions. Entre les deux, il peut se passer plusieurs secondes, largement de quoi faire planter blog au premier essai de connexion. La correction passe par un healthcheck couplé à  condition: service\_healthy : 

services: 

mysql: 

image: mysql:8 

environment: 

MYSQL\_DATABASE: blogdb 

MYSQL\_USER: blog\_user 

MYSQL\_PASSWORD: blog\_pass 

healthcheck: 

test: \["CMD", "mysqladmin", "ping", "-h", "localhost"\] 

interval: 5s 

timeout: 3s 

retries: 5  
blog: 

build: . 

depends\_on: 

mysql: 

condition: service\_healthy 

**Healthcheck ?** Une commande que Compose exécute régulièrement à l'intérieur du conteneur pour savoir s'il est vraiment opérationnel, pas juste démarré. Ici, mysqladmin ping ne répond que quand MySQL accepte des connexions. Documentation officielle sur  depends\_on couplé aux healthchecks. 

Sans ça, blog démarre trop tôt, plante, et selon la restart policy repart en boucle jusqu'à ce que MySQL finisse par être prêt : ça marche, mais avec des logs d'erreur qui font peur pour rien. 

**restart .** On y touche peu en développement, mais c'est la politique qui décide si Docker relance un conteneur tout seul quand il s'arrête : no (jamais, la valeur par défaut), always (toujours, même après un reboot de la machine), on-failure (seulement si le conteneur s'est arrêté en erreur), unless-stopped (toujours, sauf si on l'a stoppé volontairement). En production, unless stopped est le choix le plus courant. 

**ports vs expose .** ports: \- "3000:3000" publie le port sur la machine hôte : on peut taper  localhost:3000 depuis le navigateur. expose: \- "3000" ouvre le port uniquement pour les autres conteneurs du même network, sans rien publier vers l'extérieur. Une base de données qui ne parle qu'à l'application n'a besoin que d' expose , jamais de ports . 

L'avantage ultime, c'est qu'il ne reste plus que trois commandes principales à retenir : docker compose build 

C'est l'équivalent de la commande de build à rallonge qu'on tapait à la main. docker compose up 

C'est l'équivalent de tous les docker run qu'on enchaînait un par un. 

docker compose down 

Cette commande arrête et retire les conteneurs qui avaient été lancés avec docker compose up . Ces trois-là suffisent pour démarrer, mais au quotidien on pioche vite dans une palette plus large : 

docker compose up \-d : lance la stack en arrière-plan (detached), on récupère la main dans le terminal tout de suite. Devrait afficher quelque chose comme : 

\[+\] Running 3/3 

\- Network myapp\_default Created 

\- Container myapp-db-1 Started 

\- Container myapp-app-1 Started

docker compose down : arrête et supprime les conteneurs et le network par défaut, mais laisse les volumes intacts, les données restent.   
docker compose down \-v : pareil, mais supprime aussi les volumes. **Attention** : c'est irréversible, toutes les données de la base partent avec, ce n'est jamais une commande à taper par réflexe. 

docker compose logs \-f : suit les logs de tous les services en direct, un tail \-f multiplexé et préfixé par nom de service. 

docker compose ps : liste les conteneurs de la stack avec leur état ( running , healthy ,  exited ...). 

docker compose exec app sh : ouvre un shell (ou n'importe quelle commande) dans un conteneur déjà démarré, pratique pour aller inspecter un service en cours de route sans le redémarrer. 

docker compose build \--no-cache : reconstruit une image en ignorant totalement le cache de layers, utile quand une dépendance a changé mais que Docker croit à tort que rien n'a bougé. 

docker compose up \--build : force la reconstruction des images avant de relancer, le combo qu'on tape le plus souvent juste après une modification de code. 

**L'essentiel de la configuration** 

Une stack qui se lance en une seule commande, c'est déjà énorme, sauf qu'elle reste pleine de valeurs codées en dur : mot de passe en clair dans le yaml, host, port... La brique qui manque, ce sont les variables d'environnement. 

**C'est quoi une variable d'environnement ?** 

Une variable d'environnement est une valeur (texte, nombre, URL) qu'on passe à un conteneur pour configurer son comportement sans modifier le code source. 

Au lieu de coder en dur : 

const dbHost \= "localhost"; // En dur, mauvaise pratique 

On utilise une variable d'environnement : 

const dbHost \= process.env.DB\_HOST; // Flexible \!

**Pourquoi utiliser des variables d'environnement ?** 

**Séparation du code et de la configuration.** Le même code tourne en développement, en staging et en production, juste en changeant les variables. 

**Sécurité.** Les secrets (mots de passe, clés API) ne se retrouvent jamais dans le code, donc pas de risque de commit accidentel sur GitHub. 

**Flexibilité.** On change la configuration sans rebuild de l'image, avec une configuration différente selon l'environnement.   
**Comment passer des variables d'environnement ? Méthode 1 : via docker run** 

docker run \-e DB\_HOST\=postgres \-e DB\_PORT\=5432 mon-image **Méthode 2 : via docker-compose.yml (inline)** 

services: 

api: 

image: mon-api 

environment: 

\- DB\_HOST=postgres 

\- DB\_PORT=5432 

\- NODE\_ENV=production 

**Méthode 3 : via docker-compose.yml (syntaxe objet)** 

services: 

api: 

image: mon-api 

environment: 

DB\_HOST: postgres 

DB\_PORT: 5432 

NODE\_ENV: production 

**Méthode 4 : via un fichier .env** 

\# .env 

DB\_HOST\=postgres 

DB\_PORT\=5432 

NODE\_ENV\=production 

\# docker-compose.yml 

services: 

api: 

image: mon-api 

env\_file: 

\- .env

**Différence entre environment et env\_file** 

**environment :** variables explicites dans docker-compose.yml . Avantage : tout est visible dans le fichier.   
Inconvénient : on commit souvent le docker-compose.yml (risque de fuite). **env\_file :** variables dans un fichier séparé. 

Avantage : on peut ajouter .env au .gitignore (sécurité). 

Inconvénient : moins visible, un fichier de plus à maintenir.   
**Bonne pratique :** utiliser les deux. 

services: 

api: 

image: mon-api 

environment: 

NODE\_ENV: production \# Pas sensible, peut être commité 

env\_file: 

\- .env \# Contient les secrets, dans .gitignore 

**Ordre de priorité des variables** 

Si une même variable est définie à plusieurs endroits, voici l'ordre, du plus prioritaire au moins prioritaire : 

1\. Variables passées avec docker run \-e 

2\. Variables dans environment: du docker-compose.yml 

3\. Variables dans le fichier référencé par env\_file: 

4\. Variables dans le Dockerfile ( ENV ) 

5\. Valeurs par défaut dans le code 

**Bon à savoir : la hiérarchie précise avec docker compose .** La liste ci-dessus est la version simple. Dans le détail, la documentation officielle distingue une valeur explicite dans  environment: (la plus forte), puis env\_file: , puis, pour l'interpolation des ${VAR} à l'intérieur même du fichier compose, une variable exportée dans le shell l'emporte sur la même variable définie dans le .env du répertoire : le .env reste le filet de sécurité par défaut, le shell gagne toujours quand les deux existent. 

**Sécurité des secrets** 

**Mauvaise pratique :** 

\# docker-compose.yml (commité sur GitHub) 

services: 

api: 

environment: 

DB\_PASSWORD: super\_secret\_123 \# Visible sur GitHub \! 

**Bonne pratique :** 

\# .env (dans .gitignore) 

DB\_PASSWORD\=super\_secret\_123 

\# docker-compose.yml 

services: 

api: 

env\_file: 

\- .env \# Le fichier .env n'est jamais commité  
\# .gitignore 

.env 

**Encore mieux, pour la production :** Docker Secrets, qu'on voit un peu plus loin, ou des outils comme Vault, qui restent hors programme pour nous. 

**ARG et ENV : le piège du secret qui fuite au build** 

Un réflexe dangereux consiste à passer un secret via \--build-arg en pensant qu'il ne laissera aucune trace puisqu'il "ne persiste pas dans le conteneur". C'est à moitié vrai, et la moitié qui reste vraie fait mal. 

FROM node:18-alpine 

ARG DB\_PASSWORD 

ENV DB\_PASSWORD=$DB\_PASSWORD 

WORKDIR /app 

COPY . . 

CMD \["node", "server.js"\] 

docker build \--build-arg DB\_PASSWORD\=secret123 \-t demo-arg . 

docker history \--no-trunc demo-arg 

Devrait afficher, quelque part dans la liste des layers, une ligne du type ENV DB\_PASSWORD=secret123 en clair. N'importe qui a accès à l'image (un registre partagé, un docker save ) peut lire ce secret avec un simple docker history , même sans jamais lancer le conteneur. 

**ARG vs ENV ?** ARG déclare une variable disponible uniquement pendant le docker build : elle n'existe plus dans le conteneur lancé ensuite. ENV déclare une variable qui persiste dans l'image finale et sera visible dans tout conteneur démarré à partir de cette image.  Référence Dockerfile officielle. 

**Bonne pratique :** aucun secret ne va jamais en ARG ni en ENV dans un Dockerfile. Les secrets voyagent par env\_file au runtime, ou par un mécanisme de secrets dédié (on y revient dans quelques minutes), jamais bakés dans une image. 

**Utiliser les variables dans le code** 

**Node.js :** 

const express \= require('express'); 

const app \= express(); 

const PORT \= process.env.PORT || 3000; 

const DB\_HOST \= process.env.DB\_HOST || 'localhost'; 

const DB\_PASSWORD \= process.env.DB\_PASSWORD; 

if (\!DB\_PASSWORD) { 

throw new Error('DB\_PASSWORD must be defined'); 

} 

app.listen(PORT, () \=\> { 

console.log(\`Server running on port ${PORT}\`);  
console.log(\`Connecting to database at ${DB\_HOST}\`); 

}); 

**Variables avec des valeurs par défaut** 

services: 

api: 

environment: 

DB\_HOST: ${DB\_HOST:\-postgres} \# Si DB\_HOST n'existe pas, utilise "postgres" 

DB\_PORT: ${DB\_PORT:\-5432} 

**Exercice guidé 1 : passer des variables d'environnement Objectif :** construire une petite API qui lit des variables d'environnement. **Étape 1 : le code de l'API** 

// server.js 

const express \= require('express'); 

const app \= express(); 

const PORT \= process.env.PORT || 3000; 

const API\_KEY \= process.env.API\_KEY; 

const ENVIRONMENT \= process.env.NODE\_ENV || 'development'; 

app.get('/config', (req, res) \=\> { 

res.json({ 

port: PORT, 

hasApiKey: \!\!API\_KEY, 

environment: ENVIRONMENT, 

message: \`Running in ${ENVIRONMENT} mode\` 

}); 

}); 

app.listen(PORT, () \=\> { 

console.log(\`Server started on port ${PORT}\`); 

console.log(\`Environment: ${ENVIRONMENT}\`); 

console.log(\`API Key provided: ${\!\!API\_KEY}\`); 

}); 

**Étape 2 : le Dockerfile** 

FROM node:18-alpine 

WORKDIR /app 

RUN npm init \-y && npm install express 

COPY server.js . 

CMD \["node", "server.js"\] 

**Étape 3 : tester avec docker run** 

\# On build l'image 

docker build \-t env-test .  
\# On lance sans variables 

docker run \-p 3000:3000 env-test 

\# Dans les logs : mode development, pas d'API key 

\# On lance avec variables 

docker run \-p 3000:3000 \\ 

\-e NODE\_ENV\=production \\ 

\-e API\_KEY\=secret123 \\ 

\-e PORT\=3000 \\ 

env-test 

\# On teste 

curl http://localhost:3000/config 

Devrait afficher :  

{"port":"3000","hasApiKey":true,"environment":"production","message":"Running in production mode"} 

**Étape 4 : passer par docker-compose** 

services: 

api: 

build: . 

ports: 

\- "3000:3000" 

environment: 

NODE\_ENV: production 

API\_KEY: secret123 

PORT: 3000 

docker compose up 

curl http://localhost:3000/config 

Devrait afficher exactement la même réponse JSON qu'à l'étape précédente. **Exercice guidé 2 : utiliser un fichier .env** 

**Objectif :** séparer les secrets dans un fichier .env . 

**Étape 1 : le fichier .env** 

\# .env 

NODE\_ENV\=production 

API\_KEY\=super\_secret\_key\_123 

DB\_HOST\=postgres 

DB\_PORT\=5432 

DB\_PASSWORD\=db\_secret\_password

**Étape 2 : le docker-compose.yml**   
services: 

api: 

build: . 

ports: 

\- "${PORT:-3000}:3000" \# Utilise PORT du .env ou 3000 par défaut env\_file: 

\- .env 

**Étape 3 : ajouter .env au .gitignore** 

echo ".env" \>\> .gitignore 

**Étape 4 : créer un .env.example (template pour l'équipe)** 

\# .env.example (ce fichier EST commité) 

NODE\_ENV\=development 

API\_KEY\=your\_api\_key\_here 

DB\_HOST\=postgres 

DB\_PORT\=5432 

DB\_PASSWORD\=your\_password\_here 

**Étape 5 : tester** 

docker compose up 

curl http://localhost:3000/config

Devrait afficher :  

{"port":"3000","hasApiKey":true,"environment":"production","message":"Running in production mode"} 

**Le workflow d'équipe qui en découle :** 

1\. Chaque membre clone le repo 

2\. Copie .env.example vers .env 

3\. Remplit ses propres valeurs 

4\. Lance docker compose up 

Cette semaine, on retrouvera exactement le même réflexe côté CI : les variables masquées de GitLab (ou GitHub Actions) jouent le rôle du .env , mais pour la pipeline plutôt que pour le poste local. On y revient plus tard. 

**À vous de jouer** 

**Avant de lancer :** un .env qui traîne déjà avec un mot de passe dedans et qui part dans un commit sur un dépôt public, ça se rattrape très mal une fois poussé. Le réflexe qui sauve : un git status avant chaque commit, pour vérifier qu'aucun fichier de secret ne s'est glissé dans la liste. 

**Mission A : la configuration sort du code**   
Jusqu'ici, les identifiants de la base sont écrits en dur : dans le code de connexion, et probablement dans les commandes docker run tapées au chapitre précédent. L'objectif : plus aucun identifiant de base en clair nulle part. On sépare la configuration du code avec dotenv, une librairie qui charge des variables depuis un fichier .env dans process.env . 

**Avant (config en dur) :** 

const pool \= new Pool({ 

host: 'db', 

port: 5432, 

user: 'todo\_user', 

password: 'todo\_pass', 

database: 'todo\_db', 

}); 

**Après (config externalisée) :** 

require('dotenv').config(); 

const pool \= new Pool({ 

host: process.env.DB\_HOST, 

port: process.env.DB\_PORT, 

user: process.env.DB\_USER, 

password: process.env.DB\_PASSWORD, 

database: process.env.DB\_NAME, 

});

Le code ne change plus jamais entre dev, staging et prod : seule la config change. Deux fichiers à créer : un .env rempli avec les vraies valeurs, jamais commité, présent dans le .gitignore , et un .env.example avec les mêmes clés et des valeurs bidons, commité pour que n'importe qui puisse démarrer le projet. Comme dans l'exercice guidé plus haut, une variable obligatoire manquante doit faire planter le démarrage avec un message clair ( throw new Error(...) ), jamais un undefined silencieux qui casse trois couches plus loin. 

Trois choses à vérifier avant d'enchaîner : le code de connexion ne contient plus aucune valeur en dur, un git log sur le repository ne fait apparaître aucun .env commité par erreur, et retirer une variable du .env fait échouer le démarrage avec un message exploitable plutôt qu'un crash mystérieux. 

**Mission B : toute la stack dans un fichier** 

**Deux missions, deux commits :** celle-ci mérite le sien, distinct de celui de la Mission A. Un changement de nature (la config, puis l'orchestration) ne partage jamais le même commit. 

L'objectif : une seule commande pour démarrer l'API, Postgres et Adminer ensemble. 

**Adminer ?** Une interface web d'administration de base de données, livrée en un seul fichier PHP, qui se branche sur Postgres (ou MySQL, SQLite...) pour parcourir et éditer les données sans taper de SQL à la main. On la garde pour toute la suite du cours : c'est le moyen le plus rapide de vérifier visuellement que la base contient bien ce qu'on croit.   
Le docker-compose.yml à écrire doit satisfaire tout ça à la fois : les trois services démarrent sur le network custom du chapitre précédent, le volume nommé qui préserve les données Postgres est toujours là, la base n'est plus jamais publiée sur l'hôte (seulement joignable par les autres conteneurs du network), et zéro valeur en dur, tout vient du .env de la Mission A via l'interpolation ${...} . 

Devrait afficher quelque chose comme ceci au lancement (les noms exacts dépendent du nom de votre dossier de projet et de ceux choisis pour vos services) : 

\[+\] Running 5/5 

\- Network todo-network Created 

\- Volume "todo\_pgdata" Created 

\- Container todo-postgres-1 Healthy 

\- Container todo-adminer-1 Started 

\- Container todo-api-1 Started 

Le repère qui compte, quels que soient les noms réels : cinq ressources créées (un network, un volume, trois conteneurs), et le conteneur Postgres qui passe par l'état Healthy avant que l'API démarre. 

Pour vérifier que tout est bien branché : 

docker compose ps 

Les trois conteneurs doivent apparaître à l'état running ( healthy pour Postgres). Un curl sur la route qui liste les tâches doit répondre avec du JSON, la preuve que l'API a réussi à se connecter à la base. 

Reste Adminer : on ouvre le port qu'on a choisi de publier pour lui dans le navigateur, un formulaire de connexion apparaît. On y entre le nom du service Postgres tel que déclaré dans le  docker-compose.yml comme serveur, et les valeurs de DB\_USER , DB\_PASSWORD , DB\_NAME du  .env . On doit atterrir sur la liste des tables de la base, la preuve visuelle que tout communique. 

Dans le Journal de bord du README, on consigne ce qui a été mesuré et ce qui a cassé en chemin : le temps que le healthcheck Postgres a mis à passer Healthy , les éventuels ajustements de noms entre le network ou le volume créés à la main au chapitre précédent et ceux que Compose gère désormais tout seul, et toute variable qu'on a dû ajouter au .env.example en cours de route. 

**Trois scénarios à rejouer** 

**Le cas nominal.** La stack complète démarre avec docker compose up \-d , les trois conteneurs passent running , et l'API répond correctement sur sa route de liste des tâches. C'est la mission B, terminée avec succès. 

**Le cas limite : une variable obligatoire manque.** *Qu'est-ce qui se passe si on retire DB\_PASSWORD du .env ?* On commente cette ligne, puis : 

docker compose down 

docker compose up \-d 

docker compose logs  
On lit ce que les logs racontent, service par service, et on note dans le Journal de bord du README ce qu'on y a trouvé : quel service refuse de démarrer, ce que dit le message d'erreur, et l'état dans lequel docker compose ps laisse les conteneurs bloqués. 

Ce qui se joue concrètement : Postgres refuse de démarrer proprement (ou démarre avec un mot de passe vide selon la version de l'image), et son healthcheck échoue en boucle. Comme l'API attend condition: service\_healthy sur Postgres, elle ne démarre jamais : elle reste bloquée en created , jamais en running . Une variable manquante en configuration, ça ne casse jamais silencieusement avec Compose, ça bloque net le démarrage du service qui en dépend. On remet la ligne dans le .env , et on relance pour repartir sur une stack saine. 

**Le cas adverse : la base tombe pendant que tout tourne.** Avec la stack up, on arrête le conteneur Postgres sans toucher au reste : 

docker compose stop \<nom-du-service-postgres\> 

curl http://localhost:3000/api/tasks

*Que répond l'API à ce moment-là ?* On observe la réponse et le code HTTP renvoyé, et on les note dans le Journal de bord : une erreur exploitable côté client est un succès, un crash silencieux du process ou un timeout interminable est un problème à corriger dans le code de connexion. On 

relance ensuite ce même service avec docker compose start , et on revérifie que l'API retrouve d'elle-même le chemin vers la base, ou si elle réclame un redémarrage complet : ça aussi, ça va dans le Journal de bord. 

**Approfondissons** 

Compose fait tourner la stack qu'on vient de construire très bien sur un poste de développement, mais un docker-compose.yml qui fonctionne en local n'est pas encore prêt pour la production. Quelques réflexes qui font la différence. 

**Un processus par conteneur.** Les bonnes pratiques Docker officielles recommandent de découpler chaque préoccupation dans son propre conteneur (l'API d'un côté, la base de l'autre, l'admin dans un troisième) plutôt que d'empiler plusieurs processus dans un seul. Ça se scale, se redémarre et se debugge indépendamment. 

**Conteneurs sans état.** Un conteneur doit pouvoir être détruit et recréé à tout moment sans perte de donnée : tout ce qui doit survivre va dans un service de stockage dédié (un volume nommé, une vraie base), jamais dans le système de fichiers du conteneur lui-même. 

**Logs sur la sortie standard.** Une application qui écrit ses logs dans un fichier à l'intérieur du conteneur les perd au moindre redémarrage, et docker compose logs ne voit rien. La  méthodologie douze facteurs recommande d'écrire sur stdout / stderr et de laisser l'environnement d'exécution router ces flux ailleurs. 

**Images épinglées par digest.** postgres:15 est un tag, et un tag peut pointer vers un contenu différent d'un jour à l'autre. En production, on préfère référencer l'image par son empreinte exacte, postgres@sha256:... , pour garantir que c'est strictement la même image partout.  Documentation officielle sur le pull par digest.   
**Healthcheck et politiques de redémarrage.** On les a déjà vus plus haut : en production,  restart: unless-stopped couplé à un healthcheck correctement calibré est la base pour qu'un conteneur qui plante reparte tout seul, sans qu'on ait besoin de s'en apercevoir en pleine nuit. 

**Limites de ressources.** Sans limite, un conteneur qui fuit en mémoire peut affamer toute la machine. Avec Compose : 

services: 

app: 

build: . 

deploy: 

resources: 

limits: 

cpus: "0.50" 

memory: 512M 

Et avec un simple docker run , l'équivalent est docker run \--memory=512m \--cpus=0.5 mon image . Documentation officielle sur les limites de ressources. 

**docker compose config pour valider.** Cette commande affiche le yaml final résolu et interpolé, toutes les ${VARIABLE} remplacées par leur valeur réelle, sans rien lancer. Une variable manquante ou une indentation cassée saute immédiatement aux yeux, avant même de démarrer quoi que ce soit. C'est le premier réflexe à prendre quand un docker compose up se comporte bizarrement : avant de soupçonner un bug applicatif, on vérifie que le fichier résolu contient bien ce qu'on croit. 

**Fichiers d'override pour séparer dev et prod.** Compose charge automatiquement un docker compose.override.yml s'il existe à côté du fichier principal, et fusionne les deux. On peut aussi enchaîner plusieurs \-f explicitement : docker compose \-f docker-compose.yml \-f docker compose.prod.yml up \-d . Le fichier de base reste commun, et chaque environnement n'ajoute 

que ce qui change, ce qui évite d'entretenir deux fichiers complets en parallèle qui divergent avec le temps. 

**Profiles.** Certains services n'ont de sens qu'en développement, Adminer en est un bon exemple : personne ne veut exposer une interface d'admin de base de données en production. Les profiles permettent de le déclarer explicitement : 

\# docker-compose.override.yml (chargé automatiquement en local) services: 

adminer: 

profiles: \["dev"\]

En local, docker compose \--profile dev up \-d lance tout, Adminer compris. En production, un simple docker compose up \-d sans ce flag l'ignore complètement. Ça se combine bien avec les fichiers \-f vus juste au-dessus : les profiles filtrent des services à l'intérieur d'un même fichier, les 

\-f multiples combinent plusieurs fichiers, deux mécanismes complémentaires plutôt que concurrents.   
**Secrets Docker versus variables d'environnement.** Une variable d'environnement reste visible dans docker inspect , dans la liste des process, parfois dans des logs de debug trop bavards. Les secrets Docker répondent à ce problème : la donnée sensible est montée comme un fichier en mémoire dans le conteneur, lisible uniquement par le processus qui en a besoin. 

services: 

postgres: 

image: postgres:15 

environment: 

POSTGRES\_PASSWORD\_FILE: /run/secrets/db\_password 

secrets: 

\- db\_password 

secrets: 

db\_password: 

file: ./secrets/db\_password.txt

L'image officielle Postgres sait justement lire un mot de passe depuis un fichier via  POSTGRES\_PASSWORD\_FILE , précisément pour permettre ce genre de montage. 

Tout ça reste valable sur *une seule* machine. Compose ne sait pas répartir des conteneurs sur plusieurs serveurs, ne redémarre rien tout seul si la machine entière tombe, et ne fait aucune mise à l'échelle automatique face à un pic de trafic. Le jour où une seule machine ne suffit plus, c'est un tout autre outil qui prend le relais : on y arrive avec l'orchestration, plus tard cette semaine. 

**8 \- Un second service, en Python** 

On a maintenant une stack qui tient debout toute seule : l'API Node.js dans son conteneur, Postgres avec son volume nommé et son network dédié, et tout ça piloté depuis un seul docker compose.yml dont la configuration vit dans des variables d'environnement. Il est temps d'ajouter un second service, écrit dans un langage que la promo ne maîtrise pas forcément : le Python. On le fait maintenant parce qu'une stack réelle est presque toujours polyglotte (un service de données en Python à côté d'une API Node, c'est un motif qu'on croise partout en entreprise), et parce que brancher un service qu'on n'a pas écrit soi-même sans en débugger la syntaxe, c'est exactement la compétence qu'on demande le jour où l'équipe data livre un microservice sans documentation. 

**L'essentiel du Dockerfile Python** 

La stack s'enrichit avec un deuxième service : une petite API FastAPI, un framework web Python moderne qui génère automatiquement une documentation interactive de l'API à partir des type hints du code. 

**Type hints ?** Des annotations facultatives, en Python, qui précisent le type attendu d'un paramètre ou d'une valeur de retour ( def get\_stats() \-\> dict: ). Python ne les vérifie pas à l'exécution, mais des outils comme FastAPI les lisent pour valider les entrées et générer la documentation tout seuls. On la conteneurise tout de suite, avec le même réflexe que pour l'API Node.js : une image de base légère, un utilisateur non-root, un HEALTHCHECK .   
\# Base légère, équivalent Python de node:alpine niveau philosophie \# "slim" retire les paquets Debian non essentiels, sans les limitations plus poussées d'Alpine 

\# (Alpine existe aussi pour Python, mais certaines libs C compilent moins bien dessus) 

FROM python:3.12-slim 

\# Ne pas écrire de fichiers .pyc pendant l'exécution : inutile dans un conteneur 

\# éphémère, ça évite juste des I/O disque pour rien 

ENV PYTHONDONTWRITEBYTECODE=1 

\# Force la sortie standard de Python à ne pas être bufferisée : sans ça, les logs 

\# de l'appli peuvent rester coincés dans un buffer et ne jamais apparaître dans \# \`docker logs\` avant un moment (voire jamais si le process crash brutalement) ENV PYTHONUNBUFFERED=1 

WORKDIR /app 

\# Comme pour npm, on copie d'abord uniquement le fichier de dépendances COPY requirements.txt . 

\# \--no-cache-dir : pip ne garde pas de cache local de téléchargement, inutile dans 

\# une image qu'on jette et reconstruit à chaque fois, ça fait juste grossir l'image 

RUN pip install \--no-cache-dir \-r requirements.txt 

COPY . . 

\# Contrairement à l'image node officielle, l'image python:slim ne fournit pas \# d'utilisateur non-root prêt à l'emploi : on le crée nous-même RUN adduser \--disabled-password \--gecos "" appuser 

USER appuser 

EXPOSE 8000 

HEALTHCHECK \--interval=30s \--timeout=3s \\ 

CMD python \-c "import urllib.request; 

urllib.request.urlopen('http://localhost:8000/health')" || exit 1 

\# uvicorn : le serveur ASGI qui fait tourner l'app FastAPI. \--host 0.0.0.0 est \# indispensable dans un conteneur : sur 127.0.0.1 (le défaut), l'app ne serait \# joignable que depuis l'intérieur du conteneur lui-même 

CMD \["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"\]

**ASGI ?** Asynchronous Server Gateway Interface, l'équivalent asynchrone du WSGI historique de Python : la norme qui permet à un serveur comme Uvicorn de faire tourner une app web capable de gérer des requêtes en parallèle sans bloquer. 

**pip ?** Le gestionnaire de paquets standard de Python, l'équivalent de npm côté Node.js : il lit un fichier de dépendances et les installe dans l'environnement courant. 

*Qu'est-ce qui change vraiment par rapport à Node.js ?* Trois choses concrètes :   
**La gestion des dépendances** : npm ci lit un lock file ( package-lock.json ) et installe exactement les versions qui y sont épinglées. pip install \-r requirements.txt installe ce que le fichier demande, mais sans lock file strict par défaut : deux installs à des dates différentes peuvent récupérer des versions mineures différentes. Pour un vrai pinning à la  npm ci , on fige les versions dans requirements.txt lui-même ( fastapi==0.115.0 plutôt que fastapi ). 

**Les wheels** : quand une dépendance Python contient du code C à compiler, pip peut soit trouver un *wheel* déjà compilé pour la plateforme cible (rapide), soit devoir compiler depuis les sources (lent, et ça demande des outils de compilation absents d'une image slim). C'est une source classique de build qui traîne en longueur ou qui plante : si ça arrive, le multi-stage build (un stage avec les outils de compilation, un stage final sans) est la même solution que côté Node. 

**Les logs qui disparaissent** : c'est le piège le plus sournois. Sans PYTHONUNBUFFERED=1 , Python bufferise sa sortie standard quand elle n'est pas connectée à un vrai terminal, ce qui est exactement le cas dans un conteneur. Résultat : docker logs mon-conteneur peut rester vide pendant que l'appli tourne et logue en réalité très activement, juste retenue dans un buffer. Un classique de debug qui prend 20 minutes la première fois qu'on le rencontre, et 2 secondes toutes les fois suivantes une fois qu'on connaît le coupable. 

À noter, et ça change la donne pour la suite : contrairement au reste de l'après-midi, ce Dockerfile là est donné complet, et c'est assumé. La compétence visée ici n'est pas d'écrire un Dockerfile Python, c'est de brancher correctement un service qu'on ne maîtrise pas dans une stack qu'on maîtrise déjà. 

**On branche le service** 

**Pense-bête commits :** nouveau service, nouveau dossier, un commit qui l'introduit séparément du reste de la stack. Un relecteur doit pouvoir comprendre l'ajout sans dérouler tout l'historique. 

La mission : stats-api , un service Python qui lit la même base PostgreSQL que l'API Node.js et expose le nombre de tâches par état. Le code applicatif est donné complet, il n'y a rien à écrire en Python : le travail, c'est de le faire tourner dans la stack. 

Voici stats\_api/main.py , à placer dans un nouveau dossier stats\_api/ à la racine du projet : 

import os 

import psycopg2 

from fastapi import FastAPI, HTTPException 

app \= FastAPI() 

\# Ces deux constantes dépendent du schéma créé au chapitre 6 : à adapter au nom \# réel de la table de tâches et de sa colonne d'état avant de lancer le service. 

TABLE\_NAME \= "tasks" 

STATUS\_COLUMN \= "status" 

\# Les états attendus, listés ici pour garantir des compteurs à zéro même quand \# un état n'a aucune ligne en base (table vide, ou état jamais encore utilisé). KNOWN\_STATUSES \= \["todo", "in\_progress", "done"\]  
def get\_connection(): 

\# Ces noms de variables doivent être exactement ceux choisis au chapitre 7 \# pour l'API Node.js : les deux services lisent la même configuration, il \# serait absurde qu'ils l'appellent différemment. 

return psycopg2.connect( 

host\=os.environ\["DB\_HOST"\], 

port\=os.environ.get("DB\_PORT", "5432"), 

dbname\=os.environ\["DB\_NAME"\], 

user\=os.environ\["DB\_USER"\], 

password\=os.environ\["DB\_PASSWORD"\], 

connect\_timeout\=3, 

) 

@app.get("/health") 

def health(): 

\# Volontairement indépendant de Postgres : un souci base ne doit pas faire \# passer le conteneur lui-même pour mort aux yeux du HEALTHCHECK. return {"status": "ok"} 

@app.get("/stats") 

def get\_stats(): 

counts \= {status: 0 for status in KNOWN\_STATUSES} 

try: 

conn \= get\_connection() 

except psycopg2.OperationalError: 

\# Jamais de stacktrace brut renvoyé au client : un code d'erreur clair \# et un message que l'appelant peut logger tel quel. 

raise HTTPException( 

status\_code\=503, 

detail\="stats-api ne parvient pas à joindre la base de données", ) 

try: 

with conn.cursor() as cursor: 

\# TABLE\_NAME et STATUS\_COLUMN sont des constantes internes, jamais une 

\# entrée utilisateur : l'interpolation ici ne rejoue pas le risque \# d'injection SQL qu'on aurait avec un paramètre reçu du client. cursor.execute( 

f"SELECT {STATUS\_COLUMN}, COUNT(\*) FROM {TABLE\_NAME} " 

f"GROUP BY {STATUS\_COLUMN}" 

) 

for status, count in cursor.fetchall(): 

counts\[status\] \= count 

finally: 

conn.close() 

return counts

Et voici stats\_api/requirements.txt , à placer juste à côté :   
fastapi==0.115.0 

uvicorn==0.32.0 

psycopg2-binary==2.9.9 

**psycopg2-binary ?** Le client PostgreSQL pour Python, en version précompilée : la variante \- binary embarque directement les bibliothèques C nécessaires, ce qui évite exactement le piège de compilation évoqué juste au-dessus. 

Deux points d'attention, et c'est là que se trouve tout le travail de réflexion de ce chapitre, puisqu'il n'y a pas une ligne de Python à écrire. 

D'abord, TABLE\_NAME et STATUS\_COLUMN , en haut de main.py , doivent correspondre au nom exact de la table de tâches et de sa colonne d'état tels que chacun les a créés au chapitre 6\. Sans schéma de référence commun, ces deux lignes sont probablement à modifier avant que le service ne réponde correctement. 

Ensuite, les noms de variables d'environnement lus par get\_connection() doivent correspondre à ceux retenus au chapitre 7 pour l'API Node.js. Si le .env du projet parle de POSTGRES\_USER là où le code Python attend DB\_USER , le service plantera au premier appel avec une erreur de clé manquante, ce qui est d'ailleurs le comportement souhaité : mieux vaut un démarrage qui échoue franchement qu'une connexion silencieusement bancale. 

Reste à brancher stats-api dans la stack, avec le Dockerfile vu juste au-dessus placé dans  stats\_api/Dockerfile : un service supplémentaire dans le docker-compose.yml , construit depuis ./stats\_api , rejoignant le même network custom que db et todo-api , recevant sa configuration Postgres via les mêmes clés de variables d'environnement, et publiant son port vers l'hôte (8000 convient, puisque c'est celui qu'expose le Dockerfile). 

Une fois la stack relancée, un appel à http://localhost:8000/stats devrait afficher quelque chose comme : 

{"todo": 3, "in\_progress": 1, "done": 5} 

Et un appel à http://localhost:8000/health devrait afficher : 

{"status": "ok"}

Pour vérifier que le service est bien sur le bon network et pas isolé dans son coin, docker network inspect sur le network custom doit lister stats-api à côté de db et todo-api . 

**Checklist de sortie** 

**Cas nominal** : les compteurs renvoyés par /stats correspondent exactement au contenu réel de la table, vérifié par un COUNT manuel directement en base. 

**Cas limite** : la table est vide, /stats répond 200 avec des compteurs à zéro, jamais une erreur 500 . 

**Cas adverse** : la base est coupée ( docker stop db ), /stats répond avec un code d'erreur clair et un message exploitable, jamais un timeout silencieux ni un stacktrace Python brut renvoyé au client.   
**Pour les curieux** 

Un service de lecture séparé comme stats-api , qui n'écrit jamais dans la base et se contente d'agréger, c'est un motif d'architecture qu'on retrouve partout dès qu'un système grossit : on l'appelle parfois un *read replica* applicatif. L'intérêt : on peut le faire évoluer, le redémarrer, voire le faire planter sans jamais mettre en danger l'intégrité des données, puisqu'il ne fait jamais de  

INSERT ni de UPDATE . Certaines équipes vont jusqu'à donner à ce type de service un utilisateur PostgreSQL dédié avec des droits SELECT uniquement : même si le code applicatif a un bug, la base refuse toute écriture venant de ce service. 

Le code donné ici ouvre une connexion à chaque appel à /stats , puis la ferme. Ça fonctionne, mais ça a un coût : établir une connexion TCP puis l'authentification PostgreSQL prend quelques millisecondes à chaque fois, et sous forte charge, c'est ce qui sature en premier. La solution classique en production, c'est un *pool* de connexions déjà ouvertes et réutilisées entre les requêtes, via une bibliothèque comme psycopg2.pool côté application, ou un proxy dédié comme  PgBouncer devant la base. 

*Que se passe-t-il si todo-api et stats-api lisent et écrivent la même ligne au même instant ?* PostgreSQL gère ça nativement via son système de transactions et de verrous : une écriture en cours bloque ou fait attendre les autres écritures concurrentes sur la même ligne, selon le niveau d'isolation choisi. C'est une notion qui mériterait une session entière à elle seule, mais la retenir en une phrase suffit pour l'instant : deux services qui partagent une base ne sont jamais complètement indépendants, et c'est précisément pour ça que stats-api , qui ne fait que lire, est le cas le plus simple à raisonner. 

**9 \- Publier l'image et redéployer depuis le registry** 

stats-api tourne maintenant à côté de todo-api , les deux construits depuis le code source local via build: dans le compose. On passe à l'étape qui sépare vraiment le build du run : publier les deux images sur un registry, puis redéployer uniquement depuis ces images publiées. On le fait maintenant parce que c'est exactement cette étape qu'une pipeline automatisera dans les prochains jours : comprendre à la main ce que ça implique, c'est comprendre ce que la pipeline fera à notre place. 

**L'essentiel du registry** 

Un **registry** d'images, c'est un serveur qui stocke et distribue des images Docker, de la même façon qu'un npm registry stocke des paquets JavaScript. Docker Hub en est l'exemple public de référence : c'est là que vivent les images officielles node , python , postgres qu'on utilise depuis le début de la journée, et c'est là qu'on va pousser les nôtres. 

La convention de nommage d'un tag suit le format pseudo/projet:version : le pseudo identifie l'auteur ou l'organisation, le nom du projet identifie l'image, et la version identifie précisément quelle construction de cette image on regarde. Le tag latest , lui, ne veut dire qu'une chose : "la dernière image poussée sans tag explicite". Sur un dépôt d'équipe où plusieurs personnes poussent des images, latest change de contenu à chaque push, silencieusement, sans qu'aucune version ne le distingue de la précédente. Un tag de version explicite ( 1.0.0 , puis  1.0.1 ...) est le seul moyen de savoir avec certitude ce qui tourne réellement quelque part.  
Une fois poussée, une image versionnée devient le véritable artefact livrable : ce n'est plus le code source qui compte pour déployer, c'est l'image, figée, testée, identique bit pour bit partout où elle tourne. C'est le principe même du build once, deploy everywhere qui structure le reste de la semaine, et c'est exactement le geste qu'une pipeline CI/CD reproduira automatiquement à chaque merge. 

**Direction le registry** 

**Avant de publier :** deux images à publier, donc potentiellement deux commits distincts : le Dockerfile de stats-api d'un côté, le fichier compose de production de l'autre. On évite le commit qui mélange les deux sujets. 

La mission : se connecter au registry, taguer les deux images selon la convention vue plus haut, les pousser, puis écrire un second fichier compose, docker-compose.prod.yml , qui référence les images publiées au lieu de les construire depuis les sources. Le critère de réussite est net : dans un dossier vide ne contenant que ce fichier et un .env , la stack complète démarre sans qu'une seule ligne de code source ne soit présente sur la machine. 

La connexion au registry, déjà croisée en début de journée : 

docker login \-u \<mon\_pseudo\> 

Le tag, qui associe un nom versionné à une image locale déjà construite : 

docker tag todo-api:latest \<mon\_pseudo\>/todo-api:1.0.0 

docker tag stats-api:latest \<mon\_pseudo\>/stats-api:1.0.0 

Et le push, qui envoie l'image taguée vers le registry : 

docker push \<mon\_pseudo\>/todo-api:1.0.0 

docker push \<mon\_pseudo\>/stats-api:1.0.0

Reste à écrire docker-compose.prod.yml : chaque build: . du fichier compose d'origine y devient un image: \<mon\_pseudo\>/todo-api:1.0.0 (et son équivalent pour stats-api ), en conservant le reste de la configuration, le network, les volumes, les variables d'environnement. 

**Ce qu'on vérifie avant de fermer** 

**Nominal** : dans un dossier vide contenant uniquement docker-compose.prod.yml et un  .env , docker compose \-f docker-compose.prod.yml up \-d démarre toute la stack sans accroc. 

**Limite** : une image poussée sans tag explicite se retrouve taguée latest par défaut. En équipe, le bon réflexe reste de toujours donner un tag de version explicite, pour éviter qu'un push écrase silencieusement ce que quelqu'un d'autre utilise. 

**Adverse** : docker history sur l'image publiée ne doit faire apparaître aucun secret, aucune valeur de .env , aucun jeton de connexion. Une couche supprimée par une instruction ultérieure du Dockerfile reste parfaitement lisible dans l'historique : si un ARG ou un COPY .env a fui dans une couche intermédiaire, la couche finale a beau ne plus l'exposer au runtime, l'information reste récupérable par quiconque a accès à l'image. C'est une faute grave, pas un détail cosmétique.   
**On va plus loin** 

Docker Hub public est parfait pour s'entraîner, mais une entreprise héberge presque toujours son propre registry privé : GitLab Container Registry intégré directement au dépôt de code, AWS ECR côté cloud Amazon, ou Harbor en solution open source auto-hébergée. Le principe reste identique, seule l'URL du registry change dans les commandes de login, tag et push. 

L'authentification par mot de passe, pratique pour s'entraîner en solo, cède la place en entreprise à des jetons d'accès à durée de vie limitée et à portée restreinte (lecture seule, ou push limité à un projet précis) : un jeton qui fuite dans les logs d'une pipeline coûte beaucoup moins cher à révoquer qu'un mot de passe qui protège aussi d'autres services. 

Un registry qui accumule des années de tags finit par peser lourd et coûter cher en stockage : les politiques de rétention automatisent la suppression des images trop anciennes ou jamais retirées d'un environnement, en général en gardant les dernières versions de chaque branche majeure et en purgeant le reste après une fenêtre de temps. 

Publier une image ne garantit pas qu'elle vient bien de la pipeline qu'on croit : la signature d'images, avec des outils comme cosign dans l'écosystème Sigstore, permet de prouver cryptographiquement qu'une image donnée a bien été construite par le processus attendu, et l'attestation de provenance va plus loin en documentant exactement quel commit, quel pipeline et quelles dépendances ont produit l'image. C'est un sujet qui prend de l'ampleur avec les exigences de sécurité de la chaîne logicielle. 

Enfin, une équipe qui mélange des Mac Apple Silicon et des serveurs x86 en production se heurte vite à un problème d'architecture processeur : une image construite sur un Mac M1 ne tourne pas nécessairement sur un serveur x86 classique. Les images multi-architecture, construites avec  Docker Buildx, empaquettent plusieurs variantes sous un seul tag, et Docker choisit automatiquement la bonne au moment du pull selon la machine qui exécute la commande. 

**10 \- Mesurer et optimiser** 

Les deux services tournent maintenant depuis des images publiées, sans une ligne de code source sur la machine : la séparation build / run est acquise. Reste à regarder ce qu'on a vraiment construit toute la journée, avec des chiffres plutôt qu'avec une impression. On le fait maintenant parce que c'est le moment naturel d'agrégation : les mesures dispersées entre les chapitres précédents se comparent enfin entre elles, et parce que ces réflexes de mesure sont exactement ceux qui comptent une fois qu'une pipeline construit ces mêmes images cinquante fois par jour. 

**L'essentiel des métriques d'image** 

Quatre métriques, quatre commandes, et surtout quatre lectures différentes de ce qu'elles révèlent. 

La **taille**, avec docker images , donne le poids total de l'image telle qu'elle sera transférée à chaque pull . C'est la métrique la plus visible, mais elle ne dit rien de comment ce poids est réparti : deux images de même taille peuvent avoir des profils de cache radicalement différents. 

Le **nombre de couches et leur poids individuel**, avec docker history , complète justement ce point aveugle : une image légère peut cacher une seule couche énorme (un COPY . mal placé qui embarque un dossier entier), et une image qui semble avoir beaucoup de couches n'est pas forcément lourde si chacune pèse quelques kilo-octets.  
**docker history ?** Une commande qui liste, couche par couche, comment une image a été construite. Utile pour repérer une couche anormalement lourde ou un secret qui aurait fui dans une instruction COPY , comme vu au chapitre précédent. 

Le **temps de build à froid contre à chaud** compare time docker build \--no-cache \-t monimage . (rien en cache, tout se reconstruit) à time docker build \-t monimage . juste après (le cache Docker réutilise les couches identiques). L'écart entre les deux mesure directement l'efficacité de l'ordre des instructions du Dockerfile : plus l'écart est grand, mieux le cache est exploité. Attention cependant, cette mesure dépend de l'état de la machine qui build : un docker system prune avant la mesure à froid est nécessaire pour un résultat comparable dans le temps. 

Le **temps écoulé entre le lancement d'un conteneur et sa première réponse HTTP réussie** capture autre chose encore : ce que l'utilisateur final ressent réellement au démarrage. Une image peut être minuscule et pourtant lente à répondre, si l'application exécute des migrations de base ou du travail d'initialisation lourd avant d'accepter sa première requête. Cette métrique-là est la seule des quatre qui parle vraiment de l'expérience de démarrage, ni la taille ni le nombre de couches ne la prédisent. 

**Le tableau de mesures** 

**Toujours côté Git :** ce tableau de mesures a sa place dans le README, versionné, pas juste dans un terminal qu'on referme. Un commit à chaque nouvelle série de mesures permet de comparer l'historique dans le temps, pas seulement l'état du jour. 

Pour chacune des deux images produites aujourd'hui ( todo-api et stats-api ), un tableau à quatre colonnes prend forme : 

| Image  | Taille  | Couches (poids  max) | Build froid /  chaud | Temps 1re réponse  HTTP |
| :---- | ----- | :---- | :---- | :---- |
| todo  api | ...  | ...  | ...  | ... |
| stats  api | ...  | ...  | ...  | ... |

Une fois le tableau rempli une première fois, l'étape suivante consiste à optimiser puis remesurer : une image de base plus fine ( alpine plutôt que l'image complète, quand c'est compatible avec les dépendances), un ordre de COPY qui maximise le cache (dépendances avant code applicatif), un multi-stage qui ne garde vraiment que le nécessaire dans le stage final, un .dockerignore complété si un fichier inattendu traîne dans l'image. Deux cibles chiffrées donnent un objectif concret à viser : todo-api sous les 150 Mo avec un build à chaud sous 5 secondes, stats-api sous les 180 Mo (l'image de base python:slim pèse mécaniquement plus lourd qu'une image  node:alpine , viser trop bas dessus coûte plus cher que ça ne rapporte). 

Si une optimisation fait grossir l'image au lieu de la réduire, c'est une régression, pas un détail à ignorer : le cas le plus fréquent, un COPY \--from=builder qui récupère un dossier trop large (tout /app au lieu de juste /app/dist et /app/node\_modules , ou tout /app côté Python au lieu du strict nécessaire). Une régression de ce type mérite une ligne expliquée dans le Journal de bord  
du README : ce qui a été tenté, pourquoi ça n'a pas marché, ce qu'on retient pour la prochaine tentative. 

*Jusqu'où peut-on descendre en taille avant qu'une image devienne impossible à débugger ?* Il n'y a pas de réponse universelle : une image ultra-minimale sans shell ni outils de diagnostic complique furieusement un docker exec de dépannage en production. À chacun de pousser sa propre image jusqu'au point où la compression cesse d'être rentable, et de noter dans le Journal de bord du README l'endroit précis où ce compromis a été tranché. 

*Quel est le vrai coût d'un build à froid dans une pipeline qui tourne cinquante fois par jour ?* Multiplier le temps de build à froid mesuré plus haut par cinquante donne un ordre de grandeur concret, en minutes de calcul cumulées sur une journée. Cette estimation, calculée à partir des propres chiffres du tableau et consignée dans le Journal de bord du README, donne une intuition chiffrée de pourquoi le cache de build devient un sujet d'optimisation sérieux dès qu'une pipeline tourne à cette fréquence. 

*Comment mesurer l'écart entre l'instant où le conteneur démarre et l'instant où le service est réellement prêt à répondre ?* Le temps de démarrage du conteneur ( docker start qui rend la main) et le temps de disponibilité réelle du service (première réponse HTTP à 200\) ne sont pas la même chose, et l'écart entre les deux est justement ce que capture la quatrième métrique du tableau. Un petit script qui boucle sur curl toutes les quelques centaines de millisecondes juste après le  

up \-d , jusqu'à obtenir un 200, donne une mesure directe de cet écart pour chacune des deux images : de quoi comparer, à consigner dans le Journal de bord du README, si stats-api met plus ou moins de temps que todo-api à devenir réellement joignable. 

**Avant de valider une optimisation** 

Trois vérifications avant de considérer une optimisation comme acquise, pas juste "ça a l'air plus petit" : 

le build à froid aboutit toujours sans erreur après un docker system prune , pas seulement en s'appuyant sur un cache local qui masquerait un problème, 

le temps de démarrage n'a pas régressé par rapport à la mesure précédente dans le tableau, 

l'image ne contient toujours aucun secret ni fichier de test embarqué par erreur, vérifiable avec docker history comme au chapitre précédent. 

**Le test qui rejoue toute la journée** 

Un dernier scénario, qui traverse plusieurs chapitres d'un coup. Dans un dossier tout neuf, avec uniquement docker-compose.prod.yml et un .env reconstruit à partir de .env.example , la stack complète démarre depuis les images publiées. Puis, dans l'ordre : un POST avec un champ obligatoire manquant, qui doit être refusé proprement plutôt que planter le service ; une vérification que localhost:5432 reste injoignable depuis la machine hôte, comme configuré au chapitre 6 ; une interrogation de /stats , comparée au contenu réel de la table par un COUNT manuel ; et pour finir, le conteneur db tué en pleine charge, pour observer si todo-api et  stats-api dégradent proprement (erreurs claires, codes HTTP explicites) ou s'écroulent silencieusement.  
Tout ce qui casse à cette étape se note dans le Journal de bord du README, avec ce qui a été observé et pourquoi. Ce test-là n'a pas vraiment de fin propre : on peut l'enrichir encore, ajouter un troisième service qui dépend des deux premiers, simuler une latence réseau artificielle entre les conteneurs, ou mesurer combien de temps il faut à la stack entière pour redevenir saine après que db redémarre. Il y a toujours une couche de robustesse supplémentaire à aller chercher. 

**Récapitulatif Jour 1** 

**Ce qu'on a appris aujourd'hui** 

1\. **DevOps et ses 3 piliers** : Culture, Automation, Measurement, le cycle Plan vers Monitor, et les 4 métriques qui disent si ça marche 

2\. **Ce qu'est vraiment un conteneur** : un processus Linux isolé par des namespaces et bridé par des cgroups, pas une machine virtuelle. On en a fabriqué un à la main pour le prouver 

3\. **L'architecture Docker et son vocabulaire** : client, daemon, registry, et les six briques Container, Image, Registry, Volume, Network, Dockerfile 

4\. **Le cycle de vie d'un conteneur** : pull , create , start , run , stop , rm , rmi , et pourquoi supprimer un conteneur ne supprime pas son image 

5\. **Notre première image, construite ensemble** : une app Node.js, un Dockerfile minimal, et les trois ports qui doivent raconter la même histoire 

6\. **Le Dockerfile de production** : layers et cache de build, .dockerignore , utilisateur non root, multi-stage. Cette fois transposé sur votre propre projet, pas recopié 

7\. **Les Networks** : deux conteneurs ne se voient pas par défaut, un network custom leur donne une résolution par nom, et deux networks séparés isolent vraiment 

8\. **Les Volumes** : rendre les données persistantes et partageables, indépendamment de la vie des conteneurs 

9\. **Docker Compose** : toute la stack dans un fichier, configurée par variables d'environnement, avec les secrets hors du dépôt 

10\. **Une stack polyglotte** : un service Python branché sur la même base qu'une API Node.js, sans que l'un sache quoi que ce soit du langage de l'autre 

11\. **Publier une image** : tag , push , et le fait de pouvoir redéployer sa stack sans le code source. C'est exactement ce qu'automatisera notre pipeline plus tard dans la semaine 

12\. **Mesurer avant d'optimiser** : taille, couches, build à froid contre build à chaud. Une optimisation qu'on ne mesure pas est une croyance, pas un résultat 

**Points d'attention pour demain** 

**Votre Todo API doit être dockerisée et fonctionnelle** : CRUD de tâches, base Postgres avec volume de persistance, configuration par variables d'environnement, network custom, et au moins une image publiée sur votre registry 

**Le journal de bord du README compte autant que le code** : si des mesures ou des pannes sont restées dans un terminal fermé, elles sont perdues. Un quart d'heure pour le remplir proprement, c'est du temps rentabilisé

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAA1CAYAAABofjQZAAAELUlEQVR4Xu2aSahcRRSGj3OcFkokuvEZF3GISAJGRAyCoKIuHHBaCqIiIgoxQVAUskwCrtQ4BHUpggtX4tSiYhQcUBxAEaJRFENQnIjDU89v/cW7OXW7363uy8tr83/w8eDdU7du999dt6pumwkhhBBCCCGEEEIIIYTYj7iCvhd8pFGzksaaSX3Fvc6Gc5i73h3Q2L7Gl+hN7oFWgv/BW9wXrWxf66v0LvdgK3nIyjZXUXBRy/FHaW/cSP8JvtyoOZvGmj6cdS+kka1W1k/q3+6dVnIvjfV9uMVKXrCy7mYK8KWIxwe0N/Z1+PApmsE3Hv4S6vryE/cAmtlBY20f7rK515RR+FThJxdl+GfSL3rwGyv72k4zS2ms+8v92P2oQgSNds3z7LG9wzjI/ZnmGtwe4KdWnnM+/7C9+5t1T6SZqQm/T86zsq8PaeY4Gut+cA9t1HXhaGsfQY6kABMy1DTrcvhLWdMVjCZfWdnfCpqZL/zlNpdN9lLaGwp/cYa/ICh8hV9cSDP8M+gHlkLCX4h1enPS1IXa8L90H6YXN2q6Uhv+t+4TNrfmxnyghv9d+MNm+3ij2jZMRtEl/DwZO8vaN0hqWGLpg7MtiBEkjyII7BxaO7K0sdnK/pbRjMKnMfwIvr3wcksbJtfTY5pFPXK4pVEGIsgbrAxvUhQ+VfgKvwABP+f+RGO73yy9ibfTk1OzsbiEPu3utrKv3+nrlp43nE5rX39G4dNh4d9h5QbNKP9033c3umto1wnbNTRu0AxzlmITaZO7lh5i3VD4NK8e2sAk7EGKmX9sO8y8VMPMGxO+vEGSd/WGgZ1M3Fo+o/G8w8z9fec+6V5J84oiovCpwk9OVfgYIt+pFHvl8TwD2oXV7v30XUtDfTzfKPGBvcC6c5q7wX2D4r4fzznKH91rrWTqw+/L++g4zLi30uetfUMnivt0fKrXlRMszf6fpQg3nj/6vaX9BphR+O7nlpZsfS3bcJ6rbe4xMYbh2CdGixjGuBzlXmbphydwp5X94XZwEs1MffgY9t9236r0NYo1dNvaGTN0uDJ4qtV/W491f7Xy2pvbuwDDO8x95aUcrqMGzPa/trK/FTSj8E3hN52q8MeZ7XdBT/UWCIWv8IsLUfgK/z8UfncWVfi30QeCq3h82sLHUg7Lq64eb+3hH0HBqPBnrDznKPFh22llf/sk/AGNHeHXoWAxhp/fyJqHOjViYwaz8uZDmF001vYhVkXxkbDCn4ftVvbZh89YSd6xi7V9+KaVKPx5UPgTMqCxo2kI/1xL9/nY7yTusPYffZxC8Zpim0nErQQPoyILEv4Gui24hsfX0nh8PY+D5TTWYOJYu+NWy4x7D33cymvo4mOWfhgCseM3Ckw011nqa9z+0O5uigdBbaCP2O58KoQQQgghhBBCCCGEEGL/4F9RqTR3u2Jt7AAAAABJRU5ErkJggg==>

[image2]: <data:image/png;base64,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bBsKSCol0dVulJtZyWq7COYJJ5yQjR071kjQfq+99so222yzJtROVY7J4XA0JphMduvWLbv44ouNKZZLcgEpAS4gDoej2nABKRHr1q0zSkBUCysVAbniiiuMW221VfxSu+Kpp57aRCwge08gpQ3YwHjhhRcaiRs5HI7GBcUVJ02aZEyx5W0SAvLss88aDz/8cNuRntoKZMGCBcYddtghfqldQeYF+2E+/fRT4z333GMCQp8A+M0331jcQ/0DUq+T43A42gYm1WeeeaaRFUlqcAEpAfPnzzcOGjQofqmiYFVGOQNKxkMXDIejY4GJ46mnnmr8/vvv45drDheQEuAC4nA4agEXkBLwzDPPGI844ogmApJKQxW5sGh8X03QH5nA/W233WbsCPjuu++yG264wcimzfPPPz/Pg6eNsMPRkcDEccyYMcavv/46frnmSEJAnn76aeORRx5pRRVTExCtAKq9Alm4cKEVVGtpI5F2rsrAKkZCVheruN9//91IPa/XX389F6QNGzZE35TZKofPQM55+PDh2c4772zce++9s2uuuSbfmV8I/A4iAB977LFsyZIllhwA2dfC9+t4BP4Nvv3229mIESNswyb84x//mO2zzz5Z//79jR1FRB0O4d5777UagfCTTz6JX645khAQGZijjjqqiYAUMnC1gASETKhqgswLdqJiWGExsOEIzps3zwzzI488YiSDgyZdCsrTTXG33XbLs7vOOeec+KusEgArQcjqh8yvM844w8iKoG/fvvnGJkQqBsfBfYSbb765/c4WW2xhvOOOO2wjpqoZq0DcW2+9ZaTLIw/KG2+8Yfztt9+y1atX5wLCct7h6EjAjc3EFb755pvxyzWHC0gJcAFxAXE4agEXkBKQuoDgtoG9evWKX6ooRo8ebeXjVdqkGHB1we7du1uJk9NOO83YuXNnG3gPPPCAkb014f6Sbbfdtklgnv7uCI4MNt9J2Xq5yN5//3373MEHH2z87LPPgqPITBx22WWX/PsRBGqHaR8N4oIQbbPNNkbeT247cQ6I4Oy6667ZSSedZOR4ETxEC953331Nfs/haHQgIJRQgkyqUkMSAqIZ9NFHH237IFITkJtuusnYr1+/+KWKgL0ekAZbxx13XN6PpBgkIBjg6dOnZ3369DGyixUhoEglRACZxctAY+TDwNy1115rO9xl8BXnYCUA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7ZCbZB7Ida7EuYzDDjusST0n80jjXepe//KXvyyccsopjey4445NPSVER/7zn/903z5zuE6/S5Dbs88+24wbWY0xtKXALb3nnns2UgQyAvfff38jDutdfPHF3ZfnCkrSToHMQiEqIrn//vs3ss022yx87GMfW/jDH/7QyCilMAqU+mOPPTZYkMNgwbon0g2iIoy77rqrIUry2te+duH5z3/+c845IJQoJK9tscUWCy984QsbUcts7dq1C5/5zGcaeeihh57z/RsL94fQR+2wjNfPfvazQX8ZmX1//vOfu28bKNzf/e53g90b+cUvftF965KwMxW3I65vY+G6jDGx+x02B+xUiR2fHjXZwf/+97/vvrWBOBv5yU9+0txn3v/kk09239oYMBs2bGjEexh2mS/T7pDbECe65ZZbGlF5+2Uve9nCC17wgkauv/767tsbiOuRH/7wh816+cEPftCIuQwZD7t43+/vxP0++OCDg+t//PHHF3784x8PCKwLc0rMoT2/xhmPfJ9r7D4vzzEGnvXlfQLjBDlYg86aEUaf38/9gGu2DkkRyAiEQLSNvfTSS7svzxVSMw899NBGxm12FQvdZP7jH//YLGziu7pWlgmXCXXGGWcsvOQlL2msemKxbCyUX6HIicl6zjnnNG2DyT333NO8JwuA0n/5y18+OHl/5plnLlx99dXNdRCLyoK48MILG1FeQXZaJvj3v//9zq//Nyjtz3/+841cdNFFDWEiPdJdfHfccUezYKNAZKHYCdq5kezWsuDcj2BjFNK2227b3G8sbnCf3/ve9xp5z3ve0zzXjAcymDQRQHbMBRdc0Eh398j6V72AUUQ+8pGPNIkTbbgvZbqJMWA42IUT1+M62/Ab6eDJ6Nhqq62aXSxh4FBSbZhvKRXECPK+7bbbrpFhO2quriQF2F1JjojL6ze/+U337RPB2Puel770pY2YPw5immOEku3C+vEeItPt3e9+92CHe+211zbvCeEqeW4+ObFN7MbN54yne/EdjIphhoWOf+YBI4TAOONB6RNGRNeNi7ATBP/pT3/arKHzzjuvEe5PvxkXsGdiTpo3BJDgrrvu2oh76xuKQJZAEUgRyGIoAhkfRSBFIDNBCESgqG+phRQe4iCU11LgFjjppJMacT8mjtgOQZCU9ChYBCYV1xDZeeedJ0oNNdm7bXcpmUxYpVgo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>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,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>

[image5]: <data:image/png;base64,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>