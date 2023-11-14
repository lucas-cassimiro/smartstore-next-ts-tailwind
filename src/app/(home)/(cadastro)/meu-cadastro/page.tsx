"use client";

import { useAuth } from "@/hooks/useAuth";

export default function MeuCadastro() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-[983px] py-14">
      <div className="m-auto flex flex-col">
        <span className="font-bold text-3xl mb-10">Meu cadastro</span>
        <div className="border py-10 px-20  flex flex-col gap-10 w-[700px] mb-7">
          <div className="flex justify-between">
            <span className="font-bold text-lg">Dados pessoais</span>
            <button>Alterar dados</button>
          </div>

          <ul className="flex flex-col gap-7">
            {user.map((user) => (
              <>
                <li key={user.id}>
                  <span>{user.email}</span>
                </li>
                <li>
                  <span>{user.cpf}</span>
                </li>
                <li>
                  <span>{user.first_name}</span>
                </li>
                <li>
                  <span>{user.last_name}</span>
                </li>
                <li>
                  <span>{user.date_birth}</span>
                </li>
                <li>
                  <span>{user.cellphone}</span>
                </li>
              </>
            ))}
          </ul>
        </div>
        <div className="border py-10 px-20  flex flex-col gap-10 mb-7">
          <span className="font-bold text-lg">Cartões</span>
        </div>
        <div className="border py-10 px-20 flex flex-col gap-10">
          <div className="flex justify-between">
            <span className="font-bold text-lg">Endereços</span>
            <button>Adicionar endereço</button>
          </div>
        </div>
      </div>
    </div>
  );
}
