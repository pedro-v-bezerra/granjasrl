// Importa as funções necessárias do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Adiciona a importação do Firestore

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACinRhog5LPN66hMCTjJcgThL84e84fFo",
  authDomain: "granjas-rl.firebaseapp.com",
  projectId: "granjas-rl",
  storageBucket: "granjas-rl.appspot.com", // Corrige o domínio do storage bucket
  messagingSenderId: "104654425940",
  appId: "1:104654425940:web:dc2143a8fa1827059a02c1"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore e o exporta
export const db = getFirestore(app);
