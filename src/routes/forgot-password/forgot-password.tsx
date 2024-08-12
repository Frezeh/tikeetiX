import AuthenticationLayot from "@/components/authentication-layout";
import Logo from "@/assets/icons/logo.svg";
import { useState } from "react";
import EnterPassword from "./components/enter-password";
import EmailSent from "./components/email-sent";

export default function ForgotPassword() {
  const [step, setStep] = useState<"enter" | "sent">("enter");

  const moveToNext = () => setStep("sent");
  const goBack = () => setStep("enter");

  return (
    <AuthenticationLayot>
      <>
        <div className="hidden lg:flex bg-[url('./assets/images/password-background.png')] h-[96vh] w-[40%] bg-cover rounded-[32px] p-10 flex-col justify-start">
          <img src={Logo} alt="TikeetiX Logo" className="w-32 h-6" />
          <div className="py-20">
            <h1 className="sm:text-2xl lg:text-3xl xl:text-5xl 2xl:text-[64px] text-background leading-[120%] tracking-[-4%] font-medium">
              To forget is human, to recover is Tikeeti.
            </h1>
          </div>
        </div>

        {step === "enter" && <EnterPassword moveToNext={moveToNext} />}
        {step === "sent" && <EmailSent goBack={goBack} />}
      </>
    </AuthenticationLayot>
  );
}
