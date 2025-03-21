import { Button } from "@/components/ui/button";
import UpgradePlanBG from "@/assets/images/upgrade-planBG.svg";
import { MoveUpRight } from "lucide-react";

export default function UpgradePlan() {
  return (
    <div className="rounded-[8px] hidden justify-between bg-gradient-to-r from-[#EAFFE000] to-[#EAFFE0] from-[0%] to-[100%] overflow-hidden">
      <div className="flex flex-col gap-[3px] p-5">
        <p className="text-base text-[#13191C] font-medium">
          You’re currently on the free plan
        </p>
        <p className="text-sm text-[#667185]">
          Upgrade to a Pro plan to enjoy more features and perks
        </p>
      </div>

      <div className="flex gap-3">
        <div className="h-[38px] self-center rounded-[8px] ai-gradient flex justify-center items-center px-[1px]">
          <Button
            variant="ghost"
            suffixItem={<MoveUpRight size={25} color="#13191C" />}
            className="rounded-[8px] h-9 gap-2 text-[#133205] text-sm font-medium px-3 py-[10px]"
          >
            Upgrade now
          </Button>
        </div>
        <img src={UpgradePlanBG} alt="UpgradePlan" />
      </div>
    </div>
  );
}
