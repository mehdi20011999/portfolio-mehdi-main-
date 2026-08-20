---
title: "SONDA — Cahier des charges"
subtitle: "Plateforme SaaS de supervision de la chaîne du froid et de l'énergie"
author: "Mehdi Ammou — Ingénieur Réseaux & Systèmes Embarqués"
date: "Version 1.0 — Août 2026"
lang: fr
---

\newpage

# Sommaire

| § | Section |
|---|---|
| 1 | Contexte et enjeux |
| 2 | Objectifs |
| 3 | Périmètre |
| 4 | Acteurs |
| 5 | Exigences fonctionnelles |
| 6 | Parcours utilisateurs principaux |
| 7 | Exigences non fonctionnelles |
| 8 | Architecture technique |
| 9 | Infrastructure et déploiement |
| 10 | Modèle économique |
| 11 | Découpage en lots |
| 12 | Stratégie de test |
| 13 | Risques |
| 14 | Livrables |
| 15 | Glossaire |

**Objet du document.** Ce cahier des charges définit le périmètre fonctionnel et technique
de la plateforme SONDA. Il sert de référence pour la conception, le développement et la
recette du produit. Chaque exigence est numérotée et priorisée afin de pouvoir être suivie
individuellement jusqu'à sa vérification.

# 1. Contexte et enjeux

## 1.1 Le problème

Au Maroc, toute structure qui conserve des produits sensibles à la température est tenue
d'en enregistrer le suivi : pharmacies et grossistes répartiteurs (bonnes pratiques de
distribution du médicament), laboratoires d'analyses, unités agro-alimentaires et
restauration collective soumises aux contrôles de l'ONSSA, cliniques et centres de
vaccination.

Dans la très grande majorité de ces établissements, ce suivi repose aujourd'hui sur l'un
de ces trois dispositifs :

| Dispositif actuel | Limite principale |
|---|---|
| Relevé manuel sur registre papier, deux fois par jour | Aucune donnée la nuit et le week-end, relevés parfois remplis après coup |
| Enregistreur autonome (datalogger USB) | La dérive n'est découverte qu'au moment de la lecture, souvent des jours plus tard |
| Thermomètre à alarme sonore local | Personne n'entend l'alarme en dehors des heures d'ouverture |

La conséquence est double. D'abord une **perte de marchandise** : une panne de groupe
froid un vendredi soir est constatée le lundi matin, et le stock est détruit. Ensuite un
**risque réglementaire** : lors d'un contrôle, l'établissement doit produire un
historique continu et infalsifiable qu'un registre papier ne constitue pas.

## 1.2 La réponse proposée

SONDA est une plateforme SaaS qui automatise la totalité de cette chaîne : des sondes
connectées relèvent la température en continu, les mesures remontent vers une plateforme
centrale, toute dérive déclenche une alerte immédiate sur le téléphone du responsable, et
les rapports de conformité sont générés automatiquement chaque mois.

L'établissement ne gère aucune infrastructure : il s'abonne, reçoit les sondes déjà
configurées, les branche, et le système fonctionne.

## 1.3 Positionnement

Les solutions équivalentes disponibles sur le marché marocain sont soit des logiciels
étrangers facturés en euros et non adaptés au cadre réglementaire local, soit des
installations sur mesure vendues plusieurs dizaines de milliers de dirhams par site.

SONDA vise l'espace intermédiaire : un abonnement mensuel par sonde, sans investissement
initial, avec des rapports directement conformes aux formats attendus par l'ONSSA et la
Direction du Médicament et de la Pharmacie.

# 2. Objectifs

## 2.1 Objectifs métier

| Réf. | Objectif | Indicateur de réussite |
|---|---|---|
| OM-1 | Supprimer le relevé manuel | 100 % des mesures acquises automatiquement |
| OM-2 | Réduire le délai de détection d'une panne | Moins de 5 minutes entre la dérive et l'alerte reçue |
| OM-3 | Produire une preuve de conformité opposable | Rapport PDF mensuel signé et horodaté, généré sans intervention |
| OM-4 | Rendre la solution accessible aux petites structures | Coût d'entrée inférieur à 500 MAD par mois pour un site type |

## 2.2 Objectifs techniques

