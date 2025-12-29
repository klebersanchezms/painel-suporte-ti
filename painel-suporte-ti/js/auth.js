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
  }
});

document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  ).catch(err => alert(err.message));
});

document.getElementById("btnCreateUser").onclick = () => {
  const email = prompt("E-mail:");
  const senha = prompt("Senha (mín. 6 caracteres):");
  createUserWithEmailAndPassword(auth, email, senha)
    .catch(err => alert(err.message));
};

btnLogout.onclick = () => signOut(auth);
