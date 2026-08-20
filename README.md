# Portfolio — Mehdi Ammou

Site personnel statique : HTML, CSS et JavaScript, sans dépendance ni build.
Il se publie directement sur GitHub Pages.

**Contenu** : profil, deux projets phares (SONDA et SAQI), 5 projets secondaires, compétences
(brochage de composant), parcours, contact, assistant de questions-réponses, bascule
français / anglais, CV et cahier des charges en téléchargement.

---

## 1. Mettre le site en ligne (10 minutes)

1. Crée un dépôt sur GitHub nommé **exactement** `ton-pseudo.github.io`
   (par exemple `mehdiammou.github.io`).
2. Choisis « Public ». Ne coche pas « Add a README ».
3. Dans le dossier de ce projet, lance :

   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/ton-pseudo/ton-pseudo.github.io.git
   git push -u origin main
   ```

4. Sur GitHub : **Settings → Pages**. Source : `Deploy from a branch`,
   branche `main`, dossier `/ (root)`. Enregistre.
5. Attends 1 à 2 minutes. Le site est en ligne sur `https://ton-pseudo.github.io`.

> Si tu préfères un dépôt classique (`portfolio` au lieu de `ton-pseudo.github.io`),
> tout fonctionne pareil, l'adresse devient `https://ton-pseudo.github.io/portfolio`.

---

## 2. Les trois choses à modifier avant de partager le lien

### a. Tes liens GitHub — `assets/js/main.js`, tout en haut

```js
const CONFIG = {
  github: "votre-pseudo",        // ← remplace par ton pseudo GitHub
  flagshipRepo: "sonda",         // dépôt du projet principal
  saqiRepo: "saqi",              // dépôt du projet d'intérêt général
  repos: [
    "camera-intelligente",       // P-01 — le nom exact de chaque dépôt
    "django-ci-cd",              // P-02
    "bayan",                     // P-03
    "vision-api",                // P-04
    "stm32-i2c-driver",          // P-05
    "rassad",                    // P-06
    "ayn-fpga"                   // P-07
  ],
  demos: [
    "", "", "", "", ""           // l'URL d'une démo en ligne, sinon laisse vide
  ]
};
```

Tant qu'un dépôt n'existe pas, le lien « Code source » renvoie vers ton profil GitHub.
Un champ `demos` vide fait simplement disparaître le bouton « Démo en ligne ».

### b. Le statut des projets — `index.html`

Chaque projet porte une étiquette :

```html
<span class="tag" data-fr="En cours" data-en="In progress">En cours</span>
```

Quand un projet est terminé et poussé sur GitHub, passe-le en livré :

```html
<span class="tag tag-live" data-fr="Livré" data-en="Shipped">Livré</span>
```

**Règle à tenir** : jamais de projet marqué « Livré » sans dépôt public derrière.
Un recruteur qui clique et tombe sur une page vide arrête de lire.

### c. Le CV — `assets/docs/CV_Mehdi_Ammou.pdf`

Remplace le fichier par ta version à jour en gardant le même nom, et le bouton
de téléchargement continue de fonctionner.

Pense à ajouter l'adresse du portfolio sur le CV lui-même, juste sous le LinkedIn.
C'est le point le plus important : un CV de développeur sans lien vers du code
laisse toutes les compétences listées sans preuve.

---

## 3. Ajouter un projet

Copie un bloc `<article class="card">…</article>` dans `index.html`, change le numéro
`P-0x`, le titre, le texte, les technologies, puis ajoute le nom du dépôt dans
`CONFIG.repos` **au même rang** que la carte. L'ordre des cartes et l'ordre du tableau
doivent correspondre.

---

## 4. Structure

```
.
├── index.html                  page unique, tout le contenu
├── assets/
│   ├── css/style.css           styles
│   ├── js/main.js              CONFIG, bascule FR/EN, animations
│   ├── js/chat-data.js         réponses de l'assistant
│   ├── js/chat.js              moteur et interface de l'assistant
│   ├── img/mehdi-ammou.jpg     photo
│   └── docs/
│       ├── CV_Mehdi_Ammou.pdf              CV téléchargeable
│       ├── SONDA_Cahier_des_charges.pdf    version lue depuis le site
│       └── SONDA_Cahier_des_charges.docx   version modifiable
├── chatbot/
│   ├── worker.js               proxy optionnel pour la version IA
│   └── wrangler.toml           configuration de déploiement
└── project-readmes/
    ├── SONDA_CAHIER_DES_CHARGES.md   source du cahier des charges
    ├── SAQI_BRIEF.md                 note de conception du projet SAQI
    ├── TEMPLATE.md                   modèle de README pour chaque dépôt
    └── BRIEFS.md                     ce qu'il faut construire pour P-02 à P-07
```

