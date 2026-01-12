import React, { useState } from "react";
import { ModalUser } from "../Modals/ModalAddUser";
import { InputSearch } from "@/components/Inputs/InputSearch";
import { SelectSearch } from "@/components/Selects/SelectSearch";
import { Button } from "@/components/buttons/button";

import { SearchIcon } from "@/incons/SearchIcon";
import { FilterIcon } from "@/incons/FilterIcon";
import { StarIcon } from "@/incons/StartIcon";

interface Props {
  filters: {
    nombre: string;
    email: string;
    role: string;
  };
  setFilters: (filters: { nombre: string; email: string; role: string }) => void;

  borderTop?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;

  roundedTopLeft?: boolean;
  roundedTopRight?: boolean;
  roundedBottomLeft?: boolean;
  roundedBottomRight?: boolean;
}

export const HeaderUser = ({
  filters,
  setFilters,

  borderTop = true,
  borderBottom = true,
  borderLeft = true,
  borderRight = true,

  roundedTopLeft = true,
  roundedTopRight = true,
  roundedBottomLeft = true,
  roundedBottomRight = true,
}: Props) => {
  const [open, setOpen] = useState(false);

  const openModalFunction = () => setOpen(true);

  const wrapperClasses = [
    "bg-card shadow-sm p-6",

    borderTop ? "border-t border-border" : "",
    borderBottom ? "border-b border-border" : "",
    borderLeft ? "border-l border-border" : "",
    borderRight ? "border-r border-border" : "",

    roundedTopLeft ? "rounded-tl-[8px]" : "",
    roundedTopRight ? "rounded-tr-[8px]" : "",
    roundedBottomLeft ? "rounded-bl-[8px]" : "",
    roundedBottomRight ? "rounded-br-[8px]" : "",
  ].join(" ");

  return (
    <div className={wrapperClasses}>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-2 items-end">
        <InputSearch
          type="text"
          placeholder="Buscar por nombre..."
          value={filters.nombre}
          onChange={(e) => setFilters({ ...filters, nombre: e })}
          icon={SearchIcon}
        />

        <InputSearch
          type="text"
          placeholder="Buscar por email..."
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e })}
          icon={SearchIcon}
        />

        <SelectSearch
          value={filters.role}
          onChange={(val) => setFilters({ ...filters, role: val })}
          icon={FilterIcon}
          options={[
            { value: "", label: "Todos los roles" },
            { value: "1", label: "Master" },
            { value: "2", label: "Colaborador" },
          ]}
        />

        <div className="flex md:justify-end">
          <Button variant="default" size="md" onClick={openModalFunction}>
            <StarIcon size={18} />
            Agregar Usuario
          </Button>
        </div>
      </div>

      {/* <div className="flex justify-between items-center mb-6">
        <Button variant="default" size="md" onClick={openModalFunction} className="mr-auto">
          <StarIcon size={18} />
          Agregar Usuario
        </Button>
      </div> */}

      <ModalUser open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
