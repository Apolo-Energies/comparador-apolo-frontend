"use client"

import { formatNumberShort } from "@/utils/format-data/format-number"
import React from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

export interface MonthlyRow {
    month: string
    P1: number | null
    P2: number | null
    P3: number | null
    P4: number | null
    P5: number | null
    P6: number | null
}

interface Props {
    title: string
    data: MonthlyRow[]
}

export const MonthlyStackedChart = ({ title, data }: Props) => {

    const COLORS = {
        P1: "#7C67F2",
        P2: "#8FDBFF",
        P3: "#FFB86B",
        P4: "#F691A6",
        P5: "#C4C4C4",
        P6: "#999DF8",
    }

    const LEGEND_LABELS: Record<string, string> = {
        P1: "P1",
        P2: "P2",
        P3: "P3",
        P4: "P4",
        P5: "P5",
        P6: "P6",
    }

    return (
        <div className="p-6 bg-card rounded-lg border border-border shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-semibold">{title}</p>

                <div className="hidden md:flex gap-4">
                    {Object.entries(COLORS).map(([key, color]) => (
                        <div key={key} className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full border-3"
                                style={{
                                    borderColor: color,
                                    backgroundColor: "transparent"
                                }}
                            ></span>

                            <span className="text-xs text-muted-foreground">
                                {LEGEND_LABELS[key]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>


            <div className="h-87.5">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                        barCategoryGap="33%"
                    >
                        <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />

                        <YAxis
                            tick={{ fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={formatNumberShort}
                        />

                        <XAxis
                            dataKey="month"
                            tick={{ fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            cursor={{ fill: "rgba(255,255,255,0.05)" }}
                            formatter={(value: number | undefined, name: string | undefined) =>
                                [`${value != null ? value.toLocaleString("es-ES") : 'N/A'} kWh`, name || 'Unknown']
                            }
                            contentStyle={{
                                backgroundColor: "var(--color-card)",
                                borderRadius: "0.5rem",
                                border: "1px solid var(--color-border)",
                                color: "var(--color-foreground)",
                                fontSize: "0.8rem"
                            }}
                            itemStyle={{ color: "var(--color-foreground)" }}
                            labelStyle={{ color: "var(--color-foreground)" }}
                        />

                        {/* Stack P1-P6 (en orden vertical P1 abajo → P6 arriba) */}
                        <Bar dataKey="P1" stackId="a" fill={COLORS.P1} />
                        <Bar dataKey="P2" stackId="a" fill={COLORS.P2} />
                        <Bar dataKey="P3" stackId="a" fill={COLORS.P3} />
                        <Bar dataKey="P4" stackId="a" fill={COLORS.P4} />
                        <Bar dataKey="P5" stackId="a" fill={COLORS.P5} />

                        {/* Último con borde redondeado */}
                        <Bar
                            dataKey="P6"
                            stackId="a"
                            fill={COLORS.P6}
                            radius={[6, 6, 0, 0]}
                        />

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
