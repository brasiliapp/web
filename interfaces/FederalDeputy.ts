export interface FederalDeputy extends FederalDeputyPoliticalInfo {
  cpf: string;
  dataFalecimento: string;
  dataNascimento: string;
  escolaridade: string;
  municipioNascimento: string;
  nomeCivil: string;
  redeSocial: string[];
  sexo: string;
  ufNascimento: string;
  ultimoStatus: {
    nome: string;
    condicaoEleitoral: string;
    data: string;
    descricaoStatus: string;
    urlFoto: string;
    gabinete: {
      andar: string;
      email: string;
      nome: string;
      predio: string;
      sala: string;
      telefone: string;
    };
    nomeEleitoral: string;
    situacao: string;
  };
  urlWebsite: string;
  links: FederalDeputyLink[];
}

export interface FederalDeputyPoliticalInfo {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  uriPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email: string | null;
}

export interface FederalDeputyLink {
  href: string;
  rel: string;
  type: string;
}
