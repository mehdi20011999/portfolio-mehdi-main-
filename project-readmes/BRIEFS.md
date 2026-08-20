# Ce qu'il faut construire

Quatre projets, dans cet ordre. Chacun couvre une famille de postes différente et
transforme une ligne de compétence du CV en preuve.

Ordre conseillé : **P-02 d'abord**, parce qu'il débloque les candidatures développement
web tout de suite, pendant que les autres avancent.

---

## P-02 · Plateforme Django conteneurisée

**Ce qu'il prouve** : Django, Docker, CI/CD, cloud — les quatre d'un coup.
**Pour quels postes** : Capgemini, DEEPINTECH, ITINFODEV, tous les postes web.
**Durée réaliste** : 2 à 3 semaines.

Le sujet importe peu, choisis quelque chose que tu comprends : gestion de stock,
suivi d'interventions, réservation de salles. Ce qui compte, c'est la chaîne complète.

À livrer :
- application Django avec authentification, un modèle métier réel, un CRUD complet
- PostgreSQL, pas SQLite
- `Dockerfile` + `docker-compose.yml` qui démarrent l'ensemble en une commande
- au moins 10 tests avec `pytest-django`
- un workflow GitHub Actions qui lance les tests à chaque `push`
- le badge de statut du workflow en haut du README
- déploiement sur Render, Railway ou Fly.io (offre gratuite) — et l'URL dans le portfolio

Le badge vert du pipeline en haut du README fait plus d'effet que trois paragraphes.

---

## P-03 · BAYAN — chaîne de données ouvertes marocaines

**Ce qu'il prouve** : l'ingénierie des données, le profil le plus en tension au Maroc
après la cybersécurité, et celui dont le portfolio ne montrait encore rien.
**Pour quels postes** : Data Engineer chez SII Maroc, Capgemini, Deloitte, Muller's
Solutions — dont une offre à Meknès, en hybride.
**Durée réaliste** : 3 à 4 semaines.

Ce projet a été choisi après lecture des offres réelles. La fiche de poste Data Engineer
de SII Maroc demande : pipelines ETL/ELT sur des sources variées, modélisation, API de
données, plateformes cloud, SQL, Spark, Python. Le projet ci-dessous coche chacune de ces
lignes, dans cet ordre.

### Le sujet

Les statistiques publiques marocaines existent — Haut-Commissariat au Plan, Bank
Al-Maghrib, ANRT, portails ministériels — mais elles sont pratiquement inutilisables :
tableaux enfermés dans des PDF, fichiers Excel dont les colonnes changent d'une année sur
l'autre, séries interrompues, libellés inconstants entre l'arabe et le français.

C'est exactement le quotidien d'un data engineer. Un pipeline construit sur des sources
propres ne prouve rien ; un pipeline qui survit à ces sources-là prouve tout.

### À livrer

- **Ingestion** : un connecteur par source, en Python, incrémental et idempotent. Relancer
  un traitement deux fois ne doit jamais dupliquer une ligne.
- **Orchestration** : Airflow, avec des DAG lisibles, des reprises sur échec, et un
  rattrapage historique fonctionnel. C'est le mot-clé le plus recherché des offres.
- **Transformation** : dbt, en couches — brut, intermédiaire, exposition — avec des tests
  sur chaque modèle : unicité, non-nullité, valeurs attendues, fraîcheur.
- **Entrepôt** : PostgreSQL, modélisé en étoile. Documente le choix du grain de chaque
  table : c'est la question d'entretien classique.
- **Qualité** : un rapport de qualité publié à chaque exécution. Une source qui change de
  format doit faire échouer le traitement bruyamment, jamais produire des chiffres faux
  en silence.
- **Spark** : sur le plus gros jeu de données seulement, et uniquement si le volume le
  justifie. Utiliser Spark sur 40 Mo se remarque et se retourne contre toi en entretien.
- **Exposition** : une API REST et quelques tableaux de bord.
- **Conteneurisation et intégration continue**, comme pour les autres projets.

