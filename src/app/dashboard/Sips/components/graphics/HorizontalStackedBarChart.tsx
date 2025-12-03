"use client"

import { formatNumberShort } from "@/utils/format-data/format-number";
import React from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts"

export interface PowerRow {
    label: string;      // P1..P6
    values: number[];   // 3 niveles [nivel1, nivel2, nivel3]
}

interface Props {
    title: string
    data: PowerRow[]
}

export const HorizontalStackedBarChart = ({ title, data }: Props) => {

    // Convertimos al formato de recharts
    const chartData = data.map(row => ({
        period: row.label,
        value: row.values?.[0] || 0,
    }))


    const COLORS = ["#7C67F2", "#8FDBFF", "#2F333A"] // mismos tonos del ejemplo

    return (
        <div className="p-6 bg-card rounded-lg border border-border shadow-lg">
            <p className="text-lg font-semibold mb-4">{title}</p>

            <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
                        barCategoryGap="30%"
                    >
                        <CartesianGrid stroke="#323438" vertical={false} />

                        <YAxis
                            tick={{ fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={formatNumberShort}
                        />

                        <XAxis
                            dataKey="period"
                            tick={{ fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            cursor={{ fill: "rgba(255,255,255,0.05)" }}
                            formatter={(value) => [value]}
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "none",
                                borderRadius: "0.5rem",
                                color: "#fff",
                                fontSize: "0.8rem",
                            }}
                        />

                        <Bar dataKey="value" stackId="a" radius={[4, 4, 0, 0]} fill={COLORS[0]} />

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
