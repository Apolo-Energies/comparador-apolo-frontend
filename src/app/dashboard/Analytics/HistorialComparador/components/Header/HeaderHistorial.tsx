import React from "react";
import { InputSearch } from "@/components/Inputs/InputSearch";
import { HistorialFilters } from "../../interfaces/historial-filter";
import { X } from "lucide-react";
import { downloadExcelReport } from "@/app/services/FileService/excel.service";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { useSession } from "next-auth/react";
import { Button } from "@/components/buttons/button";
import { DownloadIcon } from "@/incons/DownloadIcon";
import { FilterIcon } from "@/incons/FilterIcon";
import { SearchIcon } from "@/incons/SearchIcon";

interface Props {
  filters: HistorialFilters;
  setFilters: (filters: HistorialFilters) => void;
  onSearch: (filters?: HistorialFilters) => void;

  borderTop?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
  roundedTopLeft?: boolean;
  roundedTopRight?: boolean;
  roundedBottomLeft?: boolean;
  roundedBottomRight?: boolean;
}

export const HeaderHistorial = ({
  filters,
  setFilters,
  onSearch,
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

  const handleClear = () => {
    setFilters({});
    onSearch({});
  };

  const exportExcel = async () => {
    const token = session?.user?.token;
    if (!token) {
      showAlert("Sin token", "error");
      return;
    }
    try {
      await downloadExcelReport(token);
    } catch (error) {
      showAlert(`${error}`, "error");
      console.error("Error al descargar el Excel:", error);
    }
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <InputSearch
          type="text"
          placeholder="Buscar por usuario..."
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

        <InputSearch
          type="date"
          placeholder="Filtrar por fecha..."
          value={filters.fecha ?? ""}
          onChange={(e) => setFilters({ ...filters, fecha: e })}
        />

        <InputSearch
          type="text"
          placeholder="Buscar por CUPS..."
          value={filters.cups ?? ""}
          onChange={(e) => setFilters({ ...filters, cups: e })}
          icon={SearchIcon}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-2 gap-2">
        <div className="flex gap-2">
          <Button onClick={exportExcel} variant="secondary" size="md">
            <DownloadIcon size={16} />
            Exportar
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onSearch(filters)}
            variant="secondary"
            size="md"
          >
            <FilterIcon />
            Filtrar
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={handleClear}
          >
            <X size={14} />
            Limpiar
          </Button>
        </div>
      </div>

    </div>

  );
};
