import type { Cabinet } from "@/interfaces";

import { Fragment } from "react";

import Chart from "./Chart";

interface Props {
  cabinetData: Cabinet;
}

export function CabinetTab({ cabinetData }: Props) {
  return (
    <>
      <p>
        A verba de gabinete é o valor utilizado como limite para a contratação
        da equipe de secretários parlamentares dos gabinetes, pessoas que não
        necessitam ter vínculo com o serviço público e que são escolhidas
        diretamente pelo deputado para exercerem as atribuições previstas para
        essa categoria de servidores comissionados.
      </p>
      <p className="mt-3">
        O valor dessa verba é de R$ 118.376,13 por deputado, destina-se a pagar
        os salários de até 25 secretários parlamentares que trabalham para o
        mandato, em Brasília ou nos estados.
      </p>
      <Chart data={cabinetData?.montly_expenses} />

      <h3 className="my-4">Conheça a equipe de secretários</h3>

      <div className="w-full p-4 bg-white shadow-lg rounded-lg overflow-x-auto">
        <div className="hidden md:grid grid-cols-5 gap-4 mb-4 font-bold">
          <div className="p-2">Nome</div>
          <div className="p-2">Grupo funcional</div>
          <div className="p-2">Cargo</div>
          <div className="p-2">Período de exercício</div>
          <div className="p-2">Remuneração mensal</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2 ">
          {cabinetData?.active_secretaries?.map((secretary, index) => {
            return (
              <Fragment key={index}>
                <div className="col-span-1 p-2 border-b md:border-b-0 border-gray-300">
                  <span className="md:hidden font-bold">Nome: </span>
                  {secretary?.name}
                </div>
                <div className="col-span-1 p-2 border-b md:border-b-0 border-gray-300">
                  <span className="md:hidden font-bold">Grupo funcional:</span>
                  {secretary?.group}
                </div>
                <div className="col-span-1 p-2 border-b md:border-b-0 border-gray-300">
                  <span className="md:hidden font-bold">Cargo: </span>
                  {secretary?.role}
                </div>
                <div className="col-span-1 p-2 border-b md:border-b-0 border-gray-300">
                  <span className="md:hidden font-bold">
                    Período de exercício:{" "}
                  </span>{" "}
                  {secretary?.period}
                </div>
                <div className="col-span-1 p-2 border-gray-300">
                  <span className="md:hidden font-bold">
                    Remuneração mensal:{" "}
                  </span>
                  Em breve
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
