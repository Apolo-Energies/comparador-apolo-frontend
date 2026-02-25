import { DropzoneUpload } from "../upload/DropzoneUpload";
import { DocumentState, TramiteType } from "@/app/store/contracts/contracts.store";

type DocItem = {
  key: keyof DocumentState;
  label: string;
  required?: boolean;
  visible?: boolean;
};

interface Props {
  onFileSelect: (type: keyof DocumentState, file: File) => void;
  isCompany: boolean;
  tramite: TramiteType;
}

export const FormDocument = ({ onFileSelect, isCompany, tramite }: Props) => {
  const showCIE =
    tramite === "ALTA_NUEVA" ||
    tramite === "CAMBIO_TARIFA" ||
    tramite === "CAMBIO_POTENCIA";

  const showJustoTitulo = tramite === "NUEVO_TITULAR";

  const docs: DocItem[] = [
    // Obligatorios (siempre)
    { key: "dni_front", label: "Copia DNI - Anverso *", required: true, visible: true },
    { key: "dni_back", label: "Copia DNI - Reverso *", required: true, visible: true },
    { key: "factura_estudio", label: "Factura o Estudio *", required: true, visible: true },
    { key: "bank", label: "Certificado de cuenta bancaria *", required: true, visible: true },
    { key: "escrituras_poderes", label: "Escritura / poderes *", required: true, visible: true },

    // Empresa (obligatorio solo si empresa)
    { key: "cif_file", label: "Copia CIF (solo empresa) *", required: true, visible: isCompany },

    // Según trámite
    { key: "cie", label: "Certificado de Instalación Eléctrica *", required: true, visible: showCIE },
    { key: "justo_titulo", label: "Justo Título *", required: true, visible: showJustoTitulo },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {docs
        .filter((d) => d.visible)
        .map((d) => (
          <DropzoneUpload
            key={String(d.key)}
            label={d.label}
            onFileSelect={(f) => onFileSelect(d.key, f)}
          />
        ))}
    </div>
  );
};
