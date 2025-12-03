"use client"

import React, { useState } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"
import { formatNumberShort } from '@/utils/format-data/format-number'

interface Props {
    title: string
    value?: string
    data?: any[]
    className?: string
    mode?: "monthly" | "daily"
}

export const BarChartVertical = ({ title, data = [], className, mode = "monthly" }: Props) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const formatDate = (isoOrDate: any, mode: "monthly" | "daily") => {
        if (!isoOrDate) return "";

        const date = new Date(isoOrDate);

        return mode === "monthly"
            ? date.toLocaleDateString("es-ES", {
                month: "short",
                year: "2-digit"
            })
            : date.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short"
            });
    };

    const chartData =
        mode === "daily"
            ? data.map((item) => ({
                name: formatDate(item.date, "daily"),
                consumption: item.totalConsumption /100000,
                cups: item.totalCUPS,
            }))
            : data
                .sort((a, b) =>
                    a.year === b.year
                        ? a.month - b.month
                        : a.year - b.year
                )
                .map((item) => ({
                    name: formatDate(new Date(item.year, item.month - 1), "monthly"),
                    consumption: item.totalConsumption/100000,
                    cups: item.totalCUPS,
                }));

    return (
        <div className={`bg-card rounded-lg border border-border p-12 shadow-sm ${className}`}>
            <div className="mb-4">
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
            </div>

            <div className="flex gap-4">
                <div className="flex-1 h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <CartesianGrid stroke="#323438" vertical={false} />

                            <XAxis
                                dataKey="name"
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                tick={{ fontSize: 11, fill: "#94A3B8" }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                tick={{ fontSize: 12, fill: "#94A3B8" }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={formatNumberShort}
                            />

                            <Tooltip
                                cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                                contentStyle={{
                                    backgroundColor: "#1E293B",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    color: "#fff",
                                    fontSize: "0.8rem",
                                }}
                                itemStyle={{ color: "#fff" }}
                                labelStyle={{ display: "none" }}
                                formatter={(value: number, key: string) => [
                                    `${value.toLocaleString()}`,
                                    key === "consumption" ? "Consumo Anual" : "CUPS",
                                ]}
                            />

                            <Bar
                                dataKey="consumption"
                                stackId="a"
                                barSize={30}
                                radius={[0, 0, 0, 0]}
                                onClick={(_, index) => setActiveIndex(index)}
                            >
                                {chartData.map((_, index) => (
                                    <Cell
                                        key={`consumption-${index}`}
                                        fill={activeIndex === index ? "#1AD598" : "#B79DF5"}
                                    />
                                ))}
                            </Bar>
                            <Bar
                                dataKey="cups"
                                stackId="a"
                                barSize={30}
                                radius={[6, 6, 0, 0]}
                                onClick={(_, index) => setActiveIndex(index)}
                            >
                                {chartData.map((_, index) => (
                                    <Cell
                                        key={`cups-${index}`}
                                        fill={activeIndex === index ? "#76E6C1" : "#DBCEFA"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    )
}
