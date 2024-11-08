'use client'
import { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { GranjaContext } from "@/app/context/GranjaContext";

export default function MainAdd() {
  const { validarDados, addGranja } = useContext(GranjaContext);

  const [nome, setNome] = useState("");
  const [distancia, setDistancia] = useState("");
  const [tempo, setTempo] = useState("");
  const [abertura, setAbertura] = useState("");
  const [fechamento, setFechamento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [error, setError] = useState(""); // Estado para mensagens de erro

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação
    const validation = validarDados(nome, distancia, tempo, abertura, fechamento, telefone, localizacao);

    if (validation !== true) {
      setError(validation); // Se a validação falhar, exibe a mensagem de erro
      return;
    }

    const distanciaLimpa = distancia.replace(/ km|_/g, "");

    try {

      // Adiciona os dados da nova granja ao Firebase
      await addGranja({
        nome,
        distancia: distanciaLimpa,
        tempo,
        abertura,
        fechamento,
        telefone,
        localizacao,
      });

      setNome("");
      setDistancia("");
      setTempo("");
      setAbertura("");
      setFechamento("");
      setTelefone("");
      setLocalizacao("");
      setError(""); // Limpa o erro após a submissão
      // Redireciona para a página inicial após o envio
      window.location.href = "/";
      console.log(tempo, abertura, fechamento)
    } catch (error) {
      console.error("Erro ao adicionar granja:", error);
    }
  };

  return (
    <>
      <div className="px-6 py-8 lg:px-40">
        {/* Cabeçalho */}
        <div>
          <div className="flex items-center">
            <Link href="/">
              <Image src="/back.svg" width={40} height={30} alt="Adicionar" />
            </Link>
          </div>
          <h1 className="font-bold text-[#753233] text-3xl">Adicionar Granjas</h1>
          <div className="flex gap-x-2">
            <p>by</p>
            <Image src="/logo.svg" width={100} height={30} alt="logo" />
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-16">
          {error && <div className="text-red-600">{error}</div>} {/* Exibe mensagem de erro se houver */}

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
                mask="(99) 9 9999-9999" // Máscara para telefone brasileiro
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

          {/* Botão de envio */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white font-bold flex justify-center bg-[#753233] px-20 py-2 rounded-xl mt-10"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}