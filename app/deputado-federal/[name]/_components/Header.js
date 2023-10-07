"use client";

import { Image, Divider } from "@nextui-org/react";

import { calculateAge, getGenderSuffix } from "@/utils";

export function Header({ federalDeputyBaseInfo }) {
  return (
    <>
      <div className="p-6 sm:p-0">
        <header className="flex flex-col md:flex-row items-center justify-center">
          <div className="">
            <Image
              src={federalDeputyBaseInfo?.ultimoStatus?.urlFoto}
              alt={federalDeputyBaseInfo?.ultimoStatus?.nome}
              className="w-full h-full rounded-lg shadow-xl object-contain max-w-[180px] max-h-[240px]"
            />
          </div>
          <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0 flex flex-col sm:pr-6 sm:pl-6 flex flex-col sm:pr-6 sm:pl-6">
            <h1 className="text-xl font-semibold">
              Deputad{getGenderSuffix(federalDeputyBaseInfo?.sexo)} Federal{" "}
              {federalDeputyBaseInfo?.ultimoStatus?.nome}
            </h1>
            <p className="text-gray-600">
              {federalDeputyBaseInfo?.nomeCivil} é um
              {federalDeputyBaseInfo?.sexo === "F" ? "a" : ""} deputad
              {getGenderSuffix(federalDeputyBaseInfo?.sexo)} brasileir
              {getGenderSuffix(federalDeputyBaseInfo?.sexo)} pelo partido{" "}
              {federalDeputyBaseInfo?.ultimoStatus?.siglaPartido}/
              {federalDeputyBaseInfo?.ultimoStatus?.siglaUf}, tem{" "}
              {calculateAge(federalDeputyBaseInfo?.dataNascimento)} anos e
              nasceu na cidade de {federalDeputyBaseInfo?.municipioNascimento}/
              {federalDeputyBaseInfo?.ufNascimento}.
            </p>{" "}
          </div>
        </header>
      </div>
      <Divider className="my-5" />
    </>
  );
}
