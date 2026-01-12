import { getContracts } from '@/app/services/ContractService/contract.service';
import { useReloadStore } from '@/app/store/reloadData/reloadFlag.store';
import { useAlertStore } from '@/app/store/ui/alert.store';
import { useLoadingStore } from '@/app/store/ui/loading.store';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { ContractCollaborator } from '../../interfaces/contract-collaborator';
import { Column, DataTable } from '@/components/ui/DataTable';
import { Paginator } from '@/components/ui/Paginator';
import { ArrowUpDownIcon } from '@/incons/ArrowUpDownIcon';
import { DateIcon } from '@/incons/DateIcon';
import { EmailIcon } from '@/incons/EmailIcon';

interface Props {
    filters: {
        nombre: string;
        email: string;
        role: string;
    };
}

export const TableContract = ({ filters }: Props) => {
    const [contracts, setContracts] = useState<ContractCollaborator[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [pageSize, setPageSize] = useState(10);
    const { data: session /*status*/ } = useSession();
    const { setLoading } = useLoadingStore();
    const { showAlert } = useAlertStore();
    const { reloadFlag } = useReloadStore();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                if (!session?.user.token) {
                    return;
                }
                // Traer contratos
                const contractsResponse = await getContracts(session.user.token, { ...filters, page: currentPage, pageSize });
                if (contractsResponse.status === 200) {
                    setContracts(contractsResponse.result.items);
                    setCurrentPage(contractsResponse.result.currentPage);
                    setTotalPages(contractsResponse.result.totalPages || 1);
                    setTotalCount(contractsResponse.result.totalCount || 0);
                }

            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.user.token, reloadFlag]);

    const columns: Column<ContractCollaborator>[] = [
        {
            key: "firstName",
            label: "Usuario",
            align: "left",
            headerIcon: <ArrowUpDownIcon />,
            textColor: "text-foreground",
            render: (item: ContractCollaborator) => (
                <div>
                    {item.firstName} {item.lastName}
                </div>
            ),
        },
        {
            key: "email",
            label: "Correo",
            align: "left",
            headerIcon: <ArrowUpDownIcon />,
            render: (item: ContractCollaborator) => <div className="flex gap-2">
                <EmailIcon /><span>{item?.email}</span>
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
            key: "dni",
            label: "DNI",
            headerIcon: <ArrowUpDownIcon />,
            render: (item: ContractCollaborator) => item.dni ?? 0,
            align: "left",
        },
        {
            key: "startDate",
            label: "Fecha",
            align: "left",
            headerIcon: <ArrowUpDownIcon />,
            textColor: "text-foreground",
            render: (item: ContractCollaborator) =>
                <div className="flex gap-2">
                    <DateIcon />
                    <span>{new Date(item.startDate).toLocaleString()}</span>
                </div>
        },
    ];

    return (
        <div className="flex flex-col">
            <DataTable data={contracts} columns={columns} rowKey="id" borderTop={false} roundedTopLeft={false} roundedTopRight={false} roundedBottomLeft={false} roundedBottomRight={false} />
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
}
