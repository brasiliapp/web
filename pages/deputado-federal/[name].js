import { React, useState, useEffect } from "react";
import Head from "next/head";

import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Image,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

import { useRouter } from "next/router";

import {
  calculateAge,
  getGenderSuffix,
  calculateTotal,
  formatMonetaryValue,
  fetchVideos,
} from "../../utils";

import { defaultSeoConfig } from "../../seoConfig";

import { tabs } from "@/components/deputado-federal/[name]";
import { Footer } from "@/components";

import { GetFederalDeputyDataService } from "@/services";

export async function getServerSideProps(ctx) {
  const {
    name: queryParamNameAndID,
    ano: queryParamYearInYYYY,
    mes: queryParamMonthInMM,
  } = ctx.query;

  const getFederalDeputyDataService = new GetFederalDeputyDataService();

  const id = queryParamNameAndID.split("-").at(-1);
  const baseInfo = await getFederalDeputyDataService.fetchBaseData(id);
  const workHistory = await getFederalDeputyDataService.fetchWorkHistory(id);
  const monthExpenses = await getFederalDeputyDataService.fetchExpenses(
    id,
    queryParamYearInYYYY,
    queryParamMonthInMM,
  );

  let speechesData, cabinetData;
  try {
    speechesData =
      await getFederalDeputyDataService.fetchSpeechesData(queryParamNameAndID);
    if (speechesData?.length > 0) {
      fetchVideos(data?.speechesData);
    }
  } catch (error) {
    console.error("fail to get videos", error);
  }

  try {
    cabinetData =
      await getFederalDeputyDataService.fetchCabinetData(queryParamNameAndID);
  } catch (error) {
    console.error("fail to get cabinetData", error);
  }

  const monthlyCabinetExpenses = cabinetData?.data.montly_expenses.find(
    (item) => queryParamMonthInMM === item.month,
  );

  const total = formatMonetaryValue(
    calculateTotal(monthExpenses.data, "valorLiquido"),
  );

  /** Improve SEO titles and descriptions method, make it external as well */
  const seoDates = getDateForSEO(queryParamMonthInMM, queryParamYearInYYYY);
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

  return { props: { data } };
}

export default function FederalDeputy({ data }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState({
    numericMonth: "",
    fullMonth: "",
    year: "",
  });
  const [selectTab, setSelectedTab] = useState("gastos");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openDocument, setOpenDocument] = useState(null);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => setIsLoading(false));
  }, [router.events]);
  useEffect(() => {
    router.isReady && setIsLoading(false);
  }, [router.isReady]);

  const handleOpenExpense = (document) => {
    onOpen();
    if (openDocument !== document) {
      setOpenDocument(document);
    }
  };
  //testing purposes
  const handleDateChange = (newDate) => {
    setIsLoading(true);
    setCurrentDate(newDate);
  };

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
        <meta
          property="og:url"
          content={
            `https://brasiliapp.com.br${router.asPath}` || defaultSeoConfig.url
          }
        />
        <link
          rel="canonical"
          href={`https://brasiliapp.com.br${router.asPath}`}
        />
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
        <meta
          name="twitter:url"
          content={`https://brasiliapp.com.br${router.asPath}`}
        />
      </Head>

      <main className="mt-3 z-0 flex flex-col relative justify-between rounded-large w-full">
        <Modal
          isOpen={isOpen}
          placement="center"
          onOpenChange={onOpenChange}
          backdrop="blur"
          size="full"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <iframe
                    src={openDocument}
                    title="Web View"
                    width="100%"
                    height="500px"
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className="p-6 sm:p-0">
          <section className="flex flex-col md:flex-row items-center justify-center">
            <div className="">
              <Image
                src={data?.federalDeputyBaseInfo?.ultimoStatus?.urlFoto}
                alt={data?.federalDeputyBaseInfo?.ultimoStatus?.nome}
                className="w-full h-full rounded-lg shadow-xl object-contain max-w-[180px] max-h-[240px]"
              />
            </div>
            <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0 flex flex-col sm:pr-6 sm:pl-6 flex flex-col sm:pr-6 sm:pl-6">
              <h1 className="text-xl font-semibold">
                Deputad{getGenderSuffix(data?.federalDeputyBaseInfo?.sexo)}{" "}
                Federal {data?.federalDeputyBaseInfo?.ultimoStatus?.nome}
              </h1>
              <p className="text-gray-600">
                {data?.federalDeputyBaseInfo?.nomeCivil} é um
                {data?.federalDeputyBaseInfo?.sexo === "F" ? "a" : ""} deputad
                {getGenderSuffix(data?.federalDeputyBaseInfo?.sexo)} brasileir
                {getGenderSuffix(data?.federalDeputyBaseInfo?.sexo)} pelo
                partido{" "}
                {data?.federalDeputyBaseInfo?.ultimoStatus?.siglaPartido}/
                {data?.federalDeputyBaseInfo?.ultimoStatus?.siglaUf}, tem{" "}
                {calculateAge(data?.federalDeputyBaseInfo?.dataNascimento)} anos
                e nasceu na cidade de{" "}
                {data?.federalDeputyBaseInfo?.municipioNascimento}/
                {data?.federalDeputyBaseInfo?.ufNascimento}.
              </p>{" "}
            </div>
          </section>
        </div>
        <Divider className="my-5" />

        <div className="flex w-full flex-col p-0 sm:p-6">
          <Tabs
            aria-label="Options"
            selectedKey={selectTab}
            onSelectionChange={setSelectedTab}
          >
            <Tab key="despesas" title="Despesas" className="">
              <Card>
                <CardBody className="px-0 md:px-6 sm:px-4">
                  <tabs.Expenses
                    expenses={data.expenses}
                    monthlyCabinetExpenses={
                      data.federalDeputyMonthlyCabinetExpenses
                    }
                    changeDateHandler={handleDateChange}
                    isLoading={isLoading}
                    openExpenseHandler={handleOpenExpense}
                  />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="gabinete" title="Gabinete" className="">
              <Card>
                <CardBody>
                  <tabs.Cabinet cabinetData={data.cabinetData} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="videos" title="Videos">
              <Card>
                <CardBody>
                  <tabs.Videos
                    speechesData={data?.speechesData}
                    federalDeputyName={
                      data?.federalDeputyBaseInfo?.ultimoStatus?.nome
                    }
                  />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="informacoes-pessoais" title="Informações pessoais">
              <Card>
                <CardBody>
                  <tabs.PersonalInfo
                    federalDeputyBaseInfo={data?.federalDeputyBaseInfo}
                  />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="historico-profissional" title="Histórico profissional">
              <Card>
                <CardBody>
                  <tabs.WorkHistory
                    federalDeputyWorkHistory={data?.federalDeputyWorkHistory}
                  />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="contato" title="Contato">
              <Card>
                <CardBody>
                  <tabs.Contact
                    federalDeputyBaseInfo={data?.federalDeputyBaseInfo}
                  />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
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
