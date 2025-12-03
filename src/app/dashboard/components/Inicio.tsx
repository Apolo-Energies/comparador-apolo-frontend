"use client";

import { Button } from "@/components/buttons/button";
import { MetricCard } from "@/components/cards/MetricCard";
import { StatusCard } from "@/components/cards/StatusCard";
import { AreaChart } from "@/components/graficas/AreaChart";
import {
  BarChart3,
  CircleCheckBig,
  Clock,
  Plus,
  TrendingDown,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { FormModal } from "./modals/FormModal";

export const Inicio = () => {
  const [open, setOpen] = useState(false);

  const openModalFunction = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full mb-4 justify-between">
        <div className="flex flex-col space-y-1 mt-2 mb-6">
          <p className="font-bold text-foreground text-xl">Bienvenido Juan</p>
          <span className="text-xs text-muted-foreground">
            Panel de control APOLO ENERGIES
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="text-sm cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Analytics
          </Button>

          <Button
            size="sm"
            onClick={openModalFunction}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1" />
            Agregar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MetricCard
          title="TOTAL CUPS"
          value="1,726"
          change="+5.2%"
          changeType="positive"
        />
        <MetricCard
          title="TOTAL CARTERA"
          value="2,950 GB"
          change="-8.7%"
          changeType="negative"
        />
      </div>

      {/* Gráfico de área */}
      <div className="mb-6">
        <AreaChart
          title="Cartera x Mes"
          value="2,950 GB"
          className="bg-card rounded-lg p-6"
        />
      </div>

      {/* Tarjetas de estado - Primera fila */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatusCard
          title="CUPS ACTIVOS"
          value="1,726"
          change="+5.2%"
          color="green"
          icon={<CircleCheckBig className="w-3 h-3 " />}
        />
        <StatusCard
          title="CUPS BAJA"
          value="1,726"
          change="+5.2%"
          color="red"
          icon={<TrendingDown className="w-3 h-3 " />}
        />
        <StatusCard
          title="CUPS EN TRÁMITE"
          value="1,726"
          change="+5.2%"
          color="yellow"
          icon={<Clock className="w-3 h-3 " />}
        />
        <StatusCard
          title="CUPS PDT FIRMA"
          value="1,726"
          change="+5.2%"
          color="gray"
          icon={<X className="w-3 h-3 " />}
        />
      </div>

      {/* Tarjetas de estado - Segunda fila */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="CUPS ACTIVOS"
          value="45,726"
          unit="GW"
          change="+5.2%"
          color="green"
          icon={<CircleCheckBig className="w-3 h-3 " />}
        />
        <StatusCard
          title="CUPS BAJA"
          value="1,726"
          unit="GW"
          change="+5.2%"
          color="red"
          icon={<TrendingDown className="w-3 h-3 " />}
        />
        <StatusCard
          title="CUPS EN TRÁMITE"
          value="1,726"
          unit="GW"
          change="+5.2%"
          color="yellow"
          icon={<Clock className="w-3 h-3 " />}
        />
        <StatusCard
          title="CUPS PDT FIRMA"
          value="1,726"
          unit="GW"
          change="+5.2%"
          color="gray"
          icon={<X className="w-3 h-3 " />}
        />
      </div>
      <FormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
