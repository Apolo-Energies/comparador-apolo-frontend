'use client';

import React, { useState } from "react";
import { HeaderHistorial } from "../Header/HeaderHistorial";
import { TableHistorial } from "../Table/TableHistorial";
import { HistorialFilters } from "../../interfaces/historial-filter";

export const HistorialComponent = () => {
  const [filters, setFilters] = useState<HistorialFilters>({});

  const handleSearch = (newFilters?: HistorialFilters) => {
    // Si pasamos filtros vacios, la URL del endpoint no tendra query params
    setFilters({ ...newFilters, page: 1 });
  };

  return (
    <div className="shadow-sm overflow-hidden">
      <HeaderHistorial
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        borderBottom={false}
        roundedBottomLeft={false}
        roundedBottomRight={false}
      />

      <TableHistorial filters={filters} />
    </div>
  );
};
