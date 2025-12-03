import React from "react";

interface SearchIconProps {
    size?: number;
    color?: string;
    className?: string;
}

export const SearchIcon: React.FC<SearchIconProps> = ({
    size = 20,
    className,
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M11.9526 11.9532L15.7495 15.7501M13.875 7.3125C13.875 10.9369 10.9369 13.875 7.3125 13.875C3.68813 13.875 0.75 10.9369 0.75 7.3125C0.75 3.68813 3.68813 0.75 7.3125 0.75C10.9369 0.75 13.875 3.68813 13.875 7.3125Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
