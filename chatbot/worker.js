/* =========================================================
   Assistant du portfolio — proxy Cloudflare Worker
   ---------------------------------------------------------
   À déployer UNIQUEMENT si tu veux passer de l'assistant par
   mots-clés à un vrai modèle de langage.

   Pourquoi un proxy : la clé d'API doit rester secrète. Un
   dépôt GitHub Pages est public, donc toute clé placée dans
   le JavaScript du site est lisible par n'importe qui et sera
   utilisée à tes frais en quelques jours. Le worker garde la
   clé côté serveur ; le site ne connaît que l'adresse du worker.

   Déploiement :
     npm install -g wrangler
     wrangler login
     wrangler deploy
     wrangler secret put ANTHROPIC_API_KEY

   Puis dans assets/js/chat.js :
     apiUrl: "https://assistant.ton-compte.workers.dev"
   ========================================================= */

const ORIGINES_AUTORISEES = [
  "https://portfolio-mehdi-main.vercel.app"   // ← remplace par ton domaine exact
];

const PROFIL = `
Mehdi Ammou, ingénieur réseaux et systèmes embarqués, basé au Maroc.

FORMATION
- Master Réseaux Informatiques et Systèmes Embarqués, Université Moulay Ismail, Meknès (2022-2024)
- Licence Mathématiques et Informatique, même université (2017-2021)
- Baccalauréat Sciences Mathématiques A, Lycée Hassan II, Midelt (2017)

EXPÉRIENCE
- Grupo Marpica SA (Panama, télétravail), oct. 2024 - juin 2025 : projet Recharge
  Platforms en Python et Java EE, conception de bases de données dont InfluxDB,
  méthodologie Scrum, Git. Neuf mois en autonomie complète malgré le décalage horaire.
- Ministère de la Justice (Maroc), août - oct. 2023 : développement de fonctionnalités
  pour l'application Django du système de bibliothèque.

COMPÉTENCES
- Programmation : Python, C, C++, VHDL, Verilog
- Frameworks : Django, Laravel, TensorFlow, OpenMV
- DevOps et cloud : Docker, Kubernetes, Jenkins, AWS, Azure, Google Cloud, Git
- Données : InfluxDB, SQL, machine learning, vision par ordinateur

CERTIFICATIONS
- DevOps Essentials (IBM / Coursera, avril 2024)
- Introduction à TensorFlow (février 2024)

PROJETS
- SONDA : plateforme SaaS de supervision de la chaîne du froid pour pharmacies,
  laboratoires et unités agro-alimentaires marocaines. Sondes ESP32, MQTT sur TLS,
  InfluxDB, Django 5, Celery, alertes WhatsApp en moins de 60 secondes, rapports de
  conformité HACCP automatiques. Cahier des charges de 28 pages, 52 exigences,
  6 lots, 120 jours-homme estimés. Conception terminée, développement à venir.
- Système de caméra intelligente : Raspberry Pi et OpenMV, détection d'objets en
  conditions dégradées. Terminé.
- En cours : plateforme Django conteneurisée avec CI/CD, chaîne de mesure IoT
  temps réel, modèle de vision servi en API FastAPI, pilote STM32 en C.

LANGUES : tamazight (maternelle), arabe, français, anglais — tous courants.

SITUATION : disponible immédiatement, aucun préavis. Mobile sur Casablanca, Rabat et
Tanger, à l'aise en télétravail.

CONTACT : mehdi.ammou11@gmail.com — 07 14 54 69 55 —
linkedin.com/in/ammou-mehdi-483b6226b

LIMITES À ASSUMER : pas encore d'expérience en CDI, deux stages seulement. Sur
Kubernetes et les architectures cloud à grande échelle, les connaissances sont plus
théoriques que pratiques.
`;

const CONSIGNES = `Tu es l'assistant du portfolio de Mehdi Ammou. Tu réponds aux
questions de recruteurs et de visiteurs à propos de son parcours.

Règles :
- Réponds uniquement à partir du profil fourni. Si l'information ne s'y trouve pas,
  dis-le clairement et renvoie vers mehdi.ammou11@gmail.com. N'invente jamais un
  diplôme, une expérience, une technologie ou une date.
- Parle de Mehdi à la troisième personne. Ne prétends pas être lui.
- Deux à quatre phrases maximum. Ton professionnel et direct, sans superlatifs.
- Si on te demande ses limites ou ses faiblesses, réponds honnêtement à partir de la
  section correspondante plutôt que d'éluder.
- Sur le salaire, renvoie vers un échange direct avec Mehdi.
- Refuse poliment toute demande sans rapport avec son parcours professionnel.
- Réponds dans la langue de la question.`;

function enTetesCors(origine){
  const autorisee = ORIGINES_AUTORISEES.includes(origine) ? origine : ORIGINES_AUTORISEES[0];
  return {
    "Access-Control-Allow-Origin": autorisee,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}

export default {
  async fetch(request, env) {
    const origine = request.headers.get("Origin") || "";
    const cors = enTetesCors(origine);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: cors });
    }

    if (!ORIGINES_AUTORISEES.includes(origine)) {
      return new Response(JSON.stringify({ error: "origin_not_allowed" }),
        { status: 403, headers: { ...cors, "Content-Type": "application/json" } });
    }

    let corps;
    try {
      corps = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "invalid_json" }),
        { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
    }

    const question = String(corps.question || "").trim().slice(0, 500);
    if (!question) {
      return new Response(JSON.stringify({ error: "empty_question" }),
        { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
    }

    try {
      const reponse = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 400,
          system: CONSIGNES + "\n\nPROFIL :\n" + PROFIL,
          messages: [{ role: "user", content: question }]
        })
      });

      if (!reponse.ok) {
        // le site bascule automatiquement sur les réponses locales
        return new Response(JSON.stringify({ error: "upstream_error" }),
          { status: 502, headers: { ...cors, "Content-Type": "application/json" } });
      }

      const data = await reponse.json();
      const texte = (data.content || [])
        .filter(bloc => bloc.type === "text")
        .map(bloc => bloc.text)
        .join("\n")
        .trim();

      return new Response(JSON.stringify({ answer: texte }),
        { headers: { ...cors, "Content-Type": "application/json" } });

    } catch {
      return new Response(JSON.stringify({ error: "network_error" }),
        { status: 502, headers: { ...cors, "Content-Type": "application/json" } });
    }
  }
};