| Réf. | Objectif |
|---|---|
| OT-1 | Ingestion continue de 10 000 messages par minute sans perte |
| OT-2 | Fonctionnement des sondes en autonomie 72 h en cas de coupure réseau, avec rattrapage automatique |
| OT-3 | Isolation stricte des données entre organisations clientes |
| OT-4 | Déploiement entièrement automatisé, de la validation du code à la mise en production |
| OT-5 | Historique conservé 5 ans, conformément aux obligations de traçabilité |

## 2.3 Objectif personnel

Ce projet constitue la pièce maîtresse de mon portfolio. Il est conçu pour démontrer, sur
un cas réel et complet, la maîtrise de la chaîne entière : firmware embarqué en C,
protocoles réseau, back-end Django, séries temporelles, conteneurisation, orchestration,
intégration continue et apprentissage automatique appliqué.

# 3. Périmètre

## 3.1 Inclus dans le périmètre

- Firmware des sondes connectées (ESP32) et de la passerelle (Raspberry Pi)
- Chaîne d'ingestion temps réel et stockage des séries temporelles
- Application web multi-organisations : tableaux de bord, configuration, historique
- Moteur d'alertes multi-canal (courriel, SMS, WhatsApp)
- Génération automatique des rapports de conformité
- Gestion des abonnements et facturation
- API publique documentée et webhooks
- Infrastructure, supervision et sauvegardes

## 3.2 Exclus du périmètre

| Exclusion | Motif |
|---|---|
| Application mobile native | Le site est conçu pour mobile, une application native n'apporte rien en phase 1 |
| Fabrication industrielle des sondes | Assemblage à partir de modules du commerce en phase 1 |
| Intégration comptable (Sage, Odoo) | Reportée après validation du marché |
| Certification métrologique des sondes | Étalonnage assuré par un laboratoire partenaire, hors développement |
| Support hors ligne complet du tableau de bord | La consultation nécessite une connexion |

## 3.3 Hypothèses

- Chaque site dispose d'une connexion Wi-Fi ou d'une couverture GSM.
- Les organisations clientes disposent d'au moins un responsable identifié pour recevoir
  les alertes.
- Les sondes sont installées par le client à partir d'une notice, sans intervention sur
  place.

# 4. Acteurs

## 4.1 Utilisateurs de la plateforme

| Acteur | Description | Besoin principal |
|---|---|---|
| **Responsable qualité** | Pharmacien, responsable HACCP, directeur de laboratoire | Consulter l'historique, produire les rapports pour les contrôles |
| **Opérateur de terrain** | Préparateur, magasinier, chef de cuisine | Recevoir l'alerte et acquitter l'incident avec un commentaire |
| **Administrateur d'organisation** | Gérant, responsable informatique | Ajouter des sites, des sondes et des utilisateurs, gérer l'abonnement |
| **Administrateur plateforme** | Équipe SONDA | Superviser le parc, assister les clients, suivre la facturation |
| **Auditeur externe** | Inspecteur ONSSA, auditeur qualité | Accéder en lecture seule à l'historique d'un site sur une période donnée |

## 4.2 Systèmes tiers

| Système | Rôle |
|---|---|
| Passerelle SMS marocaine | Envoi des alertes par SMS |
| WhatsApp Business API | Envoi des alertes sur le canal réellement utilisé au quotidien |
| Prestataire de paiement (CMI ou équivalent) | Encaissement des abonnements |
| Service de courriel transactionnel | Envoi des notifications et des rapports |

# 5. Exigences fonctionnelles

Priorités selon la méthode MoSCoW : **M** indispensable, **S** important, **C** souhaitable, **W** hors phase 1.

## 5.1 Module A — Organisations et utilisateurs

| Réf. | Exigence | Prio. |
|---|---|---|
| EF-A01 | Une organisation regroupe des sites, des utilisateurs et un abonnement. Aucune donnée n'est visible d'une organisation à l'autre. | M |
| EF-A02 | Inscription en ligne avec vérification de l'adresse électronique et création automatique de l'organisation. | M |
| EF-A03 | Quatre rôles : administrateur, responsable qualité, opérateur, lecteur. Les droits sont vérifiés côté serveur sur chaque requête. | M |
| EF-A04 | Invitation d'un utilisateur par courriel avec attribution d'un rôle et d'un périmètre de sites. | M |
| EF-A05 | Authentification à deux facteurs (TOTP), obligatoire pour le rôle administrateur. | S |
| EF-A06 | Journal d'audit horodaté et non modifiable de toute action sensible : création, modification de seuil, acquittement, export. | M |
| EF-A07 | Accès auditeur : lien à durée de validité limitée donnant un accès en lecture seule à un site et une période. | S |

