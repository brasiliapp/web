import { useCompanyInformation } from "@/app/deputado-federal/_hooks/useCompanyInformation";
import { formatDate, formatMonetaryValue, formatCPFCNPJ } from "@/utils";
import {
  Popover,
  PopoverTrigger,
  Chip,
  PopoverContent,
} from "@nextui-org/react";

const skeletonStyle = "bg-[#D4D4D866] animate-pulse";

export const CompanyDetail = ({ supplierId }: { supplierId: string }) => {
  const { handleSelectCNPJ, companyInformation, isLoading } =
    useCompanyInformation();

  return (
    <Popover placement="bottom" showArrow={true} backdrop="opaque">
      <PopoverTrigger>
        <Chip
          onClick={() => handleSelectCNPJ(supplierId)}
          variant="shadow"
          classNames={{
            base: "cursor-pointer bg-gradient-to-br from-gray-200 to-gray-500 border-small ml-3",
            content: "drop-shadow shadow-black text-white",
          }}
        >
          Verificar
        </Chip>
      </PopoverTrigger>
      <PopoverContent>
        {isLoading ? (
          <>
            <div className="px-1 py-2 min-w-[400px] max-w-sm">
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
            </div>
            <div className="px-1 py-2 min-w-[400px] max-w-sm">
              <div
                className={`w-full  max-w-[25%] h-5  my-1 rounded-medium ${skeletonStyle}`}
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
            </div>
          </>
        ) : (
          <div className="px-1 py-2 max-w-sm">
            <div className="text-small pt-2 font-bold text-gray-600">
              {companyInformation?.razao_social}
            </div>
            <div className="text-small py-2 text-gray-500">
              <span className="font-semibold">Data de abertura:</span>{" "}
              {companyInformation?.data_inicio_atividade &&
                formatDate(companyInformation?.data_inicio_atividade)}{" "}
              <i>{}</i>
            </div>
            <div className="text-small py-2 text-gray-500">
              <span className="font-semibold">Capital social:</span>
              {formatMonetaryValue(Number(companyInformation?.capital_social))}
            </div>
            <div className="text-small py-2 text-gray-500">
              <span className="font-semibold">Sócios:</span>
            </div>
            {companyInformation?.qsa.map((qsa) => {
              return (
                <div className="flex flex-col">
                  <div className="text-small pt-2 font-bold text-gray-600">
                    {qsa.nome_socio}
                  </div>
                  <small className="!font-normal">
                    {formatCPFCNPJ(qsa?.cnpj_cpf_do_socio)}
                  </small>
                </div>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
