import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProgressIndicator from "./progress-indicator";
import Individual from "@/assets/images/individual.png";
import Organization from "@/assets/images/organization.png";
import { useState } from "react";
import { cn } from "@/lib/utils";
import OrganizationBg from "@/assets/icons/organization-bg";
import IndividualBgLeft from "@/assets/icons/individual-bg-left";
import IndividualBgRight from "@/assets/icons/individual-bg-right";

export default function Usertype({ moveToNext }: { moveToNext: VoidFunction }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("individual");

  const handleSubmit = () => {
    moveToNext();
  };

  return (
    <div className="space-y-8 lg:w-1/2 xl:w-[40%] self-center overflow-y-scroll no-scrollbar h-auto px-1 lg:max-h-[90vh]">
      <button
        className="flex gap-[10px] items-center"
        onClick={() => navigate(-1)}
      >
        <div className="w-9 h-9 bg-[#E4E7EC] rounded-[8px] flex justify-center items-center">
          <ChevronLeft color="#98A2B3" width={24} height={24} />
        </div>
        <p className="text-[#101928] text-xs">go back</p>
      </button>
      <div className="space-y-2">
        <p className="text-[#101928] text-[40px] font-medium">
          Onboard with Tikeeti
        </p>
        <p className="text-[#667185] text-base">
          We just need a few things to get you started.
        </p>
      </div>

      <div className="space-y-8 sm:max-w-[352px]">
        <ProgressIndicator step={1} />
        <div className="space-y-4">
          <p className="text-[#101928] text-sm font-medium">
            I’m registering as:
          </p>
          <div className="flex gap-3 items-center">
            <div className="space-y-[11px]">
              <button
                className={cn(
                  "relative w-[172.5px] group h-[99px] bg-[#F0F2F5] border-[#F0F2F5] border rounded-[5px] transition-all overflow-hidden duration-300",
                  selected === "individual" && "border-success-emphasis3"
                )}
                onClick={() => setSelected("individual")}
              >
                <div
                  className={cn(
                    "absolute pointer-events-none top-2 right-2 border-[1.5px] border-[#D0D5DD] w-5 h-5 bg-white rounded-full flex justify-center items-center",
                    selected === "individual" && "border-[#0DA767]"
                  )}
                >
                  <div
                    className={cn(
                      "w-[10px] h-[10px] rounded-full bg-[#0DA767] hidden",
                      selected === "individual" && "block"
                    )}
                  />
                </div>
                <img
                  src={Individual}
                  alt="org"
                  className="absolute bottom-[-5px] left-[-5px] group-hover:bottom-0 group-hover:left-0 group-hover:transition-all group-hover:duration-500 
                  group-hover:animate-in duration-500 animate-out w-[167px] h-20 pointer-events-none rounded-[5px] z-10"
                />
                <div>
                  <IndividualBgLeft
                    className="absolute left-[-200px] group-hover:left-0 group-hover:transition-all group-hover:duration-500 group-hover:animate-in 
                    group-hover:slide-in-from-bottom-full group-hover:slide-in-from-left-full group-hover:fade-in duration-500 animate-out slide-out-to-bottom-full 
                    slide-out-to-left-full fade-out inset-0 pointer-events-none rounded-[5px]"
                  />
                </div>
                <div>
                  <IndividualBgRight
                    className="absolute left-[200px] group-hover:left-0 group-hover:transition-all group-hover:duration-500 group-hover:animate-in 
                  inset-0 pointer-events-none rounded-[5px]"
                  />
                </div>
              </button>
              <p>{"An Individual"}</p>
            </div>
            <div className="space-y-[11px]">
              <button
                className={cn(
                  "relative w-[172.5px] group h-[99px] bg-[#F0F2F5] hover:border-success-emphasis3 border-[#F0F2F5] border rounded-[5px] transition-all overflow-hidden duration-500",
                  selected === "organization" && "border-success-emphasis3"
                )}
                onClick={() => setSelected("organization")}
              >
                <div
                  className={cn(
                    "absolute pointer-events-none top-2 right-2 border-[1.5px] border-[#D0D5DD] w-5 h-5 bg-white rounded-full flex justify-center items-center",
                    selected === "organization" && "border-[#0DA767]"
                  )}
                >
                  <div
                    className={cn(
                      "w-[10px] h-[10px] rounded-full bg-[#0DA767] hidden",
                      selected === "organization" && "block"
                    )}
                  />
                </div>
                <img
                  src={Organization}
                  alt="org"
                  className="absolute bottom-[-10px] left-[-10px] group-hover:bottom-0 group-hover:left-0 group-hover:transition-all group-hover:duration-500 
                  group-hover:animate-in duration-500 animate-out w-[135px] h-20 pointer-events-none rounded-[5px] z-10"
                />
                <OrganizationBg
                  className="absolute left-[200px] group-hover:left-0 group-hover:transition-all group-hover:duration-500 group-hover:animate-in 
                    group-hover:slide-in-from-top-full group-hover:slide-in-from-right-full group-hover:fade-in duration-500 animate-out slide-out-to-top-full 
                    slide-out-to-right-full fade-out inset-0 pointer-events-none rounded-[5px]"
                />
              </button>
              <p>{"An Organization"}</p>
            </div>
          </div>
        </div>

        <Button
          variant="gradient"
          className="w-full h-14 hover:bg-slate-500"
          onClick={handleSubmit}
        >
          Proceed
        </Button>
      </div>

      <div className="sm:max-w-[352px] flex flex-col items-center justify-center gap-2">
        <p className="text-xs text-[#98A2B3] font-medium items-center flex gap-2">
          I already have an account
          <Link to="/login" className="text-sm text-secondary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
