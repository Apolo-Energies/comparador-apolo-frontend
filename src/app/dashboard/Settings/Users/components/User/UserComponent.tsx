"use client";
import React, { useState } from "react";
import { HeaderUser } from "../Header/HeaderUser";
import { TableUsers } from "../Table/TableUsers";

export const UserComponent = () => {
  const [filters, setFilters] = useState({
    nombre: "",
    email: "",
    role: "",
  });
  return (
    <div className="shadow-sm overflow-hidden">
      <HeaderUser filters={filters} setFilters={setFilters} borderBottom={false} roundedBottomLeft={false} roundedBottomRight={false} />
      <TableUsers filters={filters} />
    </div>
  );
};
