import { LoginForm } from "@/components/auth/login-form";
import { AudioWaveformIcon } from "lucide-react";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <div className="bg-foreground text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <AudioWaveformIcon className="size-4 bg-foreground" />
            </div>
            Company Name.
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className=" relative hidden lg:block">
        <Image
          src="/pattern.png"
          fill
          alt="Image"
          className="h-full w-full object-cover scale-x-[-1]"
        />
      </div>
    </div>
  );
};

export default LoginPage;
