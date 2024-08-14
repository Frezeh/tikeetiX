import EmailSentIcon from "@/assets/icons/email-sent-icon";
import { ChevronLeft } from "lucide-react";

type Props = {
  goBack: () => void;
  email: string;
};

export default function EmailSent({ goBack, email }: Props) {
  return (
    <div className="lg:w-1/2 self-center overflow-y-scroll no-scrollbar h-auto px-1 lg:max-h-[90vh]">
      <div className="max-w-[357px] space-y-10 mx-auto">
        <button className="flex gap-[10px] items-center" onClick={goBack}>
          <div className="w-9 h-9 bg-[#E4E7EC] rounded-[8px] flex justify-center items-center">
            <ChevronLeft color="#98A2B3" width={24} height={24} />
          </div>
          <p className="text-[#101928] text-xs">go back</p>
        </button>

        <div className="flex items-center justify-center">
          <EmailSentIcon />
        </div>

        <div>
          <p className="text-[#101928] text-center text-[28px] font-medium">
            Email sent
          </p>
          <p className="text-[#667185] text-center text-base">{`We have sent an email to ${email} with instructions on how to reset your password.`}</p>
        </div>
      </div>
    </div>
  );
}
