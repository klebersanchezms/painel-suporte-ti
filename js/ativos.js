import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const ativoForm = document.getElementById("ativoForm");
const listaAtivos = document.getElementById("listaAtivos");

ativoForm.addEventListener("submit", async e => {
  e.preventDefault();

  const ativo = {
    tipo: tipo.value,
    fabricante: fabricante.value,
    modelo: modelo.value,
    serial: serial.value,
    ip: ip.value,
    hostname: hostname.value,
    setor: setor.value,
    responsavel: responsavel.value,
    obs: obs.value,
    criadoEm: new Date()
  };

  await addDoc(collection(db, "ativos"), ativo);
  ativoForm.reset();
  carregarAtivos();
});

async function carregarAtivos() {
  listaAtivos.innerHTML = "";
  const snap = await getDocs(collection(db, "ativos"));

  snap.forEach(d => {
    const a = d.data();
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${a.tipo}</strong><br>
      ${a.fabricante || ""} ${a.modelo || ""}<br>
      IP: ${a.ip || "-"}<br>
      <button class="btn secondary">Excluir</button>
    `;
    div.querySelector("button").onclick = async () => {
      await deleteDoc(doc(db, "ativos", d.id));
      carregarAtivos();
    };
    listaAtivos.appendChild(div);
  });
}

carregarAtivos();
