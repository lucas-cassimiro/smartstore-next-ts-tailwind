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
        <li className="border-b-[1px] w-[10.8125rem] ml-[1.875rem] border-[rgba(49, 49, 49, 0.5)]">
          <a href="#" className="text-2xl font-semibold ">
            Nossas lojas
          </a>
        </li>
        <li className="border-b-[1px] w-[10.8125rem] ml-[1.875rem]">
          <a href="#" className="text-2xl font-semibold ">
            Suporte
          </a>
        </li>
        <li className="border-b-[1px] w-[10.8125rem] ml-[1.875rem]">
          <a href="#" className="text-2xl font-semibold ">
            Minha conta
          </a>
        </li>
        <li className="border-b-[1px] w-[10.8125rem] ml-[1.875rem]">
          <a href="#" className="text-2xl font-semibold ">
            Serviços
          </a>
        </li>
      </ul>

      <ul className="w-[33.3125rem] text-black">
        <div className="border-b-[1px] min-w-[15.625rem]">
          <h1 className="font-semibold text-2xl">Institucional</h1>
        </div>
        <div className="flex border-none">
          <div className="border-none mt-2">
            <li className="mb-4">
              <a href="">Sobre</a>
            </li>
            <li className="mb-4">
              <a href="">Blog</a>
            </li>
            <li className="mb-4">
              <a href="">Canal Educativo</a>
            </li>
            <li className="mb-4">
              <a href="">Canal Corporativo</a>
            </li>
            <li className="mb-4">
              <a href="">Representantes</a>
            </li>
            <li className="mb-4">
              <a href="">Condições de Frete</a>
            </li>
          </div>
          <div>
            <li className="mb-4">
              <a href="">Fale Conosco</a>
            </li>
            <li className="mb-4">
              <a href="">Trocas e Devoluções</a>
            </li>
            <li className="mb-4">
              <a href="">Políticas de Privacidade</a>
            </li>
            <li className="mb-4">
              <a href="">Trabalhe Conosco</a>
            </li>
            <li className="mb-4">
              <a href="">Assistência Técnica</a>
            </li>
            <li className="mb-4">
              <a href="">Black Friday</a>
            </li>
          </div>
        </div>
      </ul>

      <div className="flex flex-col h-[6.25rem] text-black">
        <h2 className="font-semibold text-2xl">Sac 4002-8922</h2>
        <span>Segunda a sexta das 08h às 20h</span>
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

      <div>
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
