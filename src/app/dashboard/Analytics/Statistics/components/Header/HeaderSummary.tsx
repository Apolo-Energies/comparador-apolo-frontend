import { Button } from '@/components/buttons/button';
import { InputSearch } from '@/components/Inputs/InputSearch';
import { FilterIcon } from '@/incons/FilterIcon';
import { SearchIcon } from '@/incons/SearchIcon';
import { X } from 'lucide-react';
import React from 'react'

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

export const HeaderSummary = ({
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

            <div className="ml-auto w-full md:w-full">

                <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-3">

                    <div className="w-full md:w-auto">
                        <InputSearch
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={filters.nombre}
                            onChange={(e) => setFilters({ ...filters, nombre: e })}
                            icon={SearchIcon}
                            className="w-full md:w-96"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:gap-3">

                        <Button variant="secondary" size="md" className="w-full md:w-auto">
                            <FilterIcon />
                            Filtrar
                        </Button>

                        <Button variant="secondary" size="md" className="w-full md:w-auto">
                            <X size={14} />
                            Ordenar
                        </Button>

                        <Button
                            variant="secondary"
                            size="md"
                            className="col-span-2 w-full md:w-auto"
                        >
                            <X size={14} />
                            Exportar
                        </Button>

                    </div>

                </div>

            </div>

        </div>
    );

};
