"use client";

import React from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { Datum } from "../../../HistorialComparador/interfaces/historila-comparador";
import { getColor } from "@/utils/colors/grphicsColors";

interface Props {
    title: string;
    value: string;
    data?: Datum[];
    className?: string;
}

export const DonutChart = ({ title, data, className }: Props) => {

    const chartData = data
        ? data.map((item) => ({
            name: item.fullName,
            value: item.totalAnnualConsumption,
        }))
        : [];

    return (
        <div className={`bg-card border border-border rounded-lg p-6 shadow-sm ${className}`}>

            <div className="mb-4 text-center">
                <p className="text-md font-medium text-foreground">{title}</p>
            </div>

            <div className="h-62.5 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius="45%"
                            outerRadius="80%"
                            cornerRadius={8}
                            paddingAngle={3}
                            isAnimationActive

                            label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                            labelLine={true}
                        >
                            {chartData.map((_, i) => (
                                <Cell key={i} fill={getColor(i)} stroke="none" />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "none",
                                borderRadius: "0.5rem",
                                color: "#fff",
                                fontSize: "0.8rem",
                            }}
                            labelStyle={{ color: "#fff" }}
                            itemStyle={{ color: "#fff" }}

                            formatter={(value: number | undefined, name: string | undefined) => [
                                `${(value ?? 0).toLocaleString()} kWh`,
                                name ?? 'Unknown',
                            ]}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex gap-3 mt-6 flex-wrap justify-center">
                {chartData.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getColor(i) }}
                        />
                        <span className="text-xs text-muted-foreground">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