### Points de rigueur

**Vérifier les conditions de réutilisation de chaque source.** Les données publiques ne
sont pas toutes librement réutilisables. Note pour chaque source son origine, sa date de
collecte et sa licence, dans un fichier `SOURCES.md`. C'est une exigence professionnelle
autant qu'une précaution juridique.

**Ne jamais corriger une donnée silencieusement.** Si une valeur paraît aberrante, elle est
signalée et tracée, pas réécrite. La traçabilité de la transformation est le cœur du
métier.

**Ne pas commenter les chiffres.** Le pipeline livre des données, pas des conclusions sur
l'économie marocaine. Publier une analyse politique à partir de statistiques retraitées
par soi-même est le meilleur moyen de se voir reprocher une erreur de traitement.

### Ce qu'il faut montrer dans le README

Une capture de l'interface Airflow avec des exécutions vertes sur plusieurs jours, le
graphe des dépendances dbt, et un exemple concret avant/après : le tableau PDF illisible
d'un côté, la ligne propre en base de l'autre. Cette seule image raconte le projet mieux
que trois paragraphes.

## P-04 · Modèle de vision servi en API

**Ce qu'il prouve** : que « Déploiement de Modèles d'IA » sur ton CV est vrai.
**Pour quels postes** : le Data Scientist de Safran, et tout poste ML.
**Durée réaliste** : 2 semaines.