## 7. Le projet principal — SONDA

`project-readmes/SONDA_CAHIER_DES_CHARGES.md` est la source ; les versions PDF et Word
dans `assets/docs/` en sont issues.

Pour les régénérer après une modification :

```bash
pandoc project-readmes/SONDA_CAHIER_DES_CHARGES.md \
  -o assets/docs/SONDA_Cahier_des_charges.docx
```

Le bloc SONDA en haut de la section « Projets » renvoie vers le PDF. C'est volontairement
le premier élément que voit un recruteur : un cahier des charges de 28 pages montre une
capacité de conception que cinq petits projets ne montrent pas.

---

## 5. Bilingue

Le site s'affiche en français par défaut ; le bouton `FR / EN` en haut à droite bascule
tout le texte, et le choix est mémorisé dans le navigateur.

Chaque élément traduisible porte deux attributs :

```html
<h3 data-fr="Titre en français" data-en="Title in English">Titre en français</h3>
```

Si tu ajoutes du texte, mets les deux attributs, sinon la phrase restera en français
après la bascule.

---

## 6. Détails techniques

- Aucune dépendance, aucun `npm install`, aucun build.
- Polices chargées depuis Google Fonts (Saira Condensed, IBM Plex Sans, IBM Plex Mono).
- Animations désactivées si le système demande « réduire les animations ».
- Responsive jusqu'à 320 px, navigation au clavier fonctionnelle.
- Version imprimable propre : `Ctrl+P` donne un document lisible en noir sur blanc.


---

## 8. L'assistant

Un bouton en bas à droite ouvre un assistant qui répond aux questions des visiteurs sur
le parcours de Mehdi. Il fonctionne en français et en anglais, et suit la langue choisie
sur le site.

### Comment il marche

Il ne s'agit pas d'un modèle de langage et **rien n'est à entraîner**. L'assistant
reconnaît des mots-clés dans la question et renvoie une réponse écrite à l'avance dans
`assets/js/chat-data.js`. C'est volontaire :

- il ne peut rien inventer sur le parcours de Mehdi, ce qui est le risque principal
  d'un assistant de portfolio ;
- il ne coûte rien et ne dépend d'aucun service extérieur ;
- il fonctionne sur GitHub Pages, qui n'héberge que des fichiers statiques.

### Ajouter ou corriger une réponse

Ouvre `assets/js/chat-data.js` et ajoute une intention :

```js
{
  id: "stage_pfe",
  keywords: ["pfe","projet de fin d'etudes","mémoire","thesis"],
  fr: "Son projet de fin d'études portait sur …",
  en: "His final-year project was about …"
}
```

Les mots-clés sont comparés sans accents ni ponctuation, donc `mémoire` reconnaît aussi
`memoire`. Évite les formules vagues comme `parle moi de` : elles se déclenchent sur
n'importe quelle question et brouillent les autres intentions.

Quand aucune intention n'atteint le seuil de correspondance, l'assistant l'admet et
renvoie vers l'adresse électronique de Mehdi — c'est le comportement souhaité.

### Passer à une vraie version IA (optionnel)

**Ne mets jamais une clé d'API dans le code du site.** Le dépôt est public : une clé
placée dans un fichier JavaScript est récupérée par des robots en quelques jours et
utilisée à tes frais.

La méthode correcte est un proxy qui garde la clé côté serveur. Le dossier `chatbot/`
contient un worker Cloudflare prêt à déployer (offre gratuite suffisante) :

```bash
npm install -g wrangler
cd chatbot
wrangler login
wrangler deploy
wrangler secret put ANTHROPIC_API_KEY
```

Modifie ensuite `ORIGINES_AUTORISEES` dans `worker.js` avec l'adresse exacte de ton
site, puis renseigne l'adresse du worker dans `assets/js/chat.js` :

```js
const CHAT_CONFIG = {
  apiUrl: "https://assistant-portfolio.ton-compte.workers.dev",
  timeoutMs: 12000
};
```

Le site bascule alors sur le modèle, **et retombe automatiquement sur les réponses
locales** si le proxy est indisponible, en panne de quota ou trop lent. L'assistant ne
tombe donc jamais en erreur devant un recruteur.

Le worker contient le profil complet de Mehdi et des consignes strictes : répondre
uniquement à partir du profil, ne jamais inventer un diplôme ou une expérience, admettre
ce qu'il ignore. C'est cette contrainte qui rend un assistant de portfolio acceptable —
un modèle laissé libre finit par inventer des compétences, et le mensonge se découvre en
entretien.
