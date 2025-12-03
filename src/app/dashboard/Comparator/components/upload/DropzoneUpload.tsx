import React, { useRef, useState } from "react";

import { X } from "lucide-react";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { UploadIcon } from "@/incons/UploadIcon";

const acceptedFormats = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/bmp",
  "image/tiff",
  "application/pdf",
];

interface Props {
  onFileSelect: (file: File | string) => void;
}

export const DropzoneUpload = ({ onFileSelect }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hovering, setHovering] = useState(false);

  const handleFile = (file: File) => {
    if (acceptedFormats.includes(file.type)) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setIsPdf(file.type === "application/pdf");
      onFileSelect(file);
    } else {
      alert("Formato no soportado.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHovering(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClear = () => {
    setPreview(null);
    setIsPdf(false);
    onFileSelect("");
  };

  return (
    <>
      <p className="text-sm font-semibold text-foreground mb-2">
        Sube la factura
      </p>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setHovering(true);
        }}
        onDragLeave={() => setHovering(false)}
        onDrop={handleDrop}
        className={cn(
          "w-full min-h-[200px] bg-body rounded-[8px] border border-border px-6 py-4 flex flex-col items-center justify-center text-center transition relative cursor-pointer",
          hovering && "ring-2 ring-blue-400"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept={acceptedFormats.join(",")}
          className="hidden"
          onChange={handleFileChange}
        />
        {preview ? (
          <div className="relative w-full flex flex-col items-center space-y-2">
            {isPdf ? (
              <iframe
                src={preview}
                className="w-full h-64 rounded-md border"
                title="PDF Preview"
              />
            ) : (
              <Image
                src={preview}
                width={500}
                height={300}
                alt="preview"
                className="max-h-40 rounded-md object-contain"
              />
            )}
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <>
            <UploadIcon className="w-10 h-10 text-info-subtext" />
            <p className="text-sm font-semibold text-foreground mt-2">
              Haz clic o arrastra un archivo (PDF o imagen)
            </p>
            <p className="text-xs text-foreground">
              JPG, PNG, WEBP, BMP, TIFF, PDF
            </p>
          </>
        )}
      </div>
    </>
  );
};