À livrer :
- un modèle entraîné ou affiné sur un jeu de données public (ne repars pas de zéro,
  un transfert d'apprentissage sur MobileNet suffit et se justifie mieux)
- les métriques réelles dans le README : précision, rappel, matrice de confusion
- une API FastAPI : `POST /predict` reçoit une image, renvoie les classes et les scores
- la documentation Swagger accessible
- conteneurisation, et une page HTML minimale pour tester sans outil
- le temps d'inférence mesuré et affiché

Annonce les chiffres même s'ils sont moyens. Un modèle à 82 % documenté honnêtement
vaut mieux qu'un modèle « performant » sans chiffre.

---

## P-05 · Pilote de périphérique STM32 en C

**Ce qu'il prouve** : le titre « systèmes embarqués » de ton diplôme.
**Pour quels postes** : validation et V&V chez Scalian, Expleo, Safran, RAYCO.
**Durée réaliste** : 1 à 2 semaines. Une carte Nucleo coûte moins de 200 dirhams.

À livrer :
- un pilote en C bare-metal pour un capteur en I²C (registres écrits à la main,
  pas seulement des appels HAL — c'est la différence qui se voit en entretien)
- gestion par interruption plutôt que par attente active
- une machine à états claire, documentée dans le README
- des captures d'analyseur logique montrant la trame sur le bus
- une note sur la consommation ou le temps de réponse mesuré

---

## Règles communes

1. **Un dépôt public par projet**, avec le README rempli à partir de `TEMPLATE.md`.
2. **Une image dans chaque README.** Sans capture, le projet n'existe pas.
3. **Des commits réguliers et lisibles.** Un dépôt avec un seul commit
   « initial commit » de 4 000 lignes fait douter de l'auteur.
4. **Teste les instructions d'installation sur une machine propre** avant de publier.
5. **Mets à jour le portfolio** dès qu'un projet est en ligne : statut « Livré »,
   nom du dépôt dans `CONFIG.repos`, URL de la démo dans `CONFIG.demos`.

## Rythme

Un projet par mois, annoncé sur LinkedIn le jour de la publication, avec la capture
d'écran et deux phrases sur ce qui était difficile. Quatre mois plus tard tu as un
profil que très peu de candidats juniors peuvent présenter — et un fil LinkedIn qui
a travaillé pour toi pendant ce temps.

---

## P-06 · RASSAD — supervision réseau autohébergée

**Ce qu'il prouve** : la moitié « réseaux » de son Master, aujourd'hui absente de ses
projets alors qu'elle figure dans l'intitulé de son diplôme.
**Pour quels postes** : ingénieur réseaux, administrateur systèmes et réseaux, supervision
et exploitation chez les SSII et les opérateurs, postes d'infrastructure en général.
**Durée réaliste** : 2 à 3 semaines.

Une sonde qui se branche sur le switch d'une PME et répond à trois questions qu'un petit
réseau d'entreprise ne sait généralement pas résoudre : qu'est-ce qui est connecté chez
moi, est-ce que ça fonctionne, et qu'est-ce qui vient d'apparaître.

À livrer :
- découverte passive du réseau local : ARP, mDNS, DHCP — sans balayage agressif
- inventaire des équipements avec adresse MAC, constructeur, adresse IP, première et
  dernière apparition
- interrogation SNMP des switches et imprimantes : état des ports, débit, disponibilité
- historique en base de séries temporelles et tableau de bord Grafana
- alerte à l'apparition d'un équipement inconnu sur le réseau
- une carte de la topologie générée automatiquement
- installation par une seule commande sur Raspberry Pi

**Deux points de rigueur à ne pas négliger.**

D'abord, l'outil est **strictement passif et défensif**. Il observe le réseau sur lequel
il est installé, il n'interroge rien à l'extérieur et il ne teste aucune vulnérabilité.
Cette limite doit être écrite noir sur blanc dans le README : c'est ce qui distingue un
outil d'exploitation d'un outil d'intrusion, et c'est la première chose qu'un responsable
sécurité vérifiera.

Ensuite, il ne s'installe **que sur un réseau dont on a l'autorisation explicite**. Pour la
démonstration, utilise ton propre réseau ou un laboratoire monté avec des conteneurs.
Capturer du trafic sur le réseau d'un tiers sans accord écrit est une infraction, et c'est
un sujet sur lequel un recruteur en sécurité te testera.

L'argument commercial est également solide au Maroc : beaucoup de PME refusent d'envoyer
leurs données réseau vers un service étranger. Une sonde autohébergée, sans cloud et sans
abonnement, répond exactement à cette réticence.

---

## P-07 · AYN — accélérateur de traitement d'image sur FPGA

**Ce qu'il prouve** : VHDL et Verilog, les deux dernières compétences du CV sans aucun
projet derrière elles.
**Pour quels postes** : STMicroelectronics à Casablanca, bureaux d'études en
microélectronique, et les postes de validation matérielle chez Expleo, Scalian et Safran.
**Durée réaliste** : 3 à 4 semaines. Une carte de développement d'entrée de gamme suffit.

Reprendre la détection de contours du projet P-01 et la refaire entièrement en matériel :
un pipeline câblé en VHDL qui traite le flux vidéo ligne par ligne, à la cadence du
capteur, sans processeur dans la boucle.

À livrer :
- pipeline de convolution 3×3 en VHDL, avec mémoires tampons de lignes
- interface caméra et sortie vidéo
- banc de test complet : chaque module simulé avant toute synthèse
- rapport de synthèse : ressources utilisées, fréquence maximale atteinte
- **la comparaison chiffrée** entre la version logicielle sur Raspberry Pi et la version
  matérielle, latence mesurée à l'oscilloscope

### Le seul point qui compte vraiment

L'intérêt du projet n'est pas l'algorithme — un filtre de Sobel est un exercice
classique — mais la démonstration que tu sais **quand** le matériel se justifie et
combien il apporte réellement. Le chiffre final, latence logicielle contre latence
matérielle sur le même traitement et la même image, est ce qu'un recruteur en
microélectronique retiendra.

Un projet FPGA sans mesure comparative ressemble à un travail pratique d'école. Avec la
mesure, c'est une décision d'ingénieur documentée.

### Discipline de travail

Simuler avant de synthétiser, systématiquement. Le réflexe de téléverser pour voir ce qui
se passe est la première chose qu'un encadrant en conception numérique cherche à corriger,
et cela se repère immédiatement dans l'historique d'un dépôt.
