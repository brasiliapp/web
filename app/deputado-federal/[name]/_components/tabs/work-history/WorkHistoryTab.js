import ExperienceItem from "./ExperienceItem";

export function WorkHistoryTab({ federalDeputyWorkHistory }) {
  return (
    <>
      {federalDeputyWorkHistory?.length > 0 && (
        <>
          <ol className=" relative border-l border-gray-200 dark:border-gray-700">
            {federalDeputyWorkHistory.map((workExperience, index) => {
              return (
                <ExperienceItem
                  key={workExperience.titulo + index}
                  title={workExperience.titulo}
                  company={workExperience.entidade}
                  companyUf={workExperience.entidadeUF}
                  companyCountry={workExperience.entidadePais}
                  start={workExperience.anoInicio}
                  end={workExperience.anoFim}
                />
              );
            })}
          </ol>
        </>
      )}
    </>
  );
}
