# Nom du projet

> Une phrase : ce que le projet fait, et pour qui.
> Exemple : « Chaîne de mesure qui relève la température d'un local toutes les 5 secondes
> et alerte quand elle dépasse un seuil. »

![Capture](docs/screenshot.png)

<!--
La capture est l'élément le plus important du README. Un recruteur regarde l'image
avant de lire quoi que ce soit. Pour un projet embarqué : une photo du montage.
Pour une API : une capture de la réponse. Pour un dashboard : le dashboard.
-->

---

## Le problème

Deux ou trois phrases sur la situation de départ et pourquoi elle méritait du code.
Pas de généralités sur l'importance de l'IoT ou du cloud — le cas concret.

## Comment ça marche

```
[capteur] --I²C--> [Raspberry Pi] --MQTT--> [InfluxDB] --> [Grafana]
```

Un schéma en texte suffit, et il se lit sans quitter GitHub.
Décris ensuite chaque étage en une ligne.

## Stack

| Élément | Choix | Pourquoi |
|---|---|---|
| Langage | Python 3.11 | |
| Base | InfluxDB 2 | séries temporelles, rétention automatique |
| Déploiement | Docker Compose | |

La colonne « pourquoi » est celle qui montre que tu as choisi et pas copié.

## Lancer le projet

```bash
git clone https://github.com/ton-pseudo/nom-du-projet.git
cd nom-du-projet
cp .env.example .env
docker compose up
```

Le site tourne ensuite sur http://localhost:8000

<!-- Teste ces commandes sur une machine propre avant de publier. Un README dont
     les commandes échouent fait plus de mal que pas de README du tout. -->

## Ce que j'ai appris

Trois points honnêtes : une difficulté rencontrée, comment tu l'as résolue, ce que
tu ferais autrement. C'est la section que lisent les développeurs qui recrutent.

## À faire

- [ ] Point restant, formulé clairement

---

**Auteur** — Mehdi Ammou · [Portfolio](https://ton-pseudo.github.io) · [LinkedIn](https://www.linkedin.com/in/ammou-mehdi-483b6226b)
