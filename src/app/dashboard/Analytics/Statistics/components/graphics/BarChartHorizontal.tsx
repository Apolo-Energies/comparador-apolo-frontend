"use client";

import React from "react";
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { Datum } from "../../../HistorialComparador/interfaces/historila-comparador";

interface Props {
    title: string;
    data: Datum[];
}

export const BarHorizontalChart = ({ title, data }: Props) => {
    const formattedData = data.map((item) => ({
        name: item.fullName,
        cups: item.totalCUPS,
    }));

    return (
        <div className="p-6 bg-card border border-border rounded-lg shadow-lg">
            <p className="text-md font-medium text-foreground text-center mb-4">
                {title}
            </p>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        layout="vertical"
                        data={formattedData}
                        margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
                    >
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748B", fontSize: 12 }}
                        />

                        <YAxis
                            dataKey="name"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94A3B8", fontSize: 12 }}
                            width={110}
                        />

                        <Tooltip
                            cursor={{ fill: "rgba(255,255,255,0.05)" }}
                            contentStyle={{
                                backgroundColor: "#1E293B",
                                border: "none",
                                borderRadius: "0.5rem",
                                color: "#fff",
                                fontSize: "0.78rem",
                            }}
                            itemStyle={{ color: "#fff" }}
                            labelStyle={{ display: "none" }}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            formatter={(value: number, _key: string, props: any) => [
                                `${value.toLocaleString()} kWh`,
                                props.payload?.[0]?.name,
                            ]}
                        />

                        <Bar dataKey="cups" barSize={20} radius={[0, 6, 6, 0]}>
                            {formattedData.map((_, i) => (
                                <Cell
                                    key={i}
                                    fill={i % 2 === 0 ? "#C9B5F8" : "#846AC2"}
                                />
                            ))}
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
