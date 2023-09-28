"use client";

import Search from "./Search";
import PartyButton from "./PartyButton";
import StatesButton from "./StatesButton";

export default function Header({
  party,
  setParty,
  state,
  setState,
  numberOfDeputies,
  searchValue,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <Search value={searchValue} onSearchChange={onSearchChange} />

        <div className="flex gap-3">
          <PartyButton party={party} setParty={setParty} />

          <StatesButton state={state} setState={setState} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-default-400 text-small">
          Total de {numberOfDeputies} parlamentares{" "}
          {party !== "all" ? `do ${party.currentKey}` : ""}
          {state !== "all" ? `/${state.currentKey}` : " no Brasil"}
        </span>
      </div>
    </div>
  );
}
