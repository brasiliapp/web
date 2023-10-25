import fetch from "node-fetch";

export class FederalDeputiesAPI {
  constructor() {
    if (new.target === FederalDeputiesAPI) {
      throw new Error("FederalDeputiesAPI is an abstract class");
    }

    this._baseUrl = "https://dadosabertos.camara.leg.br/api/v2";
    this._chamberOfDeputiesAPIInstance = this;
  }

  async get(endpoint) {
    return fetch(`${this._baseUrl}/${endpoint}`);
  }
}
