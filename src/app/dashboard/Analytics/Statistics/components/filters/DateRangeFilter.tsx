"use client";

import { useState } from "react";
import { addDays, addMonths, format, startOfMonth, endOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/buttons/button";

interface DateRangeFilterProps {
    onApply?: (range: { fechaInicio?: string; fechaFin?: string }) => void;
}

type FilterMode = "fechas" | "meses";

const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onApply }) => {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    const [mode, setMode] = useState<FilterMode>("fechas");
    const [selectedMonthRange, setSelectedMonthRange] = useState<{ from: number | null; to: number | null }>({
        from: null,
        to: null,
    });
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const currentYear = new Date().getFullYear();

    const presets = [
        { label: "7 días", range: { from: addDays(new Date(), -7), to: new Date() } },
        { label: "30 días", range: { from: addDays(new Date(), -30), to: new Date() } },
        { label: "12 meses", range: { from: addMonths(new Date(), -12), to: new Date() } },
    ];

    const handleMonthClick = (monthIndex: number) => {
        if (selectedMonthRange.from === null) {
            setSelectedMonthRange({ from: monthIndex, to: null });
        } else if (selectedMonthRange.to === null) {
            if (monthIndex < selectedMonthRange.from) {
                setSelectedMonthRange({ from: monthIndex, to: selectedMonthRange.from });
            } else {
                setSelectedMonthRange({ from: selectedMonthRange.from, to: monthIndex });
            }
        } else {
            setSelectedMonthRange({ from: monthIndex, to: null });
        }
    };

    const isMonthInRange = (monthIndex: number) => {
        if (selectedMonthRange.from === null) return false;
        if (selectedMonthRange.to === null) return monthIndex === selectedMonthRange.from;
        return monthIndex >= selectedMonthRange.from && monthIndex <= selectedMonthRange.to;
    };

    const isMonthStart = (monthIndex: number) => selectedMonthRange.from === monthIndex;
    const isMonthEnd = (monthIndex: number) => selectedMonthRange.to === monthIndex;

    const apply = () => {
        if (mode === "meses" && selectedMonthRange.from !== null) {
            const fromMonth = selectedMonthRange.from;
            const toMonth = selectedMonthRange.to ?? selectedMonthRange.from;

            const fromDate = startOfMonth(new Date(Date.UTC(selectedYear, fromMonth, 1)));
            const toDate = endOfMonth(new Date(Date.UTC(selectedYear, toMonth, 1)));

            onApply?.({
                fechaInicio: fromDate.toISOString(),
                fechaFin: toDate.toISOString(),
            });
        } else {
            onApply?.({
                fechaInicio: range?.from?.toISOString(),
                fechaFin: range?.to?.toISOString(),
            });
        }

        setOpen(false);
    };

    const clear = () => {
        setRange(undefined);
        setSelectedMonthRange({ from: null, to: null });
    };

    const getDisplayText = () => {
        if (mode === "meses" && selectedMonthRange.from !== null) {
            const fromMonth = months[selectedMonthRange.from];
            const toMonth = selectedMonthRange.to !== null ? months[selectedMonthRange.to] : fromMonth;
            return `${fromMonth} - ${toMonth} ${selectedYear}`;
        }
        if (range?.from && range?.to) {
            return `${format(range.from, "dd MMM", { locale: es })} - ${format(range.to, "dd MMM yyyy", { locale: es })}`;
        }
        return "Filtrar por fecha";
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="secondary" className="gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {getDisplayText()}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-auto bg-card border border-border rounded-xl shadow-xl" align="start">
                <div className="flex">
                    {/* LEFT SIDE — MODE TABS & PRESETS */}
                    <div className="w-48 border-r border-border p-4 flex flex-col gap-4">
                        {/* Mode Tabs */}
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => setMode("fechas")}
                                className={cn(
                                    "text-left px-3 py-2 rounded-lg transition-colors font-medium",
                                    mode === "fechas"
                                        ? "bg-body text-foreground"
                                        : "text-foreground hover:bg-accent"
                                )}
                            >
                                Fechas
                            </button>
                            <button
                                onClick={() => setMode("meses")}
                                className={cn(
                                    "text-left px-3 py-2 rounded-lg transition-colors font-medium",
                                    mode === "meses"
                                        ? "bg-body text-foreground"
                                        : "text-foreground hover:bg-accent"
                                )}
                            >
                                Meses
                            </button>
                        </div>

                        {/* Presets */}
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                Rápidos
                            </h3>
                            {presets.map((p) => (
                                <button
                                    key={p.label}
                                    onClick={() => {
                                        setMode("fechas");
                                        setRange(p.range);
                                    }}
                                    className="text-left px-3 py-2 rounded-lg text-foreground hover:bg-accent transition-colors text-sm"
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>

                        <div className="mt-auto">
                            <Button
                                variant="ghost"
                                onClick={clear}
                                className="w-full justify-start text-muted-foreground hover:text-foreground"
                            >
                                Limpiar
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT SIDE — CALENDAR OR MONTHS */}
                    <div className="p-4">
                        {mode === "fechas" ? (
                            <Calendar
                                mode="range"
                                numberOfMonths={2}
                                selected={range}
                                onSelect={(newRange) => setRange(newRange || { from: undefined, to: undefined })}
                                locale={es}
                                className="pointer-events-auto"
                            />
                        ) : (
                            <div className="w-[400px]">
                                {/* Year Selector */}
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        onClick={() => setSelectedYear(y => y - 1)}
                                        className="p-2 rounded-lg hover:bg-accent transition-colors"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <h3 className="text-sm font-semibold text-foreground">
                                        {selectedYear}
                                    </h3>
                                    <button
                                        onClick={() => setSelectedYear(y => Math.min(y + 1, currentYear))}
                                        disabled={selectedYear >= currentYear}
                                        className={cn(
                                            "p-2 rounded-lg transition-colors",
                                            selectedYear >= currentYear
                                                ? "opacity-30 cursor-not-allowed"
                                                : "hover:bg-accent"
                                        )}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-4 gap-2">
                                    {months.map((month, index) => (
                                        <button
                                            key={month}
                                            onClick={() => handleMonthClick(index)}
                                            className={cn(
                                                "px-3 py-3 rounded-lg text-sm font-medium transition-all",
                                                isMonthInRange(index)
                                                    ? isMonthStart(index) || isMonthEnd(index)
                                                        ? "bg-body text-foreground"
                                                        : "bg-body/30 text-foreground"
                                                    : "text-foreground hover:bg-accent"
                                            )}
                                        >
                                            {month.slice(0, 3)}
                                        </button>
                                    ))}
                                </div>
                                {selectedMonthRange.from !== null && (
                                    <p className="mt-4 text-sm text-muted-foreground text-center">
                                        {selectedMonthRange.to === null
                                            ? `Selecciona el mes final (desde ${months[selectedMonthRange.from]})`
                                            : `${months[selectedMonthRange.from]} - ${months[selectedMonthRange.to]} ${selectedYear}`}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border">
                            <Button onClick={apply} variant="default">
                                Aplicar
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
