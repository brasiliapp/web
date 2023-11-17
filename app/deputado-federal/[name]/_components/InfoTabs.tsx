"use client";

import type {
  Cabinet,
  Expense,
  FederalDeputy,
  MonthlyExpense,
  Speech,
  WorkHistory,
} from "@/interfaces";

import { Key, useState } from "react";
import { Tab, Tabs, Card, CardBody } from "@nextui-org/react";

import { tabs } from "./tabs";

interface Props {
  expenses: Expense[];
  monthlyCabinetExpense: MonthlyExpense;
  cabinetData: Cabinet;
  speechesData: Speech[];
  baseInfo: FederalDeputy;
  workHistory: WorkHistory[];
}

export function InfoTabs({
  expenses,
  monthlyCabinetExpense,
  cabinetData,
  speechesData,
  baseInfo,
  workHistory,
}: Props) {
  const [selectedTab, setSelectedTab] = useState<Key>("gastos");

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selectedTab}
      onSelectionChange={(key: Key) => setSelectedTab(key)}
    >
      <Tab key="despesas" title="Despesas" className="">
        <Card>
          <CardBody className="px-0 md:px-6 sm:px-4">
            <tabs.Expenses
              expenses={expenses}
              monthlyCabinetExpense={monthlyCabinetExpense}
            />
          </CardBody>
        </Card>
      </Tab>
      <Tab key="gabinete" title="Gabinete" className="">
        <Card>
          <CardBody>
            <tabs.Cabinet cabinetData={cabinetData} />
          </CardBody>
        </Card>
      </Tab>
      <Tab key="videos" title="Videos">
        <Card>
          <CardBody>
            <tabs.Videos
              speechesData={speechesData}
              federalDeputyName={baseInfo?.ultimoStatus?.nome}
            />
          </CardBody>
        </Card>
      </Tab>
      <Tab key="informacoes-pessoais" title="Informações pessoais">
        <Card>
          <CardBody>
            <tabs.PersonalInfo federalDeputyBaseInfo={baseInfo} />
          </CardBody>
        </Card>
      </Tab>
      <Tab key="historico-profissional" title="Histórico profissional">
        <Card>
          <CardBody>
            <tabs.WorkHistory federalDeputyWorkHistory={workHistory} />
          </CardBody>
        </Card>
      </Tab>
      <Tab key="contato" title="Contato">
        <Card>
          <CardBody>
            <tabs.Contact federalDeputyBaseInfo={baseInfo} />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
