import Image from "next/image";

export default function Lista() {

  const data = [
    {
      nome: "Tiago Oro",
      distancia: 45,
      tempo: [1, 40],
      funcionamento: [8, 18],
      telefone: 61998765432
    },
    {
      nome: "Tiago Oro",
      distancia: 45,
      tempo: [1, 40],
      funcionamento: [8, 18],
      telefone: 61998765432
    },
  ]

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

        <div className="my-4">
          <input placeholder="Pesquise o nome da granja" className="bg-[#FAFAFA] w-full py-3 rounded-full px-4" />
        </div>

        {data.map((granja, index) => (
          <div key={index} className="flex gap-x-4 mb-3">
            <div className="w-16 h-16 rounded-full bg-[#D9D9D9] flex justify-center items-center">
              <p className="font-bold text-xl">{granja.nome[0]}</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-bold">{granja.nome}</p>
              <div className="flex gap-x-4 justify-center">
                <p className="font-light text-xs">Distância: {granja.distancia}km</p>
                <p className="font-light text-xs">Tempo médio: {granja.tempo[0]}h e {granja.tempo[1]}min</p>
              </div>
            </div>
              <Image
                src="/send.svg"
                width={30}
                height={30}
                alt="logo"
              />
          </div>
        ))}
      </div>
    </>
  );
}
