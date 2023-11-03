import type {
  Cabinet,
  Expense,
  FederalDeputy,
  MonthlyExpense,
  Speech,
  WorkHistory,
} from "@/interfaces";

import Head from "next/head";

import { Header, InfoTabs } from "./_components";
import { Footer } from "@/components";
import { defaultSeoConfig } from "@/seoConfig";
import { GetFederalDeputyDataService } from "@/services";
import {
  fetchVideos,
  formatMonetaryValue,
  getCurrentDateInfo,
  getGenderSuffix,
  getTotalExpense,
} from "@/utils";

export default async function FederalDeputy({ params, searchParams }) {
  const { name: federalDeputyNameAndId } = params;
  const { mes: monthQueryParam, ano: yearQueryParam } = searchParams;

  const data = await getData(
    federalDeputyNameAndId,
    monthQueryParam,
    yearQueryParam,
  );

  const fullUrl = `https://brasiliapp.com.br/deputado-federal/${federalDeputyNameAndId}/mes=${monthQueryParam}&ano=${yearQueryParam}`;
  return (
    <>
      <Head>
        <title>{data.title || defaultSeoConfig.title}</title>
        <meta
          name="description"
          content={data.description || defaultSeoConfig.description}
        />
        <meta
          property="og:title"
          content={data.title || defaultSeoConfig.title}
        />
        <meta
          property="og:description"
          content={data.description || defaultSeoConfig.description}
        />
        <meta
          property="og:image"
          content={
            data?.baseInfo?.ultimoStatus?.urlFoto || defaultSeoConfig.imageUrl
          }
        />
        <meta property="og:url" content={fullUrl || defaultSeoConfig.url} />
        <link rel="canonical" href={fullUrl || defaultSeoConfig.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={data.title || defaultSeoConfig.title}
        />
        <meta
          name="twitter:description"
          content={data.description || defaultSeoConfig.title}
        />
        <meta
          name="twitter:image"
          content={
            data?.baseInfo?.ultimoStatus?.urlFoto || defaultSeoConfig.imageUrl
          }
        />
        <meta name="twitter:url" content={fullUrl || defaultSeoConfig.url} />
      </Head>

      <section className="mt-3 z-0 flex flex-col relative justify-between rounded-large w-full">
        <Header federalDeputyBaseInfo={data.baseInfo} />
        <InfoTabs
          expenses={data.expenses}
          monthlyCabinetExpenses={data.monthlyCabinetExpenses}
          cabinetData={data.cabinetData}
          speechesData={data.speechesData}
          baseInfo={data.baseInfo}
          workHistory={data.workHistory}
        />
      </section>
      <Footer />
    </>
  );
}

async function getData(
  federalDeputyNameAndId: string,
  monthQueryParam: number | undefined,
  yearQueryParam: number | undefined,
): Promise<{
  cabinetData: Cabinet | never[];
  description: string;
  expenses: Expense[] | undefined;
  baseInfo: FederalDeputy | undefined;
  workHistory: WorkHistory[] | undefined;
  monthlyCabinetExpenses: MonthlyExpense | null;
  speechesData: Speech[];
  title: string;
}> {
  const getFederalDeputyDataService = new GetFederalDeputyDataService();

  const id = parseInt(federalDeputyNameAndId.split("-").at(-1)!);

  const { numericMonth, year } = getCurrentDateInfo();

  const doQueryParamsExists = monthQueryParam && yearQueryParam;
  const fetchExpensesArgs = doQueryParamsExists
    ? { id: id, monthInMM: monthQueryParam, yearInYYYY: yearQueryParam }
    : { id: id, monthInMM: numericMonth, yearInYYYY: year };

  const fetchPromises = [
    getFederalDeputyDataService.fetchBaseData(id),
    getFederalDeputyDataService.fetchWorkHistory(id),
    getFederalDeputyDataService.fetchExpenses(fetchExpensesArgs),
  ];

  const promisesResults = await Promise.allSettled(fetchPromises);

  let baseInfo: FederalDeputy | undefined;
  let workHistory: WorkHistory[] | undefined;
  let monthExpenses: Expense[] | undefined;

  for (let i = 0; i < promisesResults.length; ++i) {
    const result = promisesResults[i];

    if (isPromiseFulfilled(result)) {
      const data = result.value.data;

      if (i === 0) {
        baseInfo = data as FederalDeputy;
      } else if (i === 1) {
        workHistory = data as WorkHistory[];
      } else if (i === 2) {
        monthExpenses = data as Expense[];
      }
    }
  }

  let speechesData: { data: Speech[]; status: number } | undefined;
  try {
    speechesData = await getFederalDeputyDataService.fetchSpeechesData(
      federalDeputyNameAndId,
    );
  } catch (error) {
    console.error("fail to get videos", error);
  }

  if (speechesData!.data.length > 0 && !monthQueryParam && !yearQueryParam) {
    fetchVideos(speechesData!.data);
  }

  let cabinetData: Cabinet | undefined;
  try {
    const cabinetDataResp = await getFederalDeputyDataService.fetchCabinetData(
      federalDeputyNameAndId,
    );
    cabinetData = cabinetDataResp.data;
  } catch (error) {
    console.error("fail to get cabinetData", error);
  }

  const monthlyCabinetExpenses = cabinetData!.montly_expenses.find(
    (item: MonthlyExpense) => monthQueryParam === item.month,
  );

  const total = formatMonetaryValue(getTotalExpense(monthExpenses!));

  /** Improve SEO titles and descriptions method, make it external as well */
  const seoDates = doQueryParamsExists
    ? getDateForSEO(monthQueryParam, yearQueryParam)
    : getDateForSEO(numericMonth, year);
  const suffix = getGenderSuffix(baseInfo!.sexo);

  const { seoTitle, seoDescription } = getSEOTitleAndDescription(
    suffix,
    baseInfo!,
    total,
    seoDates,
  );

  return {
    cabinetData: cabinetData ?? [],
    description: seoDescription,
    expenses: monthExpenses,
    baseInfo: baseInfo,
    workHistory: workHistory,
    monthlyCabinetExpenses: monthlyCabinetExpenses ?? null,
    speechesData: speechesData?.data ?? [],
    title: seoTitle,
  };
}

function isPromiseFulfilled<T>(
  input: PromiseSettledResult<T>,
): input is PromiseFulfilledResult<T> {
  return input.status === "fulfilled";
}

function getDateForSEO(monthInMM: number, yearInYYYY: number) {
  const monthForSEO = new Date(`${monthInMM}-30-${yearInYYYY}`).toLocaleString(
    "pt-BR",
    { month: "long" },
  );
  const yearForSEO = yearInYYYY;

  return {
    month: monthForSEO,
    year: yearForSEO,
  };
}

function getSEOTitleAndDescription(
  genderSuffix: "a" | "o",
  federalDeputyBaseInfo: FederalDeputy,
  federalDeputyTotalMonthlyExpenses: `R$ ${number}`,
  seoDates: { month: string; year: number },
) {
  const title = `Gastos d${genderSuffix} deputad${genderSuffix} Federal
${federalDeputyBaseInfo?.ultimoStatus?.nome} você confere aqui no BrasiliApp`;
  const description = `${genderSuffix.toUpperCase()} deputad${genderSuffix} Federal
${federalDeputyBaseInfo?.ultimoStatus?.nome} gastou 
${federalDeputyTotalMonthlyExpenses} em ${seoDates.month} de ${
    seoDates.year
  }, confira aqui como ele usou a cota parlamentar`;

  return { seoTitle: title, seoDescription: description };
}
