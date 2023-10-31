export interface FederalDeputy {
  cpf: string;
  dataFalecimento: string;
  dataNascimento: string;
  escolaridade: string;
  id: number;
  municipioNascimento: string;
  nomeCivil: string;
  redeSocial: string[];
  sexo: string;
  ufNascimento: string;
  ultimoStatus: {
    condicaoEleitoral: string;
    data: string;
    descricaoStatus: string;
    email: string;
    gabinete: {
      andar: string;
      email: string;
      nome: string;
      predio: string;
      sala: string;
      telefone: string;
    };
    id: number;
    idLegislatura: number;
    nome: string;
    nomeEleitoral: string;
    siglaPartido: string;
    siglaUf: string;
    situacao: string;
    uri: string;
    uriPartido: string;
    urlFoto: string;
  };
  uri: string;
  urlWebsite: string;
  links: Link[];
}

export interface Link {
  href: string;
  rel: string;
  type: string
}
