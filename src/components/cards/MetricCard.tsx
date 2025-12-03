import React from "react";
import { Card } from "../ui/Card";
import { InfoIcon } from "@/incons/InfoIcon";
import { TradingUpIcon } from "@/incons/TradingUpIcon";
import { TradingDownIcon } from "@/incons/TradingDownIcon";

interface Props {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  number?: number
  buttonLabel?: string;
  className?: string;
}

export const MetricCard = ({
  title,
  value,
  number,
  className,
}: Props) => {
  const colorClass =
    number! > 0
      ? "bg-green-500/20 text-green-400"
      : number! < 0
        ? "bg-red-500/20 text-red-400"
        : "bg-gray-500/20 text-gray-300";
  return (
    <Card className={`${className} p-6 flex flex-col justify-between`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <InfoIcon size={16} className="text-muted-foreground" />
        </div>
      </div>

      <div className="text-4xl text-start font-bold mb-4">{value}</div>

      <div className="flex w-full justify-start items-center gap-4 p-1 rounded-md">
        <div
          className={`flex items-center justify-end gap-1 px-1 py-1 rounded-md text-[12px] font-medium ${colorClass}`}
        >
          {number && number > 0 && <TradingUpIcon className="h-4 w-4" />}
          {number && number < 0 && <TradingDownIcon className="h-4 w-4" />}
          {number && number === 0 && <span className="text-xs">0%</span>}

          {number && number > 0 ? `+${number}%` : `${number}%`}
        </div>

      </div>

    </Card>
  );
};
