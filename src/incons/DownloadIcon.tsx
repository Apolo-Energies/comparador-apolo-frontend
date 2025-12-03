import React from "react";

interface DownloadIconProps {
    size?: number;
    color?: string;
    className?: string;
}

export const DownloadIcon: React.FC<DownloadIconProps> = ({
    size = 20,
    className,
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M13.6997 7.4165C16.6997 7.67484 17.9247 9.2165 17.9247 12.5915V12.6998C17.9247 16.4248 16.4331 17.9165 12.7081 17.9165H7.28307C3.55807 17.9165 2.06641 16.4248 2.06641 12.6998V12.5915C2.06641 9.2415 3.27474 7.69984 6.22474 7.42484"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 1.6665V12.3998"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12.7918 10.5417L10.0002 13.3334L7.2085 10.5417"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
