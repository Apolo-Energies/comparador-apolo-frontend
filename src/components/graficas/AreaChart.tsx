"use client"

import React from 'react'

import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "En", value: 240 },
  { name: "Fe", value: 220 },
  { name: "Ma", value: 260 },
  { name: "Ab", value: 240 },
  { name: "Ma", value: 280 },
  { name: "Ju", value: 300 },
  { name: "Ju", value: 320 },
  { name: "Ag", value: 310 },
]

interface Props {
  title: string
  value: string
  className?: string
}
export const AreaChart = ({...props}: Props) => {
  return (
    <div className={props.className}>
      <div className="mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{props.title}</h3>
        <p className="text-2xl font-bold">{props.value}</p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'currentColor' }}
            />
            <YAxis hide />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorGradient)"
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
