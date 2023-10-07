import Head from "next/head";

import { Header, InfoTabs } from "./_components";
import { Footer } from "@/components";
import { defaultSeoConfig } from "@/seoConfig";
import { GetFederalDeputyDataService } from "@/services";
import {
  calculateTotal,
  fetchVideos,
  formatMonetaryValue,
  getGenderSuffix,
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

      <main className="mt-3 z-0 flex flex-col relative justify-between rounded-large w-full">
        <Header federalDeputyBaseInfo={data.baseInfo} />
        <InfoTabs
          expenses={data.expenses}
          monthlyCabinetExpenses={data.monthlyCabinetExpenses}
          cabinetData={data.cabinetData}
          speechesData={data.speechesData}
          baseInfo={data.baseInfo}
          workHistory={data.workHistory}
        />
      </main>
      <Footer />
    </>
  );
}

async function getData(
  federalDeputyNameAndId,
  monthQueryParam,
  yearQueryParam,
) {
  const getFederalDeputyDataService = new GetFederalDeputyDataService();

  const id = federalDeputyNameAndId.split("-").at(-1);

  const fetchPromises = [
    getFederalDeputyDataService.fetchBaseData(id),
    getFederalDeputyDataService.fetchWorkHistory(id),
    getFederalDeputyDataService.fetchExpenses(
      id,
      monthQueryParam,
      yearQueryParam,
    ),
  ];

  const [baseInfoResp, workHistoryResp, monthExpensesResp] =
    await Promise.allSettled(fetchPromises);

  const baseInfo = baseInfoResp.value;
  const workHistory = workHistoryResp.value;
  const monthExpenses = monthExpensesResp.value;

  let speechesData, cabinetData;
  try {
    speechesData = await getFederalDeputyDataService.fetchSpeechesData(
      federalDeputyNameAndId,
    );
    if (speechesData?.length > 0) {
      fetchVideos(data?.speechesData);
    }
  } catch (error) {
    console.error("fail to get videos", error);
  }

  try {
    cabinetData = await getFederalDeputyDataService.fetchCabinetData(
      federalDeputyNameAndId,
    );
  } catch (error) {
    console.error("fail to get cabinetData", error);
  }

  const monthlyCabinetExpenses = cabinetData?.data.montly_expenses.find(
    (item) => monthQueryParam === item.month,
  );

  const total = formatMonetaryValue(
    calculateTotal(monthExpenses.data, "valorLiquido"),
  );

  /** Improve SEO titles and descriptions method, make it external as well */
  const seoDates = getDateForSEO(monthQueryParam, yearQueryParam);
  const suffix = getGenderSuffix(baseInfo.data.sexo);

  const { seoTitle, seoDescription } = getSEOTitleAndDescription(
    suffix,
    baseInfo.data,
    total,
    seoDates,
  );

  return {
    cabinetData: cabinetData.data ?? [],
    description: seoDescription,
    expenses: monthExpenses.data,
    baseInfo: baseInfo.data,
    workHistory: workHistory.data,
    monthlyCabinetExpenses: monthlyCabinetExpenses ?? null,
    speechesData: speechesData.data ?? [],
    title: seoTitle,
  };
}

function getDateForSEO(monthInMM, yearInYYYY) {
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
  genderSuffix,
  federalDeputyBaseInfo,
  federalDeputyTotalMonthlyExpenses,
  seoDates,
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
