import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const loginView = document.getElementById("loginView");
const appView = document.getElementById("appView");
const btnLogout = document.getElementById("btnLogout");
const userEmail = document.getElementById("userEmail");

// ===== CONTROLE DE SESSÃO =====
onAuthStateChanged(auth, user => {
  if (user) {
    loginView.classList.add("hidden");
    appView.classList.remove("hidden");
    btnLogout.classList.remove("hidden");
    userEmail.textContent = user.email;
  } else {
    loginView.classList.remove("hidden");
    appView.classList.add("hidden");
    btnLogout.classList.add("hidden");
    userEmail.textContent = "";
  }
});

// ===== LOGIN =====
document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    let msg = "Erro ao entrar.";

    if (err.code === "auth/user-not-found") {
      msg = "Usuário não encontrado.";
    } else if (err.code === "auth/wrong-password") {
      msg = "Senha incorreta.";
    } else if (err.code === "auth/invalid-email") {
      msg = "E-mail inválido.";
    }

    alert(msg);
  }
});

// ===== CRIAR USUÁRIO =====
document.getElementById("btnCreateUser").onclick = async () => {
  const email = prompt("E-mail do novo usuário:");
  if (!email) return;

  const senha = prompt("Senha (mínimo 6 caracteres):");
  if (!senha) return;

  try {
    await createUserWithEmailAndPassword(auth, email.trim(), senha);
    alert("Usuário criado com sucesso!");
  } catch (err) {
    let msg = "Erro ao criar usuário.";

    if (err.code === "auth/email-already-in-use") {
      msg = "Este e-mail já está cadastrado. Use outro ou faça login.";
    } else if (err.code === "auth/weak-password") {
      msg = "A senha precisa ter pelo menos 6 caracteres.";
    } else if (err.code === "auth/invalid-email") {
      msg = "E-mail inválido.";
    }

    alert(msg);
  }
};

// ===== LOGOUT =====
btnLogout.onclick = async () => {
  await signOut(auth);
};
