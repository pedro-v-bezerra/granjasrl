'use client';
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GranjaContext } from "@/app/context/GranjaContext";

export default function MainEdit() {
  const { validarDados, sortedGranjas, idSelectedGranja, updateGranja } = useContext(GranjaContext);

  const selectedGranja = sortedGranjas.find(granja => granja.id === idSelectedGranja);

  // Verifica se a granja foi selecionada
  if (!selectedGranja) {
    return <div>Carregando...</div>; // ou algum outro indicador de carregamento
  }

  // Inicializa os estados com os valores atuais da granja selecionada
  const [nome, setNome] = useState(selectedGranja.nome || "");
  const [distancia, setDistancia] = useState(selectedGranja.distancia || "");
  const [tempo, setTempo] = useState(selectedGranja.tempo || "");
  const [abertura, setAbertura] = useState(selectedGranja.abertura || "");
  const [fechamento, setFechamento] = useState(selectedGranja.fechamento || "");
  const [telefone, setTelefone] = useState(selectedGranja.telefone || "");
  const [localizacao, setLocalizacao] = useState(selectedGranja.localizacao || "");
  const [error, setError] = useState(""); // Estado para mensagens de erro

  useEffect(() => {
    if (selectedGranja) {
      setNome(selectedGranja.nome);
      setDistancia(selectedGranja.distancia);
      setTempo(selectedGranja.tempo);
      setAbertura(selectedGranja.abertura);
      setFechamento(selectedGranja.fechamento);
      setTelefone(selectedGranja.telefone);
      setLocalizacao(selectedGranja.localizacao);
    }
  }, [selectedGranja]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validarDados(nome, distancia, tempo, abertura, fechamento, telefone, localizacao);

    if (validation !== true) {
      setError(validation);
      return;
    }

    const distanciaLimpa = distancia.replace(/ km|_/g, "");

    try {
      // Passa o ID da granja e os dados atualizados
      await updateGranja(selectedGranja.id, {
        nome,
        distancia: distanciaLimpa,
        tempo,
        abertura,
        fechamento,
        telefone,
        localizacao,
      });

      setError(""); // Limpa o erro após a submissão
      window.location.href = "/"; // Redireciona após a atualização
    } catch (error) {
      console.error("Erro ao atualizar granja:", error);
    }
  };

  return (
    <div className="px-6 py-8 lg:px-40">
      <div>
        <div className="flex items-center">
          <Link href="/">
            <Image src="/back.svg" width={40} height={30} alt="Voltar" />
          </Link>
        </div>
        <h1 className="font-bold text-[#753233] text-3xl">Editar Granja</h1>
        <div className="flex gap-x-2">
          <p>by</p>
          <Image src="/logo.svg" width={100} height={30} alt="logo" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-16">
        {error && <div className="text-red-600">{error}</div>}

        <div>
          <label>Nome</label>
          <input
            value={nome}
            required={true}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da granja"
            className="bg-[#FAFAFA] w-full py-3 rounded-full px-4"
          />
        </div>

        <div className="flex gap-x-8">
          <div className="w-full">
            <label>Distância (km)</label>
            <input
              mask="999 km"
              value={distancia}
              onChange={(e) => setDistancia(e.target.value)}
              placeholder="Ex: 45 km"
              className="bg-[#FAFAFA] w-full py-3 rounded-full px-4"
            />
          </div>
          <div className="w-full">
            <label>Tempo médio de chegada</label>
            <input
              mask='9:99'
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
              placeholder="Ex: 1:45"
              className="bg-[#FAFAFA] w-full py-3 rounded-full px-4"
            />
          </div>
        </div>

        <div className="flex gap-x-8">
          <div className="flex items-end gap-x-2 w-full">
            <div className="w-full">
              <label>Funcionamento</label>
              <input
                mask="99:99"
                value={abertura}
                onChange={(e) => setAbertura(e.target.value)}
                placeholder="Horário de abertura"
                className="bg-[#FAFAFA] w-full py-3 rounded-full px-4"
              />
            </div>
            <div className="w-full">
              <input
                mask="99:99"
                value={fechamento}
                onChange={(e) => setFechamento(e.target.value)}
                placeholder="Horário de fechamento"
                className="bg-[#FAFAFA] w-full py-3 rounded-full px-4"
              />
            </div>
          </div>
          <div>
            <label>Telefone do Granjeiro</label>
            <input
              mask="(99) 9 9999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Ex: (61) 9 9876-5432"
              className="bg-[#FAFAFA] w-full py-3 rounded-full px-4"
            />
          </div>
        </div>
        <div>
          <label>Link da Localização</label>
          <input
            value={localizacao}
            required={true}
            onChange={(e) => setLocalizacao(e.target.value)}
            placeholder="Cole seu link aqui"
            className="bg-[#FAFAFA] w-full py-3 rounded-full px-4"
          />
        </div>

        <div className="flex justify-center gap-x-20">
            <button
              type="button" // Alterei para "button" para evitar a submissão do form
              onClick={handleDelete}
              className="flex justify-center items-center gap-x-4 text-white font-bold flex justify-center bg-red-500 px-8 py-2 rounded-xl mt-10"
            >
              <p>Deletar Granja</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
            </button>

            <button
              type="submit"
              className="text-white font-bold flex justify-center bg-[#753233] px-20 py-2 rounded-xl mt-10"
            >
              Atualizar
            </button>
        </div>
      </form>
    </div>
  );
}