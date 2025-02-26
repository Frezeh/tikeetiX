import Logo from "@/assets/icons/logo.svg";
import AuthenticationLayot from "@/components/authentication-layout";
import { User } from "@/services/models/auth";
import { useState } from "react";
import Auth from "./components/auth";
import Otp from "./components/otp";

export default function Login() {
  const [step, setStep] = useState<"auth" | "otp">("auth");
  const [userPayload, setUserPayload] = useState<Partial<User>>({});

  const moveToNext = () => setStep("otp");
  const goBack = () => setStep("auth");

  return (
    <AuthenticationLayot>
      <>
        <div className="hidden lg:flex bg-[url('./assets/images/login-background.png')] bg-[#F5FFF0] h-[96vh] lg:w-[40%] xl:w-[45%] bg-cover rounded-[32px] p-10 flex-col lg:gap-10 xl:gap-20">
          <img src={Logo} alt="TikeetiX Logo" className="w-32 h-6" />
          <div className="space-y-5">
            <h1 className="sm:text-2xl lg:text-3xl xl:text-5xl 2xl:text-[64px] text-primary leading-[120%] tracking-[-4%] font-medium">
              Elevate your ticketing workflow with Tikeeti!
            </h1>
            <p className="xl:text-lg leading-[145%] text-[#667185]">
              Our comprehensive ticket management system offers you an
              unparalleled range of tools to ensure you get maximum value from
              your campaigns.
            </p>
          </div>
        </div>

        {step === "auth" && (
          <Auth moveToNext={moveToNext} setUserPayload={setUserPayload} />
        )}
        {step === "otp" && <Otp goBack={goBack} userPayload={userPayload} />}
      </>
    </AuthenticationLayot>
  );
}
