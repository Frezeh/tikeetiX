import { Button } from "@/components/ui/button";
import OtpInput from "@/components/ui/otp-input";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Otp({ goBack }: { goBack: VoidFunction }) {
  const [otp, setOtp] = useState("");
  const [otpStatus, setOtpStatus] = useState<"pending" | "success" | "error">(
    "pending"
  )

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleSubmit = () => {
    console.log(otp);
  }

  return (
    <div className="space-y-8 lg:w-1/2 xl:w-[40%] self-center overflow-y-scroll no-scrollbar h-auto px-1 lg:max-h-[90vh]">
      <button className="flex gap-[10px] items-center" onClick={goBack}>
        <div className="w-9 h-9 bg-[#E4E7EC] rounded-[8px] flex justify-center items-center">
          <ChevronLeft color="#98A2B3" width={24} height={24} />
        </div>
        <p className="text-[#101928] text-xs">go back</p>
      </button>
      <div className="space-y-2">
        <p className="text-[#101928] text-[40px] font-medium">OTP Login</p>
      </div>

      <div className="space-y-4 sm:max-w-[375px]">
        <div>
          <p className="text-[#101928] text-sm font-medium">
            Enter the OTP Code sent to your email below
          </p>
          <OtpInput length={6} onUpdate={handleOtpChange} />
        </div>

        <div className="w-full pt-4">
          <Button variant="gradient" className="w-full h-14" onClick={handleSubmit}>
            Submit
            {/* {loading ? <Loading /> : "Log in"} */}
          </Button>
        </div>
      </div>

      <div className="sm:max-w-[375px] flex flex-col items-center justify-center gap-2">
        <p className="text-xs text-[#98A2B3] font-medium items-center flex gap-2">
          Are you new here?
          <Link to="/onboarding" className="text-sm text-secondary font-medium">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
