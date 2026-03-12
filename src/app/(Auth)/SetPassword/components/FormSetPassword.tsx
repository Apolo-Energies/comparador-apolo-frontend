"use client";

import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { RingLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/app/services/ApiAuth/auth.service";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { validatePassword } from "@/utils/validators/validatePassword";

export const FormSetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const { showAlert } = useAlertStore()

  // Redirigir al login si no vienen userId o token
  useEffect(() => {
    if (!userId || !token) {
      router.replace("/"); // redirige al login
    }
  }, [userId, token, router]);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowPassword2 = () => setShowPassword2(!showPassword2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setMessage(passwordError);
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword({ userId, token, newPassword: password });
      if (result.isSuccess === true) {
        setSuccess(true);
        setMessage("La contraseña se modificó correctamente.");
        showAlert("La contraseña se modificó correctamente.", "success");
        setTimeout(() => router.replace("/"), 5000);
      } else {
        setMessage(result.displayMessage || "Ocurrió un error al cambiar la contraseña.");
        showAlert(result.displayMessage || "Ocurrió un error al cambiar la contraseña.", "error");
      }
    } catch (error) {
      console.error(error);
      setMessage(`Error inesperado al intentar cambiar la contraseña: ${error}`);
      showAlert("Error inesperado al intentar cambiar la contraseña.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {success ? (
        <p className="text-center text-green-600 dark:text-green-400">
          {message} <br />
          Serás redirigido al login en 5 segundos...
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nueva contraseña */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Nueva contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full placeholder:text-gray-400 bg-input text-sm rounded border px-4 py-3 focus:outline-none focus:ring"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              style={{ top: "70%", transform: "translateY(-50%)" }}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Confirmar contraseña */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Confirmar contraseña
            </label>
            <input
              type={showPassword2 ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full placeholder:text-gray-400 bg-input text-sm rounded border px-4 py-3 focus:outline-none focus:ring"
            />
            <button
              type="button"
              onClick={toggleShowPassword2}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              style={{ top: "70%", transform: "translateY(-50%)" }}
            >
              {showPassword2 ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-[#12AFF0] hover:bg-[#0e8ec0] text-gray-950 font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800"
          >
            {loading ? <RingLoader size={22} color="#ffffff" /> : "Guardar"}
          </button>

          {message && !success && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 text-center">
              {message}
            </p>
          )}
        </form>
      )}
    </>
  );
};
