import { RegisterForm } from "@/components/auth/register-form";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex justify-center items-center gap-2 self-center font-medium text-foreground">
          <Image
            src={"/logo/helagpt_text_right_dark.png"}
            alt="Logo"
            width={200}
            height={100}
          />
        </Link>
        <RegisterForm />
      </div>
    </div>
  );
}
