import type { Dispatch, SetStateAction } from "react";
import type { Selection } from "@nextui-org/react";
import type { Uf } from "@/interfaces";

import { startTransition } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { ChevronDownIcon } from "@/assets/ChevronDownIcon";
import { ufs } from "@/utils/data";

interface Props {
  state: Selection;
  setState: Dispatch<SetStateAction<Selection>>;
}

export default function StatesButton({ state, setState }: Props) {
  return (
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
        selectedKeys={state}
        className="overflow-y-auto max-h-96"
        defaultSelectedKeys="all"
        selectionMode="single"
        onSelectionChange={(e: any) => {
          if (e.currentKey === "all") {
            return startTransition(() => setState("all"));
          } else {
            return startTransition(() => setState(e));
          }
        }}
      >
        {buttonOptions.map((item) => (
          <DropdownItem key={item.uid} className="capitalize">
            {item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

const buttonOptions: Uf[] = [{ name: "TODOS", uid: "all" }, ...ufs];
