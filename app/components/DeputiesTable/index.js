"use client";
import { useState, useMemo, startTransition, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@nextui-org/react";

import Header from "./Header";

import { columns } from "@/utils/data";
import { slugify } from "@/utils";

const INITIAL_VISIBLE_COLUMNS = [
  "nome",
  "partido",
  "email",
  "estado",
  "actions",
];

const headerColumns = columns.filter((column) =>
  INITIAL_VISIBLE_COLUMNS.includes(column.uid)
);

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function DeputiesTable({ deputies }) {
  const [state, setState] = useState("all");
  const [party, setParty] = useState("all");
  const [search, setSearch] = useState("");

  const filteredDeputies = useMemo(() => {
    let result = deputies;

    if (search) {
      result = result.filter(({ nome }) =>
        nome.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (state !== "all") {
      result = result.filter(({ siglaUf }) =>
        Array.from(state).includes(siglaUf)
      );
    }

    if (party !== "all") {
      result = result.filter(({ siglaPartido }) =>
        Array.from(party).includes(siglaPartido)
      );
    }

    return result;
  }, [deputies, search, state, party]);

  function onSearchChange(value) {
    startTransition(() => {
      setSearch(value);
    });
  }

  const renderCell = useCallback((deputy, columnKey) => {
    const cellValue = deputy[columnKey];

    const navigateTo = `/deputado-federal/${slugify(deputy.nome)}-${deputy.id}`;

    switch (columnKey) {
      case "nome":
        return (
          <Link
            color="dark"
            href={navigateTo}
            className="flex items-center gap-4 text-black-500"
          >
            <div className="relative w-8 h-8 overflow-hidden rounded-lg min-w-8 sm:h-11 sm:w-11">
              <Image
                fill
                sizes="50vw"
                src={deputy.urlFoto}
                alt={deputy.nome}
                className="object-fill"
              />
            </div>

            <span className="text-xs sm:text-sm">{deputy.nome}</span>
          </Link>
        );
      case "partido":
        return (
          <div className="flex items-start">
            <Link href={navigateTo} color="dark" className="text-black-500">
              <p className="capitalize text-bold text-tiny text-default-400">
                {deputy.siglaPartido}
              </p>
            </Link>
          </div>
        );
      case "estado":
        return (
          <div className="flex items-start">
            <p className="capitalize text-bold text-small">{cellValue}</p>

            <Link href={navigateTo} color="dark" className="text-black-500">
              <p className="capitalize text-bold text-tiny text-default-400">
                {deputy.siglaUf}
              </p>
            </Link>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[deputy.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-start justify-start gap-2">
            <Button
              href={navigateTo}
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
      case "email":
        return <div className="flex items-start">{cellValue}</div>;
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex">
      <Table
        aria-label="Deputados Table"
        isHeaderSticky={true}
        className="my-3 d-flex"
        topContentPlacement="inside"
        topContent={
          <Header
            party={party}
            setParty={setParty}
            state={state}
            setState={setState}
            numberOfDeputies={filteredDeputies.length}
            searchValue={search}
            onSearchChange={onSearchChange}
          />
        }
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
          items={filteredDeputies}
        >
          {(deputy) => (
            <TableRow key={deputy.id}>
              {(columnKey) => (
                <TableCell className={columnKey === "actions" && "px-0"}>
                  {renderCell(deputy, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
