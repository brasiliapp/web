"use client";
import { useState, useMemo, startTransition, useCallback } from "react";
import {
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import Image from "next/image";

import Header from "./Header";

import { slugify } from "@/utils";


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

  const renderRow = (deputy) => {
    const navigateTo = `/deputado-federal/${slugify(deputy.nome)}-${deputy.id}`;
    return (
      <li key={deputy.nome}>
        <Link href={navigateTo} className="block hover:bg-gray-50">
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center">
              <div className="flex-shrink-0">
                <Image
                  width={50}
                  height={50}
                  src={deputy.urlFoto}
                  alt={deputy.nome}
                  className="h-35 w-18 rounded"
                />
              </div>
              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p className="truncate text-sm font-medium text-gray-700">
                    {deputy.nome}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    <EnvelopeIcon
                      className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="truncate">{deputy.email}</span>
                  </p>
                </div>
                <div className="md:block">
                  <div>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      {deputy.siglaPartido} / {deputy.siglaUf}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </Link>
      </li>
    );
  };

  return (
    <div className="flex">
      <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-hidden rounded-large shadow-small w-full">
        <Header
          party={party}
          setParty={setParty}
          state={state}
          setState={setState}
          numberOfDeputies={filteredDeputies.length}
          searchValue={search}
          onSearchChange={onSearchChange}
        />
        <ul role="list" className="divide-y divide-gray-100">
          {filteredDeputies.map((deputy) => {
            return renderRow(deputy);
          })}
        </ul>
      </div>
    </div>
  );
}
