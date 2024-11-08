"use client"
import { useContext } from "react"
import { GranjaContext } from "@/app/context/GranjaContext";
import Image from "next/image";
import Link from "next/link";

// Função para verificar se o valor é vazio e retornar "-"
const verificarValor = (valor) => {
  return valor ? valor : "-";
};



export default function Detalhes() {
  
  const { sortedGranjas, idSelectedGranja, setSelectedDetalhes } = useContext(GranjaContext);
  
  const selectedGranja = sortedGranjas.find(granja => granja.id === idSelectedGranja);
  
  const verificaFuncionamento = (abertura, fechamento) => {
    if(abertura && fechamento){
      return `das ${abertura} às ${fechamento}`
    } else {
      return '-'
    }
  }
  // Verifique se os dados estão disponíveis antes de acessá-los
  if (!sortedGranjas || !selectedGranja) {
    return <div>Carregando...</div>; // Exiba uma mensagem de carregamento ou fallback
  }

  return (
    <>
      <div className="px-6 py-8">
        <div onClick={() => setSelectedDetalhes(false)}>
          <Image
            src="/back.svg"
            width={30}
            height={30}
            alt="Voltar"
            className="mb-4"
          />
        </div>
        <div className="flex items-center gap-x-6">
          <p className="uppercase w-24 h-24 rounded-full text-5xl font-bold bg-[#D9D9D9] flex justify-center items-center">{selectedGranja.nome[0]}</p>
          <p className="text-xl font-bold">{verificarValor(selectedGranja.nome)}</p>
        </div>
        <div>
          <div className="flex justify-between mt-6">
            <p className="font-medium">Distância:</p>
            <p className="font-light">{verificarValor(selectedGranja.distancia)}</p>
          </div>
          <div className="flex justify-between mt-6">
            <p className="font-medium">Tempo médio:</p>
            <p className="font-light">{verificarValor(selectedGranja.tempo)}</p>
          </div>
          <div className="flex justify-between items-center mt-6">
            <p className="font-medium">Horário de<br/>funcionamento:</p>
            <p className="font-light">{verificaFuncionamento(selectedGranja.abertura, selectedGranja.fechamento)}</p>
          </div>
          <div className="flex justify-between mt-6">
            <p className="font-medium">Telefone do granjeiro:</p>
            <p className="font-light">{verificarValor(selectedGranja.telefone)}</p>
          </div>
        </div>
        <Link href={selectedGranja.localizacao} className="flex justify-center bg-[#753233] w-full py-2 rounded-xl mt-10">
          <p className="text-white font-bold">LOCALIZAÇÃO</p>
          <Image
            src="/location.svg"
            width={20}
            height={20}
            alt="Voltar"
          />
        </Link>
      </div>
    </>
  );
}
