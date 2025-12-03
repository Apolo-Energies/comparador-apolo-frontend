import React from "react";

interface ArrowDownBoxIconProps {
    size?: number;
    color?: string;
    className?: string;
}

export const ArrowDownBoxIcon: React.FC<ArrowDownBoxIconProps> = ({
    size = 20,
    className,
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M9 21.9999H15C20 21.9999 22 19.9999 22 14.9999V8.99991C22 3.99991 20 1.99991 15 1.99991H9C4 1.99991 2 3.99991 2 8.99991V14.9999C2 19.9999 4 21.9999 9 21.9999Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.46973 10.6404L11.9997 14.1603L15.5297 10.6404"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
