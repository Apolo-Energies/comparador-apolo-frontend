import React, { useEffect, useState } from "react";
import { HistorialComparador } from "../../interfaces/historila-comparador";
import { useSession } from "next-auth/react";
import { Column, DataTable } from "@/components/ui/DataTable";
import { HistorialFilters } from "../../interfaces/historial-filter";
import { useLoadingStore } from "@/app/store/ui/loading.store";
import { getHistorialComparador } from "@/app/services/HistorialService/historial.service";
import { Paginator } from '../../../../../../components/ui/Paginator';
import { EmailIcon } from "@/incons/EmailIcon";
import { DateIcon } from "@/incons/DateIcon";
import { ArrowUpDownIcon } from "@/incons/ArrowUpDownIcon";

interface Props {
  filters: HistorialFilters;
}

export const TableHistorial = ({ filters }: Props) => {
  const [historials, setHistorials] = useState<HistorialComparador[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0)
  const [pageSize, setPageSize] = useState(10);

  const { setLoading } = useLoadingStore();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        if (!session?.user.token) {
          return;
        }
        const response = await getHistorialComparador(session.user.token, { ...filters, page: currentPage, pageSize });
        if (response.status === 200) {
          setHistorials(response.result.items);
          setCurrentPage(response.result.currentPage);
          setTotalPages(response.result.totalPages || 1);
          setTotalCount(response.result.totalCount || 0);
        } else {
          console.error("Error cargando usuarios:", response.result);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.token, filters, currentPage, pageSize]);

  const columns: Column<HistorialComparador>[] = [
    {
      key: "usuario",
      label: "Usuario",
      align: "left",
      headerIcon: <ArrowUpDownIcon />,
      textColor: "text-foreground",
      render: (item: HistorialComparador) => (
        <div>
          {item.user?.nombreCompleto}
        </div>
      ),
    },
    {
      key: "Correo",
      label: "Correo",
      align: "left",
      headerIcon: <ArrowUpDownIcon />,
      render: (item: HistorialComparador) => <div className="flex gap-2">
        <EmailIcon /><span>{item.user?.email}</span>
      </div>,
    },
    {
      key: "cups",
      label: "CUPS",
      align: "left",
      textColor: "text-foreground",
      headerIcon: <ArrowUpDownIcon />,

    },
    {
      key: "consumoAnual",
      label: "Consumo Anual",
      headerIcon: <ArrowUpDownIcon />,
      render: (item: HistorialComparador) => item.consumoAnual ?? 0,
      align: "left",
    },
    {
      key: "fecha",
      label: "Fecha",
      align: "left",
      headerIcon: <ArrowUpDownIcon />,
      textColor: "text-foreground",
      render: (item: HistorialComparador) =>
        <div className="flex gap-2">
          <DateIcon />
          <span>{new Date(item.fecha).toLocaleString()}</span>
        </div>
    },
  ];

  return (
    <div className="flex flex-col">
      <DataTable data={historials} columns={columns} rowKey="id" borderTop={false} roundedTopLeft={false} roundedTopRight={false} roundedBottomLeft={false} roundedBottomRight={false} />
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        borderTop={false}
        roundedTopLeft={false}
        roundedTopRight={false}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </div>
  )
};
