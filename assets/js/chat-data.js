/* =========================================================
   Base de connaissances de l'assistant
   ---------------------------------------------------------
   Chaque intention porte des mots-clés et deux réponses.
   Pour enrichir l'assistant, ajoute une intention ici :
   aucun autre fichier n'est à modifier.
   ========================================================= */

window.CHAT_KB = {

  intents: [

    {
      id: "salutation",
      keywords: ["bonjour","salut","bonsoir","hello","hi","hey","salam","coucou","ça va","cava"],
      fr: "Bonjour. Je réponds aux questions sur le parcours de Mehdi Ammou : sa formation, ses expériences, ses compétences techniques et ses projets. Que voulez-vous savoir ?",
      en: "Hello. I answer questions about Mehdi Ammou's background: his education, work experience, technical skills and projects. What would you like to know?"
    },

    {
      id: "profil",
      keywords: ["qui est","profil","parcours","presentation","présentation","c'est qui","who is","background","résumé","resume","son profil","his profile"],
      fr: "Mehdi Ammou est ingénieur réseaux et systèmes embarqués, diplômé d'un Master de l'Université Moulay Ismail à Meknès en 2024. Sa particularité est de couvrir deux domaines qui se croisent rarement : l'électronique bas niveau (C, STM32, Raspberry Pi) et le développement logiciel moderne (Python, Django, Docker, cloud). Il a effectué deux stages, dont un de neuf mois en télétravail pour une entreprise basée au Panama.",
      en: "Mehdi Ammou is a networks and embedded systems engineer, with a Master's from Université Moulay Ismail in Meknes, earned in 2024. What sets him apart is covering two fields that rarely meet: low-level electronics (C, STM32, Raspberry Pi) and modern software development (Python, Django, Docker, cloud). He has completed two internships, including a nine-month remote one for a company based in Panama."
    },

    {
      id: "formation",
      keywords: ["formation","diplome","diplôme","études","etudes","master","licence","université","universite","bac","école","ecole","degree","education","studied","graduate","school"],
      fr: "Master en Réseaux Informatiques et Systèmes Embarqués (2022-2024) et Licence en Mathématiques et Informatique (2017-2021), tous deux à la Faculté des Sciences de l'Université Moulay Ismail, Meknès. Baccalauréat Sciences Mathématiques A au Lycée Hassan II de Midelt en 2017.",
      en: "Master's in Computer Networks and Embedded Systems (2022-2024) and Bachelor's in Mathematics and Computer Science (2017-2021), both at the Faculty of Sciences, Université Moulay Ismail in Meknes. Baccalaureate in Mathematical Sciences A at Lycée Hassan II in Midelt, 2017."
    },

    {
      id: "experience",
      keywords: ["expérience","experience","stage","stages","travaillé","travaille","parcours pro","emploi","poste","internship","worked","work history","job"],
      fr: "Deux expériences. Chez Grupo Marpica SA (Panama, octobre 2024 à juin 2025, en télétravail) : contribution au projet Recharge Platforms en Python et Java EE, conception de bases de données dont une base de séries temporelles InfluxDB, travail en Scrum. Au Ministère de la Justice du Maroc (août à octobre 2023) : développement de fonctionnalités pour l'application Django du système de bibliothèque.",
      en: "Two roles. At Grupo Marpica SA (Panama, October 2024 to June 2025, remote): contributed to the Recharge Platforms project in Python and Java EE, designed databases including an InfluxDB time-series store, worked in Scrum. At the Moroccan Ministry of Justice (August to October 2023): built features for the Django library-system application."
    },

    {
      id: "marpica",
      keywords: ["marpica","panama","recharge platform","influxdb","séries temporelles","time series","distance","remote","télétravail","teletravail"],
      fr: "Chez Grupo Marpica, entreprise panaméenne, Mehdi a travaillé neuf mois entièrement à distance sur le projet Recharge Platforms, en Python et Java EE dans un environnement cloud. Il y a conçu les bases de données, dont une base InfluxDB pour les séries temporelles. Le décalage horaire imposait une autonomie complète : c'est l'expérience qui démontre le mieux sa capacité à travailler sans supervision directe.",
      en: "At Grupo Marpica, a Panamanian company, Mehdi worked nine months fully remote on the Recharge Platforms project, in Python and Java EE within a cloud environment. He designed the databases there, including an InfluxDB store for time-series data. The time difference demanded complete autonomy — it's the experience that best demonstrates his ability to work without direct supervision."
    },

    {
      id: "ministere",
      keywords: ["ministère","ministere","justice","bibliothèque","bibliotheque","library","government","administration"],
      fr: "Au Ministère de la Justice, entre août et octobre 2023, Mehdi a développé de nouvelles fonctionnalités pour l'application web Django du système de bibliothèque, utilisée par les agents du ministère. C'était son premier contact avec du code en production réellement utilisé au quotidien.",
      en: "At the Ministry of Justice, from August to October 2023, Mehdi built new features for the Django library-system web application used by ministry staff. It was his first contact with production code genuinely used day to day."
    },

    {
      id: "competences",
      keywords: ["compétences","competences","skills","technologies","stack","maîtrise","maitrise","technique","outils","tools","competences techniques"],
      fr: "Programmation : Python, C, C++, VHDL, Verilog. Frameworks : Django, Laravel, TensorFlow, OpenMV. DevOps et cloud : Docker, Kubernetes, Jenkins, AWS, Azure, Google Cloud, Git. Données : InfluxDB, SQL, analyse de données et machine learning. Ses points forts réels sont Python/Django et l'embarqué sur Raspberry Pi ; sur Kubernetes et le cloud, il est en cours de consolidation par la pratique.",
      en: "Programming: Python, C, C++, VHDL, Verilog. Frameworks: Django, Laravel, TensorFlow, OpenMV. DevOps and cloud: Docker, Kubernetes, Jenkins, AWS, Azure, Google Cloud, Git. Data: InfluxDB, SQL, data analysis and machine learning. His genuine strengths are Python/Django and embedded work on Raspberry Pi; on Kubernetes and cloud he is still consolidating through practice."
    },

    {
      id: "python",
      keywords: ["python","django","backend","back-end","web","api","rest","fastapi","laravel","php"],
      fr: "Python et Django sont ses technologies principales. Il les a pratiquées dans ses deux stages : l'application Django du Ministère de la Justice, et le back-end Python de Grupo Marpica. Le projet SONDA de son portfolio est conçu sur Django 5 avec Django REST Framework, Celery et PostgreSQL.",
      en: "Python and Django are his primary technologies. He used them in both internships: the Django application at the Ministry of Justice, and the Python back-end at Grupo Marpica. The SONDA project in his portfolio is designed on Django 5 with Django REST Framework, Celery and PostgreSQL."
    },

    {
      id: "embarque",
      keywords: ["embarqué","embarque","embedded","stm32","esp32","raspberry","microcontrôleur","microcontroleur","firmware","électronique","electronique","vhdl","verilog","i2c","uart","capteur","sensor","hardware","iot"],
      fr: "C'est le cœur de son Master. Il a conçu un système de caméra intelligente sur Raspberry Pi et OpenMV, capable de détecter des objets en conditions dégradées, avec un algorithme de détection de mouvement réduisant les faux positifs. Il travaille actuellement sur un pilote de périphérique I²C en C bare-metal pour STM32 et sur une chaîne de mesure IoT complète. Il maîtrise également VHDL et Verilog.",
      en: "This is the core of his Master's. He built a smart camera system on Raspberry Pi and OpenMV, able to detect objects in poor conditions, with a motion-detection algorithm that cuts false positives. He is currently working on a bare-metal I²C device driver in C for STM32 and on a complete IoT measurement chain. He also knows VHDL and Verilog."
    },

    {
      id: "devops",
      keywords: ["devops","docker","kubernetes","jenkins","cloud","aws","azure","gcp","google cloud","ci/cd","cicd","intégration continue","integration continue","pipeline","déploiement","deploiement","conteneur","container"],
      fr: "Mehdi est certifié DevOps Essentials (IBM / Coursera, 2024) et pratique Docker, Kubernetes, Jenkins et les trois grands fournisseurs cloud. Dans ses projets, il met systématiquement en place une chaîne d'intégration continue : tests automatiques, construction de l'image et déploiement à chaque commit. Le pipeline est public sur ses dépôts GitHub, ce qui permet de vérifier plutôt que de croire sur parole.",
      en: "Mehdi holds the DevOps Essentials certificate (IBM / Coursera, 2024) and works with Docker, Kubernetes, Jenkins and the three major cloud providers. In his projects he systematically sets up a continuous integration chain: automated tests, image build and deployment on every commit. The pipeline is public on his GitHub repositories, so it can be verified rather than taken on trust."
    },

    {
      id: "ia",
      keywords: ["ia","intelligence artificielle","machine learning","ml","tensorflow","deep learning","vision","modèle","modele","data science","données","donnees","ai","model"],
      fr: "Il a suivi la certification Introduction à TensorFlow (2024) et applique le machine learning à la vision par ordinateur : reconnaissance d'objets, détection de mouvement, déploiement de modèles derrière une API. Dans le projet SONDA, l'apprentissage automatique sert à détecter les dérives lentes de température qu'un simple seuil ne verrait pas.",
      en: "He completed the Introduction to TensorFlow certificate (2024) and applies machine learning to computer vision: object recognition, motion detection, and serving models behind an API. In the SONDA project, machine learning is used to detect slow temperature drifts that a plain threshold would miss."
    },

    {
      id: "projets",
      keywords: ["projets","projet","portfolio","réalisations","realisations","github","dépôt","depot","projects","project","portfolio work","repository","repo","code","built","made"],
      fr: "Neuf projets. Deux principaux : SONDA, une plateforme SaaS de supervision de la chaîne du froid, et SAQI, une sonde d’irrigation en licence libre pour les petites exploitations. Puis le système de caméra intelligente (terminé), une plateforme Django conteneurisée avec CI/CD, BAYAN, une chaîne de données ouvertes marocaines, un modèle de vision servi en API, un pilote STM32 en C, RASSAD, une sonde de supervision réseau, et AYN, un accélérateur de traitement d'image sur FPGA. Faites défiler la page jusqu'à la section Projets pour le détail et les liens vers le code.",
      en: "Nine projects. Two main ones: SONDA, a SaaS platform for cold-chain monitoring, and SAQI, an open-licence irrigation probe for smallholder farms. Then the smart camera system (completed), a containerised Django platform with CI/CD, BAYAN, a Moroccan open-data pipeline, a vision model served as an API, an STM32 driver in C, RASSAD, a network monitoring probe, and AYN, an FPGA image-processing accelerator. Scroll to the Projects section for details and links to the code."
    },

    {
      id: "sonda",
      keywords: ["sonda","saas","chaîne du froid","chaine du froid","cold chain","température","temperature","pharmacie","haccp","onssa","cahier des charges","spécification","specification","mqtt"],
      fr: "SONDA est une plateforme SaaS de supervision de la chaîne du froid, pensée pour les pharmacies, laboratoires et unités agro-alimentaires marocains, qui doivent enregistrer leur température en continu. Des sondes ESP32 remontent les mesures en MQTT, toute dérive déclenche une alerte WhatsApp en moins de 60 secondes, et le rapport de conformité mensuel est produit automatiquement. Le cahier des charges complet fait 28 pages et se télécharge depuis la section Projets.",
      en: "SONDA is a SaaS platform for cold-chain monitoring, designed for Moroccan pharmacies, laboratories and food-processing sites, which are required to log temperature continuously. ESP32 probes send readings over MQTT, any drift triggers a WhatsApp alert within 60 seconds, and the monthly compliance report is produced automatically. The full specification runs to 28 pages and can be downloaded from the Projects section."
    },

    {
      id: "saqi",
      keywords: ["saqi","ساقي","irrigation","arroser","agriculture","agricole","eau","water","sécheresse","secheresse","drought","agriculteur","farmer","ferme","sol","lora","open source","libre","société","societe","utile","social","impact","environnement","environment","ecologique","écologique","humanitaire"],
      fr: "SAQI est son projet d'intérêt général : une sonde solaire à moins de 450 dirhams qui mesure l'humidité du sol dans les petites exploitations et renvoie une consigne d'irrigation par SMS, en arabe ou en darija. Elle communique en LoRa sur 5 kilomètres, donc sans Wi-Fi ni abonnement. Matériel et logiciel sont publiés en licence libre pour que les coopératives puissent les fabriquer elles-mêmes.",
      en: "SAQI is his public-interest project: a solar probe costing under 450 dirhams that measures soil moisture on smallholder farms and returns an irrigation instruction by SMS, in Arabic or Darija. It communicates over LoRa across 5 kilometres, so no Wi-Fi and no subscription. Hardware and software are released under an open licence so cooperatives can build them themselves."
    },

    {
      id: "rassad",
      keywords: ["rassad","رصد","réseau","reseau","reseaux","réseaux","network","networking","network experience","networking skills","supervision","monitoring","snmp","scapy","tcp","ip","switch","routeur","router","lan","vlan","paquet","packet","sécurité réseau","securite reseau","infrastructure","sysadmin","administration systeme"],
      fr: "RASSAD est son projet de supervision réseau : une sonde autohébergée, branchée sur le switch d'une PME, qui découvre les équipements du réseau local, cartographie les communications, mesure la disponibilité en SNMP et signale tout appareil inconnu. Tout tourne sur un Raspberry Pi, sans cloud, donc aucune donnée réseau ne quitte l'entreprise. C'est le projet qui illustre la partie réseaux de son Master.",
      en: "RASSAD is his network monitoring project: a self-hosted probe, plugged into a small company's switch, that discovers devices on the local network, maps communications, measures availability over SNMP and flags any unknown device. Everything runs on a Raspberry Pi with no cloud, so no network data leaves the company. It's the project that covers the networking half of his Master's."
    },

    {
      id: "bayan",
      keywords: ["bayan","بيان","data engineer","data engineering","ingénierie des données","ingenierie des donnees","etl","elt","pipeline","airflow","dbt","spark","entrepôt","entrepot","warehouse","open data","données ouvertes","donnees ouvertes","sql","modélisation","modelisation","hcp","statistiques"],
      fr: "BAYAN est son projet d'ingénierie des données : une chaîne qui collecte les statistiques publiques marocaines — HCP, Bank Al-Maghrib, ANRT — dispersées en PDF et en tableurs aux formats changeants, les nettoie et les charge dans un entrepôt interrogeable. Airflow orchestre les traitements, dbt gère les transformations testées, et une API publique expose le résultat. C'est le projet qui répond aux offres de Data Engineer, un profil en tension au Maroc.",
      en: "BAYAN is his data engineering project: a pipeline that collects Moroccan public statistics — HCP, Bank Al-Maghrib, ANRT — scattered across PDFs and spreadsheets whose formats keep changing, cleans them and loads them into a queryable warehouse. Airflow orchestrates the jobs, dbt handles tested transformations, and a public API exposes the result. It's the project aimed at Data Engineer openings, a role in short supply in Morocco."
    },

    {
      id: "ayn",
      keywords: ["ayn","عين","fpga","vhdl","verilog","hdl","vivado","logique programmable","accélérateur","accelerateur","hardware","matériel","materiel","asic","xilinx","altera","testbench","synthèse","synthese","semi-conducteur","microélectronique","microelectronique"],
      fr: "AYN est son projet en logique programmable : le traitement d'image du projet P-01 refait en matériel. La détection de contours qui prend des dizaines de millisecondes sur un Raspberry Pi devient un pipeline câblé en VHDL sur FPGA, traitant le flux vidéo ligne par ligne à la cadence du capteur. L'intérêt n'est pas la nouveauté de l'algorithme mais la comparaison mesurée entre les deux approches.",
      en: "AYN is his programmable-logic project: the image processing from project P-01 rebuilt in hardware. The edge detection that takes tens of milliseconds on a Raspberry Pi becomes a VHDL pipeline wired on an FPGA, processing the video stream line by line at sensor rate. The point isn't a novel algorithm but the measured comparison between the two approaches."
    },

    {
      id: "disponibilite",
      keywords: ["disponible","disponibilité","disponibilite","quand","préavis","preavis","commencer","démarrer","demarrer","available","availability","start","notice period","free","join"],
      fr: "Mehdi est disponible immédiatement. Il n'a aucun préavis à effectuer et peut commencer dès la signature.",
      en: "Mehdi is available immediately. He has no notice period to serve and can start as soon as an offer is signed."
    },

    {
      id: "mobilite",
      keywords: ["mobilité","mobilite","où","ou habite","localisation","ville","déménager","demenager","casablanca","rabat","tanger","meknès","meknes","maroc","location","relocate","where","based","base","basé","city","habite"],
      fr: "Il est basé au Maroc et mobile sur Casablanca, Rabat et Tanger, les trois bassins d'emploi qui l'intéressent. Il est également à l'aise en télétravail : son stage de neuf mois chez Grupo Marpica s'est déroulé entièrement à distance, avec une équipe au Panama.",
      en: "He is based in Morocco and can relocate to Casablanca, Rabat or Tangier — the three job markets he is targeting. He is also comfortable working remotely: his nine-month internship at Grupo Marpica was fully remote, with a team in Panama."
    },

    {
      id: "langues",
      keywords: ["langues","langue","parle","français","francais","anglais","arabe","tamazight","amazigh","english","language","speak"],
      fr: "Quatre langues : le tamazight est sa langue maternelle, et il est courant en arabe, en français et en anglais. Il a travaillé neuf mois en anglais avec une équipe panaméenne.",
      en: "Four languages: Tamazight is his mother tongue, and he is fluent in Arabic, French and English. He worked for nine months in English with a Panamanian team."
    },

    {
      id: "certifications",
      keywords: ["certification","certifications","certifié","certifie","coursera","ibm","certificat","certified","credential"],
      fr: "Deux certifications : DevOps Essentials (IBM via Coursera, avril 2024) et Introduction à TensorFlow (février 2024).",
      en: "Two certificates: DevOps Essentials (IBM via Coursera, April 2024) and Introduction to TensorFlow (February 2024)."
    },

    {
      id: "contact",
      keywords: ["contact","contacter","email","mail","adresse","téléphone","telephone","numéro","numero","joindre","linkedin","écrire","ecrire","reach","phone","get in touch"],
      fr: "Par courriel à mehdi.ammou11@gmail.com, par téléphone au 07 14 54 69 55, ou via LinkedIn — les liens sont dans la section Contact en bas de page. Il répond sous 24 heures.",
      en: "By email at mehdi.ammou11@gmail.com, by phone on +212 7 14 54 69 55, or via LinkedIn — the links are in the Contact section at the bottom of the page. He replies within 24 hours."
    },

    {
      id: "cv",
      keywords: ["cv","curriculum","télécharger","telecharger","pdf","download","resume file"],
      fr: "Le CV en PDF se télécharge depuis le bouton « Télécharger le CV » en haut de la page, ou depuis la section Contact.",
      en: "The PDF CV can be downloaded from the “Download CV” button at the top of the page, or from the Contact section."
    },

    {
      id: "salaire",
      keywords: ["salaire","rémunération","remuneration","prétentions","pretentions","combien","paie","salary","compensation","pay","expectations"],
      fr: "Cette question se discute directement avec Mehdi, en fonction du poste, des responsabilités et du lieu. Le plus simple est de lui écrire à mehdi.ammou11@gmail.com.",
      en: "That's a question to discuss directly with Mehdi, depending on the role, the responsibilities and the location. The simplest route is to email him at mehdi.ammou11@gmail.com."
    },

    {
      id: "pourquoi",
      keywords: ["pourquoi","recruter","embaucher","atouts","points forts","avantage","valeur","why hire","hire","recruit","employ","strengths","stand out","good fit","suitable"],
      fr: "Trois raisons concrètes. Il couvre la chaîne complète, du firmware au déploiement cloud, ce qui est rare chez un profil junior. Il a déjà travaillé neuf mois en autonomie totale à distance, sur un décalage horaire. Et son code est public : chaque compétence annoncée est vérifiable dans un dépôt, avec les tests et le pipeline qui tournent.",
      en: "Three concrete reasons. He covers the full chain, from firmware to cloud deployment, which is rare in a junior profile. He has already worked nine months fully autonomously and remotely, across a time difference. And his code is public: every claimed skill is verifiable in a repository, with tests and pipeline running."
    },

    {
      id: "limites",
      keywords: ["junior","débutant","debutant","manque","expérience professionnelle","faiblesse","limite","inconvénient","inconvenient","risque","weakness","lack","concern","downside"],
      fr: "Autant être direct : Mehdi n'a pas encore d'expérience en CDI, seulement deux stages dont un de neuf mois. Sur des technologies comme Kubernetes ou les architectures cloud à grande échelle, ses connaissances sont pour l'instant plus théoriques que pratiques. Ce qu'il compense par une capacité de travail autonome démontrée et par des projets personnels menés jusqu'à la mise en production.",
      en: "To be direct: Mehdi has no permanent-contract experience yet, only two internships, one of them nine months. On technologies such as Kubernetes or large-scale cloud architecture, his knowledge is currently more theoretical than practical. He offsets this with demonstrated ability to work autonomously and with personal projects carried through to production."
    },

    {
      id: "poste",
      keywords: ["cherche","recherche","poste recherché","type de poste","souhaite","objectif","looking for","seeking","want","ideal role","interested in"],
      fr: "Il vise un poste où il peut tenir la chaîne complète : l'embarqué qui produit la donnée, le back-end qui la traite, le pipeline qui déploie l'ensemble. Les intitulés qui correspondent : développeur back-end Python/Django, ingénieur systèmes embarqués, ingénieur DevOps junior, ingénieur validation.",
      en: "He is targeting a role where he can own the full chain: the embedded side producing the data, the back-end processing it, the pipeline shipping it. Matching titles: Python/Django back-end developer, embedded systems engineer, junior DevOps engineer, validation engineer."
    },

    {
      id: "assistant",
      keywords: ["qui es tu","tu es qui","chatbot","bot","assistant","intelligence","ia toi","comment tu marches","who are you","what are you","how do you work"],
      fr: "Je suis un assistant simple intégré à ce portfolio. Je ne suis pas un modèle de langage : je reconnais des mots-clés dans votre question et je renvoie une réponse écrite à l'avance par Mehdi. Rien de ce que je dis n'est inventé, mais je ne sais répondre que sur son parcours.",
      en: "I'm a simple assistant built into this portfolio. I'm not a language model: I match keywords in your question and return an answer written in advance by Mehdi. Nothing I say is invented, but I can only answer questions about his background."
    }

  ],

  fallback: {
    fr: "Je n'ai pas de réponse préparée sur ce point. Pour une question précise, le plus sûr est d'écrire directement à Mehdi : mehdi.ammou11@gmail.com. Vous pouvez aussi me demander sa formation, ses expériences, ses compétences, ses projets ou sa disponibilité.",
    en: "I don't have a prepared answer on that. For anything specific, the surest route is to email Mehdi directly: mehdi.ammou11@gmail.com. You can also ask me about his education, experience, skills, projects or availability."
  },

  welcome: {
    fr: "Bonjour. Je réponds aux questions sur le parcours de Mehdi Ammou. Choisissez une question ou écrivez la vôtre.",
    en: "Hello. I answer questions about Mehdi Ammou's background. Pick a question below or write your own."
  },

  suggestions: {
    fr: ["Quel est son parcours ?","Quelles technologies maîtrise-t-il ?","Parlez-moi de SONDA","Et le projet SAQI ?","Pourquoi le recruter ?"],
    en: ["What's his background?","Which technologies does he know?","Tell me about SONDA","What is SAQI?","Why hire him?"]
  },

  disclaimer: {
    fr: "Assistant automatique · réponses rédigées par Mehdi",
    en: "Automated assistant · answers written by Mehdi"
  }
};
