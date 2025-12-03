import React from 'react'

interface DownloadIconProps {
    size?: number;
    color?: string;
    className?: string;
}

export const DownloadIcon2: React.FC<DownloadIconProps> = ({
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
            d="M7.76672 9.73364L9.90006 11.867L12.0334 9.73364"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M9.90002 3.3335V11.8085"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16.6667 10.1504C16.6667 13.8337 14.1667 16.8171 10 16.8171C5.83337 16.8171 3.33337 13.8337 3.33337 10.1504"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);