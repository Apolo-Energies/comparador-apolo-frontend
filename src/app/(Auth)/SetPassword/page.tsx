import { FormSetPassword } from "./components/FormSetPassword";

export default function SetPasswordPage() {
  return (
    <>
      <p className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
        Configura tu contraseña
      </p>
      <FormSetPassword />
    </>
  );
}
