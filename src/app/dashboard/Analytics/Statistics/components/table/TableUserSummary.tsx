import React from 'react'
import { Datum } from '../../../HistorialComparador/interfaces/historila-comparador';
import { Column, DataTable } from '@/components/ui/DataTable';
import { ArrowUpDownIcon } from '@/incons/ArrowUpDownIcon';

interface Props {
    summary: Datum[]
}

export const TableUserSummary = ({ summary }: Props) => {

    const columns: Column<Datum>[] = [
        {
            key: "fullName",
            label: "Usuario",
            textColor: "text-foreground",
            headerIcon: <ArrowUpDownIcon />
        },
        {
            key: "email",
            headerIcon: <ArrowUpDownIcon />, label: "Email"
        },
        {
            key: "totalCUPS",
            textColor: "text-foreground",
            headerIcon: <ArrowUpDownIcon />,
            label: "Total CUPS",
            align: "center",
        },

        {
            key: "totalAnnualConsumption",
            headerIcon: <ArrowUpDownIcon />,
            label: "Consumo Anual",
            align: "center",
            render: (item: Datum) => (
                item.totalAnnualConsumption.toLocaleString()
            )
        },
    ];

    return <DataTable
        data={summary}
        columns={columns}
        rowKey="email"
        borderTop={false}
        roundedTopLeft={false}
        roundedBottomRight={false}
    />
};