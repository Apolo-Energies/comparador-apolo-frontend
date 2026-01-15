import { FormLogin } from "./components/FormLogin";
import { LoginSlider } from "./components/LoginSlider";

export default function LoginPage() {
  return (
    <div className="w-[80vw] h-[80vh] rounded-lg p-8 bg-card backdrop-blur-sm border border-border shadow-xl dark:shadow-2xl overflow-hidden">

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-auto md:h-full">

        <div className="hidden md:flex items-center justify-center">
          <LoginSlider />
        </div>

        <div className="flex justify-center md:items-start items-start py-10 md:py-0 md:pr-0.5 md:pl-10">
          <div className="w-full max-w-md px-0.5 md:px-0 mt-0 md:mt-20">

            <p className="text-3xl font-semibold mb-6 md:mb-8 leading-tight text-white text-center md:text-left">
              Acceder al <br />Panel de Control
            </p>

            <FormLogin />

          </div>
        </div>

      </div>
    </div>
  );
}
