import React from "react";

interface UserIconProps {
    size?: number;
    color?: string;
    className?: string;
}

export const UserIcon: React.FC<UserIconProps> = ({
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
            d="M10.0999 10.6501C10.0416 10.6418 9.9666 10.6418 9.89993 10.6501C8.43327 10.6001 7.2666 9.40009 7.2666 7.92509C7.2666 6.41676 8.48327 5.19176 9.99993 5.19176C11.5083 5.19176 12.7333 6.41676 12.7333 7.92509C12.7249 9.40009 11.5666 10.6001 10.0999 10.6501Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M15.6166 16.1501C14.1333 17.5085 12.1666 18.3335 9.99997 18.3335C7.8333 18.3335 5.86663 17.5085 4.3833 16.1501C4.46663 15.3668 4.96663 14.6001 5.8583 14.0001C8.14163 12.4835 11.875 12.4835 14.1416 14.0001C15.0333 14.6001 15.5333 15.3668 15.6166 16.1501Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M9.99984 18.3335C14.6022 18.3335 18.3332 14.6026 18.3332 10.0002C18.3332 5.39781 14.6022 1.66685 9.99984 1.66685C5.39746 1.66685 1.6665 5.39781 1.6665 10.0002C1.6665 14.6026 5.39746 18.3335 9.99984 18.3335Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