## 5.2 Module B — Parc de sondes

| Réf. | Exigence | Prio. |
|---|---|---|
| EF-B01 | Hiérarchie à trois niveaux : organisation → site → zone (chambre froide, réfrigérateur, local technique). | M |
| EF-B02 | Enrôlement d'une sonde par lecture d'un QR code portant son identifiant et sa clé de provisionnement. | M |
| EF-B03 | Chaque sonde possède un certificat client unique, révocable individuellement. | M |
| EF-B04 | Indicateur d'état par sonde : en ligne, silencieuse, batterie faible, erreur de mesure. | M |
| EF-B05 | Mise à jour du firmware à distance, par lot, avec retour arrière automatique en cas d'échec de démarrage. | S |
| EF-B06 | Enregistrement de la date d'étalonnage et alerte à l'approche de l'échéance. | S |
| EF-B07 | Prise en charge d'une passerelle LoRaWAN pour les sites sans couverture Wi-Fi. | C |

## 5.3 Module C — Acquisition et stockage

| Réf. | Exigence | Prio. |
|---|---|---|
| EF-C01 | Les sondes publient leurs mesures en MQTT sur TLS, à une périodicité configurable de 1 à 60 minutes. | M |
| EF-C02 | Toute mesure est validée avant écriture : plage physique plausible, horodatage cohérent, sonde connue et active. | M |
| EF-C03 | Une mesure rejetée est conservée dans une file d'erreurs consultable par l'administrateur plateforme, jamais silencieusement perdue. | M |
| EF-C04 | En cas de coupure réseau, la sonde stocke localement jusqu'à 72 h de mesures et les retransmet à la reconnexion sans doublon. | M |
| EF-C05 | Les mesures brutes sont conservées 90 jours, puis agrégées au pas horaire (minimum, maximum, moyenne) pour 5 ans. | M |
| EF-C06 | L'écriture est idempotente : une même mesure retransmise deux fois n'est stockée qu'une fois. | M |

## 5.4 Module D — Supervision et alertes

| Réf. | Exigence | Prio. |
|---|---|---|
| EF-D01 | Définition par zone d'un seuil haut, d'un seuil bas et d'une durée de tolérance, afin de ne pas déclencher d'alerte lors d'une ouverture de porte. | M |
| EF-D02 | Déclenchement d'une alerte dans les 60 secondes suivant la mesure en dépassement confirmée. | M |
| EF-D03 | Alerte spécifique en cas de silence d'une sonde au-delà de trois périodes de relevé. | M |
| EF-D04 | Escalade paramétrable : notification du responsable, puis du suppléant si l'alerte n'est pas acquittée dans le délai défini. | M |
| EF-D05 | Canaux de notification : courriel, SMS, WhatsApp, notification dans l'application. | M |
| EF-D06 | Acquittement obligatoire avec sélection d'une cause et saisie de l'action corrective. | M |
| EF-D07 | Silence programmé lors des opérations de maintenance ou de dégivrage planifiées. | S |
| EF-D08 | Tableau de bord temps réel affichant l'état de toutes les zones, actualisé sans rechargement de la page. | M |

## 5.5 Module E — Historique et rapports

| Réf. | Exigence | Prio. |
|---|---|---|
| EF-E01 | Courbe de température par zone sur une période choisie, avec les seuils et les incidents matérialisés. | M |
| EF-E02 | Export des données brutes au format CSV et Excel sur la période sélectionnée. | M |
| EF-E03 | Génération automatique le premier jour de chaque mois d'un rapport PDF par site. | M |
| EF-E04 | Le rapport contient : courbes, taux de conformité, liste des incidents avec leurs actions correctives, empreinte numérique du document. | M |
| EF-E05 | Vérification d'intégrité : toute personne peut contrôler qu'un rapport PDF n'a pas été modifié depuis son émission. | S |
| EF-E06 | Modèle de rapport adaptable au secteur : agro-alimentaire, pharmacie, laboratoire. | S |

## 5.6 Module F — Abonnement et facturation

