"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

import { AuthGuard } from "@/components/AuthGuard";

import moment from "moment";
import { Radio, RadioGroup } from "@nextui-org/react";

export default function MeuCadastro() {
  const { user, address } = useAuth();

  return (
    <AuthGuard>
      <div className="flex flex-col w-[983px] py-14">
        <div className="m-auto flex flex-col">
          <span className="font-bold text-3xl mb-10">Meu cadastro</span>
          <div className="border py-12 px-28 flex flex-col gap-10 w-[700px] mb-7">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Dados pessoais</span>
              <Link
                href="/meu-cadastro/alterar-dados"
                className="border-2 border-[#e5e5e5] text-sm py-4 px-8 rounded-sm text-[#7c7b7b]"
              >
                Alterar dados
              </Link>
            </div>

            <ul className="flex flex-col gap-7">
              <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                <p className="text-[#878787] text-sm">E-mail</p>
                <span className="mb-3 text-sm w-[50%]">{user?.email}</span>
              </li>
              <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                <p className="text-[#878787] text-sm">CPF</p>
                <span className="mb-3 text-sm w-[50%]">{user?.cpf}</span>
              </li>
              <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                <p className="text-[#878787] text-sm">Nome</p>
                <span className="mb-3 text-sm w-[50%]">{user?.first_name}</span>
              </li>
              <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                <p className="text-[#878787] text-sm">Sobrenome</p>
                <span className="mb-3 text-sm w-[50%]">{user?.last_name}</span>
              </li>
              <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                <p className="text-[#878787] text-sm">Data de nascimento</p>
                <span className="mb-3 text-sm w-[50%]">
                  {moment(user?.date_birth).add(1, "days").format("DD/MM/YYYY")}
                </span>
              </li>
              <li className="flex justify-between">
                <p className="text-[#878787] text-sm">Celular</p>
                <span className="mb-3 text-sm w-[50%]">{user?.cellphone}</span>
              </li>
            </ul>
          </div>
          <div className="border py-12 px-28 flex flex-col gap-10 mb-7">
            <span className="font-bold text-lg">Cartões</span>
            <span className="text-sm">Não há cartões cadastrados.</span>
          </div>
          <div className="border py-12 px-28 flex flex-col gap-10">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Endereços</span>
              <Link
                href="/meu-cadastro/cadastrar-endereco"
                className="border-2 border-[#e5e5e5] text-sm py-4 px-6 rounded-sm text-[#7c7b7b]"
              >
                Adicionar endereço
              </Link>
            </div>
            {address.length > 0 ? (
              <RadioGroup label="Selecione o endereço que deseja">
                {address.map((add) => (
                  <Radio value={add.street_address} key={add.id}>
                    {add.street_address}, {add.number_address} {add.complement}{" "}
                    - {add.city} - {add.state}
                  </Radio>
                ))}
              </RadioGroup>
            ) : (
              "Não há endereços cadastrados."
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
