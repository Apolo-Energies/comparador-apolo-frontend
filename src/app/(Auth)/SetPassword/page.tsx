import { FormSetPassword } from "./components/FormSetPassword";

export default function SetPasswordPage() {
  return (

    <div
      className="w-full max-w-md sm:max-w-lg max-h-[85vh] rounded-lg p-8 bg-card backdrop-blur-sm border border-border shadow-xl dark:shadow-2xl overflow-y-auto"
    >
      <p className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
        Configura tu contraseña
      </p>

      <FormSetPassword />
    </div>

  );
}
