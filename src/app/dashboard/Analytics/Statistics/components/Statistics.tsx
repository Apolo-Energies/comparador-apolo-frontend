"use client";

import React, { useEffect, useState } from "react";
import { MetricCard } from "@/components/cards/MetricCard";
import { DailySummary, MonthlySummary, Summary } from '../../HistorialComparador/interfaces/historila-comparador';
import { getDailySummary, getMotnhlySummary, getSummary } from "@/app/services/HistorialService/historial.service";
import { useSession } from "next-auth/react";
import { BarChartVertical } from "./graphics/BarChartVertical";
import { HistorialSummaryComponent } from "./user/HistorialSummaryComponent";
import { Button } from "@/components/buttons/button";
import { DownloadIcon2 } from "@/incons/DownloadIcon2";
import { DateRangeFilter } from "./filters/DateRangeFilter";

export const Statistics = () => {
    const [summary, setSummary] = useState<Summary>()
    const [dailySummary, setDailySummary] = useState<DailySummary[]>([])
    const [monthlySummary, setmonthlySummary] = useState<MonthlySummary[]>([])

    const [filters, setFilters] = useState<{ fechaInicio?: string; fechaFin?: string }>({});

    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = session?.user?.token;
                if (!token) return;

                const [generalRes, dailyRes, monthlyRes] = await Promise.all([
                    getSummary(token, filters),
                    getDailySummary(token, filters),
                    getMotnhlySummary(token, filters)
                ]);

                if (monthlyRes.status === 200) {
                    setSummary(generalRes.result);
                }

                if (dailyRes.status === 200) {
                    setDailySummary(dailyRes.result);
                }
                if (dailyRes.status === 200) {
                    setmonthlySummary(monthlyRes.result);
                }

            } catch (error) {
                console.error("Error cargando estadísticas:", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, [filters, session?.user?.token]);

    console.log("rango selecionado: ", filters)

    return (
        <div className="">
            <div className="flex flex-row w-full mb-6 items-center justify-between">
                <DateRangeFilter onApply={setFilters} />

                <Button variant="secondary" >
                    <DownloadIcon2 />
                    Descaragr reporte
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <MetricCard
                    number={8}
                    title="Consumo total presupuestado"
                    value={summary ? summary.totalAnnualConsumption.toLocaleString() : 'Cargando...'}
                />
                <MetricCard
                    number={-10}
                    title="Numero de CUPS presupuestado"
                    value={summary ? summary.totalCUPS.toLocaleString() : 'Cargando...'}
                />

                <MetricCard
                    number={2}
                    title="Usuarios Activos"
                    value={summary ? summary.totalUsersActive.toLocaleString() : 'Cargando...'}
                />
            </div>

            <div className="mb-6">
                <BarChartVertical
                    title="Presupuestos Por Día"
                    mode="daily"
                    data={dailySummary}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6">
                <BarChartVertical
                    title="Presupuestos Por Mes"
                    mode="monthly"
                    data={monthlySummary || []}
                />

            </div>

            <div className="grid grid-cols-1 gap-6 mb-6">
                <HistorialSummaryComponent summary={summary?.data || []} />

            </div>

        </div>
    );
};
