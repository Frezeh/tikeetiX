import Logo from "@/assets/icons/logo.svg";
import AuthenticationLayot from "@/components/authentication-layout";
import { useState } from "react";
import RegisterOrganization from "./components/register-organization";
import RegisterUser from "./components/register-user";
import Usertype from "./components/user-type";
import VerifyEmail from "./components/verify-email";
import AuthenticationMarque from "@/components/authentication-marque";

export default function Onboarding() {
  const [step, setStep] = useState<"usertype" | "register" | "otp">("usertype");
  const [type, setType] = useState<"Individual" | "Organization">("Individual");
  const [email, setEmail] = useState("");

  const moveToNext = () => {
    if (step === "usertype") {
      setStep("register");
    } else if (step === "register") {
      setStep("otp");
    }
  };
  const goBack = () => {
    if (step === "otp") {
      setStep("register");
    } else if (step === "register") {
      setStep("usertype");
    }
  };

  return (
    <AuthenticationLayot>
      <>
        <div className="hidden lg:flex bg-[url('./assets/images/login-background.png')] bg-[#F5FFF0] h-[96vh] lg:w-[40%] xl:w-[45%] bg-cover rounded-[32px] py-10 flex-col lg:gap-10 xl:gap-20">
          <div className=" px-10">
            <img src={Logo} alt="TikeetiX Logo" className="w-32 h-6" />
          </div>
          <div className="space-y-5 px-10">
            <h1 className="sm:text-2xl lg:text-3xl xl:text-5xl 2xl:text-[64px] text-primary leading-[120%] tracking-[-4%] font-medium">
              Elevate your ticketing workflow with Tikeeti!
            </h1>
            <p className="xl:text-lg leading-[145%] text-[#667185]">
              Our comprehensive ticket management system offers you an
              unparalleled range of tools to ensure you get maximum value from
              your campaigns.
            </p>
          </div>
          <AuthenticationMarque />
        </div>

        {step === "usertype" && (
          <Usertype moveToNext={moveToNext} type={type} setType={setType} />
        )}
        {step === "register" &&
          (type === "Individual" ? (
            <RegisterUser
              goBack={goBack}
              moveToNext={moveToNext}
              type={type}
              setEmail={setEmail}
            />
          ) : (
            <RegisterOrganization
              goBack={goBack}
              moveToNext={moveToNext}
              type={type}
              setEmail={setEmail}
            />
          ))}
        {step === "otp" && <VerifyEmail goBack={goBack} email={email} />}
      </>
    </AuthenticationLayot>
  );
}
