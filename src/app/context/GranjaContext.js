'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
// import * as XLSX from "xlsx"; // Altere xlsx para XLSX


export const GranjaContext = createContext();

export const GranjaProvider = ({ children }) => {
  const [granjas, setGranjas] = useState([]);
  const [idSelectedGranja, setIdSelectedGranja] = useState(0);
  const [selectedAdd, setSelectedAdd] = useState(false)
  const [selectedEdit, setSelectedEdit] = useState(false)
  const [selectedDetalhes, setSelectedDetalhes] = useState(false)

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

    // Verifica o tempo (considerando a função de validação adaptada para o tempo)
    if (tempo) {
      // Valida se o tempo está no formato correto
      const regexTempo = /^\d+h e \d{1,2}min$/;
      if (!regexTempo.test(tempo)) {
        return "Formato de tempo inválido. Use 'Xh e Xmin'.";
      }

      // Extraímos horas e minutos do formato "Xh e Xmin"
      const match = tempo.match(/^(\d+)h e (\d{1,2})min$/);
      if (match) {
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);

        // Valida as horas e minutos
        if (hours > 99) {
          return "O número de horas não pode ser maior que 99.";
        }
        if (minutes > 59) {
          return "O número de minutos não pode ser maior que 59.";
        }
        // Verifica se o tempo é maior ou igual a 50 minutos
        if (hours === 0 && minutes < 50) {
          return "Insira um tempo médio de chegada válido (mínimo de 50 minutos).";
        }
      }
    }

    // Valida horários de abertura e fechamento
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

    // Valida o telefone
    if (telefone && !regexTelefone.test(telefone)) {
      return "O telefone deve estar no formato (XX) 9 XXXX-XXXX.";
    }

    if (!localizacao.trim()) {
      return "O link de localização é obrigatório.";
    }

    return true;
  };

  console.log(idSelectedGranja)

  // useEffect(() => {
  //   const loadExcelFile = async () => {
  //     try {
  //       const response = await fetch("/importada.xlsx");
  //       const arrayBuffer = await response.arrayBuffer();
  //       const workbook = XLSX.read(arrayBuffer, { type: "array" });
  
  //       const sheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[sheetName];
  //       const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
  //       const granjasFromExcel = jsonData.map((row) => ({
  //         nome: row["Nome da Granja"] || "",
  //         localizacao: row["Localização"] || "",
  //         distancia: row["Distância"] || '',
  //         tempo: row["Tempo médio"] || "",
  //         funcionamento: row["Funcionamento"] || "",
  //         telefone: row["Telefone"] || ""
  //       }));
  
  //       // Adiciona cada granja ao Firestore
  //       // for (const granja of granjasFromExcel) {
  //       //   await addDoc(collection(db, "granjas"), granja);
  //       // }
  
  //       console.log("Dados importados com sucesso para o Firebase!");
  
  //     } catch (error) {
  //       console.error("Erro ao carregar e processar o arquivo Excel:", error);
  //     }
  //   };
  
  //   loadExcelFile();
  // }, []);
  

  return (
    <GranjaContext.Provider value={{
      validarDados,
      sortedGranjas,
      idSelectedGranja,
      setIdSelectedGranja,
      addGranja,
      updateGranja,
      deleteGranja,
      selectedAdd,
      selectedEdit,
      selectedDetalhes,
      setSelectedAdd,
      setSelectedEdit,
      setSelectedDetalhes
    }}>
      {children}
    </GranjaContext.Provider>
  );
};

export const useGranja = () => useContext(GranjaContext);