| Réf. | Exigence | Prio. |
|---|---|---|
| EF-F01 | Trois formules d'abonnement facturées par sonde et par mois. | M |
| EF-F02 | Période d'essai de 30 jours sans moyen de paiement. | M |
| EF-F03 | Facturation mensuelle automatique, proratisée à l'ajout ou au retrait d'une sonde. | M |
| EF-F04 | Facture PDF conforme aux mentions légales marocaines, avec TVA. | M |
| EF-F05 | Suspension de l'accès au tableau de bord après 15 jours d'impayé — sans jamais interrompre l'acquisition ni l'envoi des alertes. | M |
| EF-F06 | Paiement en ligne par carte et virement bancaire avec rapprochement manuel. | S |

## 5.7 Module G — Intelligence des données

| Réf. | Exigence | Prio. |
|---|---|---|
| EF-G01 | Détection d'anomalies non liées aux seuils : dérive lente, cycles de dégivrage anormaux, comportement s'écartant de l'habitude de la zone. | S |
| EF-G02 | Estimation du temps restant avant franchissement du seuil lors d'une montée en température, pour prioriser les interventions. | C |
| EF-G03 | Score de santé mensuel par équipement frigorifique, fondé sur la stabilité et la fréquence des incidents. | C |
| EF-G04 | Toute prédiction est présentée comme une indication et n'est jamais substituée à une alerte de seuil. | M |

## 5.8 Module H — API et intégrations

| Réf. | Exigence | Prio. |
|---|---|---|
| EF-H01 | API REST versionnée, authentifiée par jeton, documentée en OpenAPI. | M |
| EF-H02 | Webhooks sortants sur les événements d'alerte, avec signature et réémission en cas d'échec. | S |
| EF-H03 | Limitation de débit par organisation et par jeton. | M |
| EF-H04 | Bac à sable de démonstration avec données fictives. | C |

# 6. Parcours utilisateurs principaux

## 6.1 Mise en service d'un site

1. L'administrateur crée le site et déclare ses zones.
2. Il reçoit les sondes, préconfigurées et étiquetées.
3. Pour chaque sonde, il scanne le QR code depuis l'application ; la sonde est rattachée
   à une zone.
4. Il alimente la sonde et saisit les identifiants Wi-Fi via le point d'accès temporaire
   ouvert par celle-ci.
5. La première mesure remonte en moins de deux minutes ; la sonde passe à l'état « en ligne ».
6. Il définit les seuils de la zone et les destinataires des alertes.

**Critère d'acceptation** : un utilisateur non technique met en service une sonde en
moins de dix minutes, notice en main, sans assistance.

## 6.2 Traitement d'un incident

1. La température d'une chambre froide dépasse le seuil haut pendant plus longtemps que
   la tolérance configurée.
2. Une alerte est créée ; le responsable reçoit un message WhatsApp et un SMS.
3. Sans acquittement dans les 15 minutes, le suppléant est notifié à son tour.
4. L'opérateur ouvre le lien, constate la porte restée ouverte, la referme et acquitte
   l'alerte en indiquant la cause et l'action menée.
5. La température revient sous le seuil ; l'incident est clos automatiquement avec sa
   durée totale.
6. L'incident et son traitement figurent dans le rapport mensuel.

## 6.3 Contrôle réglementaire

1. Un inspecteur demande l'historique des six derniers mois.
2. Le responsable qualité télécharge les rapports mensuels déjà générés.
3. Chaque rapport porte une empreinte numérique vérifiable en ligne, ce qui atteste qu'il
   n'a pas été modifié après émission.

# 7. Exigences non fonctionnelles

## 7.1 Performance

| Réf. | Exigence |
|---|---|
| ENF-P01 | Ingestion soutenue de 10 000 messages par minute avec une latence de bout en bout inférieure à 5 secondes. |
| ENF-P02 | Temps de réponse de l'API inférieur à 300 ms au 95<sup>e</sup> centile. |
| ENF-P03 | Affichage complet du tableau de bord en moins de 2 secondes pour un site de 50 zones. |
| ENF-P04 | Génération d'un rapport mensuel en moins de 30 secondes. |

## 7.2 Disponibilité et continuité

| Réf. | Exigence |
|---|---|
| ENF-D01 | Disponibilité de la chaîne d'acquisition et d'alerte : 99,5 % mensuels. |
| ENF-D02 | Perte de données maximale admissible : 15 minutes. |
| ENF-D03 | Délai maximal de remise en service : 4 heures. |
| ENF-D04 | Sauvegarde quotidienne chiffrée, conservée 30 jours, avec test de restauration mensuel. |
| ENF-D05 | Une indisponibilité de la plateforme ne doit pas entraîner de perte de mesure : les sondes tamponnent localement. |

