import { getFormatedPhoneNumber } from "@/utils";

export function ContactTab({ federalDeputyBaseInfo }) {
  return (
    <>
      <ul className="max-w-md max-w-sm md:min-w-400px divide-y divide-gray-200 dark:divide-gray-700">
        <li className="pb-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                E-mail
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {federalDeputyBaseInfo?.ultimoStatus?.email}
              </p>
            </div>
          </div>
        </li>
        <li className="py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Onde encontrar
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400 whitespace-normal">
                {federalDeputyBaseInfo?.ultimoStatus?.gabinete?.andar}°
                andar, Sala{" "}
                {federalDeputyBaseInfo?.ultimoStatus?.gabinete?.nome} do
                prédio{" "}
                {federalDeputyBaseInfo?.ultimoStatus?.gabinete?.predio} na
                Praça dos Poderes, Brasilia/DF
              </p>
            </div>
          </div>
        </li>
        <li className="py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Telefone
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {getFormatedPhoneNumber(
                      federalDeputyBaseInfo?.ultimoStatus?.gabinete?.telefone,
                    )}
                  </p>
                </div>

                <a
                  href={`tel:+55${getFormatedPhoneNumber(
                    federalDeputyBaseInfo?.ultimoStatus?.gabinete?.telefone.replace(
                      /\D/g,
                      "",
                    ),
                  )}`}
                  className="flex items-center text-sm bg-success-500 hover:bg-success-700 text-white font py-2 px-4 rounded"
                  title={`Ligue agora para ${federalDeputyBaseInfo?.nomeCivil}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#fff"
                    stroke="#fff"
                    version="1.1"
                    viewBox="0 0 473.806 473.806"
                    xmlSpace="preserve"
                    className="mr-3"
                  >
                    <g>
                      <path d="M374.456 293.506c-9.7-10.1-21.4-15.5-33.8-15.5-12.3 0-24.1 5.3-34.2 15.4l-31.6 31.5c-2.6-1.4-5.2-2.7-7.7-4-3.6-1.8-7-3.5-9.9-5.3-29.6-18.8-56.5-43.3-82.3-75-12.5-15.8-20.9-29.1-27-42.6 8.2-7.5 15.8-15.3 23.2-22.8 2.8-2.8 5.6-5.7 8.4-8.5 21-21 21-48.2 0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5-6-6.2-12.3-12.6-18.8-18.6-9.7-9.6-21.3-14.7-33.5-14.7s-24 5.1-34 14.7l-.2.2-34 34.3c-12.8 12.8-20.1 28.4-21.7 46.5-2.4 29.2 6.2 56.4 12.8 74.2 16.2 43.7 40.4 84.2 76.5 127.6 43.8 52.3 96.5 93.6 156.7 122.7 23 10.9 53.7 23.8 88 26 2.1.1 4.3.2 6.3.2 23.1 0 42.5-8.3 57.7-24.8.1-.2.3-.3.4-.5 5.2-6.3 11.2-12 17.5-18.1 4.3-4.1 8.7-8.4 13-12.9 9.9-10.3 15.1-22.3 15.1-34.6 0-12.4-5.3-24.3-15.4-34.3l-54.9-55.1zm35.8 105.3c-.1 0-.1.1 0 0-3.9 4.2-7.9 8-12.2 12.2-6.5 6.2-13.1 12.7-19.3 20-10.1 10.8-22 15.9-37.6 15.9-1.5 0-3.1 0-4.6-.1-29.7-1.9-57.3-13.5-78-23.4-56.6-27.4-106.3-66.3-147.6-115.6-34.1-41.1-56.9-79.1-72-119.9-9.3-24.9-12.7-44.3-11.2-62.6 1-11.7 5.5-21.4 13.8-29.7l34.1-34.1c4.9-4.6 10.1-7.1 15.2-7.1 6.3 0 11.4 3.8 14.6 7l.3.3c6.1 5.7 11.9 11.6 18 17.9 3.1 3.2 6.3 6.4 9.5 9.7l27.3 27.3c10.6 10.6 10.6 20.4 0 31-2.9 2.9-5.7 5.8-8.6 8.6-8.4 8.6-16.4 16.6-25.1 24.4-.2.2-.4.3-.5.5-8.6 8.6-7 17-5.2 22.7l.3.9c7.1 17.2 17.1 33.4 32.3 52.7l.1.1c27.6 34 56.7 60.5 88.8 80.8 4.1 2.6 8.3 4.7 12.3 6.7 3.6 1.8 7 3.5 9.9 5.3.4.2.8.5 1.2.7 3.4 1.7 6.6 2.5 9.9 2.5 8.3 0 13.5-5.2 15.2-6.9l34.2-34.2c3.4-3.4 8.8-7.5 15.1-7.5 6.2 0 11.3 3.9 14.4 7.3l.2.2 55.1 55.1c10.3 10.2 10.3 20.7.1 31.3zM256.056 112.706c26.2 4.4 50 16.8 69 35.8s31.3 42.8 35.8 69c1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.4-1.2 12.3-8.2 11.1-15.6-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3 3.7-15.6 11s3.5 14.4 10.9 15.6zM473.256 209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2 3.7-15.5 11-1.2 7.4 3.7 14.3 11.1 15.6 46.6 7.9 89.1 30 122.9 63.7 33.8 33.8 55.8 76.3 63.7 122.9 1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.3-1.1 12.3-8.1 11-15.4z"></path>
                    </g>
                  </svg>
                  Ligue Agora
                </a>
              </div>
            </div>
          </div>
        </li>
        <li className="py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Site
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {federalDeputyBaseInfo?.urlWebsite
                  ? federalDeputyBaseInfo?.urlWebsite
                  : "Não informado"}
              </p>
            </div>
          </div>
        </li>
        <li className="py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Redes sociais
              </p>
              {federalDeputyBaseInfo?.redeSocial.length === 0 && (
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Não informado
                </p>
              )}

              {federalDeputyBaseInfo?.redeSocial?.map((profile) => {
                return (
                  <a
                    key={profile.split("?")[0]}
                    href={profile.split("?")[0]}
                    rel="nofollow"
                    target="_blank"
                    className="text-sm text-gray-500 underline truncate dark:text-gray-400"
                    title={`Acesse o perfil: ${federalDeputyBaseInfo?.nomeCivil}`}
                  >
                    {profile.split("?")[0]}
                  </a>
                );
              })}
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}
