import { React, useState, useEffect } from "react";
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
  getCurrentDateInfo,
  getGenderSuffix,
  calculateTotal,
  formatMonetaryValue,
  formatCPFCNPJ,
  formatDate,
  formatPhoneNumberDf,
  fetchVideos,
  propertyValuesArray,
} from "../../utils";

import { defaultSeoConfig } from "../../seoConfig";

import api from "@/services/api";

import MonthYear from "@/components/MonthYear";
import ExpenseCategories from "@/components/ExpenseCategories";
import ExpenseItem from "@/components/ExpenseItem";
import ExperienceItem from "@/components/ExperienceItem";
import EventItem from "@/components/EventItem";

import axios from "axios";
import Chart from "@/components/Chart";
import { SpinIcon } from "@/assets/SpinIcon";

export async function getServerSideProps(ctx) {
  const name = ctx.query.name;
  const yearUrl = ctx.query.ano;
  const monthUrl = ctx.query.mes;

  let id = name.split("-");
  id = id[id.length - 1];

  let data = null;

  if (name) {
    const politician = await api.get(`/deputados/${id}`);
    const experience = await api.get(`/deputados/${id}/ocupacoes`);

    //get videos
    try {
      const speeches = await axios.get(
        `https://pub-ef5d1d80d62c44a1a00e2d05a2d5b85c.r2.dev/${name}.json`,
      );
      data = { ...data, speeches: speeches?.data ? speeches?.data : [] };
    } catch (error) {
      console.log("fail to get videos");
    }

    //get gabinete
    try {
      const gabinete = await axios.get(
        `https://pub-bfddf9199db94ff8b19b7d931e548c52.r2.dev/${name}.json`,
      );
      data = { ...data, gabinete: gabinete?.data ? gabinete?.data : [] };
    } catch (error) {
      console.log("fail to get gabinete");
    }

    if (data?.speeches?.length > 0) {
      fetchVideos(data?.speeches);
      try {
        let eventsArray = propertyValuesArray(
          data?.speeches || [],
          "evento_id",
          "number",
        );
        eventsArray = eventsArray.map((id) => `id=${id}`).join("&");
        const events = await api.get(
          `/eventos?${eventsArray}&ordem=ASC&ordenarPor=dataHoraInicio`,
        );
        data = {
          ...data,
          events: events.data,
        };
      } catch (error) {
        console.log("fail to get the documents");
      }
    }

    let monthlyGabineteMoney = null;
    const monthNumber = (new Date().getMonth() + 1).toString().padStart(2, "0");

    if (monthUrl) {
      monthlyGabineteMoney =
        data?.gabinete?.montly_expenses.find(
          (item) => item.month === monthUrl,
        ) || null;
    } else {
      monthlyGabineteMoney = data?.gabinete?.montly_expenses.find(
        (item) => item.month === monthNumber,
      );
    }

    data = {
      ...data,
      politician: politician.data.dados,
      experiences: experience.data.dados,
      monthlyGabineteMoney: monthlyGabineteMoney || null,
    };
  }

  /** Improve SEO titles and descriptions method, make it external as well */

  let seoDates = {};
  if (!yearUrl && !monthUrl) {
    const currentDatesForSeo = getCurrentDateInfo();
    seoDates = {
      month: currentDatesForSeo.longMonth,
      year: currentDatesForSeo.year,
    };
  } else {
    const oldDatesForSeo = new Date(`${monthUrl}-30-${yearUrl}`);
    const oldDateMonth = oldDatesForSeo.toLocaleString("pt-BR", {
      month: "long",
    });

    seoDates = {
      month: oldDateMonth,
      year: yearUrl,
    };
  }

  // Get expenses types
  const expenseTypes = await api.get("/referencias/deputados/tipoDespesa");

  data = {
    ...data,
    expenseTypes: expenseTypes.data.dados,
  };

  const suffix = getGenderSuffix(data?.politician?.sexo);
  const { numericMonth, year } = getCurrentDateInfo(new Date());
  // Get Expenses
  if (!!yearUrl && !!monthUrl) {
    const expenses = await api.get(
      `/deputados/${id}/despesas?idLegislatura=57&ano=${yearUrl}&mes=${monthUrl}`,
    );
    data = {
      ...data,
      expenses: expenses.data.dados,
    };
  } else {
    const singleMonthExpenses = await api.get(
      `/deputados/${id}/despesas?idLegislatura=57&ano=${year}&mes=${numericMonth}`,
    );
    data = {
      ...data,
      expenses: singleMonthExpenses.data.dados || null,
    };
  }

  const total = formatMonetaryValue(
    calculateTotal(data.expenses, "valorLiquido"),
  );

  const title = `Gastos d${suffix} deputad${suffix} Federal
${data?.politician?.ultimoStatus?.nome} você confere aqui no BrasiliApp`;

  const description = `${suffix.toUpperCase()} deputad${suffix} Federal
${data?.politician?.ultimoStatus?.nome} gastou 
${total} em ${seoDates.month} de ${
    seoDates.year
  }, confira aqui como ele usou a cota parlamentar`;

  data = {
    ...data,
    description: description,
    title: title,
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
  }, []);

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
            data?.politician?.ultimoStatus?.urlFoto || defaultSeoConfig.imageUrl
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
            data?.politician?.ultimoStatus?.urlFoto || defaultSeoConfig.imageUrl
          }
        />
        <meta
          name="twitter:url"
          content={`https://brasiliapp.com.br${router.asPath}`}
        />
      </Head>

      <div className="mt-3 z-0 flex flex-col relative justify-between rounded-large w-full">
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
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="">
              <Image
                src={data?.politician?.ultimoStatus?.urlFoto}
                alt={data?.politician?.ultimoStatus?.nome}
                className="w-full h-full rounded-lg shadow-xl object-contain max-w-[180px] max-h-[240px]"
              />
            </div>
            <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0 flex flex-col sm:pr-6 sm:pl-6 flex flex-col sm:pr-6 sm:pl-6">
              <h1 className="text-xl font-semibold">
                Deputad{getGenderSuffix(data?.politician?.sexo)} Federal{" "}
                {data?.politician?.ultimoStatus?.nome}
              </h1>
              <p className="text-gray-600">
                {data?.politician?.nomeCivil} é um
                {data?.politician?.sexo === "F" ? "a" : ""} deputad
                {getGenderSuffix(data?.politician?.sexo)} brasileir
                {getGenderSuffix(data?.politician?.sexo)} pelo partido{" "}
                {data?.politician?.ultimoStatus?.siglaPartido}/
                {data?.politician?.ultimoStatus?.siglaUf}, tem{" "}
                {calculateAge(data?.politician?.dataNascimento)} anos e nasceu
                na cidade de {data?.politician?.municipioNascimento}/
                {data?.politician?.ufNascimento}.
              </p>{" "}
            </div>
          </div>
        </div>
        <Divider className="my-5" />

        <div className="flex w-full flex-col p-0 sm:p-6">
          <Tabs
            aria-label="Options"
            selectedKey={selectTab}
            onSelectionChange={setSelectedTab}
            disabledKeys={["gabinete"]}
          >
            <Tab key="despesas" title="Despesas" className="">
              <Card>
                <CardBody className="px-0 md:px-6 sm:px-4">
                  {data?.expenses?.length > 0 ? (
                    <>
                      <p className="mx-4 text-lg text-center mt-5">Gastou</p>
                      <div className="flex items-center justify-center ">
                        <p className="text-4xl font-bold">
                          {formatMonetaryValue(
                            calculateTotal(data.expenses, "valorLiquido"),
                          )}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center mt-5">
                      <p className="text-4xl font-bold">
                        {formatMonetaryValue(0)}
                      </p>
                    </div>
                  )}
                  <MonthYear onDateChange={handleDateChange} />

                  <Divider className="my-5" />
                  {data?.expenses?.length > 0 && (
                    <ExpenseCategories expenses={data.expenses} expenseTypes={data.expenseTypes} />
                  )}
                  <Divider className="my-5" />

                  {data?.monthlyGabineteMoney && (
                    <div
                      className="bg-yellow-100 mb-5 border-l-4 border-yellow-100 text-yellow-700 p-4 rounded-lg"
                      role="alert"
                    >
                      Além da cota parlamentar foi utilizado{" "}
                      <i>R$ {data?.monthlyGabineteMoney.expense_amount}</i> de{" "}
                      <i> R$ {data?.monthlyGabineteMoney.available_amount}</i>{" "}
                      disponível da verba de gabinete.
                    </div>
                  )}

                  {data?.expenses?.length === 0 && (
                    <small className="text-center">
                      Sem gastos do parlamentar nesse mês
                    </small>
                  )}

                  {data?.expenses?.length > 0 && (
                    <>
                      <ol className="relative border-l border-gray-200 dark:border-gray-700 ">
                        {isLoading ? (
                          <div
                            className="flex flex-1 flex-col items-center justify-center mt-8"
                            role="status"
                          >
                            <SpinIcon />
                            <h2 className="text-1xl font-bold mb-4">
                              Estamos carregando, aguarde um momento.
                            </h2>
                          </div>
                        ) : (
                          data.expenses
                            .sort(
                              (a, b) =>
                                new Date(b.dataDocumento) -
                                new Date(a.dataDocumento),
                            )
                            .map((expense) => {
                              return (
                                <ExpenseItem
                                  key={expense.id}
                                  value={expense.valorLiquido}
                                  date={expense.dataDocumento}
                                  type={expense.tipoDespesa}
                                  supplier={expense.nomeFornecedor}
                                  supplierId={expense.cnpjCpfFornecedor}
                                  document={expense.urlDocumento}
                                  handleOpen={handleOpenExpense}
                                />
                              );
                            })
                        )}
                      </ol>
                    </>
                  )}
                </CardBody>
              </Card>
            </Tab>
            <Tab key="gabinete" title="Gabinete (em breve)" className="">
              <Card>
                <CardBody className="px-8">
                  <p>
                    A verba de gabinete é o valor utilizado como limite para a
                    contratação da equipe de secretários parlamentares dos
                    gabinetes, pessoas que não necessitam ter vínculo com o
                    serviço público e que são escolhidas diretamente pelo
                    deputado para exercerem as atribuições previstas para essa
                    categoria de servidores comissionados.
                  </p>
                  <p className="mt-3">
                    O valor dessa verba é de R$ 111.675,59 por deputado,
                    destina-se a pagar os salários de até 25 secretários
                    parlamentares que trabalham para o mandato, em Brasília ou
                    nos estados.
                  </p>
                  <Chart data={data?.gabinete?.montly_expenses} />

                  <h3>Conheça a equipe de secretários</h3>

                  <div className="w-full p-4 bg-white shadow-lg rounded-lg overflow-x-auto">
                    <div className="hidden md:grid grid-cols-5 gap-4 mb-4 font-bold">
                      <div className="p-2">Nome</div>
                      <div className="p-2">Grupo funcional</div>
                      <div className="p-2">Cargo</div>
                      <div className="p-2">Período de exercício</div>
                      <div className="p-2">Remuneração mensal</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2 ">
                      {data?.gabinete?.active_secretaries?.map((secretary) => {
                        return (
                          <>
                            <div className="col-span-1 p-2 border-b md:border-b-0 border-gray-300">
                              <span className="md:hidden font-bold">
                                Nome:{" "}
                              </span>
                              {secretary?.name}
                            </div>
                            <div className="col-span-1 p-2 border-b md:border-b-0 border-gray-300">
                              <span className="md:hidden font-bold">
                                Grupo funcional:
                              </span>
                              {secretary?.group}
                            </div>
                            <div className="col-span-1 p-2 border-b md:border-b-0 border-gray-300">
                              <span className="md:hidden font-bold">
                                Cargo:{" "}
                              </span>
                              {secretary?.role}
                            </div>
                            <div className="col-span-1 p-2 border-b md:border-b-0 border-gray-300">
                              <span className="md:hidden font-bold">
                                Período de exercício:{" "}
                              </span>{" "}
                              {secretary?.period}
                            </div>
                            <div className="col-span-1 p-2 border-gray-300">
                              <span className="md:hidden font-bold">
                                Remuneração mensal:{" "}
                              </span>
                              Em breve
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="videos" title="Videos">
              <Card>
                <CardBody>
                  {data?.speeches?.length === 0 && (
                    <>
                      <small className="text-start">
                        Não existe vídeos para esse parlamentar
                      </small>
                    </>
                  )}
                  {data?.speeches?.length > 0 && (
                    <>
                      <div
                        className="bg-gray-100 mb-5 border-l-4 border-gray-300 text-dark-700 p-4 rounded-lg"
                        role="alert"
                      >
                        Os vídeos abaixo foram capturados pela página do
                        deputado no site da câmara dos deputados, se não
                        conseguir visualizar aqui clique no link que redireciona
                        para a página da câmara.
                      </div>
                      <ol className="relative border-l border-gray-200 dark:border-gray-700">
                        {data?.speeches.map((speeche) => {
                          return (
                            <EventItem
                              key={speeche.evento_id}
                              id={speeche.evento_id}
                              title={speeche.event_title}
                              date={speeche.date}
                              time={speeche.time}
                              place={speeche.place}
                              videos={speeche.video_links}
                              name={data?.politician?.ultimoStatus?.nome}
                            />
                          );
                        })}
                      </ol>
                    </>
                  )}
                </CardBody>
              </Card>
            </Tab>
            <Tab key="informacoes-pessoais" title="Informações pessoais">
              <Card>
                <CardBody>
                  <ul className="max-w-md max-w-sm md:min-w-400px divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="pb-3 sm:pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Nome civil
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {data?.politician?.nomeCivil}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            CPF
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {formatCPFCNPJ(data?.politician?.cpf)}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Salário
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            R$ 41.650,92 🤯
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Escolaridade
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {data?.politician?.escolaridade}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Data de Nascimento
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {formatDate(data?.politician?.dataNascimento)}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Naturalidade
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {data?.politician?.municipioNascimento}/
                            {data?.politician?.ufNascimento}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="historico-profissional" title="Histórico profissional">
              <Card>
                <CardBody>
                  {data?.experiences?.length > 0 && (
                    <>
                      <ol className=" relative border-l border-gray-200 dark:border-gray-700">
                        {data.experiences.map((experience, index) => {
                          return (
                            <ExperienceItem
                              key={experience.titulo + index}
                              title={experience.titulo}
                              company={experience.entidade}
                              companyUf={experience.entidadeUF}
                              companyCountry={experience.entidadePais}
                              start={experience.anoInicio}
                              end={experience.anoFim}
                            />
                          );
                        })}
                      </ol>
                    </>
                  )}
                </CardBody>
              </Card>
            </Tab>
            <Tab key="contato" title="Contato">
              <Card>
                <CardBody>
                  <ul className="max-w-md max-w-sm md:min-w-400px divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="pb-3 sm:pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            E-mail
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {data?.politician?.ultimoStatus?.email}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Onde encontrar
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400 whitespace-normal">
                            {data?.politician?.ultimoStatus?.gabinete?.andar}°
                            andar, Sala{" "}
                            {data?.politician?.ultimoStatus?.gabinete?.nome} do
                            prédio{" "}
                            {data?.politician?.ultimoStatus?.gabinete?.predio}{" "}
                            na Praça dos Poderes, Brasilia/DF
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Telefone
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {formatPhoneNumberDf(
                                  data?.politician?.ultimoStatus?.gabinete
                                    ?.telefone,
                                )}
                              </p>
                            </div>

                            <a
                              href={`tel:+55${formatPhoneNumberDf(
                                data?.politician?.ultimoStatus?.gabinete?.telefone.replace(
                                  /\D/g,
                                  "",
                                ),
                              )}`}
                              className="flex items-center text-sm bg-success-500 hover:bg-success-700 text-white font py-2 px-4 rounded"
                              title={`Ligue agora para ${data?.politician?.nomeCivil}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="#fff"
                                stroke="#fff"
                                version="1.1"
                                viewBox="0 0 473.806 473.806"
                                xmlSpace="preserve"
                                className="mr-3"
                              >
                                <g>
                                  <path d="M374.456 293.506c-9.7-10.1-21.4-15.5-33.8-15.5-12.3 0-24.1 5.3-34.2 15.4l-31.6 31.5c-2.6-1.4-5.2-2.7-7.7-4-3.6-1.8-7-3.5-9.9-5.3-29.6-18.8-56.5-43.3-82.3-75-12.5-15.8-20.9-29.1-27-42.6 8.2-7.5 15.8-15.3 23.2-22.8 2.8-2.8 5.6-5.7 8.4-8.5 21-21 21-48.2 0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5-6-6.2-12.3-12.6-18.8-18.6-9.7-9.6-21.3-14.7-33.5-14.7s-24 5.1-34 14.7l-.2.2-34 34.3c-12.8 12.8-20.1 28.4-21.7 46.5-2.4 29.2 6.2 56.4 12.8 74.2 16.2 43.7 40.4 84.2 76.5 127.6 43.8 52.3 96.5 93.6 156.7 122.7 23 10.9 53.7 23.8 88 26 2.1.1 4.3.2 6.3.2 23.1 0 42.5-8.3 57.7-24.8.1-.2.3-.3.4-.5 5.2-6.3 11.2-12 17.5-18.1 4.3-4.1 8.7-8.4 13-12.9 9.9-10.3 15.1-22.3 15.1-34.6 0-12.4-5.3-24.3-15.4-34.3l-54.9-55.1zm35.8 105.3c-.1 0-.1.1 0 0-3.9 4.2-7.9 8-12.2 12.2-6.5 6.2-13.1 12.7-19.3 20-10.1 10.8-22 15.9-37.6 15.9-1.5 0-3.1 0-4.6-.1-29.7-1.9-57.3-13.5-78-23.4-56.6-27.4-106.3-66.3-147.6-115.6-34.1-41.1-56.9-79.1-72-119.9-9.3-24.9-12.7-44.3-11.2-62.6 1-11.7 5.5-21.4 13.8-29.7l34.1-34.1c4.9-4.6 10.1-7.1 15.2-7.1 6.3 0 11.4 3.8 14.6 7l.3.3c6.1 5.7 11.9 11.6 18 17.9 3.1 3.2 6.3 6.4 9.5 9.7l27.3 27.3c10.6 10.6 10.6 20.4 0 31-2.9 2.9-5.7 5.8-8.6 8.6-8.4 8.6-16.4 16.6-25.1 24.4-.2.2-.4.3-.5.5-8.6 8.6-7 17-5.2 22.7l.3.9c7.1 17.2 17.1 33.4 32.3 52.7l.1.1c27.6 34 56.7 60.5 88.8 80.8 4.1 2.6 8.3 4.7 12.3 6.7 3.6 1.8 7 3.5 9.9 5.3.4.2.8.5 1.2.7 3.4 1.7 6.6 2.5 9.9 2.5 8.3 0 13.5-5.2 15.2-6.9l34.2-34.2c3.4-3.4 8.8-7.5 15.1-7.5 6.2 0 11.3 3.9 14.4 7.3l.2.2 55.1 55.1c10.3 10.2 10.3 20.7.1 31.3zM256.056 112.706c26.2 4.4 50 16.8 69 35.8s31.3 42.8 35.8 69c1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.4-1.2 12.3-8.2 11.1-15.6-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3 3.7-15.6 11s3.5 14.4 10.9 15.6zM473.256 209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2 3.7-15.5 11-1.2 7.4 3.7 14.3 11.1 15.6 46.6 7.9 89.1 30 122.9 63.7 33.8 33.8 55.8 76.3 63.7 122.9 1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.3-1.1 12.3-8.1 11-15.4z"></path>
                                </g>
                              </svg>
                              Ligue Agora
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Site
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {data?.politician?.urlWebsite
                              ? data?.politician?.urlWebsite
                              : "Não informado"}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Redes sociais
                          </p>
                          {data?.politician?.redeSocial.length === 0 && (
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              Não informado
                            </p>
                          )}

                          {data?.politician?.redeSocial?.map((profile) => {
                            return (
                              <a
                                key={profile.split("?")[0]}
                                href={profile.split("?")[0]}
                                rel="nofollow"
                                target="_blank"
                                className="text-sm text-gray-500 underline truncate dark:text-gray-400"
                                title={`Acesse o perfil: ${data?.politician?.nomeCivil}`}
                              >
                                {profile.split("?")[0]}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
      <section className="bg-gray-100 p-10 md:mt-3 z-0 text-gray-700 flex flex-col align-center justify-center relative justify-between gap-4 bg-content1 md:rounded-large sm:rounded-none  w-full mb-16">
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
      </section>
    </>
  );
}
