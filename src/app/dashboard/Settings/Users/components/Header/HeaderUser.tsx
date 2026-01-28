import React, { useState } from "react";
import { ModalUser } from "../Modals/ModalAddUser";
import { InputSearch } from "@/components/Inputs/InputSearch";
import { SelectSearch } from "@/components/Selects/SelectSearch";
import { Button } from "@/components/buttons/button";

import { SearchIcon } from "@/incons/SearchIcon";
import { FilterIcon } from "@/incons/FilterIcon";
import { StarIcon } from "@/incons/StartIcon";
import { DownloadIcon } from "@/incons/DownloadIcon";
import { UserFilter } from "../../interfaces/user-filters";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { useSession } from "next-auth/react";
import { downloadExcelUserReport } from "@/app/services/FileService/excel.service";

interface Props {
  filters: UserFilter;
  setFilters: (filters: UserFilter) => void;

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
  const { showAlert } = useAlertStore();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

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

  const exportExcel = async () => {
    const token = session?.user?.token;
    if (!token) {
      showAlert("Sin token", "error");
      return;
    }
    try {
      await downloadExcelUserReport(token);
    } catch (error) {
      showAlert(`${error}`, "error");
      console.error("Error al descargar el Excel:", error);
    }
  };

  return (
    <div className={wrapperClasses}>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        <InputSearch
          type="text"
          placeholder="Buscar por nombre..."
          value={filters.fullName ?? ""}
          onChange={(e) => setFilters({ ...filters, fullName: e })}
          icon={SearchIcon}
        />

        <InputSearch
          type="text"
          placeholder="Buscar por email..."
          value={filters.email ?? ""}
          onChange={(e) => setFilters({ ...filters, email: e })}
          icon={SearchIcon}
        />

        <SelectSearch
          value={filters.role ?? ""}
          onChange={(val) => setFilters({ ...filters, role: val })}
          icon={FilterIcon}
          options={[
            { value: "", label: "Todos los roles" },
            { value: "Master", label: "Master" },
            { value: "Colaborador", label: "Colaborador" },
          ]}
        />

        <div className="flex gap-2 justify-between md:hidden">
          <Button onClick={exportExcel} variant="secondary" size="md">
            <DownloadIcon size={16} />
            Exportar
          </Button>

          <Button variant="default" size="md" onClick={() => setOpen(true)}>
            <StarIcon size={18} />
            Agregar Usuario
          </Button>
        </div>

        <div className="hidden md:flex justify-end">
          <Button variant="default" size="md" onClick={() => setOpen(true)}>
            <StarIcon size={18} />
            Agregar Usuario
          </Button>
        </div>
      </div>

      <div className="hidden md:flex justify-start mt-4">
        <Button onClick={exportExcel} variant="secondary" size="md">
          <DownloadIcon size={16} />
          Exportar
        </Button>
      </div>

      <ModalUser open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
