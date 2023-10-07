import { formatDate, formatCPFCNPJ } from "@/utils";

export function PersonalInfoTab({ federalDeputyBaseInfo }) {
  return (
    <>
      <ul className="max-w-md max-w-sm md:min-w-400px divide-y divide-gray-200 dark:divide-gray-700">
        <li className="pb-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Nome civil
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {federalDeputyBaseInfo?.nomeCivil}
              </p>
            </div>
          </div>
        </li>
        <li className="py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                CPF
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {formatCPFCNPJ(federalDeputyBaseInfo?.cpf)}
              </p>
            </div>
          </div>
        </li>
        <li className="py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Salário
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                R$ 41.650,92 🤯
              </p>
            </div>
          </div>
        </li>
        <li className="py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Escolaridade
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {federalDeputyBaseInfo?.escolaridade}
              </p>
            </div>
          </div>
        </li>
        <li className="py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Data de Nascimento
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {formatDate(federalDeputyBaseInfo?.dataNascimento)}
              </p>
            </div>
          </div>
        </li>
        <li className="py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Naturalidade
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {federalDeputyBaseInfo?.municipioNascimento}/
                {federalDeputyBaseInfo?.ufNascimento}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}
