"use client"
import { useContext } from "react"
import { GranjaContext } from "@/app/context/GranjaContext";
import Image from "next/image";
import Link from "next/link";

export default function MainDetalhes() {

  const { sortedGranjas, selectedGranja } = useContext(GranjaContext);

  // Verifique se os dados estão disponíveis antes de acessá-los
  if (!sortedGranjas || !sortedGranjas[selectedGranja]) {
    return <div>Carregando...</div>; // Exiba uma mensagem de carregamento ou fallback
  }

  return (
    <>
      <div className="px-6 py-8">
        <Link href="/">
          <Image
            src="/back.svg"
            width={30}
            height={30}
            alt="Voltar"
            className="mb-4"
          />
        </Link>
        <div className="flex items-center gap-x-6">
          <p className="uppercase w-24 h-24 rounded-full text-5xl font-bold bg-[#D9D9D9] flex justify-center items-center">{sortedGranjas[selectedGranja].nome[0]}</p>
          <p className="text-xl font-bold">{sortedGranjas[selectedGranja].nome}</p>
        </div>
        <div>
          <div className="flex justify-between mt-6">
            <p className="font-medium">Distância:</p>
            <p className="font-light">{sortedGranjas[selectedGranja].distancia} km</p>
          </div>
          <div className="flex justify-between mt-6">
            <p className="font-medium">Tempo médio:</p>
            <p className="font-light">{sortedGranjas[selectedGranja].tempo}</p>
          </div>
          <div className="flex justify-between items-center mt-6">
            <p className="font-medium">Horário de<br/>funcionamento:</p>
            <p className="font-light">das {sortedGranjas[selectedGranja].abertura}h ás {sortedGranjas[selectedGranja].fechamento}h</p>
          </div>
          <div className="flex justify-between mt-6">
            <p className="font-medium">Telefone do granjeiro:</p>
            <p className="font-light">{sortedGranjas[selectedGranja].telefone}</p>
          </div>
        </div>
        <Link href="https://www.google.com/maps/place/JBS+F%C3%A1brica+de+Ra%C3%A7%C3%B5es/@-15.9288112,-48.0490207,17z/data=!3m1!4b1!4m6!3m5!1s0x935a2b7dd4bbeb3d:0x76f9bcfdf52100db!8m2!3d-15.9288164!4d-48.0464458!16s%2Fg%2F11c37_8q_7?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" className="flex justify-center bg-[#753233] w-full py-2 rounded-xl mt-10">
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
