import React from "react";

import Head from "next/head";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
} from "@nextui-org/react";

import { Link } from "@nextui-org/react";
import axios from "axios";
import { SearchIcon } from "../../assets/SearchIcon";
import { ChevronDownIcon } from "../../assets/ChevronDownIcon";
import { columns, uf, parties, deputados } from "../../utils/data";
import { capitalize, slugify } from "../../utils";
import { defaultSeoConfig } from "../../seoConfig";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "nome",
  "partido",
  "email",
  "estado",
  "actions",
];

export async function getStaticProps() {
  let data = null;
  try {
    const deputados = await axios.get(
      `https://pub-091f86d833a34a79891548ea8b1cb0ac.r2.dev/deputados.json`
    );
    data = deputados.data.filter((deputado) => deputado.email !== null);
  } catch (error) {
    data = [];
    console.log("fail to get deputados", error);
  }
  return { props: { data } };
}

export default function Index({ data }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [deputies, setDeputies] = React.useState(data || []);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [stateFilter, setStateFilter] = React.useState("all");
  const [partyFilter, setPartyFilter] = React.useState("all");

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...deputies];
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.nome.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (stateFilter !== "all") {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(stateFilter).includes(user.siglaUf)
      );
    }

    if (partyFilter !== "all") {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(partyFilter).includes(user.siglaPartido)
      );
    }

    return filteredUsers;
  }, [deputies, filterValue, stateFilter, partyFilter]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "nome":
        return (
          <a
            href={`/deputado-federal/${slugify(user.nome).concat(
              `-${user.id}`
            )}`}
            as={Link}
            color="dark"
            className="text-black-500"
          >
            <User
              avatarProps={{
                classNames: { img: "object-fill" },
                className: "w-11 h-11",
                radius: "sm",
                src: user?.urlFoto
              }}
              description={user.nome}
              name={cellValue}
              size="lg"
            >
              {user.nome}
            </User>
          </a>
        );
      case "partido":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <a
              href={`/deputado-federal/${slugify(user.nome).concat(
                `-${user.id}`
              )}`}
              as={Link}
              color="dark"
              className="text-black-500"
            >
              <p className="text-bold text-tiny capitalize text-default-400">
                {user.siglaPartido}
              </p>
            </a>
          </div>
        );
      case "estado":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <a
              href={`/deputado-federal/${slugify(user.nome).concat(
                `-${user.id}`
              )}`}
              as={Link}
              color="dark"
              className="text-black-500"
            >
              <p className="text-bold text-tiny capitalize text-default-400">
                {user.siglaUf}
              </p>
            </a>
          </div>
        );

      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-start items-start gap-2">
            <Button
              href={`/deputado-federal/${slugify(user.nome).concat(
                `-${user.id}`
              )}`}
              as={Link}
              size="sm"
              color="dark"
              className="text-black-500"
              endContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Ver
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {}, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Digite o nome do deputado federal"
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Partidos
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="state"
                disallowEmptySelection={true}
                closeOnSelect={false}
                selectedKeys={partyFilter}
                defaultSelectedKeys="all"
                selectionMode="single"
                onSelectionChange={(e) => {
                  if (e.currentKey === "all") {
                    return setPartyFilter("all");
                  } else {
                    return setPartyFilter(e);
                  }
                }}
              >
                <DropdownItem key="all" className="capitalize">
                  TODOS
                </DropdownItem>
                {parties.map((item) => (
                  <DropdownItem key={item.uid} className="capitalize">
                    {capitalize(item.uid)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Estados
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="state"
                disallowEmptySelection={true}
                closeOnSelect={false}
                selectedKeys={stateFilter}
                className="max-h-96	overflow-y-auto	"
                defaultSelectedKeys="all"
                selectionMode="single"
                onSelectionChange={(e) => {
                  if (e.currentKey === "all") {
                    return setStateFilter("all");
                  } else {
                    return setStateFilter(e);
                  }
                }}
              >
                <DropdownItem key="all" className="capitalize">
                  TODOS
                </DropdownItem>
                {uf.map((item) => (
                  <DropdownItem key={item.uid} className="capitalize">
                    {capitalize(item.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de {filteredItems.length} parlamentares{" "}
            {partyFilter !== "all" ? `do ${partyFilter.currentKey}` : ""}
            {stateFilter !== "all"
              ? `/${stateFilter.currentKey}`
              : " no Brasil"}
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    stateFilter,
    partyFilter,
    visibleColumns,
    onRowsPerPageChange,
    deputies.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <span className="text-small text-default-400">
          Criado com amor por brasileiros.
        </span>
      </div>
    );
  }, [selectedKeys, hasSearchFilter]);

  const title = "BrasiliApp 2023 - Gastos dos 558 deputados federais";
  const description =
    "No BrasiliApp é fácil de você acompanhar e entender como os deputados federais tem gasto o dinheiro da cota parlamentar.";

  return (
    <>
      <Head>
        <title>{title || defaultSeoConfig.title}</title>
        <meta
          name="description"
          content={description || defaultSeoConfig.description}
        />
        <meta property="og:title" content={title || defaultSeoConfig.title} />
        <meta
          property="og:description"
          content={description || defaultSeoConfig.description}
        />
        <meta
          property="og:image"
          content={
            "https://brasiliapp.com.br/logo-brasiliapp.png" ||
            defaultSeoConfig.imageUrl
          }
        />
        <link
          rel="canonical"
          href={`https://brasiliapp.com.br/deputado-federal`}
        />
      </Head>
      <div className="container mx-auto text-center mt-5 px-5">
        <h2 className="text-4xl font-bold mb-4 text-gray-700">A mudança começa por aqui</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Se você não acompanhar e não cobrar essas pessoas que estão aqui em baixo, o Brasil nunca vai mudar.
        </p>
      </div>
      <div className="flex">
        <Table
          aria-label="Deputados Table"
          isHeaderSticky={true}
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          className="my-3 d-flex "
          topContent={topContent}
          topContentPlacement="inside"
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={"Nenhum deputado encontrado"}
            items={filteredItems}
          >
            {(item) => (
              <TableRow key={item.id} onClick={(e) => console.log(e)}>
                {(columnKey) => (
                  <TableCell className={columnKey === "actions" && "px-0"}>
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
