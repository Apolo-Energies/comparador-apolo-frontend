import { ModeToggle } from "@/components/buttons/ModeToggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen dark:bg-body bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative">

      {/* <div className="absolute top-4 right-4">
        <ModeToggle />
      </div> */}

      <div className="flex items-center justify-center w-full">
        {/* <div className="w-[80vw] h-[80vh] rounded-lg p-8 bg-card backdrop-blur-sm border border-border shadow-xl dark:shadow-2xl overflow-hidden"> */}
          {children}
        {/* </div> */}
      </div>
    </div>
  );
}
