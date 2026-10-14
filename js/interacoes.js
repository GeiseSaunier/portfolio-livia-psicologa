// =========================================================
// Interações da página e animações de entrada
// =========================================================

// ===== Interações =====
// Mancha: o que você vê?
const portrait = document.querySelector(".portrait");
const ask = document.querySelector(".blot-ask");
const quiz = document.getElementById("blotQuiz");
const bqAnswer = quiz.querySelector(".bq-answer");
const toggleQuiz = (open) => {
  quiz.hidden = !open;
  ask.setAttribute("aria-expanded", open);
  portrait.classList.toggle("quiz-open", open);
};
ask.addEventListener("click", () => toggleQuiz(quiz.hidden));
portrait.querySelector(".arch").addEventListener("click", () => toggleQuiz(true));
quiz.querySelector(".bq-close").addEventListener("click", () => toggleQuiz(false));
quiz.querySelectorAll("[data-see]").forEach((b) =>
  b.addEventListener("click", () => {
    quiz.querySelectorAll("[data-see]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    const what = b.dataset.see;
    bqAnswer.innerHTML =
      (what === "outra coisa"
        ? "Que bom! Cada pessoa enxerga algo diferente."
        : "Você viu " + what + ". Outra pessoa poderia ver algo bem diferente.") +
      " Não existe resposta certa: o que vemos tem a ver com a nossa própria forma de olhar o mundo. Na terapia, o ponto de partida é o seu olhar." +
      '<br><button type="button" data-go="psicoterapia">Conhecer a psicoterapia</button>';
  }),
);

// Experimente: cadeia da TCC
const sits = [
  {
    sit: "Mandei uma mensagem e não tive resposta.",
    th: "“Fiz algo errado. A pessoa está chateada comigo.”",
    em: "Ansiedade e insegurança.",
    be: "Checar o celular o tempo todo e mandar várias mensagens.",
    th2: "“Talvez a pessoa só esteja ocupada agora.”",
    em2: "Mais tranquilidade.",
    be2: "Seguir o dia e esperar a resposta.",
  },
  {
    sit: "Recebi uma crítica sobre um trabalho.",
    th: "“Eu não dou conta. Não sou capaz.”",
    em: "Tristeza e vergonha.",
    be: "Evitar novas tarefas e se isolar.",
    th2: "“Uma crítica sobre uma tarefa não define quem eu sou.”",
    em2: "Desconforto, mas com mais equilíbrio.",
    be2: "Pedir orientação e tentar de novo.",
  },
  {
    sit: "Tenho uma apresentação amanhã.",
    th: "“Vai dar tudo errado. Vou travar na frente de todos.”",
    em: "Medo e nervosismo.",
    be: "Adiar a preparação e perder o sono.",
    th2: "“É normal sentir nervosismo. Posso me preparar aos poucos.”",
    em2: "Um nervosismo mais manejável.",
    be2: "Ensaiar algumas vezes e descansar.",
  },
];
const chain = document.querySelector(".chain");
const fields = {
  sit: chain.querySelector('[data-f="sit"]'),
  th: chain.querySelector('[data-f="th"]'),
  em: chain.querySelector('[data-f="em"]'),
  be: chain.querySelector('[data-f="be"]'),
};
const reframe = document.querySelector(".reframe");
const rfLabel = reframe.querySelector(".rf-label");
let cur = 0,
  alt = false;
const paint = (animate) => {
  const d = sits[cur];
  const vals = {
    sit: d.sit,
    th: alt ? d.th2 : d.th,
    em: alt ? d.em2 : d.em,
    be: alt ? d.be2 : d.be,
  };
  Object.entries(fields).forEach(([k, el], i) => {
    if (!animate) {
      el.textContent = vals[k];
      return;
    }
    el.classList.add("swap");
    setTimeout(
      () => {
        el.textContent = vals[k];
        el.classList.remove("swap");
      },
      180 + i * 90,
    );
  });
  chain.classList.toggle("alt", alt);
  reframe.setAttribute("aria-pressed", alt);
  rfLabel.textContent = alt ? "Voltar ao pensamento inicial" : "E se eu olhasse de outro jeito?";
};
document.querySelectorAll(".try-tabs [data-sit]").forEach((t) =>
  t.addEventListener("click", () => {
    document
      .querySelectorAll(".try-tabs [data-sit]")
      .forEach((x) => x.setAttribute("aria-selected", x === t));
    cur = +t.dataset.sit;
    alt = false;
    paint(true);
  }),
);
reframe.addEventListener("click", () => {
  alt = !alt;
  paint(true);
});
paint(false);

// Pensamento ou fato?
document
  .querySelectorAll(".flip")
  .forEach((f) =>
    f.addEventListener("click", () =>
      f.setAttribute("aria-pressed", f.getAttribute("aria-pressed") !== "true"),
    ),
  );

// Verbos com perguntas
const vp = document.querySelector(".verb-prompt");
document.querySelectorAll(".verbs [data-q]").forEach((b) =>
  b.addEventListener("click", () => {
    document
      .querySelectorAll(".verbs [data-q]")
      .forEach((x) => x.setAttribute("aria-pressed", x === b));
    vp.innerHTML = '<span class="vp-q">' + b.dataset.q + "</span>";
  }),
);

// Pausa para respirar
const breath = document.querySelector(".breath");
const bLabel = breath.querySelector(".breath-label");
const bBtn = document.querySelector(".breath-btn");
const bDone = document.querySelector(".pause-done");
let bTimer = null,
  bRunning = false;
const stopBreath = (finished) => {
  clearTimeout(bTimer);
  bRunning = false;
  breath.classList.remove("inhale", "exhale");
  bLabel.textContent = finished ? "Obrigada" : "Pronto?";
  bBtn.textContent = finished ? "Fazer de novo" : "Começar a pausa";
  if (finished)
    bDone.innerHTML =
      'Como você se sente agora? Se quiser continuar cuidando de você, <button type="button" data-open-form>o próximo passo pode ser aqui.</button>';
};
const cycle = (n) => {
  if (n === 0) {
    stopBreath(true);
    return;
  }
  breath.classList.remove("exhale");
  breath.classList.add("inhale");
  bLabel.textContent = "Inspire";
  bTimer = setTimeout(() => {
    breath.classList.remove("inhale");
    breath.classList.add("exhale");
    bLabel.textContent = "Solte o ar";
    bTimer = setTimeout(() => cycle(n - 1), 6000);
  }, 4000);
};
bBtn.addEventListener("click", () => {
  if (bRunning) {
    stopBreath(false);
    return;
  }
  bRunning = true;
  bDone.textContent = "";
  bBtn.textContent = "Parar";
  cycle(6);
});

// Barra de progresso e botão flutuante na psicoterapia
const prog = document.querySelector(".psi-progress");
const progBar = prog.querySelector("span");
const floatCta = document.querySelector(".float-cta");
const formSec = document.getElementById("psi-formulario");
const psiScroll = () => {
  const on = !therapy.hidden;
  prog.hidden = !on;
  if (!on) {
    floatCta.classList.remove("show");
    return;
  }
  const max = document.documentElement.scrollHeight - innerHeight;
  progBar.style.width = (max > 0 ? Math.min(100, (scrollY / max) * 100) : 0) + "%";
  const formTop = formSec.getBoundingClientRect().top;
  const show = scrollY > innerHeight * 0.8 && formTop > innerHeight * 0.9;
  floatCta.classList.toggle("show", show);
  floatCta.setAttribute("aria-hidden", !show);
  floatCta.tabIndex = show ? 0 : -1;
};
window.addEventListener("scroll", psiScroll, { passive: true });
new MutationObserver(psiScroll).observe(therapy, { attributes: true, attributeFilter: ["hidden"] });
psiScroll();

// Entrada suave das seções
const io =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 },
      )
    : null;
document
  .querySelectorAll(".reveal")
  .forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
