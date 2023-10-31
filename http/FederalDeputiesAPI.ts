import type { Response } from "node-fetch";

import fetch from "node-fetch";

export abstract class FederalDeputiesAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "https://dadosabertos.camara.leg.br/api/v2";
  }

  async get(endpoint: string): Promise<Response> {
    return fetch(`${this.baseUrl}/${endpoint}`);
  }
}
