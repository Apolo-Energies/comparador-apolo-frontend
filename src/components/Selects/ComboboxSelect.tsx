"use client";

import { useState } from "react";
import { Option } from "./SelectOptions";

interface Props<T extends Option> {
    value: T["id"] | "";
    options: T[];
    placeholder?: string;
    onChange: (value: T["id"]) => void;
    className?: string;
}

export const ComboboxSelect = <T extends Option>({
    value,
    options,
    placeholder = "Seleccionar...",
    onChange,
    className
}: Props<T>) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const filtered = query.length === 0
        ? options
        : options.filter((o) =>
            o.name.toLowerCase().includes(query.toLowerCase())
        );

    const selectedLabel = options.find((o) => o.id === value)?.name ?? "";

    return (
        <div className={`relative ${className}`}>

            <input
                type="text"
                className="w-full border bg-input border-border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
                value={open ? query : selectedLabel}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
            />

            {open && (
                <div className="absolute z-20 w-full bg-card border border-border mt-1 rounded shadow-lg max-h-60 overflow-auto">

                    {filtered.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            No hay resultados
                        </div>
                    ) : (
                        filtered.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                    onChange(opt.id);
                                    setQuery("");
                                    setOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                            >
                                {opt.name}
                            </button>
                        ))
                    )}
                </div>
            )}

            {/* BACKDROP PARA CERRAR */}
            {open && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpen(false)}
                />
            )}
        </div>
    );
};
