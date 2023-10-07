"use client";

import { useState } from "react";
import { Tab, Tabs, Card, CardBody } from "@nextui-org/react";

import { tabs } from "./tabs";

export function InfoTabs({ data }) {
  const [selectedTab, setSelectedTab] = useState("gastos");

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selectedTab}
      onSelectionChange={setSelectedTab}
    >
      <Tab key="despesas" title="Despesas" className="">
        <Card>
          <CardBody className="px-0 md:px-6 sm:px-4">
            <tabs.Expenses
              expenses={data.expenses}
              monthlyCabinetExpenses={data.federalDeputyMonthlyCabinetExpenses}
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
            <tabs.Contact federalDeputyBaseInfo={data?.federalDeputyBaseInfo} />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
