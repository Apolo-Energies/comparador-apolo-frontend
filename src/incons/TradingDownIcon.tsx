import React from "react";

interface TradingDownIconProps {
    size?: number;
    color?: string;
    className?: string;
}

export const TradingDownIcon: React.FC<TradingDownIconProps> = ({
    size = 16,
    color = "#FF0000", // rojo
    className,
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M9.5 8.16667L6.7 5.36667L5.63333 6.96667L3.5 4.83333M9.5 8.16667L8.16667 8.16667M9.5 8.16667L9.5 6.83333M12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5C3.18629 12.5 0.5 9.81371 0.499999 6.5C0.499999 3.18629 3.18629 0.499999 6.5 0.499999C9.81371 0.499999 12.5 3.18629 12.5 6.5Z"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