## 7.3 Sécurité

| Réf. | Exigence |
|---|---|
| ENF-S01 | Authentification mutuelle par certificat entre chaque sonde et le courtier MQTT. |
| ENF-S02 | Chiffrement TLS 1.3 de tous les échanges, chiffrement au repos des bases de données et des sauvegardes. |
| ENF-S03 | Cloisonnement des données par organisation vérifié au niveau de la requête, jamais uniquement au niveau de l'interface. |
| ENF-S04 | Aucun secret dans le code source ; gestion par coffre-fort de secrets. |
| ENF-S05 | Journal d'audit en écriture seule, conservé 5 ans. |
| ENF-S06 | Analyse automatique des dépendances et des images de conteneurs à chaque intégration. |
| ENF-S07 | Test d'intrusion externe avant la mise en production. |

## 7.4 Conformité

| Réf. | Exigence |
|---|---|
| ENF-C01 | Déclaration du traitement auprès de la CNDP au titre de la loi 09-08 sur la protection des données à caractère personnel. |
| ENF-C02 | Hébergement des données au Maroc ou dans un pays reconnu comme offrant un niveau de protection adéquat. |
| ENF-C03 | Droit d'accès, de rectification et d'opposition exposé dans l'interface. |
| ENF-C04 | Export complet des données d'une organisation à sa demande, dans un format ouvert, sous 72 heures. |
| ENF-C05 | Traçabilité des mesures conforme aux principes HACCP : donnée d'origine non modifiable, correction uniquement par ajout. |

## 7.5 Ergonomie et accessibilité

| Réf. | Exigence |
|---|---|
| ENF-E01 | Interface en français et en arabe, avec prise en charge de l'écriture de droite à gauche. |
| ENF-E02 | Conception prioritairement mobile : les alertes sont traitées depuis un téléphone. |
| ENF-E03 | Conformité au niveau AA des règles d'accessibilité WCAG 2.1. |
| ENF-E04 | Aucune information critique transmise par la seule couleur. |

## 7.6 Maintenabilité

| Réf. | Exigence |
|---|---|
| ENF-M01 | Couverture de tests automatisés supérieure à 80 % sur le back-end. |
| ENF-M02 | Toute mise en production passe par l'intégration continue ; aucun accès direct au serveur de production. |
| ENF-M03 | Documentation d'architecture tenue à jour, avec un journal des décisions techniques. |
| ENF-M04 | Environnement de développement complet démarré par une seule commande. |

# 8. Architecture technique

## 8.1 Vue d'ensemble

```
  TERRAIN                     PLATEFORME                        USAGES
  ───────                     ──────────                        ──────

 ┌──────────┐   MQTT/TLS   ┌──────────────┐
 │  Sonde   │─────────────▶│   Courtier   │
 │  ESP32   │              │     MQTT     │
 │ + DS18B20│              └──────┬───────┘
 └──────────┘                     │
                                  ▼
 ┌──────────┐              ┌──────────────┐   ┌──────────┐
 │Passerelle│   LoRaWAN    │   Service    │──▶│ InfluxDB │   séries temporelles
 │   RPi    │─────────────▶│ d'ingestion  │   └──────────┘
 └──────────┘              │  (asyncio)   │
                           └──────┬───────┘
                                  │
                                  ▼
                           ┌──────────────┐   ┌──────────┐
                           │   Django 5   │──▶│PostgreSQL│   métier, comptes
                           │   + DRF      │   └──────────┘
                           └──────┬───────┘
                                  │           ┌──────────┐
                           ┌──────┴───────┐──▶│  Redis   │   cache, files
                           │    Celery    │   └──────────┘
                           │  (alertes,   │
                           │   rapports)  │        ┌─────────────────┐
                           └──────┬───────┘───────▶│ SMS / WhatsApp  │
                                  │                │    / courriel   │
                                  ▼                └─────────────────┘
                           ┌──────────────┐
                           │  Interface   │◀── navigateur (responsable qualité)
                           │ HTMX+Tailwind│◀── API REST (intégrations tierces)
                           └──────────────┘
```

## 8.2 Choix techniques et justifications

