import { db } from "./firebase.js";
import { collection, getCountFromServer } from
"https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ===== KPIs =====
const kpiAtivos = document.getElementById("kpiAtivos");
const kpiUsuarios = document.getElementById("kpiUsuarios");
const kpiVenc = document.getElementById("kpiVenc");

async function carregarKPIs() {
  try {
    const ativosSnap = await getCountFromServer(collection(db, "ativos"));
    const usuariosSnap = await getCountFromServer(collection(db, "usuarios"));
    const vencSnap = await getCountFromServer(collection(db, "vencimentos"));

    kpiAtivos.textContent = ativosSnap.data().count;
    kpiUsuarios.textContent = usuariosSnap.data().count;
    kpiVenc.textContent = vencSnap.data().count;
  } catch (e) {
    console.error("Erro ao carregar KPIs", e);
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
if (btnAbout && aboutModal) {
  btnAbout.addEventListener("click", () => {
    aboutModal.classList.remove("hidden");
  });
}

// Fechar modal (botão)
if (btnCloseAbout && aboutModal) {
  btnCloseAbout.addEventListener("click", () => {
    aboutModal.classList.add("hidden");
  });
}

// Fechar modal clicando fora do conteúdo
if (aboutModal) {
  aboutModal.addEventListener("click", (e) => {
    if (e.target === aboutModal) {
      aboutModal.classList.add("hidden");
    }
  });
}

// Fechar modal com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && aboutModal) {
    aboutModal.classList.add("hidden");
  }
});
