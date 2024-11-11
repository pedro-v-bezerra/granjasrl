'use client';
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GranjaContext } from "@/app/context/GranjaContext";

export default function EditForm() {
  const { validarDados, sortedGranjas, idSelectedGranja, updateGranja, setSelectedEdit, deleteGranja } = useContext(GranjaContext);

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

    const distanciaTratada = (distancia) => {
      if (distancia && !distancia.includes("km")) {
        return `${distancia} km`;
      }
      return distancia;
    }

    const verificaTempo = (valor) => {
      if (valor === undefined || valor === null){
        return ''
      }
      return valor
    }


    try {
      // Passa o ID da granja e os dados atualizados
      await updateGranja(selectedGranja.id, {
        nome,
        distancia: distanciaTratada(distancia),
        tempo,
        abertura: verificaTempo(abertura),
        fechamento: verificaTempo(fechamento),
        telefone,
        localizacao,
      });


      setError(""); // Limpa o erro após a submissão
      window.location.href = "/"; // Redireciona após a atualização
    } catch (error) {
      console.error("Erro ao atualizar granja:", error);
    }
  };


  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza de que deseja deletar esta granja?");

    if (confirmDelete) {
      try {
        // Chama a função deleteGranja passando o id da granja
        await deleteGranja(selectedGranja.id);

        // Redireciona após a exclusão
        window.location.href = "/";
      } catch (error) {
        console.error("Erro ao deletar granja:", error);
      }
    }
  };


  const formatTime = (time) => {
    if (time) {
      // Remove caracteres não numéricos
      time = time.replace(/\D/g, "");

      // Garante que a entrada tenha pelo menos 4 dígitos
      if (time.length >= 4) {
        let hours = time.substring(0, 2);
        let minutes = time.substring(2, 4);
        return `${hours}:${minutes}`;
      } else if (time.length >= 2) {
        let hours = time.substring(0, 2);
        return `${hours}:`;
      }
      return time;
    } else {
      return ''
    }
  };

  const formatAverageTime = (time) => {
    // Verifica se o tempo já está no formato "Xh e Xmin"
    if (/^\d+h e \d{1,2}min$/.test(time) || /^\d{1,2}min$/.test(time)) {
      return time;
    }

    // Remove caracteres não numéricos
    time = time.replace(/\D/g, "");

    // Se a entrada tiver apenas 1 dígito, assume que são horas e os minutos serão 00
    if (time.length === 1) {
      return `${time}h e 00min`;
    }

    // Garante que a entrada tenha pelo menos 2 dígitos
    if (time.length >= 2) {
      // Divide os minutos e as horas
      let hours = parseInt(time.substring(0, time.length - 2)); // Captura as horas
      let minutes = parseInt(time.substring(time.length - 2)); // Captura os minutos

      // Se a entrada tiver 4 ou mais dígitos, considera horas e minutos
      if (hours > 0) {
        return `${hours}h e ${minutes}min`;
      } else {
        // Caso não tenha horas, retorna apenas os minutos
        return `${minutes}min`;
      }
    }

    // Se não houver tempo suficiente para formatar, retorna a entrada original
    return time;
  };

  const formatPhoneNumber = (phone) => {
    // Remove qualquer caractere não numérico
    phone = phone.replace(/\D/g, "");

    if (!phone) return '';

    // Aplica a formatação para o padrão (XX) 9 XXXX-XXXX
    if (phone.length <= 2) {
      return `(${phone}`;
    } else if (phone.length <= 3) {
      return `(${phone.substring(0, 2)}) ${phone.substring(2)}`;
    } else if (phone.length <= 7) {
      return `(${phone.substring(0, 2)}) ${phone.substring(2, 3)} ${phone.substring(3)}`;
    } else if (phone.length <= 10) {
      return `(${phone.substring(0, 2)}) ${phone.substring(2, 3)} ${phone.substring(3, 7)}-${phone.substring(7)}`;
    }
    return `(${phone.substring(0, 2)}) ${phone.substring(2, 3)} ${phone.substring(3, 7)}-${phone.substring(7, 11)}`;
  };

  return (
    <div className="px-6 py-8 lg:px-40">
      <div>
        <div className="flex items-center">
          <div onClick={() => setSelectedEdit(false)}>
            <Image src="/back.svg" width={30} height={30} alt="Voltar" className="cursor-pointer mb-2 md:w-12 md:h-12" />
          </div>
        </div>
        <h1 className="font-bold text-[#753233] text-3xl md:text-3xl">Editar Granja</h1>
        <div className="flex gap-x-2 items-center">
          <p className="text-base md:text-2xl">by</p>

        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-x-4 gap-y-6 mt-12 md:mt-16">
        {error && <div className="text-red-600">{error}</div>}

        <div>
          <label className="text-base md:text-xl">Nome</label>
          <input
            value={nome}
            required={true}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da granja"
            className="bg-[#FAFAFA] w-full py-3 md:py-5 text-base md:text-xl rounded-full px-4"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-x-8 gap-y-6">
          <div className="w-full">
            <label className="text-base md:text-xl">Distância (km)</label>
            <input
              mask="999 km"
              value={distancia || ''}
              onChange={(e) => setDistancia(e.target.value)}
              onBlur={() => {
                if (distancia && !distancia.endsWith(" km")) {
                  setDistancia(distancia + " km");
                }
              }}
              placeholder="Ex: 45 km"
              className="bg-[#FAFAFA] w-full py-3 md:py-5 text-base md:text-xl rounded-full px-4"
            />
          </div>
          <div className="w-full">
            <label className="text-base md:text-xl">Tempo médio de chegada</label>
            <input
              value={tempo || ''}
              onChange={(e) => setTempo(e.target.value)}
              onBlur={() => setTempo(formatAverageTime(tempo))}
              placeholder="Ex: 1:45"
              className="bg-[#FAFAFA] w-full py-3 md:py-5 text-base md:text-xl rounded-full px-4"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-x-8 gap-y-6">
          <div className="flex flex-col md:flex-row items-end gap-x-2 gap-y-3 w-full">
            <div className="w-full">
              <label className="text-base md:text-xl">Funcionamento</label>
              <input
                mask="99:99"
                value={abertura || ''}
                onChange={(e) => setAbertura(e.target.value)}
                onBlur={() => setAbertura(formatTime(abertura))}
                placeholder="Horário de abertura"
                className="bg-[#FAFAFA] w-full py-3 md:py-5 text-base md:text-xl rounded-full px-4"
              />
            </div>
            <div className="w-full">
              <input
                mask="99:99"
                value={fechamento || ''}
                onChange={(e) => setFechamento(e.target.value)}
                onBlur={() => setFechamento(formatTime(fechamento))}
                placeholder="Horário de fechamento"
                className="bg-[#FAFAFA] w-full py-3 md:py-5 text-base md:text-xl rounded-full px-4"
              />
            </div>
          </div>
          <div>
            <label className="text-base md:text-xl">Telefone do Granjeiro</label>
            <input
              mask="(99) 9 9999-9999"
              value={telefone || ''}
              onChange={(e) => setTelefone(e.target.value)}
              onBlur={() => setTelefone(formatPhoneNumber(telefone))}
              placeholder="Ex: (61) 9 9876-5432"
              className="bg-[#FAFAFA] w-full py-3 md:py-5 text-base md:text-xl rounded-full px-4"
            />
          </div>
        </div>
        <div>
          <label className="text-base md:text-xl">Link da Localização</label>
          <input
            value={localizacao || ''}
            required={true}
            onChange={(e) => setLocalizacao(e.target.value)}
            placeholder="Cole seu link aqui"
            className="bg-[#FAFAFA] w-full py-3 md:py-5 text-base md:text-xl rounded-full px-4"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-x-20">
          <button
            type="button" // Alterei para "button" para evitar a submissão do form
            onClick={handleDelete}
            className="text-white text-base md:text-xl font-bold flex justify-center gap-x-4 items-center bg-red-500 px-20 md:px-28 py-2 md:py-4 rounded-xl mt-10"
          >
            <p>Deletar Granja</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="md:w-6 md:h-6 bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>
          </button>

          <button
            type="submit"
            className="text-white text-base md:text-xl font-bold flex justify-center bg-[#753233] px-20 md:px-28 py-2 md:py-4 rounded-xl mt-10"
          >
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
}