| Couche | Choix | Justification |
|---|---|---|
| Firmware sonde | C sur ESP32, FreeRTOS | Coût matériel faible, Wi-Fi intégré, maîtrise fine de la consommation et du tampon local |
| Protocole terrain | MQTT sur TLS | Conçu pour les liaisons instables et à faible débit, reprise de session native |
| Séries temporelles | InfluxDB 2 | Agrégation et rétention automatiques ; un moteur relationnel classique s'effondre sur ce volume |
| Base métier | PostgreSQL | Intégrité transactionnelle sur les comptes, les abonnements et l'audit |
| Back-end | Django 5 + DRF | Écosystème mature pour l'authentification, les rôles, l'administration et la facturation ; c'est aussi la technologie que je maîtrise le mieux |
| Tâches asynchrones | Celery + Redis | Alertes, rapports et agrégations doivent sortir du cycle de requête |
| Interface | HTMX + Alpine.js + Tailwind | Un tableau de bord temps réel ne justifie pas une application monopage complète ; cette pile réduit la surface de code et les délais sans sacrifier la réactivité |
| Graphiques | Chart.js | Suffisant pour des séries temporelles, léger sur mobile |
| Rapports PDF | WeasyPrint | Modèles écrits en HTML et CSS, donc modifiables sans recompilation |
| Conteneurisation | Docker | Parité stricte entre développement et production |
| Orchestration | Kubernetes | Montée en charge indépendante de l'ingestion et de l'interface |
| Intégration continue | GitHub Actions | Tests, analyse, construction et déploiement déclenchés à chaque fusion |
| Supervision | Prometheus + Grafana | La plateforme qui surveille les clients doit elle-même être surveillée |

> **Note sur l'interface.** Le choix de HTMX plutôt que React est délibéré : l'application
> est majoritairement constituée de formulaires, de tableaux et de graphiques rafraîchis
> par le serveur. Une application monopage aurait doublé la base de code et introduit une
> seconde chaîne de construction pour un gain d'expérience utilisateur marginal. Ce choix
> sera réexaminé si un module réellement interactif apparaît.

## 8.3 Stratégie multi-organisations

Base de données unique, isolation par colonne `organisation_id` sur chaque table
concernée, avec application de la politique de sécurité au niveau des lignes
(*row-level security*) directement dans PostgreSQL.

Motif de ce choix : un schéma par client complique les migrations dès quelques centaines
d'organisations, alors qu'une base par client rend le coût d'infrastructure prohibitif à
ce niveau de tarif. Le risque principal — une requête oubliant le filtre — est neutralisé
au niveau de la base plutôt que dans le code applicatif, et vérifié par des tests dédiés
qui tentent explicitement un accès transversal.

## 8.4 Modèle de données (entités principales)

| Entité | Champs structurants | Stockage |
|---|---|---|
| Organisation | raison sociale, ICE, secteur, formule, état de l'abonnement | PostgreSQL |
| Utilisateur | identité, rôle, périmètre de sites, préférences d'alerte | PostgreSQL |
| Site | organisation, adresse, fuseau, responsable | PostgreSQL |
| Zone | site, type, seuils haut et bas, durée de tolérance | PostgreSQL |
| Sonde | zone, numéro de série, certificat, version de firmware, état, étalonnage | PostgreSQL |
| Mesure | sonde, horodatage, température, humidité, batterie, qualité du signal | InfluxDB |
| Alerte | zone, type, début, fin, gravité, état | PostgreSQL |
| Acquittement | alerte, utilisateur, cause, action corrective, horodatage | PostgreSQL |
| Rapport | site, période, empreinte SHA-256, chemin du fichier | PostgreSQL + stockage objet |
| Abonnement | organisation, formule, nombre de sondes, échéance | PostgreSQL |
| Écriture d'audit | acteur, action, cible, horodatage, adresse source | PostgreSQL, écriture seule |

## 8.5 Points d'entrée de l'API

```
POST   /api/v1/auth/token                  authentification
GET    /api/v1/sites                       liste des sites accessibles
GET    /api/v1/sites/{id}/zones            zones d'un site
GET    /api/v1/zones/{id}/mesures          historique, paramètres : debut, fin, pas
GET    /api/v1/zones/{id}/etat             dernière mesure et état courant
PATCH  /api/v1/zones/{id}/seuils           modification des seuils
GET    /api/v1/alertes                     filtres : etat, gravite, site, periode
POST   /api/v1/alertes/{id}/acquitter      cause et action corrective
GET    /api/v1/rapports                    rapports disponibles
POST   /api/v1/rapports                    génération à la demande
GET    /api/v1/sondes                      parc et état de santé
POST   /api/v1/webhooks                    déclaration d'un point de réception
```

