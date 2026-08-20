/* =========================================================
   Assistant du portfolio
   ---------------------------------------------------------
   Mode 1 (par défaut) : correspondance par mots-clés sur
   assets/js/chat-data.js. Aucune clé, aucun coût, aucun serveur.

   Mode 2 (optionnel) : renseigne CHAT_CONFIG.apiUrl avec
   l'adresse de ton proxy (voir chatbot/worker.js et le README).
   Ne mets JAMAIS de clé d'API dans ce fichier : il est public.
   ========================================================= */

const CHAT_CONFIG = {
  apiUrl: "",          // ex. "https://assistant.ton-domaine.workers.dev"
  timeoutMs: 12000     // au-delà, retour automatique aux réponses locales
};

(function assistant(){

  const KB = window.CHAT_KB;
  if (!KB) return;

  /* ---------- normalisation du texte ---------- */

  function normalise(txt){
    return txt
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")   // retire les accents
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const VIDES = new Set([
    "le","la","les","un","une","des","de","du","et","ou","a","au","aux","en","dans",
    "il","elle","est","son","sa","ses","que","qui","quoi","quel","quelle","pour","sur",
    "avec","the","a","an","of","is","he","his","to","in","on","for","what","which","do",
    "does","are","and","or","me","tell","about","you","can","i"
  ]);

  /* ---------- moteur de correspondance ---------- */

  function trouver(question){
    const q = normalise(question);
    if (!q) return null;

    const mots = q.split(" ").filter(m => m.length > 2 && !VIDES.has(m));
    let meilleur = null, meilleurScore = 0;

    for (const intent of KB.intents){
      let score = 0;

      for (const cle of intent.keywords){
        const c = normalise(cle);
        if (!c) continue;

        // expression complète présente dans la question
        if (c.includes(" ") && q.includes(c)) { score += c.length * 2; continue; }

        // mot-clé simple présent tel quel
        if (!c.includes(" ") && q.includes(c)) {
          // un mot entier reconnu suffit, même très court (« ayn », « dbt », « ia »)
          const entier = mots.includes(c) || q === c;
          score += entier ? Math.max(c.length * 2, 9) : c.length * 2;
          continue;
        }

        // correspondance partielle mot à mot (pluriels, conjugaisons)
        for (const m of mots){
          if (m.length > 4 && (m.startsWith(c) || c.startsWith(m))) score += 4;
        }
      }

      if (score > meilleurScore){ meilleurScore = score; meilleur = intent; }
    }

    return meilleurScore >= 8 ? meilleur : null;
  }

  /* ---------- mode distant, si configuré ---------- */

  async function demanderApi(question, langue){
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), CHAT_CONFIG.timeoutMs);
    try {
      const r = await fetch(CHAT_CONFIG.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, lang: langue }),
        signal: ctrl.signal
      });
      if (!r.ok) return null;
      const data = await r.json();
      return (data && typeof data.answer === "string" && data.answer.trim()) ? data.answer : null;
    } catch (e) {
      return null;                       // réseau, délai ou proxy indisponible
    } finally {
      clearTimeout(t);
    }
  }

  /* ---------- construction de l'interface ---------- */

  const lang = () => (document.documentElement.lang === "en" ? "en" : "fr");
  const T = {
    fr: { ouvrir:"Poser une question", titre:"Assistant", fermer:"Fermer", champ:"Écrivez votre question…", envoyer:"Envoyer" },
    en: { ouvrir:"Ask a question",     titre:"Assistant", fermer:"Close",  champ:"Type your question…",    envoyer:"Send" }
  };

  const bouton = document.createElement("button");
  bouton.className = "chat-fab";
  bouton.type = "button";
  bouton.setAttribute("aria-expanded", "false");
  bouton.innerHTML = '<span class="chat-fab-dot" aria-hidden="true"></span><span class="chat-fab-txt"></span>';

  const panneau = document.createElement("div");
  panneau.className = "chat-panel";
  panneau.setAttribute("role", "dialog");
  panneau.setAttribute("aria-modal", "false");
  panneau.hidden = true;
  panneau.innerHTML = `
    <header class="chat-head">
      <span class="chat-title"></span>
      <span class="chat-note"></span>
      <button class="chat-close" type="button" aria-label="Fermer">&times;</button>
    </header>
    <div class="chat-log" role="log" aria-live="polite"></div>
    <div class="chat-chips"></div>
    <form class="chat-form">
      <input class="chat-input" type="text" autocomplete="off" required>
      <button class="chat-send" type="submit"></button>
    </form>`;

  document.body.append(bouton, panneau);

  const log    = panneau.querySelector(".chat-log");
  const chips  = panneau.querySelector(".chat-chips");
  const form   = panneau.querySelector(".chat-form");
  const input  = panneau.querySelector(".chat-input");

  function etiquettes(){
    const l = lang(), t = T[l];
    bouton.querySelector(".chat-fab-txt").textContent = t.ouvrir;
    bouton.setAttribute("aria-label", t.ouvrir);
    panneau.querySelector(".chat-title").textContent = t.titre;
    panneau.querySelector(".chat-note").textContent  = KB.disclaimer[l];
    panneau.querySelector(".chat-close").setAttribute("aria-label", t.fermer);
    input.placeholder = t.champ;
    panneau.querySelector(".chat-send").textContent = t.envoyer;
  }

  function bulle(texte, qui){
    const el = document.createElement("div");
    el.className = "chat-msg chat-" + qui;
    el.textContent = texte;
    log.append(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function propositions(){
    chips.innerHTML = "";
    KB.suggestions[lang()].forEach(q => {
      const c = document.createElement("button");
      c.type = "button";
      c.className = "chat-chip";
      c.textContent = q;
      c.addEventListener("click", () => { chips.innerHTML = ""; poser(q); });
      chips.append(c);
    });
  }

  let demarre = false;
  function demarrer(){
    if (demarre) return;
    demarre = true;
    bulle(KB.welcome[lang()], "bot");
    propositions();
  }

  /* ---------- cycle question / réponse ---------- */

  async function poser(question){
    bulle(question, "moi");

    const attente = document.createElement("div");
    attente.className = "chat-msg chat-bot chat-wait";
    attente.innerHTML = "<span></span><span></span><span></span>";
    log.append(attente);
    log.scrollTop = log.scrollHeight;

    let reponse = null;

    if (CHAT_CONFIG.apiUrl) {
      reponse = await demanderApi(question, lang());
    }

    if (!reponse) {
      const intent = trouver(question);
      reponse = intent ? intent[lang()] : KB.fallback[lang()];
      await new Promise(r => setTimeout(r, 420));   // rythme de lecture
    }

    attente.remove();
    bulle(reponse, "bot");
  }

  /* ---------- interactions ---------- */

  function ouvrir(){
    etiquettes();
    panneau.hidden = false;
    bouton.setAttribute("aria-expanded", "true");
    bouton.classList.add("is-open");
    demarrer();
    setTimeout(() => input.focus(), 60);
  }

  function fermer(){
    panneau.hidden = true;
    bouton.setAttribute("aria-expanded", "false");
    bouton.classList.remove("is-open");
    bouton.focus();
  }

  bouton.addEventListener("click", () => panneau.hidden ? ouvrir() : fermer());
  panneau.querySelector(".chat-close").addEventListener("click", fermer);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !panneau.hidden) fermer();
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    chips.innerHTML = "";
    poser(q);
  });

  // suit la bascule FR / EN du site
  new MutationObserver(() => {
    etiquettes();
    if (demarre && chips.children.length) propositions();
  }).observe(document.documentElement, { attributes:true, attributeFilter:["lang"] });

  etiquettes();
})();
