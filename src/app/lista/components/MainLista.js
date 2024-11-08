"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from "react";
import { GranjaContext } from '@/app/context/GranjaContext';

export default function MainLista() {
  const { sortedGranjas, setIdSelectedGranja } = useContext(GranjaContext);
  const [searchTerm, setSearchTerm] = useState("");


  // Filtra as granjas com base no termo de busca
  const filteredGranjas = sortedGranjas.filter((granja) =>
    granja.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="px-6 py-8">
        <div className='flex justify-between'>
          <div>
            <h1 className="font-bold text-[#753233] text-xl">
              Localização de Granjas
            </h1>
            <div className="flex gap-x-2">
              <p>by</p>
              <Image
                src="/Logo.svg"
                width={80}
                height={30}
                alt="logo"
              />
            </div>
          </div>

          <Link href="/addForm">
            <svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_361_70)">
                <path d="M16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30ZM16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32Z" fill="#753233" />
                <path d="M16 8C16.2652 8 16.5196 8.10536 16.7071 8.29289C16.8946 8.48043 17 8.73478 17 9V15H23C23.2652 15 23.5196 15.1054 23.7071 15.2929C23.8946 15.4804 24 15.7348 24 16C24 16.2652 23.8946 16.5196 23.7071 16.7071C23.5196 16.8946 23.2652 17 23 17H17V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V17H9C8.73478 17 8.48043 16.8946 8.29289 16.7071C8.10536 16.5196 8 16.2652 8 16C8 15.7348 8.10536 15.4804 8.29289 15.2929C8.48043 15.1054 8.73478 15 9 15H15V9C15 8.73478 15.1054 8.48043 15.2929 8.29289C15.4804 8.10536 15.7348 8 16 8Z" fill="#753233" />
              </g>
              <defs>
                <clipPath id="clip0_361_70">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
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
            <div key={index} className="flex gap-x-4 mb-3 items-center justify-between" onClick={() => setIdSelectedGranja(granja.id)}>
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
              <div className='flex gap-x-4'>
                <Link href="https://www.google.com/maps/place/JBS+F%C3%A1brica+de+Ra%C3%A7%C3%B5es/@-15.9288112,-48.0490207,17z/data=!3m1!4b1!4m6!3m5!1s0x935a2b7dd4bbeb3d:0x76f9bcfdf52100db!8m2!3d-15.9288164!4d-48.0464458!16s%2Fg%2F11c37_8q_7?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D">
                  <Image
                    src="/send.svg"
                    width={30}
                    height={30}
                    alt="logo"
                  />
                </Link>
                <Link href="/editForm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhuma granja correspondente</p>
        )}
      </div>
    </>
  );
}