## 8.6 Protocole terrain

Sujets MQTT :

```
sonda/{org}/{sonde}/mesures        sonde → plateforme, publication périodique
sonda/{org}/{sonde}/etat           sonde → plateforme, batterie, RSSI, version
sonda/{org}/{sonde}/commandes      plateforme → sonde, périodicité, mise à jour
sonda/{org}/{sonde}/reponses       sonde → plateforme, accusé de commande
```

Format de charge utile compact, horodatage à la source, numéro de séquence assurant la
détection des doublons lors du rattrapage après coupure.

Comportement du firmware : mesure selon la périodicité configurée, publication immédiate
si le réseau est disponible, écriture en mémoire flash sinon, retransmission par lots à la
reconnexion, veille profonde entre deux mesures pour préserver la batterie, redémarrage
surveillé par chien de garde.

# 9. Infrastructure et déploiement

## 9.1 Environnements

| Environnement | Rôle | Données |
|---|---|---|
| Local | Développement, une commande `docker compose up` | Jeu de données fictif |
| Recette | Validation avant production, identique à la production | Données anonymisées |
| Production | Service réel | Données clientes |

## 9.2 Chaîne d'intégration et de livraison

À chaque proposition de fusion : analyse statique, contrôle de format, tests unitaires et
d'intégration, mesure de couverture, analyse des dépendances et de l'image de conteneur.

À chaque fusion sur la branche principale : construction de l'image, déploiement
automatique en recette, exécution des tests de bout en bout.

Mise en production : déclenchée manuellement à partir d'une étiquette de version,
déploiement progressif, retour arrière automatique si les indicateurs de santé se
dégradent.

## 9.3 Supervision

Indicateurs suivis en continu : débit d'ingestion, retard de la file de traitement, taux
d'erreur de l'API, latence au 95<sup>e</sup> centile, nombre de sondes silencieuses, délai
d'acheminement des alertes, taux d'échec des envois SMS et WhatsApp.

Une alerte interne est levée dès que le délai d'acheminement d'une alerte client dépasse
60 secondes : c'est la promesse centrale du produit.

# 10. Modèle économique

| Formule | Prix mensuel par sonde | Contenu |
|---|---|---|
| Essentiel | 49 MAD | Alertes par courriel et dans l'application, historique 12 mois, 1 rapport mensuel |
| Professionnel | 89 MAD | Ajout des SMS et de WhatsApp, historique 5 ans, rapports personnalisés, accès API |
| Entreprise | Sur devis | Multi-sites, engagement de service contractuel, intégrations, accompagnement |

Sonde vendue 450 MAD ou incluse contre un engagement de 24 mois. Essai gratuit de 30
jours sans moyen de paiement.

Une pharmacie type équipée de trois sondes en formule Professionnel revient à 267 MAD par
mois, à comparer à la valeur d'un seul stock de vaccins perdu.

# 11. Découpage en lots

| Lot | Contenu | Charge estimée | Résultat vérifiable |
|---|---|---|---|
| **L1** | Socle : modèle de données, authentification, rôles, multi-organisations, environnement conteneurisé, intégration continue | 20 j | Un compte est créé, un site et une zone déclarés |
| **L2** | Chaîne d'acquisition : firmware ESP32, courtier MQTT, service d'ingestion, InfluxDB, rétention | 25 j | Une sonde réelle alimente la base en continu pendant 72 h sans perte |
| **L3** | Supervision : tableau de bord temps réel, courbes, seuils, moteur d'alertes, escalade, acquittement | 25 j | Une dérive provoquée déclenche une alerte reçue en moins de 60 s |
| **L4** | Conformité : historique, exports, rapports PDF automatiques, empreinte de vérification, journal d'audit | 15 j | Un rapport mensuel est produit sans intervention et son intégrité est vérifiable |
| **L5** | Commercialisation : formules, essai, facturation, paiement en ligne, API publique, webhooks | 20 j | Un client s'inscrit, essaie et paie sans contact humain |
| **L6** | Intelligence : détection d'anomalies, estimation du délai avant seuil, score de santé | 15 j | Une dérive lente est signalée avant le franchissement du seuil |

