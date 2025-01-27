import { cn } from "@/lib/utils";
import React, { useState, useRef, ChangeEvent } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  length: number;
  onUpdate: (otp: string) => void;
}

const OtpInput = ({ className, onUpdate, length, ...props }: InputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onUpdate(newOtp.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleCopyAndPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    if (pastedData.length === length) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      onUpdate(newOtp.join(""));
    }
  }

  return (
    <div className="flex space-x-3 w-full">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handleCopyAndPaste}
          className={cn(
            "w-1/4 h-14 border border-[#F0F2F5] bg-[#F0F2F5] rounded-[6px] text-center text-xl ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
            className
          )}
          {...props}
        />
      ))}
    </div>
  );
};

export default OtpInput;
