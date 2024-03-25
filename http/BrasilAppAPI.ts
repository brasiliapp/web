import axios from "axios";

export const BrasilAppAPI = axios.create({
  baseURL: "https://brasilapi.com.br/api/cnpj/v1/",
});
