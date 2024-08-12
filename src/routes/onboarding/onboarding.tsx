import Avatar from "@/assets/icons/avatar.svg";
import Logo from "@/assets/icons/logo.svg";
import AuthenticationLayot from "@/components/authentication-layout";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Register from "./components/register";
import Usertype from "./components/user-type";

export default function Onboarding() {
  const [step, setStep] = useState<"usertype" | "register">("usertype");

  const moveToNext = () => setStep("register");
  const goBack = () => setStep("usertype");

  return (
    <AuthenticationLayot>
      <>
        <div className="hidden lg:flex bg-[url('./assets/images/onboarding-background.png')] h-[96vh] w-[40%] bg-cover rounded-[32px] p-10 flex-col justify-between">
          <img src={Logo} alt="TikeetiX Logo" className="w-32 h-6" />
          <div className="space-y-8">
            <h1 className="sm:text-2xl lg:text-3xl xl:text-5xl 2xl:text-[64px] text-background leading-[120%] tracking-[-4%] font-medium">
              Elevate your ticketing workflow with Tikeeti!
            </h1>
            <p className="xl:text-lg text-background leading-[145%] opacity-40">
              Our comprehensive ticket management system offers you an
              unparalleled range of tools to ensure you get maximum value from
              your campaigns.
            </p>
          </div>
          <Card className="w-full rounded-[20px] bg-primary border-none">
            <CardContent className="space-y-2 p-4 pt-4 xl:pt-6 xl:p-6">
              <p className="text-xs xl:text-base leading-[145%] text-[#F0E6E6]">
                "As an organizer of multiple events, finding a reliable and
                all-encompassing ticketing solution was crucial. Tikeeti-x
                provides everything we need, from ticket sales to management and
                analytics, all in one platform. It's user-friendly, efficient,
                and has significantly streamlined our operations, allowing us to
                focus more on creating memorable events."
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={Avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="space-y-1">
                  <p className="text-background">Maria Shaniqua</p>
                  <p className="text-[#A29999] text-xs">Concert organizer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {step === "usertype" && <Usertype moveToNext={moveToNext} />}
        {step === "register" && <Register goBack={goBack} />}
      </>
    </AuthenticationLayot>
  );
}
