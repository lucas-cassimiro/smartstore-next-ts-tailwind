import Link from "next/link";

export default function RegisterFrame() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col bg-black h-[400px] w-[400px] justify-center p-6 rounded-md gap-4">
        <h3 className="text-center uppercase text-2xl font-semibold">Login</h3>
        <span>Username</span>
        <input type="text" className="bg-[#ecf2f7]" />
        <span>Password</span>
        <input type="password" className="bg-[#ecf2f7]" />
        <div>
          <div className="flex justify-between items-center">
            <label className="flex items-center justify-center">
              {/* <Checkbox type="checkbox" color="primary" /> */}
              Lembrar-me
            </label>
            <Link
              href="mudarsenha"
              className="text-[#4aa4ee] hover:text-[#3286ca]"
            >
              Esqueceu a senha?
            </Link>
          </div>
        </div>
        <button className="bg-[#4aa4ee] text-white font-light cursor-pointer rounded-md hover:bg-[#3286ca] h-[50px] text-lg">
          Entrar
        </button>
        <div className="flex gap-1">
          <span>Não possui uma conta?</span>
          <Link
            href="/register"
            className="text-[#4aa4ee] hover:text-[#3286ca]"
          >
            Inscrever-se
          </Link>
        </div>
        <h4 className="text-center text-[#607d8b] font-medium text-[22px]">
          Logar com
        </h4>
        <div className="flex justify-center gap-2 items-center">
          {/* <Image src={Facebook} alt="Ícone do Facebook" className="w-10 h-10" />
          <Image src={Google} alt="Ícone do Google" className="w-10 h-10" />
          <Image src={Apple} alt="Ícone da Apple" className="w-10 h-10" /> */}
        </div>
      </div>
    </div>
  );
}
