import type { Dispatch, SetStateAction } from "react";
import type { Selection } from "@nextui-org/react";
import type { PoliticalParty } from "@/interfaces";

import { startTransition } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { ChevronDownIcon } from "@/assets/ChevronDownIcon";
import { parties } from "@/utils/data";

interface Props {
  party: Selection;
  setParty: Dispatch<SetStateAction<Selection>>;
}

export default function PartyButton({ party, setParty }: Props) {
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
        onSelectionChange={(e: any) => {
          if (e.currentKey === "all") {
            return startTransition(() => setParty("all"));
          } else {
            return startTransition(() => setParty(e));
          }
        }}
      >
        {buttonOptions.map((item) => (
          <DropdownItem key={item.uid} className="capitalize">
            {item.uid === "all" ? item.name : item.uid}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

const buttonOptions: PoliticalParty[] = [
  { id: -1, uid: "all", name: "TODOS", uri: "" },
  ...parties,
];
