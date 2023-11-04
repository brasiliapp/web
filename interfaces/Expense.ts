import type { Cnpj, Cpf } from "@/types";

export interface Expense {
  ano: number;
  cnpjCpfFornecedor: Cpf | Cnpj;
  codDocumento: number;
  codLote: number;
  codTipoDocumento: number;
  dataDocumento: string;
  mes: number;
  nomeFornecedor: string;
  numDocumento: string;
  numRessarcimento: string;
  parcela: number;
  tipoDespesa: string;
  tipoDocumento: string;
  urlDocumento: string;
  valorDocumento: number;
  valorGlosa: number;
  valorLiquido: number;
}
