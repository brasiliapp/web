import type { Dispatch, SetStateAction } from "react";
import type { Selection } from "@nextui-org/react";

import Search from "./Search";
import PartyButton from "./PartyButton";
import StatesButton from "./StatesButton";

interface Props {
  numberOfDeputies: number;
  onSearchChange: (value: string) => void;
  party: Selection;
  searchValue: string;
  setParty: Dispatch<SetStateAction<Selection>>;
  setState: Dispatch<SetStateAction<Selection>>;
  state: Selection;
}

export default function Header({
  numberOfDeputies,
  onSearchChange,
  party,
  searchValue,
  setParty,
  setState,
  state,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <Search filterValue={searchValue} onSearchChange={onSearchChange} />

        <div className="flex gap-3">
          <PartyButton party={party} setParty={setParty} />

          <StatesButton state={state} setState={setState} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        {numberOfDeputies == 0 ? (
          <span className="text-default-400 text-small">
            Nenhum parlamentar encontrado
          </span>
        ) : (
          <span className="text-default-400 text-small">
            Total de {numberOfDeputies} parlamentares{" "}
            {party !== "all" ? `do ${party?.currentKey}` : ""}
            {state !== "all" ? `/${state?.currentKey}` : " no Brasil"}
          </span>
        )}
      </div>
    </div>
  );
}
