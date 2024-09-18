import AiStars from "@/assets/icons/ai-stars";
import ChatIcon from "@/assets/icons/chat-icon";
import LoudSpeaker from "@/assets/icons/loud-speaker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProfileContext } from "@/provider/profile-provider";
import { Calendar, Check, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const { profile } = useProfileContext();
  const todaysDate = new Date();

  return (
    <div className="flex flex-col justify-center items-center self-center px-10 h-[calc(100vh/1.5)]">
      <div className="flex gap-1 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Calendar size={12} color="#344054" />
          <p className="text-[#475467] text-xs">Today’s Date</p>
        </div>
        {/* <p className="font-bold text-base text-[#344054]">1st July, 2023</p> */}
        <p className="font-bold text-base text-[#344054]">
          {todaysDate.toLocaleDateString("en-UK", {
            year: "numeric",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>
      <div className="space-y-1 flex flex-col items-center">
        <p className="font-medium text-2xl text-[#13191C]">
          Welcome {profile?.firstName} {profile?.lastName}
        </p>
        <p className="text-base text-[#475367]">
          It’s a sunny day today, what would you like to do? 😊
        </p>
      </div>
      <div className="py-10 flex items-center justify-between gap-2">
        <Card className="border-0 lg:w-[200px] xl:w-[262px] h-[129px] rounded-[12px] flex items-center justify-center cursor-pointer ai-gradient">
          <CardContent className="px-[15px] py-5 h-[124px] rounded-[12px] lg:w-[195px] xl:w-[257px] bg-[#140B36] space-y-1 relative flex flex-col">
            <div className=" flex justify-between items-center">
              <div className="w-10 h-10 rounded-[8px] ai-gradient flex justify-center items-center">
                <div className="w-[38px] h-[38px] flex justify-center items-center bg-[#140B36] rounded-[8px]">
                  <AiStars />
                </div>
              </div>
              <ChevronRight size={30} color="#13191C" />
            </div>
            <p className="text-sm xl:text-base font-medium text-white">
              Explore Ticket creation with{" "}
              <span className="text-success-emphasis3">A.I ticket maker</span>
            </p>
          </CardContent>
        </Card>
        <Card className="px-[15px] py-5 bg-transparent border-[#E4E7EC] lg:w-[200px] xl:w-[262px] h-[129px] rounded-[12px] cursor-pointer">
          <CardContent className="p-0 space-y-4 relative flex justify-between items-center">
            <div className="space-y-1">
              <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex justify-center items-center">
                <Calendar size={20} color="#344054" />
              </div>
              <p className="text-sm xl:text-base text-[#13191C]">
                Create a ticket
              </p>
            </div>

            <ChevronRight size={30} color="#13191C" />
          </CardContent>
        </Card>
        <Card className="px-[15px] py-5 bg-transparent border-[#E4E7EC] lg:w-[200px] xl:w-[262px] h-[129px] rounded-[12px] cursor-pointer">
          <CardContent className="p-0 space-y-4 relative flex justify-between items-center">
            <div className="space-y-1">
              <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex justify-center items-center">
                <LoudSpeaker fill="#13191C" />
              </div>
              <p className="text-sm xl:text-base text-[#13191C]">
                Marketing feeds & blogs
              </p>
            </div>

            <ChevronRight size={30} color="#13191C" />
          </CardContent>
        </Card>
      </div>
      <div className="bg-[#E4E7EC] w-full h-[1px] mt-5 mb-3 xl:mt-20 xl:mb-10" />
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-base text-[#13191C] font-medium items-center">
          Your <span className="text-success-emphasis3">Tikeeti</span> account
          comes with tools to help you grow.
        </p>

        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-2">
            <Check color="#0DA767" size={20} />
            <p className="text-[#13191C] text-xs ">Transportation</p>
          </div>
          <div className="flex items-center gap-2">
            <Check color="#0DA767" size={20} />
            <p className="text-[#13191C] text-xs ">Events</p>
          </div>
          <div className="flex items-center gap-2">
            <Check color="#0DA767" size={20} />
            <p className="text-[#13191C] text-xs ">Movies</p>
          </div>
          <div className="flex items-center gap-2">
            <Check color="#0DA767" size={20} />
            <p className="text-[#13191C] text-xs ">Sports</p>
          </div>
          <div className="flex items-center gap-2">
            <Check color="#0DA767" size={20} />
            <p className="text-[#13191C] text-xs ">And much more...</p>
          </div>
        </div>
      </div>

      <Button
        className="absolute bottom-5 right-5 w-[157px] h-14 rounded-[8px] bg-[#13191C] bg-gradient-to-r from-[#13191C] to-[#13191C] hover:from-primary/90 hover:to-secondary/90"
        variant="gradient"
      >
        <div className="flex gap-2 items-center">
          <p className="text-center">Take a tour</p> <ChatIcon />
        </div>
      </Button>
    </div>
  );
}
