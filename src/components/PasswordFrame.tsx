import Link from "next/link";

export default function PasswordFrame() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col bg-white h-[400px] w-[500px] justify-center p-6 rounded-md">
        <h3 className="text-center text-2xl font-bold mb-6">
          Redefinição de senha
        </h3>
        <span className="text-lg font-semibold mb-6">Não sei minha senha</span>
        <span className="mb-6">
          Digite seu endereço de e-mail para receber um link seguro para
          redefinir sua senha.
        </span>
        <span className="mb-2">Email</span>
        <input type="text" className="bg-[#ecf2f7] mb-6" />
        <button className="bg-[#4aa4ee] text-white font-light cursor-pointer rounded-md hover:bg-[#3286ca] h-[50px] text-lg">
          Enviar solicitação
        </button>
      </div>
    </div>
  );
}
