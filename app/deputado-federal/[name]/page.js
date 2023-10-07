import Head from "next/head";

import { Header, InfoTabs } from "./_components";
import { Footer } from "@/components";
import { defaultSeoConfig } from "@/seoConfig";
import { GetFederalDeputyDataService } from "@/services";
import {
  getGenderSuffix,
  calculateTotal,
  formatMonetaryValue,
  fetchVideos,
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
            data?.federalDeputyBaseInfo?.ultimoStatus?.urlFoto ||
            defaultSeoConfig.imageUrl
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
            data?.federalDeputyBaseInfo?.ultimoStatus?.urlFoto ||
            defaultSeoConfig.imageUrl
          }
        />
        <meta name="twitter:url" content={fullUrl || defaultSeoConfig.url} />
      </Head>

      <main className="mt-3 z-0 flex flex-col relative justify-between rounded-large w-full">
        <Header data={data} />
        <InfoTabs data={data} />
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
  const baseInfo = await getFederalDeputyDataService.fetchBaseData(id);
  const workHistory = await getFederalDeputyDataService.fetchWorkHistory(id);
  const monthExpenses = await getFederalDeputyDataService.fetchExpenses(
    id,
    monthQueryParam,
    yearQueryParam,
  );

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

  const data = {
    cabinetData: cabinetData.data ?? [],
    description: seoDescription,
    expenses: monthExpenses.data,
    federalDeputyBaseInfo: baseInfo.data,
    federalDeputyWorkHistory: workHistory.data,
    federalDeputyMonthlyCabinetExpenses: monthlyCabinetExpenses ?? null,
    speechesData: speechesData.data ?? [],
    title: seoTitle,
  };

  return data;
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
