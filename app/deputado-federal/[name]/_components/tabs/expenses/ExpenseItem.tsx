import type { Cpf, Cnpj } from "@/types";

import {
  formatMonetaryValue,
  formatDate,
  formatCPFCNPJ,
  identifyPerson,
} from "@/utils";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
  Chip,
} from "@nextui-org/react";

const skeletonStyle = "bg-[#D4D4D866] animate-pulse";

interface Props {
  value: number;
  date: string;
  type: string;
  supplier: string;
  supplierId: Cpf | Cnpj;
  document: string;
}

export default function ExpenseItem({
  value,
  date,
  supplier,
  supplierId,
  document,
  type,
}: Props) {
  return (
    <li className="mb-10 ml-6">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-gray-900 ">
        <svg
          className="w-2.5 h-2.5 hidden md:block"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      </span>
      <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
        {formatMonetaryValue(value)}{" "}
      </h3>{" "}
      <div
        className={`${
          document?.length > 1
            ? "bg-green-100 text-green-800 "
            : "bg-red-100 text-red-800 "
        }text-sm font-sm mr-2 px-2.5 py-0.5 rounded inline-block  mb-4`}
      >
        {document?.length > 1 ? "enviou comprovante" : "não enviou comprovante"}
      </div>
      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 d-flex">
        <span>Informado em {formatDate(date)}</span>
      </time>
      <p className="mb-4 text-small font-normal text-gray-500 dark:text-gray-400">
        {identifyPerson(supplierId)}: {supplier}{" "}
      </p>
      <p className="mb-4 text-small font-normal text-gray-500 dark:text-gray-400">
        {identifyPerson(supplierId) === "Empresa" ? "CNPJ" : "CPF"}:{" "}
        {formatCPFCNPJ(supplierId)}{" "}
        <Popover placement="bottom" showArrow={true} backdrop="opaque">
          <PopoverTrigger>
            <Chip
              variant="shadow"
              classNames={{
                base: "cursor-pointer bg-gradient-to-br from-gray-200 to-gray-500 border-small",
                content: "drop-shadow shadow-black text-white",
              }}
            >
              Verificar
            </Chip>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2 max-w-sm">
              <Chip size="sm" className="mt-3" color="warning" variant="flat">
                Funcionalidade em desenvolvimento
              </Chip>
              <div className="text-small pt-2 font-bold text-gray-600">
                Empresa Jabuticaba de laranja do Sul do Norte LTDA.{" "}
              </div>
              <div className="text-small py-2 text-gray-500">
                <span className="font-semibold">Data de abertura:</span> 18/02/2020{" "}
                <i>(3 anos, 7 meses e 20 dias)</i>
              </div>
              <div className="text-small py-2 text-gray-500">
                <span className="font-semibold">Capital social:</span> R$ 5.000,00
              </div>
              <div className="text-small py-2 text-gray-500">
                <span className="font-semibold">Sócios:</span>
              </div>

              <div
                className={`w-full  max-w-[45%] h-5  my-1 rounded-medium ${skeletonStyle}`}
              />
              <div
                className={`w-full h-5  my-1 rounded-medium ${skeletonStyle}`}
              />

              <div className="flex justify-between">
                <div
                  className={`w-full max-w-[48%] h-5 my-1 rounded-medium ${skeletonStyle}`}
                />
                <div
                  className={`w-full max-w-[48%] h-5 my-1 rounded-medium ${skeletonStyle}`}
                />
              </div>

              <Divider className="my-4" />
              <p className="text-small py-2 text-gray-500">
                Essa é a proposta de uma feature nova para trazer informações
                das empresas e facilitar a consulta dos usuários sobre as
                informações completas dos fornecedores.
              </p>
              <p className="text-small py-2 text-gray-500">
                <i>
                  Os dados exibidos aqui, por enquanto não são dados reais. Se
                  você tem alguma sugestão para essa funcionalidade abra um
                  issue no github ou envie um e-mail para
                  contato@brasiliapp.com.br
                </i>
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </p>
      <p className="mb-4 text-small font-normal text-gray-500 dark:text-gray-400">
        Tipo da despesa: {type}
      </p>
      {document?.length > 1 && (
        <a
          href={document}
          title="Visualizar documento"
          rel="nofollow"
          target="_blank"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          <svg
            className="w-3.5 h-3.5 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>{" "}
          Ver comprovante de pagamento
        </a>
      )}
    </li>
  );
}
