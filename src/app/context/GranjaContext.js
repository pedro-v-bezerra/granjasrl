'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

export const GranjaContext = createContext();

export const GranjaProvider = ({ children }) => {
  const [granjas, setGranjas] = useState([]);
  const [selectedGranja, setSelectedGranja] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função assíncrona para buscar dados
    const fetchGranjas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "granjas"));
        const fetchedGranjas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("Granjas carregadas:", fetchedGranjas); // Verificando se as granjas foram carregadas
        setGranjas(fetchedGranjas); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar granjas:", error);
      } finally {
        setLoading(false); // Define o carregamento como concluído
      }
    };

    fetchGranjas();
  }, []); // Executa apenas uma vez

  // Ordenar granjas sem mutar o array original
  const sortedGranjas = [...granjas].sort((a, b) => {
    return a.nome.localeCompare(b.nome);
  });

  // Garantir que selectedGranja esteja dentro do índice válido
  useEffect(() => {
    console.log("Granjas antes de verificar:", granjas); // Verificar o conteúdo das granjas
    if (granjas.length > 0 && selectedGranja >= granjas.length) {
      setSelectedGranja(0); // Se o índice for inválido, redefina para o primeiro
    }
  }, [granjas, selectedGranja]);

  if (loading) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregamento enquanto os dados não chegam
  }

  return (
    <GranjaContext.Provider value={{ sortedGranjas, selectedGranja, setSelectedGranja }}>
      {children}
    </GranjaContext.Provider>
  );
};
