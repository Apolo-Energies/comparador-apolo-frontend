"use client";

import React, { useState } from 'react'
import { useAlertStore } from '@/app/store/ui/alert.store';
import Link from 'next/link'
import { RingLoader } from 'react-spinners';

export const FormRecuperarCuenta = () => {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { showAlert } = useAlertStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showAlert("Por favor ingresa un correo válido.", "error");
      return;
    }

    setIsPending(true);

    setTimeout(() => {
      showAlert("Correo de recuperación enviado (simulado).", "success");
      setIsPending(false);
      setEmail("");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 text-base rounded-lg border bg-white dark:bg-gray-800 neutral:bg-gray-100 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
          placeholder="apolo@email.com"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800"
      >
        {isPending ? (
          <RingLoader size={22} color="#ffffff" />
        ) : (
          "Enviar"
        )}
      </button>

      <div className="flex justify-end mt-2">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          Volver a iniciar sesión
        </Link>
      </div>
    </form>
  );
};