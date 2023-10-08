"use client";

import { startTransition } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { ChevronDownIcon } from "@/assets/ChevronDownIcon";

import { capitalize } from "@/utils";
import { parties } from "@/utils/data";

export default function PartyButton({ party, setParty }) {
  return (
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
        selectedKeys={party}
        defaultSelectedKeys="all"
        className="overflow-y-auto max-h-96"
        selectionMode="single"
        onSelectionChange={(e) => {
          if (e.currentKey === "all") {
            return startTransition(() => setParty("all"));
          } else {
            return startTransition(() => setParty(e));
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
  );
}
