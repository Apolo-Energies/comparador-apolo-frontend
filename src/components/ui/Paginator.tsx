import React, { useState } from "react";

interface Props {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;

    borderTop?: boolean;
    borderBottom?: boolean;
    borderLeft?: boolean;
    borderRight?: boolean;
    roundedTopLeft?: boolean;
    roundedTopRight?: boolean;
    roundedBottomLeft?: boolean;
    roundedBottomRight?: boolean;
    className?: string;
}

export const Paginator: React.FC<Props> = ({
    currentPage,
    totalPages,
    totalCount,
    pageSize,
    onPageChange,
    onPageSizeChange,
    borderTop = true,
    borderBottom = true,
    borderLeft = true,
    borderRight = true,
    roundedTopLeft = true,
    roundedTopRight = true,
    roundedBottomLeft = true,
    roundedBottomRight = true,
    className = "",
}) => {
    const [inputPage, setInputPage] = useState(currentPage);

    const handlePageClick = (page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
        setInputPage(page);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setInputPage(value);
    };

    const handleGoToPage = () => {
        if (inputPage >= 1 && inputPage <= totalPages) {
            onPageChange(inputPage);
        } else {
            setInputPage(currentPage);
        }
    };

    const getPageNumbers = () => {
        const delta = 2;
        const range: (number | string)[] = [];
        const left = Math.max(2, currentPage - delta);
        const right = Math.min(totalPages - 1, currentPage + delta);

        range.push(1);

        if (left > 2) range.push("...");

        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        if (right < totalPages - 1) range.push("...");

        if (totalPages > 1) range.push(totalPages);

        return range;
    };

    const wrapperClasses = [
        "flex flex-col md:flex-row bg-card items-center justify-between px-4 py-4 gap-2 text-sm",
        borderTop ? "border-t border-border" : "",
        borderBottom ? "border-b border-border" : "",
        borderLeft ? "border-l border-border" : "",
        borderRight ? "border-r border-border" : "",
        roundedTopLeft ? "rounded-tl-[8px]" : "",
        roundedTopRight ? "rounded-tr-[8px]" : "",
        roundedBottomLeft ? "rounded-bl-[8px]" : "",
        roundedBottomRight ? "rounded-br-[8px]" : "",
        className,
    ].join(" ");

    return (
        <div className={wrapperClasses}>
            <div>
                Página {currentPage} de {totalPages} — Total registros: {totalCount}
            </div>

            <div className="flex items-center gap-1">
                <button
                    className="px-2 py-1 border border-border rounded bg-card hover:bg-accent cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>

                {getPageNumbers().map((page, idx) =>
                    page === "..." ? (
                        <span key={idx} className="px-2 py-1 bg-card">
                            ...
                        </span>
                    ) : (
                        <button
                            key={idx}
                            className={`px-3 py-1 border border-border rounded ${page === currentPage
                                ? "bg-accent text-white cursor-default"
                                : "bg-card hover:bg-accent cursor-pointer"
                                }`}
                            onClick={() => handlePageClick(Number(page))}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    className="px-2 py-1 border border-border rounded bg-card hover:bg-accent cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>

                {/* Input para ir a página */}
                <div className="flex items-center ml-2 gap-1">
                    <input
                        type="number"
                        value={inputPage}
                        onChange={handleInputChange}
                        min={1}
                        max={totalPages}
                        className="w-16 border border-border rounded-l px-2 py-1 text-sm bg-card"
                        title="Número de página"
                    />
                    <button
                        onClick={handleGoToPage}
                        className="px-3 py-1 border border-border rounded-r bg-card hover:bg-accent cursor-pointer"
                    >
                        Ir
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span>Registros por página:</span>
                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="border border-border rounded px-2 py-1 bg-card text-sm"
                >
                    {[10, 20, 50, 100].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
