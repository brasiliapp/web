import { React, useState, useEffect, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

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
  Tooltip,
  Button,
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
      <footer className="bg-gray-100 p-10 md:mt-3 z-0 text-gray-700 flex flex-col align-center justify-center relative justify-between gap-4 bg-content1 md:rounded-large sm:rounded-none  w-full mb-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Acompanhe e Compartilhe</h2>
          <Tooltip content="Siga-nos no Instagram">
            <Button
              href="https://www.instagram.com/obrasiliapp"
              as={Link}
              target="_blank"
              isIconOnly
              color="foregound"
              variant="flat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Button>
          </Tooltip>
          <Tooltip content="Siga-nos no Twitter (X)">
            <Button
              href="https://twitter.com/brasiliapp"
              as={Link}
              target="_blank"
              isIconOnly
              color="foregound"
              variant="flat"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                ></path>
              </svg>
            </Button>
          </Tooltip>
          <p className="text-lg mb-8 max-w-2xl mx-auto mt-16">
            Aos poucos todos os códigos e scripts utilizados para construir o
            BrasiliApp serão disponibilizados no GitHub, de forma aberta e
            pública para poder ser audidato, copiado ou estudado.
          </p>
          <Link
            href="https://github.com/brasiliapp"
            className="bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 rounded text-lg font-semibold transition duration-300 ease-in-out inline-flex items-center"
            title="Acesse o github do BrasiliApp"
            target="_blank"
          >
            <div className="flex flex-col">
              <span className="text-xs block font-normal">
                github.com/brasiliapp
              </span>
            </div>
          </Link>
          <Link
            href="https://discord.com/invite/Udb7ZTac9F"
            className="bg-indigo-500 ml-4 hover:bg-indigo-400 text-white py-2 px-4 rounded text-lg font-semibold transition duration-300 ease-in-out inline-flex items-center"
            title="Acesse o discord do BrasiliApp"
            target="_blank"
          >
            <div className="flex flex-col">
              <span className="text-xs block font-normal">Discord</span>
            </div>
          </Link>
        </div>
      </footer>
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
