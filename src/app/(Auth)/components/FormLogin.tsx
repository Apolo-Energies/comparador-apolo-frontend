"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { MoonLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { authenticate } from "@/actions";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { Button } from "@/components/buttons/button";

export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const [remember, setRemember] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/Comparator";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );


  const { showAlert } = useAlertStore();

  const lastErrorRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (errorMessage && errorMessage !== lastErrorRef.current) {
      showAlert(errorMessage, "error");
      lastErrorRef.current = errorMessage;
    }
  }, [errorMessage, showAlert]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleRemember = () => {
    const newState = !remember;
    setRemember(newState);

    if (newState) {
      localStorage.setItem("remember_email", email);
    } else {
      localStorage.removeItem("remember_email");
    }
  };

  return (
    <form action={formAction} className="space-y-6">
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
          className="w-full px-4 py-3 text-base rounded-lg border bg-card border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
          placeholder="apolo@email.com"
          required
        />
      </div>

      <div className="relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Contraseña
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 text-base rounded-lg border bg-card border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
          placeholder="••••••••"
          required
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          style={{ top: "50%", transform: "translateY(-7%)" }}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
      <div className="flex items-center gap-3 select-none">
        <button
          type="button"
          onClick={toggleRemember}
          className={`w-12 h-6 flex items-center rounded-full transition-all 
                     ${remember ? "bg-[#12AFF0]" : "bg-gray-600"}`}
        >
          <span
            className={`w-5 h-5 bg-white rounded-full shadow transform transition-all
                        ${remember ? "translate-x-6" : "translate-x-1"}`}
          />
        </button>

        <span className="text-sm text-gray-300">Recordar contraseña</span>
      </div>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <Button
        type="submit"
        variant="default"
        disabled={isPending}
        className="w-full cursor-pointer font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2"
      >
        {isPending ? (
          <MoonLoader size={22} color="#03116d" />
        ) : (
          "Iniciar Sesión"
        )}
      </Button>
      {/* <div className="flex justify-end mt-2">
        <Link
          href="/RecuperarCuenta"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div> */}
    </form>
  );
};
