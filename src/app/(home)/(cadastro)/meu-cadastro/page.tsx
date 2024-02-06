"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

import { IoClose } from "react-icons/io5";

import { AuthGuard } from "@/components/AuthGuard";

import moment from "moment";
import { Radio, RadioGroup } from "@nextui-org/react";

export default function MeuCadastro() {
  const { user, address, setAddress } = useAuth();

  const removeAddress = async (id: number) => {
    try {
      setAddress((prevData) => prevData.filter((item) => item.id !== id));

      await fetch(`https://smartshop-api-foy4.onrender.com/address/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <AuthGuard>
      <div className="flex flex-col w-full py-14 tabletgrande:py-2 tabletgrande:w-full tabletgrande:px-10 tablet:px-0 px-5 min-w-[250px]">
        <div className="m-auto flex flex-col w-[648px] min-w-[250px] tabletgrande:w-full">
          <span className="font-bold text-3xl mb-10 tabletgrande:text-lg">
            Meu cadastro
          </span>
          <div className="m-auto w-full border tabletgrande:border-l-0 tabletgrande:border-r-0 mb-7">
            <div className="flex flex-col gap-10 mb-7 justify-center m-auto max-w-[424px] mt-[1.75rem]">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg tablet:text-base">
                  Dados pessoais
                </span>
                <Link
                  href="/meu-cadastro/alterar-dados"
                  className="border-2 border-[#e5e5e5] text-sm py-4 px-8 rounded-sm text-[#7c7b7b] tablet:w-[113px] tablet:px-[14px] tablet:py-[12px] tablet:text-xs"
                >
                  Alterar dados
                </Link>
              </div>

              <ul className="flex flex-col gap-7">
                <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                  <p className="text-[#878787] text-sm">E-mail</p>
                  <span className="mb-3 text-sm ">{user?.email}</span>
                </li>
                <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                  <p className="text-[#878787] text-sm">CPF</p>
                  <span className="mb-3 text-sm w-[50%]">{user?.cpf}</span>
                </li>
                <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                  <p className="text-[#878787] text-sm">Nome</p>
                  <span className="mb-3 text-sm w-[50%]">
                    {user?.first_name}
                  </span>
                </li>
                <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                  <p className="text-[#878787] text-sm">Sobrenome</p>
                  <span className="mb-3 text-sm w-[50%]">
                    {user?.last_name}
                  </span>
                </li>
                <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                  <p className="text-[#878787] text-sm">Data de nascimento</p>
                  <span className="mb-3 text-sm w-[50%]">
                    {moment(user?.date_birth)
                      .add(1, "days")
                      .format("DD/MM/YYYY")}
                  </span>
                </li>
                <li className="flex justify-between">
                  <p className="text-[#878787] text-sm">Celular</p>
                  <span className="mb-3 text-sm w-[50%]">
                    {user?.cellphone}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="m-auto w-full border tabletgrande:border-l-0 tabletgrande:border-r-0 mb-7">
            <div className="flex flex-col gap-10 mb-7 justify-center m-auto max-w-[424px] mt-[1.75rem]">
              <span className="font-bold text-lg">Cartões</span>
              <span className="text-sm">Não há cartões cadastrados.</span>
            </div>
          </div>
          <div className="m-auto w-full border tabletgrande:border-l-0 tabletgrande:border-r-0 tabletgrande:border-b-0">
            <div className="flex flex-col gap-10 mb-7 justify-center m-auto max-w-[424px] mt-[1.75rem]">
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
                <RadioGroup>
                  {address.map((add) => (
                    <div key={add.id} className="mb-4">
                      <div className="flex justify-between items-center">
                        <Radio value={add.cep} className="relative">
                          <div className="max-w-[360.4px]">
                            <span className="text-[#878787] text-sm">
                              {add.street_address}, {add.number_address} -{" "}
                              {add.city} {add.state}, {add.cep}
                            </span>
                          </div>
                        </Radio>

                        <IoClose
                          onClick={() => removeAddress(add.id)}
                          className="cursor-pointer text-[#878787]"
                        />
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <span className="text-sm">Não há endereços cadastrados.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
