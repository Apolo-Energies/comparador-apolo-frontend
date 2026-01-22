"use client";
import React, { useState } from "react";
import { HeaderUser } from "../Header/HeaderUser";
import { TableUsers } from "../Table/TableUsers";
import { UserFilter } from "../../interfaces/user-filters";

export const UserComponent = () => {
  const [filters, setFilters] = useState<UserFilter>({});

  const handleSearch = (newFilters?: UserFilter) => {
      // Si pasamos filtros vacios, la URL del endpoint no tendra query params
      setFilters({ ...newFilters, page: 1 });
    };

  return (
    <div className="shadow-sm overflow-hidden">
      <HeaderUser filters={filters} setFilters={setFilters} onSearch={handleSearch} borderBottom={false} roundedBottomLeft={false} roundedBottomRight={false} />
      <TableUsers filters={filters} />
    </div>
  );
};
