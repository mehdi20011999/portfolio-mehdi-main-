/* =========================================================
   Mehdi Ammou — portfolio
   1. CONFIG : mets tes liens ici, ils se placent tout seuls
   2. Le reste ne demande aucune modification
   ========================================================= */

const CONFIG = {
  github: "votre-pseudo",           // <- ton pseudo GitHub, sans l'URL
  flagshipRepo: "sonda",            // projet principal (SONDA)
  saqiRepo: "saqi",                 // projet d'intérêt général (SAQI)
  repos: [
    "camera-intelligente",          // P-01
    "django-ci-cd",                 // P-02
    "bayan",                        // P-03
    "vision-api",                   // P-04
    "stm32-i2c-driver",             // P-05
    "rassad",                       // P-06
    "ayn-fpga"                      // P-07
  ],
  demos: [
    "",                             // P-01 : pas de démo
    "",                             // P-02 : ex. "https://mon-app.onrender.com"
    "",                             // P-03
    "",                             // P-04
    "",                             // P-05
    "",                             // P-06
    ""                              // P-07
  ]
};

/* ---------- liens vers les dépôts ---------- */

(function wireLinks(){
  const base = "https://github.com/" + CONFIG.github;

  document.querySelectorAll(".card").forEach((card, i) => {
    const repoLink = card.querySelector("[data-repo]");
    const demoLink = card.querySelector("[data-demo]");
    const repo = CONFIG.repos[i];
    const demo = CONFIG.demos[i];

    if (repoLink) {
      repoLink.href = (repo && CONFIG.github !== "votre-pseudo") ? base + "/" + repo : base;
      repoLink.target = "_blank";
      repoLink.rel = "noopener";
    }

    if (demoLink) {
      if (demo) {
        demoLink.href = demo;
        demoLink.target = "_blank";
        demoLink.rel = "noopener";
      } else {
        demoLink.remove();
      }
    }
  });

  const flag = document.querySelector("[data-flagship-repo]");
  if (flag) {
    flag.href = (CONFIG.github !== "votre-pseudo") ? base + "/" + CONFIG.flagshipRepo : base;
    flag.target = "_blank";
    flag.rel = "noopener";
  }

  const saqi = document.querySelector("[data-saqi-repo]");
  if (saqi) {
    saqi.href = (CONFIG.github !== "votre-pseudo") ? base + "/" + CONFIG.saqiRepo : base;
    saqi.target = "_blank";
    saqi.rel = "noopener";
  }

  const gh = document.querySelector("[data-github]");
  if (gh) {
    gh.href = base;
    gh.target = "_blank";
    gh.rel = "noopener";
    gh.textContent = "github.com/" + CONFIG.github;
  }
})();

/* ---------- bascule FR / EN ---------- */

(function language(){
  const btn = document.getElementById("langToggle");
  if (!btn) return;

  const on  = btn.querySelector(".lang-on");
  const off = btn.querySelector(".lang-off");
  let lang = "fr";

  function apply(next){
    lang = next;
    document.documentElement.lang = next;

    document.querySelectorAll("[data-fr][data-en]").forEach(el => {
      const txt = el.getAttribute("data-" + next);
      if (txt !== null) el.textContent = txt;
    });

    on.textContent  = next.toUpperCase();
    off.textContent = next === "fr" ? "EN" : "FR";
    btn.setAttribute("aria-label", next === "fr" ? "Switch to English" : "Passer en français");

    try { localStorage.setItem("lang", next); } catch (e) {}
  }

  btn.addEventListener("click", () => apply(lang === "fr" ? "en" : "fr"));

  // Le français reste la langue par défaut : c'est celle des recruteurs au Maroc.
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  if (saved === "en") apply("en");
})();

/* ---------- révélation au défilement ---------- */

(function reveal(){
  const targets = document.querySelectorAll(".sec-head, .card, .tl-item, .profil-grid, .chip, .contacts");
  if (!("IntersectionObserver" in window)) return;

  targets.forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  targets.forEach(el => io.observe(el));
})();

/* ---------- section active dans la navigation ---------- */

(function activeNav(){
  const links = [...document.querySelectorAll(".nav a")];
  const sections = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.toggle(
        "is-active",
        a.getAttribute("href") === "#" + entry.target.id
      ));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(s => io.observe(s));
})();

/* ---------- année du copyright ---------- */

(function year(){
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();
