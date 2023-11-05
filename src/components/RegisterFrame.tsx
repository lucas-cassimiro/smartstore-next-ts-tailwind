import Link from "next/link";

export default function RegisterFrame() {
  return (
    <div className="w-full h-full flex justify-center items-center mt-40">
      <div className="flex flex-col bg-white h-[800px] w-[600px] justify-center p-6 rounded-md gap-4">
        <h3 className="text-center uppercase text-2xl font-semibold">
          Criar uma conta
        </h3>
        <span>Email</span>
        <input type="email" className="bg-[#ecf2f7]" />
        <span>Senha</span>
        <input type="password" className="bg-[#ecf2f7]" />
        <span>Confirmar senha</span>
        <input type="password" className="bg-[#ecf2f7]" />
        <span>CPF</span>
        <input type="tel" className="bg-[#ecf2f7]" />
        <span>Nome</span>
        <input type="text" className="bg-[#ecf2f7]" />
        <span>Sobrenome</span>
        <input type="text" className="bg-[#ecf2f7]" />
        <span>Data de nascimento</span>
        <input type="date" className="bg-[#ecf2f7]" />
        <span>Celular</span>
        <input type="tel" className="bg-[#ecf2f7]" />
        <button className="bg-[#4aa4ee] text-white font-light cursor-pointer rounded-md hover:bg-[#3286ca] h-[50px] text-lg">
          Continuar
        </button>
      </div>
    </div>
  );
}
