import { db } from "./firebase.js";
import { collection, getCountFromServer } from
"https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

async function carregarKPIs() {
  try {
    kpiAtivos.textContent = (await getCountFromServer(collection(db,"ativos"))).data().count;
    kpiUsuarios.textContent = (await getCountFromServer(collection(db,"usuarios"))).data().count;
    kpiVenc.textContent = (await getCountFromServer(collection(db,"vencimentos"))).data().count;
  } catch {
    kpiAtivos.textContent = 0;
    kpiUsuarios.textContent = 0;
    kpiVenc.textContent = 0;
  }
}
carregarKPIs();

// ===== MODAL SOBRE (CORRIGIDO) =====
const btnAbout = document.getElementById("btnAbout");
const aboutModal = document.getElementById("aboutModal");
const btnCloseAbout = document.getElementById("btnCloseAbout");

// Abrir modal
btnAbout.addEventListener("click", () => {
  aboutModal.classList.remove("hidden");
});

// Fechar modal (botão)
btnCloseAbout.addEventListener("click", () => {
  aboutModal.classList.add("hidden");
});

// Fechar modal clicando fora do card
aboutModal.addEventListener("click", (e) => {
  if (e.target === aboutModal) {
    aboutModal.classList.add("hidden");
  }
});

// Fechar modal com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    aboutModal.classList.add("hidden");
  }
});
.modal.hidden {
  display: none;
}



