import axios from "axios";

export class FederalDeputiesAPI {
  constructor() {
    if (new.target === FederalDeputiesAPI) {
      throw new Error("FederalDeputiesAPI is an abstract class");
    }

    this._axiosInstance = axios;
    this._chamberOfDeputiesAPIBaseURL =
      "https://dadosabertos.camara.leg.br/api/v2";

    this._chamberOfDeputiesAPIInstance = this._axiosInstance.create({
      baseURL: this._chamberOfDeputiesAPIBaseURL,
      headers: { "Content-Type": "application/json" },
    });
  }
}
