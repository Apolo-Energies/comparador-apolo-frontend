import { FormRecuperarCuenta } from "./components/FormRecuperarCuenta";

export default function RecuperarCuentaPage() {
  return (
    <>
      <p className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
        Resetear contraseña
      </p>
      <FormRecuperarCuenta />
    </>
  );
}
