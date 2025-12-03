import React from "react";

interface HeadsetIconProps {
    size?: number;
    color?: string;
    className?: string;
}

export const FilterIcon: React.FC<HeadsetIconProps> = ({
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
            d="M18.0251 12.2916C18.0251 13.0333 17.8167 13.7333 17.4501 14.3333C16.7667 15.4833 15.5084 16.2499 14.0667 16.2499C12.6251 16.2499 11.3667 15.4749 10.6834 14.3333C10.3167 13.7416 10.1084 13.0333 10.1084 12.2916C10.1084 10.1083 11.8834 8.33325 14.0667 8.33325C16.2501 8.33325 18.0251 10.1083 18.0251 12.2916Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M15.5501 12.2749H12.5918"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M14.0669 10.833V13.7913"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17.2416 3.34985V5.19983C17.2416 5.87483 16.8166 6.71651 16.4 7.14151L14.9333 8.43317C14.6583 8.3665 14.3666 8.33317 14.0666 8.33317C11.8833 8.33317 10.1083 10.1082 10.1083 12.2915C10.1083 13.0332 10.3166 13.7332 10.6833 14.3332C10.9916 14.8498 11.4166 15.2915 11.9333 15.6082V15.8915C11.9333 16.3998 11.6 17.0748 11.175 17.3248L9.99997 18.0832C8.9083 18.7582 7.39163 17.9998 7.39163 16.6498V12.1915C7.39163 11.5998 7.04997 10.8415 6.71663 10.4248L3.51663 7.05815C3.09997 6.63315 2.7583 5.87485 2.7583 5.37485V3.43317C2.7583 2.42483 3.51663 1.6665 4.44163 1.6665H15.5583C16.4833 1.6665 17.2416 2.42485 17.2416 3.34985Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
