import React from "react";

interface IconProps {
    size?: number;
    color?: string;
    className?: string;
}

export const ArrowIcon: React.FC<IconProps> = ({
    size = 10,
    color = "currentColor",
    className,
}) => (
    <svg
        width={size}
        height={(size * 12) / 14}
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M0.75 5.75H12.4167M12.4167 5.75L7.41667 0.75M12.4167 5.75L7.41667 10.75"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
