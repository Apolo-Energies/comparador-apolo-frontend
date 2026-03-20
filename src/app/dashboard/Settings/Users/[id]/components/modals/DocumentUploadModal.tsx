"use client";

import { useForm } from "react-hook-form";

import { Dialog } from "@/components/Dialogs/Dialog";
import { Button } from "@/components/buttons/button";
import { Select } from "@/components/Selects/Select";

import { DocumentType } from "../../enums/DocumentType";

interface UploadDocumentForm {
    documentType: DocumentType;
    file: FileList;
}

interface DocumentUploadModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (file: File, documentType: DocumentType) => Promise<void> | void;
    isUploading: boolean;
    docTypeLabels: Partial<Record<DocumentType, string>>;
}

export const DocumentUploadModal = ({
    open,
    onClose,
    onSubmit,
    isUploading,
    docTypeLabels,
}: DocumentUploadModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<UploadDocumentForm>({
        mode: "onChange",
    });

    const documentTypeOptions = Object.entries(docTypeLabels)
        .filter(([, label]) => Boolean(label))
        .map(([value, label]) => ({
            value: Number(value),
            label: label as string,
        }));

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmitForm = async (data: UploadDocumentForm) => {
        const file = data.file?.[0];
        if (!file) return;

        await onSubmit(file, data.documentType);
        reset();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="flex w-full max-w-lg flex-col">
                <div className="shrink-0 border-b border-border px-4 py-4">
                    <p className="text-lg font-semibold">Subir documento</p>
                    <p className="text-sm text-muted-foreground">
                        Selecciona el tipo de documento y el archivo a subir
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col">
                    <div className="space-y-4 px-4 py-4">
                        <Select<UploadDocumentForm>
                            label="Tipo de documento"
                            name="documentType"
                            required
                            options={documentTypeOptions}
                            register={register("documentType", {
                                required: "El tipo de documento es obligatorio",
                                valueAsNumber: true,
                            })}
                            errors={errors}
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Archivo
                            </label>

                            <input
                                type="file"
                                className="block w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:text-primary-foreground"
                                {...register("file", {
                                    required: "El archivo es obligatorio",
                                    validate: (files) =>
                                        files?.length > 0 || "Debes seleccionar un archivo",
                                })}
                            />

                            {errors.file && (
                                <p className="text-sm text-destructive">
                                    {errors.file.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="shrink-0 border-t border-border px-4 py-3">
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Cancelar
                            </Button>

                            <Button type="submit" disabled={!isValid || isUploading}>
                                {isUploading ? "Subiendo..." : "Subir documento"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};