import React from "react";

interface IconProps {
    size?: number;
    className?: string;
}

export const LightningIcon: React.FC<IconProps> = ({
    size = 40,
    className,
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <g filter="url(#lightning_shadow)">
            <rect
                x="2.5"
                y="2.5"
                width="35"
                height="35"
                rx="7.5"
                fill="#17181A"
            />
            <rect
                x="2.5"
                y="2.5"
                width="35"
                height="35"
                rx="7.5"
                stroke="#34383E"
            />
            <path
                d="M15.0749 21.0667H17.6499V27.0667C17.6499 28.4667 18.4083 28.7501 19.3333 27.7001L25.6416 20.5334C26.4166 19.6584 26.0916 18.9334 24.9166 18.9334H22.3416V12.9334C22.3416 11.5334 21.5833 11.2501 20.6583 12.3001L14.3499 19.4667C13.5833 20.3501 13.9083 21.0667 15.0749 21.0667Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>

        <defs>
            <filter
                id="lightning_shadow"
                x="0"
                y="1"
                width="40"
                height="40"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 
                            0 0 0 0 0 
                            0 0 0 0 0 
                            0 0 0 0 127 0"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.0627451  
                            0 0 0 0 0.0941176 
                            0 0 0 0 0.156863 
                            0 0 0 0.05 0"
                />
                <feBlend in2="BackgroundImageFix" mode="normal" />
                <feBlend in="SourceGraphic" mode="normal" />
            </filter>
        </defs>
    </svg>
);
