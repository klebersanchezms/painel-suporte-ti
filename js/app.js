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
