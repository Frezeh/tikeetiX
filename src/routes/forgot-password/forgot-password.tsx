import AuthenticationLayot from "@/components/authentication-layout";
import Logo from "@/assets/icons/logo.svg";
import { useState } from "react";
import EnterPassword from "./components/enter-password";
import EmailSent from "./components/email-sent";

export default function ForgotPassword() {
  const [step, setStep] = useState<"enter" | "sent">("enter");
  const [email, setEmail] = useState("");

  const moveToNext = () => setStep("sent");
  const goBack = () => setStep("enter");

  return (
    <AuthenticationLayot>
      <>
        <div className="hidden lg:flex bg-[url('./assets/images/password-background.png')] bg-[#F5FFF0] h-[96vh] lg:w-[40%] xl:w-[45%] bg-cover rounded-[32px] p-10 flex-col lg:gap-10 xl:gap-20">
          <img src={Logo} alt="TikeetiX Logo" className="w-32 h-6" />
          <div className="space-y-5">
            <h1 className="sm:text-2xl lg:text-3xl xl:text-5xl 2xl:text-[64px] text-primary leading-[120%] tracking-[-4%] font-medium">
              To forget is human, to recover is Tikeeti.
            </h1>
            <p className="xl:text-lg leading-[145%] text-[#667185]">
              Our comprehensive ticket management system offers you an
              unparalleled range of tools to ensure you get maximum value from
              your campaigns.
            </p>
          </div>
        </div>

        {step === "enter" && <EnterPassword moveToNext={moveToNext} setEmail={setEmail} />}
        {step === "sent" && <EmailSent goBack={goBack} email={email} />}
      </>
    </AuthenticationLayot>
  );
}
