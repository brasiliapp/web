import { Input } from "@nextui-org/react";

import { SearchIcon } from "@/assets/SearchIcon";

interface Props {
  filterValue: string;
  onSearchChange: (value: string) => void;
}

export default function Search({ filterValue, onSearchChange }: Props) {
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
