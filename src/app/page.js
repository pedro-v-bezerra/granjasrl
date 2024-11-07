"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from "react";
import { GranjaContext } from './context/GranjaContext';

export default function App() {
  const { sortedGranjas, selectedGranja, setSelectedGranja } = useContext(GranjaContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra as granjas com base no termo de busca
  const filteredGranjas = sortedGranjas.filter((granja) =>
    granja.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="px-6 py-8">
        <div>
          <h1 className="font-bold text-[#753233] text-xl">
            Localização de Granjas
          </h1>
          <div className="flex gap-x-2">
            <p>by</p>
            <Image
              src="/logo.svg"
              width={80}
              height={30}
              alt="logo"
            />
          </div>
        </div>

        {/* Input de busca */}
        <div className="my-4">
          <input
            placeholder="Pesquise o nome da granja"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#FAFAFA] w-full py-3 rounded-full px-4"
          />
        </div>

        {/* Exibe a lista de granjas ou uma mensagem caso não haja resultados */}
        {filteredGranjas.length > 0 ? (
          filteredGranjas.map((granja, index) => (
            <div key={index} className="flex gap-x-4 mb-3 items-center justify-between" onClick={() => setSelectedGranja(index)}>
              <Link href="/detalhes" className="flex gap-x-4 mb-3">
                <div className="w-16 h-16 rounded-full bg-[#D9D9D9] flex justify-center items-center">
                  <p className="uppercase font-bold text-xl">{granja.nome[0]}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-bold">{granja.nome}</p>
                  <div className="flex gap-x-4 justify-center">
                    <p className="font-light text-xs">Distância: {granja.distancia}km</p>
                    <p className="font-light text-xs">Tempo médio: {granja.tempo}</p>
                  </div>
                </div>
              </Link>
              <Link href="https://www.google.com/maps/place/JBS+F%C3%A1brica+de+Ra%C3%A7%C3%B5es/@-15.9288112,-48.0490207,17z/data=!3m1!4b1!4m6!3m5!1s0x935a2b7dd4bbeb3d:0x76f9bcfdf52100db!8m2!3d-15.9288164!4d-48.0464458!16s%2Fg%2F11c37_8q_7?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D">
                <Image
                  src="/send.svg"
                  width={30}
                  height={30}
                  alt="logo"
                />
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhuma granja correspondente</p>
        )}
      </div>
    </>
  );
}
