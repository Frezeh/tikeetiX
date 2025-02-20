import RegisterSuccessIcon from "@/assets/icons/register-success-icon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import Loading from "@/components/ui/loading";
import OtpInput from "@/components/ui/otp-input";
import { useToast } from "@/hooks/use-toast";
import { verifyEmail } from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  goBack: VoidFunction;
  email: string;
};

export default function VerifyEmail({ goBack, email }: Props) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isPending, mutate } = useMutation({ mutationFn: verifyEmail });
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState(false);

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleSubmit = () => {
    verifyOtp();
  };

  const verifyOtp = () => {
    mutate(
      { email, code: otp },
      {
        onSuccess: (res) => {
          if (res.data) {
            setOpen(true);
          } else {
            toast({
              title: "Failed to verify email",
              variant: "error",
            });
          }
        },
        onError: (err: any) => {
          toast({
            title: err?.error?.message
              ? err?.error?.message
              : "Failed to verify email",
            variant: "error",
          });
        },
      }
    );
  };

  useEffect(() => {
    if (otp.length === 5) {
      verifyOtp();
    }
  }, [otp]);

  return (
    <div className="space-y-8 lg:w-1/2 xl:w-[40%] self-center overflow-y-scroll no-scrollbar h-auto px-1 lg:max-h-[90vh]">
      <button className="flex gap-[10px] items-center" onClick={goBack}>
        <div className="w-9 h-9 bg-[#E4E7EC] rounded-[8px] flex justify-center items-center">
          <ChevronLeft color="#98A2B3" width={24} height={24} />
        </div>
        <p className="text-[#101928] text-xs">go back</p>
      </button>
      <div className="space-y-2">
        <p className="text-[#101928] text-[40px] font-medium">Verify email</p>
      </div>

      <div className="space-y-4 sm:max-w-[375px]">
        <div>
          <p className="text-[#101928] text-sm font-medium">
            Enter the OTP Code sent to your email below
          </p>
          <OtpInput length={5} onUpdate={handleOtpChange} />
        </div>

        <div className="w-full pt-4">
          <Button
            variant="gradient"
            className="w-full h-14"
            onClick={handleSubmit}
            disabled={isPending || otp.length !== 6}
          >
            {isPending ? <Loading /> : "Submit"}
          </Button>
        </div>
      </div>

      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(!open);
          navigate("/login");
        }}
      >
        <DialogContent className="w-3/4 sm:max-w-[413px] sm:h-[266px] justify-center items-center gap-2 rounded-[10px]">
          <RegisterSuccessIcon />

          <DialogFooter className="w-full justify-center items-center">
            <p className="font-medium text-xl sm:text-2xl text-center">
              Account created
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
