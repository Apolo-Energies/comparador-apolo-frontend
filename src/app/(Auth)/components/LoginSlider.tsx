"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export const LoginSlider = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        { src: "/backgrounds/bg-neutral.webp", alt: "Trabajador industrial", text: "Ahorra hasta un 25% en tu factura de la luz" },
        { src: "/backgrounds/bg-dark.webp", alt: "Trabajador de construcción", text: "Ahorra hasta un 25% en tu factura de la luz" },
        { src: "/backgrounds/bg-light.webp", alt: "Dueña de restaurante", text: "Ahorra hasta un 25% en tu factura de la luz" },
    ];

    const totalImages = images.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % totalImages);
        }, 4000);

        return () => clearInterval(interval);
    }, [totalImages]);


    return (
        <div className="relative w-full h-full rounded-sm overflow-hidden">
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`
            absolute inset-0 w-full h-full transition-opacity duration-700
            ${index === currentImage ? "opacity-100" : "opacity-0"}`}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                    />

                    {/* Texto */}
                    <div className={`absolute bottom-10 left-10 drop-shadow-lg ${index === 2 ? 'text-black' : 'text-white'}`}>
                        <p className="text-2xl sm:text-3xl font-bold max-w-[70%] leading-snug">
                            {img.text}
                        </p>
                    </div>
                </div>
            ))}

            {/* Indicadores (Barras) */}
            {/* Indicadores (Barras Clickeables) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 w-[120px]">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`
        h-1 rounded-full transition-all duration-500 cursor-pointer
        ${currentImage === index ? "bg-white w-10" : "bg-white/40 w-6"}
      `}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

        </div>
    );
};
