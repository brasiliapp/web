import { FederalDeputiesAPI } from "@/http";

export class GetFederalDeputyDataService extends FederalDeputiesAPI {
  async fetchBaseData(id) {
    const response = await this._chamberOfDeputiesAPIInstance.get(
      `deputados/${id}`,
    );


    if (!response.ok) {
      console.error("Failed to fetch Federal Deputy base data:", response);
      throw new Error("Failed to fetch Federal Deputy base data", response);
    }

    const data = await response.json();
    return { data: data.dados, status: response.status };
  }

  async fetchWorkHistory(id) {
    const response = await this._chamberOfDeputiesAPIInstance.get(
      `deputados/${id}/ocupacoes`,
    );
    if (!response.ok) {
      console.error("Failed to fetch Federal Deputy work history:", response);
      throw new Error("Failed to fetch Federal Deputy work history");
    }

    const data = await response.json();
    return { data: data.dados, status: response.status };
  }

  async fetchExpenses(id, monthInMM, yearInYYYY) {
    const response = await this._chamberOfDeputiesAPIInstance.get(
      `deputados/${id}/despesas?idLegislatura=57&ano=${yearInYYYY}&mes=${monthInMM}`,
    );
    if (!response.ok) {
      console.error(
        `Failed to fetch Federal Deputy month ${monthInMM}, year ${yearInYYYY} expenses:`,
        response,
      );
      throw new Error(
        `Failed to fetch Federal Deputy month ${monthInMM} expenses, year ${yearInYYYY}`,
      );
    }

    const data = await response.json();
    return { data: data.dados, status: response.status };
  }

  async fetchSpeechesData(nameAndID) {
    const response = await fetch(
      `https://pub-ef5d1d80d62c44a1a00e2d05a2d5b85c.r2.dev/${nameAndID}.json`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Federal Deputy speeches videos:`,
        response,
      );
    }

    const data = await response.json();
    return { data: data, status: response.status };
  }

  async fetchCabinetData(nameAndID) {
    const response = await fetch(
      `https://pub-bfddf9199db94ff8b19b7d931e548c52.r2.dev/${nameAndID}.json`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch Federal Deputy cabinet data:`, response);
    }

    const data = await response.json();
    return { data: data, status: response.status };
  }
}
