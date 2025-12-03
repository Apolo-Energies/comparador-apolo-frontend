import React from "react";

interface HomeIconProps {
    size?: number;
    color?: string;
    className?: string;
}

export const HomeIcon: React.FC<HomeIconProps> = ({
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
            d="M9.02 2.84011L3.63 7.04011C2.73 7.74011 2 9.23011 2 10.3601V17.7701C2 20.0901 3.89 21.9901 6.21 21.9901H17.79C20.11 21.9901 22 20.0901 22 17.7801V10.5001C22 9.29011 21.19 7.74011 20.2 7.05011L14.02 2.72011C12.62 1.74011 10.37 1.79011 9.02 2.84011Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12 15.9999C13.6569 15.9999 15 14.6567 15 12.9999C15 11.343 13.6569 9.99986 12 9.99986C10.3431 9.99986 9 11.343 9 12.9999C9 14.6567 10.3431 15.9999 12 15.9999Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
