import React from "react";
import { Card } from "../ui/Card";
import { TrendingUp } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  color: "green" | "red" | "yellow" | "gray";
  className?: string;
  icon?: React.ReactNode;
}

const colorClasses = {
  green: {
    icon: "text-green-500",
    dot: "bg-green-500",
    fondo: "bg-green-100 dark:bg-green-200",
  },
  red: {
    icon: "text-red-500",
    dot: "bg-red-500",
    fondo: "bg-red-100 dark:bg-red-200",
  },
  yellow: {
    icon: "text-yellow-500",
    dot: "bg-yellow-500",
    fondo: "bg-yellow-100 dark:bg-yellow-200",
  },
  gray: {
    icon: "text-gray-500",
    dot: "bg-gray-500",
    fondo: "bg-gray-100 dark:bg-gray-200",
  },
};

export const StatusCard = ({ ...props }: Props) => {
  const colors = colorClasses[props.color];

  return (
    <Card className={props.className}>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${colors.dot} text-white`}
          >
            {props.icon}
          </div>

          <span className="text-sm font-medium text-muted-foreground">
            {props.title}
          </span>
        </div>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold">{props.value}</span>
          {props.unit && (
            <span className="text-sm text-muted-foreground">{props.unit}</span>
          )}
        </div>
        {props.change && (
          <div className="flex justify-end mt-2">
            <div
              className={`flex items-center ${colors.fondo} ${colors.icon} rounded-full px-2 py-1 space-x-1`}
            >
              <TrendingUp className={`h-3 w-3`} />
              <span className={`text-xs font-medium`}>{props.change}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
