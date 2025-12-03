import React, { useState } from 'react'
import { ModalAddCommission } from '../Modals/ModalAddCommission';
import { Plus } from 'lucide-react';
import { Button } from '@/components/buttons/button';

export const HeaderCommission = () => {
    const [open, setOpen] = useState(false);

    const openModalFunction = () => {
      setOpen(true);
    };
  
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-6">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-foreground">
            Gestión de Comisiones
          </p>
          <Button
            onClick={() => openModalFunction()}
            className="flex items-center gap-2 cursor-pointer text-foreground px-4 py-2 rounded-lg hover:bg-cyan-400 transition-colors"
          >
            <Plus size={20} />
            Comisiones
          </Button>
        </div>
  
        <ModalAddCommission open={open} onClose={() => setOpen(false)} />
      </div>
    );
  };
  