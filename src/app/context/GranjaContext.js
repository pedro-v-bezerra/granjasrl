'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const GranjaContext = createContext();

export const GranjaProvider = ({ children }) => {
  const [granjas, setGranjas] = useState([]);
  const [idSelectedGranja, setIdSelectedGranja] = useState(0);

  useEffect(() => {
    const fetchGranjas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "granjas"));
        const fetchedGranjas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setGranjas(fetchedGranjas);
      } catch (error) {
        console.error("Erro ao buscar granjas:", error);
      }
    };

    fetchGranjas();
  }, []);

  const addGranja = async (novaGranja) => {
    try {
      const docRef = await addDoc(collection(db, "granjas"), novaGranja);
      setGranjas([...granjas, { id: docRef.id, ...novaGranja }]);
    } catch (error) {
      console.error("Erro ao adicionar granja:", error);
    }
  };

  const updateGranja = async (id, dadosAtualizados) => {
    try {
      const granjaRef = doc(db, "granjas", id);
      await updateDoc(granjaRef, dadosAtualizados);

      setGranjas((granjas) =>
        granjas.map((granja) =>
          granja.id === id ? { ...granja, ...dadosAtualizados } : granja
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar granja:", error);
    }
  };

  const deleteGranja = async (id) => {
    try {
      const granjaRef = doc(db, "granjas", id);
      await deleteDoc(granjaRef); // Deleta o documento no Firebase

      // Atualiza o estado local para remover a granja deletada
      setGranjas((granjas) => granjas.filter((granja) => granja.id !== id));
    } catch (error) {
      console.error("Erro ao deletar granja:", error);
    }
  };

  const sortedGranjas = granjas.sort((a, b) => a.nome.localeCompare(b.nome));

  const validarDados = (nome, distancia, tempo, abertura, fechamento, telefone, localizacao) => {
    const regexHora = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    const regexTelefone = /^\(\d{2}\) \d{1} \d{4}-\d{4}$/;

    if (!nome.trim()) {
      return "O nome da granja é obrigatório.";
    }

    if (distancia && distancia <= 0) {
      return "A distância deve ser um número positivo.";
    }

    if (tempo && !regexHora.test(tempo)) {
      return "Insira um tempo médio de chegada válido";
    }

    if (abertura && !regexHora.test(abertura)) {
      return "Insira um horário de abertura válido";
    }

    if (fechamento && !regexHora.test(fechamento)) {
      return "Insira um horário de fechamento válido";
    }

    if (fechamento && !abertura) {
      return "Insira um horário de abertura";
    }
    if (!fechamento && abertura) {
      return "Insira um horário de fechamento";
    }

    if (telefone && !regexTelefone.test(telefone)) {
      return "O telefone deve estar no formato (XX) 9 XXXX-XXXX.";
    }

    if (!localizacao.trim()) {
      return "O link de localização é obrigatório.";
    }

    return true;
  };

  console.log(idSelectedGranja)

  return (
    <GranjaContext.Provider value={{ 
      validarDados, 
      sortedGranjas, 
      idSelectedGranja, 
      setIdSelectedGranja, 
      addGranja, 
      updateGranja, 
      deleteGranja 
    }}>
      {children}
    </GranjaContext.Provider>
  );
};

export const useGranja = () => useContext(GranjaContext);
