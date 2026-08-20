# SAQI — note de conception

**Irrigation mesurée pour les petites exploitations marocaines**
Matériel et logiciel libres · version 0.1 · août 2026

---

## 1. Pourquoi ce projet

Le Maroc traverse sa plus longue séquence sèche depuis des décennies, et l'agriculture
absorbe l'essentiel de l'eau douce prélevée dans le pays. Les grandes exploitations
s'équipent de pilotage automatisé ; les petites, qui représentent la majorité des
exploitations marocaines, n'ont accès à aucune mesure.

Sans mesure, la décision d'irriguer se prend par précaution : on arrose au cas où. Or une
partie de cette eau descend sous la zone racinaire, où elle ne sert plus à rien. Elle est
perdue pour la plante comme pour la nappe de surface, et elle a coûté du gasoil de pompage
ou une part d'un tour d'eau.

Le problème n'est donc pas l'absence de technologie d'irrigation : c'est l'absence
d'information au moment de la décision. C'est précisément ce qu'un capteur à quelques
centaines de dirhams peut corriger.

## 2. Ce que le projet ne prétend pas être

Une note de cadrage honnête commence par ses limites.

- **Ce n'est pas un projet agronomique.** Le modèle de bilan hydrique repose sur la
  méthode FAO-56, largement documentée, mais l'étalonnage par type de sol et par culture
  doit être validé avec un agronome. Sans cette validation, les consignes ne sont que des
  indications.
- **Ce n'est pas un substitut au conseil agricole.** L'outil informe une décision, il ne
  la remplace pas. L'agriculteur connaît sa parcelle mieux que le capteur.
- **Ce n'est pas une solution au stress hydrique national.** L'économie d'eau à l'échelle
  d'une exploitation est réelle mais modeste ; l'effet n'existe qu'en cas d'adoption
  large, ce qui relève des coopératives et des politiques publiques, pas d'un capteur.
- **Aucun chiffre d'économie n'est annoncé avant mesure.** La littérature sur le pilotage
  par capteurs rapporte des économies variables selon la culture, le sol et les pratiques
  initiales. Annoncer un pourcentage avant d'avoir mesuré sur une parcelle réelle serait
  malhonnête.

## 3. Contraintes de terrain

Ces contraintes déterminent l'ensemble des choix techniques.

| Contrainte | Conséquence de conception |
|---|---|
| Pas de couverture Wi-Fi dans les parcelles | Liaison radio LoRa, pas de Wi-Fi ni de Bluetooth |
| Pas d'électricité au champ | Alimentation solaire, veille profonde entre deux mesures |
| Couverture GSM limitée et coût des données | Une seule passerelle par village porte la connexion |
| Téléphones souvent non connectés | Consigne envoyée par SMS, pas par application |
| Alphabétisation variable | Message court, en darija ou en arabe, une seule action à retenir |
| Pas de maintenance sur place | Aucune pièce mobile, boîtier étanche, remplacement plutôt que réparation |
| Budget d'une petite exploitation | Coût cible par sonde inférieur à 450 MAD |

La contrainte la plus structurante est la dernière ligne de l'interface : **le produit
final n'est pas un tableau de bord, c'est un SMS.** Tout le reste n'existe que pour
produire ce message correctement.

## 4. Architecture

```
   PARCELLE                    VILLAGE                      SERVEUR

 ┌────────────┐            ┌──────────────┐           ┌──────────────┐
 │  Sonde     │  LoRa      │  Passerelle  │   GSM     │   Django     │
 │  ESP32     │──868 MHz──▶│  Raspberry   │──────────▶│   + InfluxDB │
 │  solaire   │  5 km      │  Pi + LoRa   │           └──────┬───────┘
 └────────────┘            └──────────────┘                  │
   humidité 20 cm                                            │ bilan hydrique
   humidité 50 cm                                            │ FAO-56
   température sol                                           ▼
   tension batterie                                   ┌──────────────┐
                                                      │  SMS darija  │
                                                      │  ou arabe    │
                                                      └──────────────┘
```

### Sonde

ESP32 en veille profonde, réveil toutes les heures, mesure, émission LoRa, rendormissement.
Deux capteurs d'humidité capacitifs — capacitifs et non résistifs, car les sondes
résistives se corrodent en quelques semaines dans un sol irrigué. Deux profondeurs, parce
qu'une seule mesure ne permet pas de distinguer un sol humide en surface d'un sol humide
dans la zone racinaire, qui est la seule information utile.

Panneau solaire de 1 W, cellule 18650, régulateur de charge. Consommation dominée par
l'émission radio : le budget énergétique tient largement, même après plusieurs jours
couverts.

