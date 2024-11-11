// firebase.js

// Importa as funções necessárias do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACinRhog5LPN66hMCTjJcgThL84e84fFo",
  authDomain: "granjas-rl.firebaseapp.com",
  projectId: "granjas-rl",
  storageBucket: "granjas-rl.appspot.com",
  messagingSenderId: "104654425940",
  appId: "1:104654425940:web:dc2143a8fa1827059a02c1"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore e Auth e exporta ambos
export const db = getFirestore(app);
export const auth = getAuth(app);
