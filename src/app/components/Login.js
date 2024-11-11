import Image from "next/image";
import { useState } from "react";
import { useContext } from "react";
import { GranjaContext } from '@/app/context/GranjaContext';

export default function Login() {
  const { login, error } = useContext(GranjaContext); // Importa a função de login e o erro do contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setSelectedLogin } = useContext(GranjaContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password); // Chama a função de login com email e senha
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center gap-y-8 px-20">
      <div className="flex justify-start w-[60vh]" onClick={() => setSelectedLogin(false)}>
        <Image src="/back.svg" width={30} height={30} alt="Adicionar" className="cursor-pointer mb-2 md:w-12 md:h-12" />
      </div>
      <Image src="/logo.svg" alt="Logo" width={300} height={300} />

      <form onSubmit={handleSubmit} className="flex flex-col md:border-2 md:border-[#EEEEEE] pb-10 pt-6 px-10 rounded-xl gap-y-2 w-[60vh]">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#FAFAFA] w-full py-3 md:py-2 text-sm rounded-full px-4 border-2 border-[#EEEEEE]"
        />
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#FAFAFA] w-full py-3 md:py-2 text-sm rounded-full px-4 border-2 border-[#EEEEEE]"
        />
        <button type="submit" className="text-white text-base md:text-xl font-bold flex justify-center bg-[#753233] py-2 md:py-2 rounded-xl mt-10">
          Entrar
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>} {/* Exibe o erro de login, se houver */}
      </form>
    </div>
  );
}
