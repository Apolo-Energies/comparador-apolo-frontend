"use client"
import { Button } from '@/components/buttons/button';
import { InputSearch } from '@/components/Inputs/InputSearch';
import React, { useState } from 'react';
import { getSipsData } from '@/app/services/SipsService/sips.service';
import { SipsPS, SipsRowconsumption } from '../interface/sips';
import { getLast12MonthsPeriodSummary, getLast12MonthsTrend, getMonthlyStackedChartData } from '@/utils/format-data/summary';
import { DonutChart } from './graphics/DonutChart';
import { HorizontalStackedBarChart } from './graphics/HorizontalStackedBarChart';
import { MonthlyStackedChart } from './graphics/MonthlyStackedChart';
import { SipsInfoCard } from './cards/SipsInfoCard';

export const Sips = () => {
    const [cups, setCups] = useState('');
    const [consumos, setConsumos] = useState<SipsRowconsumption[]>([]);
    const [psData, setPsData] = useState<SipsPS | null>(null);

    const [summary, setSummary] = useState<any>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [monthlyChart, setMonthlyChart] = useState<any[]>([]);

    const handleConsultar = async () => {
        if (!cups) {
            setError("Ingrese un CUPS válido");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await getSipsData(cups);
            if (response.isSuccess) {
                const { ps, consumos } = response.result;
                setPsData(ps);
                setConsumos(consumos)

                const { periods, totalFormatted } = getLast12MonthsPeriodSummary(consumos);
                const trend = getLast12MonthsTrend(consumos);
                console.log("trend", trend)
                setSummary({
                    donutData: periods,
                    donutTotal: totalFormatted,
                    trend
                });
                const monthly = getMonthlyStackedChartData(consumos);
                setMonthlyChart(monthly);

            } else {
                setError(response.displayMessage || "Error al obtener datos");
            }
        } catch (err) {
            console.error(err);
            setError("Error desconocido");
        } finally {
            setLoading(false);
        }
    };
    const handleExportar = () => {
        console.log('Exportar datos:');
        // Aquí iría la lógica para exportar (CSV, Excel, PDF, etc.)
    };

    const handleClearSips = () => {
        setPsData(null);
        setConsumos([]);
        setSummary(null);
        setMonthlyChart([]);
    };

    console.log("Ps data :", psData)

    return (
        <>
            {!psData ? (
                <div className="mb-6 bg-card rounded-lg border border-border p-6">
                    <p className="text-lg font-semibold mb-2">Consultas SIPS</p>
                    <div className="flex flex-col md:flex-row md:items-end gap-4">
                        <div className="w-full max-w-xl">
                            <InputSearch
                                label="CUPS"
                                placeholder="Ingrese CUPS"
                                value={cups}
                                onChange={setCups}
                                type="text"
                                error={error || undefined}
                            />
                        </div>

                        <div className="flex gap-2 mt-4 md:mt-0">
                            <Button onClick={handleConsultar} disabled={loading} size="sm" className="h-10">
                                {loading ? 'Consultando...' : 'Consultar'}
                            </Button>
                            <Button onClick={handleExportar} disabled={!consumos.length} size="sm" className="h-10">
                                Exportar
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <SipsInfoCard
                    psData={psData}
                    onExport={handleExportar}
                    onComparativa={() => console.log("Comparativa")}
                    onClear={handleClearSips}  
                />
            )}

            {summary && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                        <DonutChart
                            title="Consumo Anual"
                            value={
                                summary
                                    ? `${summary.donutTotal.toLocaleString()} kWh`
                                    : "0 kWh"
                            }
                            data={summary?.donutData || []}
                            trend={summary.trend} 
                        />

                        <HorizontalStackedBarChart
                            title="Potencias contratadas"
                            data={[
                                { label: "P1", values: [(psData?.potenciasContratadasEnWP1 ?? 0) / 1000] },
                                { label: "P2", values: [(psData?.potenciasContratadasEnWP2 ?? 0) / 1000] },
                                { label: "P3", values: [(psData?.potenciasContratadasEnWP3 ?? 0) / 1000] },
                                { label: "P4", values: [(psData?.potenciasContratadasEnWP4 ?? 0) / 1000] },
                                { label: "P5", values: [(psData?.potenciasContratadasEnWP5 ?? 0) / 1000] },
                                { label: "P6", values: [(psData?.potenciasContratadasEnWP6 ?? 0) / 1000] },
                            ]}
                        />

                    </div>
                    <div className="mb-6">
                        <MonthlyStackedChart
                            title="Consumo Energético Mensual"
                            data={monthlyChart}
                        />
                    </div>
                </>
            )}

        </>
    );
};