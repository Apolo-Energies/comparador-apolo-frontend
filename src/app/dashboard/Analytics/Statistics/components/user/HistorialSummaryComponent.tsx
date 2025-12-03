import React, { useState } from 'react'
import { TableUserSummary } from '../table/TableUserSummary';
import { Datum } from '../../../HistorialComparador/interfaces/historila-comparador';
import { HeaderSummary } from '../Header/HeaderSummary';

interface Props{
    summary: Datum[]
}

export const HistorialSummaryComponent = ({summary}: Props) => {
    const [filters, setFilters] = useState({
        nombre: "",
        email: "",
        role: "",
    });
    return (
        <div className="shadow-sm overflow-hidden">
            <HeaderSummary filters={filters} setFilters={setFilters} borderBottom={false} roundedBottomLeft={false} roundedBottomRight={false} />
            <TableUserSummary summary={summary} />
        </div>
    );
};