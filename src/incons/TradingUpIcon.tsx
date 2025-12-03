import React from "react";

interface TradingUpIconProps {
    size?: number;
    color?: string;
    className?: string;
}

export const TradingUpIcon: React.FC<TradingUpIconProps> = ({
    size = 16,
    color = "#1AD598",
    className,
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M11 6.33352L8.2 9.13352L7.13333 7.53352L5 9.66685"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M11 6.33352H9.66667"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M11 6.33352V7.66685"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M14 8.00018C14 4.68647 11.3137 2.00018 8 2.00018C4.68629 2.00018 2 4.68647 2 8.00018C2 11.3139 4.68629 14.0002 8 14.0002C11.3137 14.0002 14 11.3139 14 8.00018Z"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
