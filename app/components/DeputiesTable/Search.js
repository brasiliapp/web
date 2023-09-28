"use client";

import { Input } from "@nextui-org/react";

import { SearchIcon } from "@/assets/SearchIcon";

export default function Search({ filterValue, onSearchChange }) {
  return (
    <Input
      isClearable
      className="w-full sm:max-w-[44%]"
      placeholder="Digite o nome do deputado federal"
      startContent={<SearchIcon />}
      value={filterValue}
      onClear={() => onSearchChange("")}
      onValueChange={onSearchChange}
    />
  );
}
