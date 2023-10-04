import React from "react";

export default function ExperienceItem({
  title,
  company,
  companyUf,
  companyCountry,
  start,
  end,
}) {
  return (
    <li className="mb-10 ml-6">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-gray-900">
        <svg
          className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      </span>
      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
        {title ? title : "Não informado"}
      </h3>
      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 d-flex">
        <span>
          de {start ? start : "Não informado"} até {end ? end : "Não informado"}
        </span>
      </time>
      <p className="mb-2 text-small font-normal text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Empresa:</span>{" "}
        {company ? company : "Não informado"}
      </p>
      <p className="mb-2 text-small font-normal text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Local de atuação: </span>
        {companyUf && companyCountry
          ? `${companyUf}/${companyCountry}`
          : "Não informado"}
      </p>
    </li>
  );
}
