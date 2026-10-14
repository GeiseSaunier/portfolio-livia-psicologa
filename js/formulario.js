// =========================================================
// Janela do formulário de interesse (Google Forms)
// =========================================================

// Janela do formulário
const modal = document.getElementById("formModal");
const frame = modal.querySelector("iframe");
const body = modal.querySelector(".fm-body");
frame.addEventListener("load", () => {
  if (frame.src) body.classList.add("loaded");
});
const openForm = () => {
  if (!frame.src) frame.src = frame.dataset.src;
  if (typeof modal.showModal === "function") modal.showModal();
  else modal.setAttribute("open", "");
  document.body.classList.add("modal-open");
};
const closeForm = () => {
  if (modal.close) modal.close();
  else modal.removeAttribute("open");
};
modal.addEventListener("close", () => document.body.classList.remove("modal-open"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeForm();
});
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-open-form]")) {
    e.preventDefault();
    openForm();
  } else if (e.target.closest("[data-close-form]")) {
    e.preventDefault();
    closeForm();
  }
});