### Passerelle

Raspberry Pi avec concentrateur LoRa, installée chez un membre de la coopérative ou au
local commun, alimentée sur secteur. Elle reçoit les trames de toutes les sondes du
village, les met en file d'attente et les transmet en GSM. Le stockage local permet de
tenir plusieurs jours de coupure réseau ou électrique.

Une passerelle pour un village : c'est ce qui rend le coût par exploitation acceptable.

### Serveur

Django et InfluxDB, comme pour le projet SONDA — la pile est réutilisée volontairement.
Le calcul du besoin en eau applique la méthode FAO-56 : évapotranspiration de référence
à partir des données météo locales, coefficient cultural selon la culture et son stade,
bilan avec l'humidité mesurée et la pluie survenue.

Le résultat est traduit en une consigne unique : arroser ce soir pendant N minutes, ou ne
pas arroser aujourd'hui.

### Message

```
SAQI · Parcelle 2
Sqi lyoum 35 dqiqa
(Irriguer aujourd'hui 35 minutes)
```

Trois lignes maximum, une action, pas de chiffre technique. L'humidité mesurée et les
courbes restent consultables sur le tableau de bord par le technicien de la coopérative,
qui est le bon destinataire pour ces données.

## 5. Nomenclature indicative

| Composant | Coût unitaire estimé (MAD) |
|---|---|
| ESP32 avec module LoRa | 160 |
| 2 capteurs d'humidité capacitifs | 70 |
| Capteur de température de sol | 25 |
| Panneau solaire 1 W et régulateur | 80 |
| Cellule 18650 et support | 45 |
| Boîtier étanche, presse-étoupes, câblage | 60 |
| **Total par sonde** | **≈ 440** |

Passerelle : environ 1 200 MAD, partagée entre toutes les exploitations d'un village.

Prix relevés sur des fournisseurs en ligne, hors quantité et hors transport. Une commande
groupée par une coopérative fait baisser sensiblement ce montant.

## 6. Étapes de réalisation

| Lot | Contenu | Résultat vérifiable |
|---|---|---|
| **L1** | Sonde sur plaque d'essai, mesure et émission LoRa, réception sur passerelle | Une trame reçue à 1 km en champ libre |
| **L2** | Gestion d'énergie : veille profonde, charge solaire, budget mesuré | 14 jours d'autonomie continue, dont 3 jours couverts |
| **L3** | Serveur : réception, stockage, tableau de bord, courbes d'humidité | Deux semaines de relevés continus visibles |
| **L4** | Bilan hydrique FAO-56 et génération des consignes | Consigne cohérente avec un suivi manuel de la parcelle |
| **L5** | Envoi SMS, gestion multi-parcelles et multi-utilisateurs | Un agriculteur reçoit sa consigne quotidienne pendant un mois |
| **L6** | Boîtier imprimé en 3D, notice d'assemblage, publication du matériel | Une tierce personne reproduit une sonde à partir du dépôt seul |

Charge estimée : 55 jours-homme. Les lots L1 à L3 constituent déjà un projet démontrable.

## 7. Validation

Une sonde sur une parcelle réelle, sur un cycle de culture complet, avec suivi parallèle :
relevés gravimétriques hebdomadaires pour contrôler l'étalonnage, et comparaison entre la
consigne calculée et la pratique habituelle de l'agriculteur.

L'objectif de cette phase n'est pas de démontrer une économie, mais de vérifier que la
consigne n'est jamais dangereusement fausse. Un système qui recommande de ne pas arroser
un jour où il aurait fallu le faire coûte une récolte : la prudence doit être asymétrique,
et le doute doit conduire à irriguer.

## 8. Licence et diffusion

Logiciel sous licence MIT, schémas et fichiers de fabrication sous CERN-OHL-S. Notice
d'assemblage en français et en arabe.

L'intérêt du modèle ouvert est direct : une coopérative, un lycée technique ou une
association peut fabriquer ses propres sondes sans dépendre d'un fournisseur ni d'un
abonnement. C'est aussi la condition pour que le projet survive à son auteur.

## 9. Ce que ce projet démontre techniquement

Au-delà de son objet, ce projet couvre des compétences que peu de profils juniors peuvent
montrer : conception matérielle et énergétique sous contrainte, radio longue portée,
firmware en C avec gestion fine de la consommation, passerelle embarquée, back-end de
séries temporelles, modèle physique appliqué, et conception d'interface pour des
utilisateurs non techniques.

---

*Mehdi Ammou — mehdi.ammou11@gmail.com*
