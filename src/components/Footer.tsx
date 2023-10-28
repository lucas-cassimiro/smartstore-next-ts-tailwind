import Image from "next/image";

import LogoFacebook from "../assets/logo-facebook.png";
import LogoInstagram from "../assets/logo-instagram.png";
import LogoTwitter from "../assets/logo-twitter.png";
import LogoTiktok from "../assets/logo-tiktok.png";

import IconBaixeAqui from "../assets/icon-baixe-aqui.svg";

export default function Footer() {
  return (
    <footer className="flex justify-around flex-wrap py-8 px-0 w-full h-[19rem] bg-[#dcdcdc]">
      <ul className="flex flex-col gap-[2.1875rem] text-black">
        <li className="border-b-[1px] w-[10.8125rem] ml-[1.875rem] border-[#313131]">
          <a href="#" className="text-2xl font-semibold ">
            Nossas lojas
          </a>
        </li>
        <li className="border-b-[1px] w-[10.8125rem] ml-[1.875rem] border-[#313131]">
          <a href="#" className="text-2xl font-semibold ">
            Suporte
          </a>
        </li>
        <li className="border-b-[1px] w-[10.8125rem] ml-[1.875rem] border-[#313131]">
          <a href="#" className="text-2xl font-semibold ">
            Minha conta
          </a>
        </li>
        <li className="border-b-[1px] w-[10.8125rem] ml-[1.875rem] border-[#313131]">
          <a href="#" className="text-2xl font-semibold ">
            Serviços
          </a>
        </li>
      </ul>

      <ul className="w-[33.3125rem] text-black">
        <div className="border-b-[1px] min-w-[15.625rem] border-[#313131]">
          <h1 className="font-semibold text-2xl">Institucional</h1>
        </div>
        <div className="flex gap-24">
          <div className="mt-1 h-36 flex flex-col gap-3">
            <li>
              <a href="#">Sobre</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Canal Educativo</a>
            </li>
            <li>
              <a href="#">Canal Corporativo</a>
            </li>
            <li>
              <a href="#">Representantes</a>
            </li>
            <li>
              <a href="#">Condições de Frete</a>
            </li>
          </div>
          <div className="mt-1 h-36 flex flex-col gap-3">
            <li>
              <a href="#">Fale Conosco</a>
            </li>
            <li>
              <a href="#">Trocas e Devoluções</a>
            </li>
            <li>
              <a href="#">Políticas de Privacidade</a>
            </li>
            <li>
              <a href="#">Trabalhe Conosco</a>
            </li>
            <li>
              <a href="#">Assistência Técnica</a>
            </li>
            <li>
              <a href="#">Black Friday</a>
            </li>
          </div>
        </div>
      </ul>

      <div className="flex flex-col h-[6.25rem] text-black">
        <h2 className="font-semibold text-2xl mb-4">Sac 4002-8922</h2>
        <span className="mb-1">Segunda a sexta das 08h às 20h</span>
        <span>Sábados das 08h às 19h</span>
        {/* <div>
          <h2>Redes sociais</h2>
          <div>
            <Image src={LogoFacebook} alt="Logo do Facebook" />
            <Image src={LogoInstagram} alt="Logo do Instagram" />
            <Image src={LogoTwitter} alt="Logo do Twitter" />
            <Image src={LogoTiktok} alt="Logo do Tiktok" />
          </div>
          <h3>App Smart fidelidade</h3>
          <Image
            src={IconBaixeAqui}
            alt="Ícone do Baixe Aqui"
            priority={true}
          />
        </div> */}
      </div>

      <div className="h-[12rem]">
        <h2 className="mb-4 font-semibold text-2xl text-black">
          Redes sociais
        </h2>
        <div className="flex">
          <Image
            src={LogoFacebook}
            alt="Logo do Facebook"
            className="w-[2.1875rem] h-[2.1875rem] rounded-lg mb-4 ml-2"
          />
          <Image
            src={LogoInstagram}
            alt="Logo do Instagram"
            className="w-[2.1875rem] h-[2.1875rem] rounded-lg mb-4 ml-2"
          />
          <Image
            src={LogoTwitter}
            alt="Logo do Twitter"
            className="w-[2.1875rem] h-[2.1875rem] rounded-lg mb-4 ml-2"
          />
          <Image
            src={LogoTiktok}
            alt="Logo do Tiktok"
            className="w-[2.1875rem] h-[2.1875rem] rounded-lg mb-4 ml-2"
          />
        </div>
        <h3 className="mb-4 text-black">App Smart fidelidade</h3>
        <Image src={IconBaixeAqui} alt="Ícone do Baixe Aqui" priority={true} />
      </div>
    </footer>
  );
}
