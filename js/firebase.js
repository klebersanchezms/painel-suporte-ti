import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGKlO1_kkgey3tEXok56vB1i4R9HjvWhk",
  authDomain: "painel-suporte-ti.firebaseapp.com",
  projectId: "painel-suporte-ti",
  storageBucket: "painel-suporte-ti.firebasestorage.app",
  messagingSenderId: "156561411422",
  appId: "1:156561411422:web:add4d0470da4546d6593cf",
  measurementId: "G-HLE32H9QJW"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
