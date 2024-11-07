'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '/firebase.js'

export const GranjaContext = createContext();

export const GranjaProvider = ({ children }) => {
  const [granjas, setGranjas] = useState([]);
  const [selectedGranja, setSelectedGranja] = useState(0);

  useEffect(() => {
    // Função assíncrona para buscar dados
    const fetchGranjas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "granjas"));
        const fetchedGranjas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setGranjas(fetchedGranjas); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar granjas:", error);
      }
    };

    fetchGranjas();
  }, []); // Executa apenas uma vez

  const sortedGranjas = granjas.sort((a, b) => {
    // Usamos localeCompare para comparação alfabética
    return a.nome.localeCompare(b.nome);
  });

  console.log(sortedGranjas)

  return (
    <GranjaContext.Provider value={{ sortedGranjas, selectedGranja, setSelectedGranja }}>
      {children}
    </GranjaContext.Provider>
  );
};