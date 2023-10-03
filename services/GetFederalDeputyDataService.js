import { FederalDeputiesAPI } from "@/http";

export class GetFederalDeputyDataService extends FederalDeputiesAPI {
  async fetchBaseData(id) {
    const response = await this._chamberOfDeputiesAPIInstance.get(
      `/deputados/${id}`,
    );
    return { data: response.data.dados, status: response.status };
  }

  async fetchWorkExperience(id) {
    const response = await this._chamberOfDeputiesAPIInstance.get(
      `/deputados/${id}/ocupacoes`,
    );
    return { data: response.data.dados, status: response.status };
  }

  async fetchSpeechesVideos(name) {
    const response = await this._axiosInstance.get(
      `https://pub-ef5d1d80d62c44a1a00e2d05a2d5b85c.r2.dev/${name}.json`,
    );

    return { data: response.data, status: response.status };
  }

  async fetchExpenses(id, yearInYYYY, monthInMM) {
    const response = await this._chamberOfDeputiesAPIInstance.get(
      `/deputados/${id}/despesas?idLegislatura=57&ano=${yearInYYYY}&mes=${monthInMM}`,
    );

    return { data: response.data.dados, status: response.status };
  }

  async fetchCabinetData(name) {
    const response = await this._axiosInstance.get(
      `https://pub-bfddf9199db94ff8b19b7d931e548c52.r2.dev/${name}.json`,
    );

    return { data: response.data, status: response.status };
  }
}
