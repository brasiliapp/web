import EventItem from "./EventItem";

export function VideosTab({ speechesData, federalDeputyName }) {
  return (
    <>
      {speechesData?.length === 0 && (
        <>
          <small className="text-start">
            Não existe vídeos para esse parlamentar
          </small>
        </>
      )}
      {speechesData?.length > 0 && (
        <>
          <div
            className="bg-gray-100 mb-5 border-l-4 border-gray-300 text-dark-700 p-4 rounded-lg"
            role="alert"
          >
            Os vídeos abaixo foram capturados pela página do deputado no site da
            câmara dos deputados, se não conseguir visualizar aqui clique no
            link que redireciona para a página da câmara.
          </div>
          <ol className="relative border-l border-gray-200 dark:border-gray-700">
            {speechesData.map((speech) => {
              return (
                <EventItem
                  key={speech.evento_id}
                  id={speech.evento_id}
                  title={speech.event_title}
                  date={speech.date}
                  time={speech.time}
                  place={speech.place}
                  videos={speech.video_links}
                  name={federalDeputyName}
                />
              );
            })}
          </ol>
        </>
      )}
    </>
  );
}
