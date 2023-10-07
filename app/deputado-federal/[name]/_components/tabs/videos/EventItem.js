export default function EventItem({
  date,
  title,
  time,
  place,
  id,
  videos,
  name,
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
        {title}
      </h3>
      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 d-flex">
        <span>
          {date} às {time} no {place}
        </span>
      </time>
      <div className="container mx-auto p-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => {
            const url = `https://www.camara.leg.br/evento-legislativo/${id}/?${video?.video_param
              ?.split("&")
              .map((param) =>
                param.split("=").map(encodeURIComponent).join("=")
              )
              .join("&")}&trechosOrador=${encodeURIComponent(name)}&crawl=no`;

            if (video?.mp4_url) {
              return (
                <li
                  key={video?.video_param}
                  className="bg-white rounded-lg shadow-lg flex flex-col"
                >
                  <video
                    controls
                    className="w-full rounded-lg"
                    loading="lazy"
                    preload="auto"
                    src={video?.mp4_url}
                  >
                    <source
                      title={name}
                      src={video?.mp4_url}
                      type='video/mp4;codecs="avc1.4D401E, mp4a.40.2"'
                    />
                    Your browser does not support the video tag.
                  </video>
                  {/* https://www.camara.leg.br/evento-legislativo/69961/?a=562961&t=1694721564477&trechosOrador=Nikolas%20Ferreira&crawl=no */}
                  <a
                    href={url}
                    title="Ver no site da Câmara dos Deputados"
                    rel="nofollow"
                    target="_blank"
                    className="inline-flex w-full text-center items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="#454545"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 mr-2.5"
                    >
                      <g>
                        <g>
                          <path
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 5H8.2c-1.12 0-1.68 0-2.108.218a1.999 1.999 0 00-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218.377-.192.683-.498.875-.874.218-.428.218-.987.218-2.105V14m1-5V4m0 0h-5m5 0l-7 7"
                          ></path>
                        </g>
                      </g>
                    </svg>{" "}
                    Ver no site da Câmara dos Deputados
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </li>
  );
}
