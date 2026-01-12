"use client"

import React from "react"
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts"
import { getColor } from "@/utils/colors/grphicsColors"
import { TradingUpIcon } from "@/incons/TradingUpIcon";
import { TradingDownIcon } from "@/incons/TradingDownIcon";

export interface ChartDatum {
    label: string;
    value: number;
}

interface Props {
    title: string
    value: string
    data?: ChartDatum[]
    trend?: {
        percent: number,
        trend: "up" | "down" | "equal"
    }
    className?: string
}

export const DonutChart = ({ title, trend, value, data = [], className }: Props) => {

    const colorClass =
    trend?.trend === "up"
        ? "bg-tradding-up text-tradding-text-up"
        : trend?.trend === "down"
        ? "bg-red-900/30 text-red-400"
        : "bg-gray-700/30 text-gray-300";
    console.log("trend", trend)

    const styledData = data.map((d, index) => ({
        ...d,
        fill: getColor(index),
    }))

    return (
        <div className={`bg-card rounded-lg border border-border p-6 shadow-sm ${className}`}>
            <div>
                <p className="text-lg font-medium text-foreground">{title}</p>

                <p className="text-4xl font-bold">{value}</p>

                <div className="flex items-center gap-4 p-1 rounded-md">
                    <p className="text-sm text-muted-foreground">Últimos 12 meses</p>
                    <div className={`flex items-center gap-1 px-1 py-0.5 rounded-md text-[10px] font-medium ${colorClass}`}>
                        {trend?.trend === "up" && <TradingUpIcon className="h-4 w-4" />}
                        {trend?.trend === "down" && <TradingDownIcon className="h-4 w-4" />}
                        {trend && (trend.percent > 0 ? `+${trend.percent}%` : `${trend.percent}%`)}
                    </div>

                </div>
            </div>


            <div className="flex items-center h-80">

                <div className="flex flex-col gap-4 min-w-25">
                    {styledData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{
                                    border: `3px solid ${item.fill}`,
                                    backgroundColor: "transparent",
                                }}
                            ></span>

                            <span className="text-sm text-muted-foreground">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>


                <div className="flex-1 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={styledData}
                                dataKey="value"
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                innerRadius="40%"
                                outerRadius="80%"
                                cornerRadius={6}
                                paddingAngle={2}
                                labelLine={false}
                                isAnimationActive
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                    const safeMidAngle = midAngle ?? 0;
                                    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) / 2;
                                    const RADIAN = Math.PI / 180;
                                    const x = Number(cx) + radius * Math.cos(-safeMidAngle * RADIAN);
                                    const y = Number(cy) + radius * Math.sin(-safeMidAngle * RADIAN);
                                    return (
                                        <text
                                            x={x}
                                            y={y}
                                            fill="#fff"
                                            textAnchor="middle"
                                            dominantBaseline="central"
                                            fontSize={12}
                                        >
                                            {`${((percent ?? 0) * 100).toFixed(0)}%`}
                                        </text>
                                    );
                                }}
                            >
                                {styledData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={getColor(index)} stroke="none" />
                                ))}
                            </Pie>


                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "var(--color-card)",
                                    border: "1px solid var(--color-border)",
                                    borderRadius: "0.5rem",
                                    color: "var(--color-foreground)",
                                    fontSize: "0.8rem",
                                }}
                                itemStyle={{
                                    color: "var(--color-foreground)",
                                    fontWeight: 500,
                                }}
                                labelStyle={{
                                    color: "var(--color-foreground)",
                                }}
                                formatter={(value: number | undefined, name: string | undefined) => [
                                    value !== undefined ? `${value.toLocaleString()} kWh` : 'N/A',
                                    name ?? 'Unknown',
                                ]}
                            />

                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    )
}
