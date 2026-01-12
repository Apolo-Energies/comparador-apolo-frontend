"use client";

import React, { useState } from 'react'
import { HeaderContract } from './Header/HeaderContract';
import { TableContract } from './Table/TableContract';

export const ContracCollabComponent = () => {
    const [filters, setFilters] = useState({
        nombre: "",
        email: "",
        role: "",
    });
    return (
        <div className="shadow-sm overflow-hidden">
            <HeaderContract filters={filters} setFilters={setFilters} borderBottom={false} roundedBottomLeft={false} roundedBottomRight={false} />
            <TableContract filters={filters} />
        </div>
    );
}
