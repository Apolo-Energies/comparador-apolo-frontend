import React from 'react'

export interface Column<T> {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  textColor?: string;
  headerIcon?: React.ReactNode;
  sticky?: boolean; 
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  borderTop?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
  roundedTopLeft?: boolean;
  roundedTopRight?: boolean;
  roundedBottomLeft?: boolean;
  roundedBottomRight?: boolean;
  headerBg?: string;
  bodyBg?: string;
}

export function DataTable<T>({
  data,
  columns,
  rowKey,
  borderTop = true,
  borderBottom = true,
  borderLeft = true,
  borderRight = true,
  roundedTopLeft = true,
  roundedTopRight = true,
  roundedBottomLeft = true,
  roundedBottomRight = true,
  headerBg = "bg-card",
  bodyBg = "bg-card",
}: DataTableProps<T>) {
  const wrapperClasses = [
    "shadow-sm overflow-hidden",
    borderTop ? "border-t border-border" : "",
    borderBottom ? "border-b border-border" : "",
    borderLeft ? "border-l border-border" : "",
    borderRight ? "border-r border-border" : "",
    roundedTopLeft ? "rounded-tl-[8px]" : "",
    roundedTopRight ? "rounded-tr-[8px]" : "",
    roundedBottomLeft ? "rounded-bl-[8px]" : "",
    roundedBottomRight ? "rounded-br-[8px]" : "",
  ].join(" ");

  return (
    <div className={wrapperClasses}>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className={`${headerBg} border-b border-border`}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider ${col.sticky ? "sticky right-0 bg-card z-20 shadow-left" : ""} text-${col.align || "left"}`}
                >
                  <div className={`flex items-center gap-2 justify-${col.align || "left"}`}>
                    <span>{col.label}</span>
                    {col.headerIcon && <span className="cursor-pointer">{col.headerIcon}</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`${bodyBg}`}>
            {data.map((row) => (
              <tr key={String(row[rowKey])} className="hover:bg-body transition-colors">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-4 whitespace-nowrap text-${col.align || "left"} ${col.textColor || "text-muted-foreground"} ${col.sticky ? "sticky right-0 bg-card z-20 shadow-left" : ""}`}
                  >
                    {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
