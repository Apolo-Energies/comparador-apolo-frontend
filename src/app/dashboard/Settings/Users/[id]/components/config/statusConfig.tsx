import { CheckCircle2, Clock3, FileCheck, XCircle } from "lucide-react";
import { DocumentStatus } from "../../enums/DocumentStatus";
import { StatusConfigItem } from "../cards/DocumentList";

export const statusConfig: Record<number, StatusConfigItem> = {
    [DocumentStatus.Uploaded]: {
        icon: Clock3,
        variant: "pending",
        label: "Subido",
    },

    [DocumentStatus.Signed]: {
        icon: FileCheck,
        variant: "verified",
        label: "Firmado",
    },

    [DocumentStatus.Rejected]: {
        icon: XCircle,
        variant: "rejected",
        label: "Rechazado",
    },

    [DocumentStatus.Validated]: {
        icon: CheckCircle2,
        variant: "verified",
        label: "Validado",
    },
};