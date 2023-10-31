import type {
  Cabinet,
  CabinetResponse,
  Expense,
  FederalDeputy,
  Speech,
  WorkHistory,
} from "@/interfaces";

import { FederalDeputiesAPI } from "@/http";

export class GetFederalDeputyDataService extends FederalDeputiesAPI {
  async fetchBaseData(
    id: number,
  ): Promise<{ data: FederalDeputy[]; status: number }> {
    const response = await this.get(`deputados/${id}`);

    if (!response.ok) {
      console.error("Failed to fetch Federal Deputy base data:", response);
      throw new Error("Failed to fetch Federal Deputy base data");
    }

    const data = (await response.json()) as { dados: FederalDeputy[] };
    return { data: data.dados, status: response.status };
  }

  async fetchWorkHistory(
    id: number,
  ): Promise<{ data: WorkHistory[]; status: number }> {
    const response = await this.get(`deputados/${id}/ocupacoes`);

    if (!response.ok) {
      console.error("Failed to fetch Federal Deputy work history:", response);
      throw new Error("Failed to fetch Federal Deputy work history");
    }

    const data = (await response.json()) as {
      dados: WorkHistory[];
      status: number;
    };
    return { data: data.dados, status: response.status };
  }

  async fetchExpenses({
    id,
    monthInMM,
    yearInYYYY,
  }: {
    id: number;
    monthInMM: number;
    yearInYYYY: number;
  }): Promise<{ data: Expense[]; status: number }> {
    const response = await this.get(
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

    const data = (await response.json()) as { dados: Expense[] };
    return { data: data.dados, status: response.status };
  }

  async fetchSpeechesData(
    nameAndID: string,
  ): Promise<{ data: Speech[]; status: number }> {
    const response = await fetch(
      `https://pub-ef5d1d80d62c44a1a00e2d05a2d5b85c.r2.dev/${nameAndID}.json`,
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch Federal Deputy speeches videos:`,
        response,
      );
      throw new Error(`Failed to fetch Federal Deputy speeches videos`);
    }

    const data = (await response.json()) as Speech[];
    return { data: data, status: response.status };
  }

  async fetchCabinetData(
    nameAndID: string,
  ): Promise<{ data: Cabinet; status: number }> {
    const response = await fetch(
      `https://pub-bfddf9199db94ff8b19b7d931e548c52.r2.dev/${nameAndID}.json`,
    );

    if (!response.ok) {
      console.error(`Failed to fetch Federal Deputy cabinet data:`, response);
      throw new Error(`Failed to fetch Federal Deputy cabinet data:`);
    }

    const data = (await response.json()) as CabinetResponse;
    const parsedData = {
      id: data.id,
      deputado: data.deputado,
      salary: data.salary,
      montly_expenses: data.montly_expenses,
      active_secretaries: data.active_secretaries,
      inactive_secretaries: data.inactive_secretaries,
    } as Cabinet;

    return { data: parsedData, status: response.status };
  }
}