**Charge totale estimée : 120 jours-homme**, soit environ 6 mois à mi-temps ou 9 mois en
parallèle d'une activité salariée.

Les lots L1 à L4 constituent un produit utilisable et démontrable ; ils forment la cible
minimale du portfolio.

# 12. Stratégie de test

| Niveau | Portée | Outils |
|---|---|---|
| Unitaire | Logique métier, calcul des seuils, agrégations | pytest |
| Intégration | API, permissions, isolation entre organisations | pytest-django |
| Bout en bout | Parcours d'inscription, de mise en service et de traitement d'alerte | Playwright |
| Charge | 10 000 messages par minute pendant une heure | Locust |
| Matériel | Sonde réelle en chambre froide, coupures réseau provoquées | Banc de test |
| Sécurité | Tentatives d'accès transversal entre organisations, injection, élévation de privilège | Tests dédiés et test d'intrusion externe |

**Critères d'acceptation du produit :**

1. Une sonde tenue hors ligne 72 h retransmet la totalité de ses mesures sans doublon ni
   perte.
2. Aucune requête d'une organisation ne renvoie de donnée appartenant à une autre, y
   compris en manipulant directement les identifiants.
3. Le délai entre une mesure en dépassement confirmée et la réception de l'alerte reste
   inférieur à 60 secondes lors d'un test de charge nominal.
4. Le rapport mensuel est généré, déposé et notifié sans aucune intervention.
5. Une restauration complète depuis la sauvegarde est réalisée en moins de 4 heures.

# 13. Risques

| Risque | Impact | Probabilité | Traitement |
|---|---|---|---|
| Fiabilité du réseau des clients | Élevé | Élevée | Tampon local de 72 h, alerte de silence, option GSM |
| Perte d'une alerte critique | Critique | Faible | Trois canaux redondants, supervision du délai d'acheminement, tests automatisés du chemin d'alerte |
| Fuite de données entre organisations | Critique | Faible | Sécurité au niveau des lignes en base, tests d'accès transversal à chaque intégration |
| Dépendance à la passerelle SMS | Moyen | Moyenne | Interface d'abstraction permettant de changer de prestataire, repli sur WhatsApp et courriel |
| Coût d'InfluxDB à grande échelle | Moyen | Moyenne | Agrégation à 90 jours, révision annuelle du dimensionnement |
| Étalonnage contesté lors d'un contrôle | Élevé | Faible | Partenariat avec un laboratoire d'étalonnage, certificat rattaché à chaque sonde |
| Portée excessive du projet | Élevé | Élevée | Découpage strict en lots, L1 à L4 livrables indépendamment |

# 14. Livrables

| Livrable | Forme |
|---|---|
| Code source | Dépôt public, historique de commits lisible |
| Firmware | Code C documenté, schéma de câblage, photos du montage |
| Documentation d'architecture | Fichier `docs/ARCHITECTURE.md`, schémas, journal des décisions |
| Documentation d'API | Spécification OpenAPI publiée |
| Environnement de démonstration | Instance en ligne avec données fictives et compte d'essai |
| Démonstration vidéo | 3 minutes : mise en service, dérive provoquée, alerte reçue, rapport produit |
| Le présent cahier des charges | PDF et Markdown dans le dépôt |

# 15. Glossaire

| Terme | Définition |
|---|---|
| **Chaîne du froid** | Ensemble des opérations maintenant un produit dans une plage de température donnée, de sa production à sa consommation |
| **CNDP** | Commission Nationale de contrôle de la protection des Données à caractère Personnel |
| **HACCP** | Méthode d'analyse des dangers et de maîtrise des points critiques en sécurité alimentaire |
| **ICE** | Identifiant Commun de l'Entreprise |
| **LoRaWAN** | Protocole radio longue portée et faible consommation, adapté aux sites sans Wi-Fi |
| **MQTT** | Protocole de messagerie léger conçu pour les objets connectés |
| **ONSSA** | Office National de Sécurité Sanitaire des produits Alimentaires |
| **RPO / RTO** | Perte de données maximale admissible / délai maximal de remise en service |
| **Série temporelle** | Suite de mesures horodatées, stockée dans une base spécialisée |
| **SaaS** | Logiciel exploité comme un service en ligne, facturé par abonnement |

---

*Document rédigé par Mehdi Ammou — version 1.0, août 2026.*
