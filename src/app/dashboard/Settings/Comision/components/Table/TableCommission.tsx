'use client';
import React, { useEffect, useState } from 'react';
import { Commission } from '../../interfaces/commission';
import { useSession } from 'next-auth/react';
import { useLoadingStore } from '@/app/store/ui/loading.store';
import { getCommissions } from '@/app/services/ComisionService/comision.service';
import { Column, DataTable } from '@/components/ui/DataTable';
import { useReloadStore } from '@/app/store/reloadData/reloadFlag.store';
import { ModalEditCommission } from '../Modals/ModalEditCommission';

export const TableCommission = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [commission, setCommission] = useState<Commission>();
  const [open, setOpen] = useState(false)
  const { data: session, status } = useSession();
  const { setLoading } = useLoadingStore();
  const { reloadFlag } = useReloadStore();

  useEffect(() => {
    const fetchCommission = async () => {
      if (!session?.user.token) return;
      setLoading(true);
      try {
        const response = await getCommissions(session.user.token);
        if (response.status === 200) {
          setCommissions(response.result);
        } else {
          console.error("Error cargando comisiones:", response.result);
        }
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchCommission();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.token, reloadFlag]);

  const handleEdit =  (commission: Commission) => {
    setCommission(commission);
    setOpen(true);
  }

  const columns: Column<Commission>[] = [
    {
      key: 'name',
      label: 'Nombre Comisión',
      render: (commission: Commission) => (
        <span className="text-sm text-accent-foreground">{commission.name}</span>
      ),
    },
    {
      key: 'percentage',
      label: 'Porcentaje',
      align: 'center',
      render: (commission: Commission) => (
        <span className="text-sm font-medium">{commission.percentage}%</span>
      ),
    },
    {
      key: 'acciones',
      label: 'Acciones',
      align: 'center',
      render: (commission: Commission) => (
        <button onClick={() => handleEdit(commission)} className="text-indigo-600 hover:text-indigo-900 transition-colors cursor-pointer">
          Editar
        </button>
      ),
    },
  ];

  return (
    <>
      <DataTable data={commissions} columns={columns} rowKey="id" />
      {commission && (
        <ModalEditCommission
          open={open}
          commission={commission}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
};
