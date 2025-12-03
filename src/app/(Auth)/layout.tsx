import { ModeToggle } from "@/components/buttons/ModeToggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen dark:bg-body bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative">

      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      {/* <div className="w-full max-w-md"> */}
      {/* <div className="text-center mb-8">
          <div className="block dark:hidden">
            <Image
              src="/logos/apolologo.webp"
              alt="Logo Light"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto mx-auto"
              priority
            />
          </div>

          <div className="hidden dark:block">
            <Image
              src="/logos/apolologo2.webp"
              alt="Logo Dark"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto mx-auto"
              priority
            />
          </div>
        </div> */}

      <div className="flex items-center justify-center w-full">
        <div className="w-[80vw] h-[80vh] rounded-lg p-8 bg-card backdrop-blur-sm border border-border shadow-xl dark:shadow-2xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
