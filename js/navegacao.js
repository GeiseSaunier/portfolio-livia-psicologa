// =========================================================
// Navegação: menu, troca entre portfólio e psicoterapia
// =========================================================

// Borda do menu ao rolar e item ativo
const header = document.getElementById("topo");
const links = [...document.querySelectorAll(".nav-main ul a:not(.nav-cta)")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
const portfolio = document.getElementById("inicio");
const therapy = document.getElementById("psicoterapia");
const navMain = document.querySelector(".nav-main");
const navPsi = document.querySelector(".nav-psi");
const onScroll = () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
  if (portfolio.hidden) return;
  let current = null;
  sections.forEach((s, i) => {
    if (s && s.getBoundingClientRect().top < 140) current = i;
  });
  links.forEach((a, i) => a.classList.toggle("active", i === current));
};
window.addEventListener("scroll", onScroll, { passive: true });

// Navegação entre portfólio e psicoterapia (funciona sem depender do endereço)
const show = (view, target, push) => {
  const psi = view === "psicoterapia";
  portfolio.hidden = psi;
  navMain.hidden = psi;
  therapy.hidden = !psi;
  navPsi.hidden = !psi;
  document.title = psi
    ? "Psicoterapia | Lívia Barbosa de Oliveira, Psicóloga CRP 20/14387"
    : "Lívia Barbosa de Oliveira | Psicóloga CRP 20/14387";
  if (target) target.scrollIntoView();
  else window.scrollTo(0, 0);
  if (push) {
    try {
      history.pushState({ view }, "", psi ? "#psicoterapia" : location.pathname + location.search);
    } catch (e) {}
  }
  onScroll();
};

document.addEventListener(
  "click",
  (e) => {
    const go = e.target.closest("[data-go]");
    if (go) {
      e.preventDefault();
      show(
        go.dataset.go,
        go.dataset.target ? document.getElementById(go.dataset.target) : null,
        true,
      );
      return;
    }
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    const el = id && document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const inTherapy = therapy.contains(el);
    if (inTherapy === therapy.hidden) show(inTherapy ? "psicoterapia" : "inicio", el, true);
    else el.scrollIntoView({ behavior: "smooth" });
  },
  true,
);

window.addEventListener("popstate", () =>
  show((location.hash || "").startsWith("#psi") ? "psicoterapia" : "inicio", null, false),
);
if ((location.hash || "").startsWith("#psi")) show("psicoterapia", null, false);
else onScroll();
