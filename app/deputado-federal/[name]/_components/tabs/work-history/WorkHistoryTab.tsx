import type { WorkHistory } from "@/interfaces";

import ExperienceItem from "./ExperienceItem";

interface Props {
  federalDeputyWorkHistory: WorkHistory[];
}

export function WorkHistoryTab({ federalDeputyWorkHistory }: Props) {
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
