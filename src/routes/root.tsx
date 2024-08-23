import Avatar from "@/assets/icons/avatar.svg";
import BarChart from "@/assets/icons/bar-chart";
import BellIcon from "@/assets/icons/bell-icon";
import ChevronDouble from "@/assets/icons/chevron-double";
import HomeIcon from "@/assets/icons/home-icon";
import Logo from "@/assets/icons/logo-dark.svg";
import LoudSpeaker from "@/assets/icons/loud-speaker";
import SettingsIcon from "@/assets/icons/settings-icon";
import StoreIcon from "@/assets/icons/store-icon";
import TicketDivider from "@/assets/icons/ticket-divider";
import TicketIcon from "@/assets/icons/ticket-icon";
import BrowserControls from "@/assets/images/browser-controls.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuth from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useProfileContext } from "@/provider/profile-provider";
import { ChevronDown, ClipboardIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Root() {
  const { pathname } = useLocation();
  const route = pathname;
  const ticketRoutes = ["/events", "/movies", "/transportation"];
  const { isRefreshing } = useAuth();
  const { profile } = useProfileContext();
  const [showFAQ, setShowFAQ] = useState(true);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <main className="flex w-screen h-screen bg-[#F7F9FC] overflow-y-hidden">
      <div className="hidden lg:flex flex-col overflow-hidden py-6 max-h-full w-[272px] overflow-y-auto no-scrollbar">
        <div className="px-7 py-3 relative">
          <img src={Logo} alt="Logo" width={105} height={20} />
        </div>
        <div
          className="px-8 pt-5 pb-8 flex items-center gap-3 cursor-pointer border-b border-[#E4E7EC]"
          role="button"
        >
          <div className="relative">
            <img src={Avatar} alt="Avatar" width={40} height={40} />
            <div className="w-[10px] h-[10px] bg-[#04802E] rounded-full absolute right-0 border border-white bottom-1" />
          </div>
          <div>
            <p className="text-sm text-[#13191C] font-bold">
              {profile?.firstName} {profile?.lastName}
            </p>
            <p className="text-[#667185] text-xs">{profile?.email}</p>
          </div>
          <ChevronDouble fill="#D0D5DD" />
        </div>

        <ul className="flex flex-col gap-1 pt-2 px-1">
          <li>
            <Link
              to="/"
              className={cn(
                "flex gap-[14px] group items-center px-4 text-sm w-full h-11 transition-all duration-100 hover:bg-primary hover:text-background text-[#98A2B3] bg-transparent rounded-sm",
                route === "/" && "text-background font-medium bg-primary"
              )}
            >
              <HomeIcon
                className="group-hover:[&>path]:fill-background"
                fill={route === "/" ? "#FFFFFF" : "#98A2B3"}
              />
              Dashboard
            </Link>
          </li>
          <li>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger
                  className={cn(
                    "flex justify-between h-11 items-center px-4 rounded-sm hover:bg-primary group bg-transparent hover:no-underline",
                    ticketRoutes.includes(route) && "bg-[#E4E7EC]"
                  )}
                  triggerIcon={
                    <ChevronDown
                      className="group-hover:stroke-background shrink-0 transition-transform duration-200"
                      color={
                        ticketRoutes.includes(route) ? "#667185" : "#98A2B3"
                      }
                      width={20}
                      height={20}
                    />
                  }
                >
                  <div className="flex gap-[14px] items-center">
                    <TicketIcon
                      className="group-hover:[&>path]:fill-background"
                      fill={
                        ticketRoutes.includes(route) ? "#667185" : "#98A2B3"
                      }
                    />
                    <p
                      className={cn(
                        "text-sm group-hover:text-background text-[#98A2B3] group-[.hover]:text-background",
                        ticketRoutes.includes(route) &&
                          "text-[#667185] font-medium"
                      )}
                    >
                      Ticket
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="ml-7 flex gap-1">
                  <TicketDivider />
                  <div className="pt-5 flex flex-col gap-3">
                    <Link
                      to="/events"
                      className={cn(
                        "text-sm text-[#98A2B3] text-left hover:text-primary hover:font-bold transition-colors",
                        route === "/events" && "text-primary font-bold"
                      )}
                    >
                      Events
                    </Link>
                    <Link
                      to="/movies"
                      className={cn(
                        "text-sm text-[#98A2B3] text-left hover:text-primary hover:font-bold transition-colors",
                        route === "/movies" && "text-primary font-bold"
                      )}
                    >
                      Movies
                    </Link>
                    <div
                      className={cn(
                        "flex justify-between gap-5 text-sm text-[#98A2B3] text-left transition-colors"
                      )}
                    >
                      Transportation
                      <Badge className="text-[10px] font-medium text-[#98A2B3] bg-[#E4E7EC] rounded-[10px] h-[15px]">
                        Coming soon
                      </Badge>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li>
            <Link
              to="/manage-orders"
              className={cn(
                "flex justify-between group items-center px-4 text-sm w-full h-11 transition-all duration-100 hover:bg-primary hover:text-background text-[#98A2B3] bg-transparent rounded-sm",
                route === "/manage-orders" &&
                  "text-background font-medium bg-primary"
              )}
            >
              <div className="flex items-center gap-[14px]">
                <StoreIcon
                  className="group-hover:[&>path]:fill-background"
                  fill={route === "/manage-orders" ? "#FFFFFF" : "#98A2B3"}
                />
                Manage Orders
              </div>

              <Badge className="h-[17px] rounded-[10px] bg-success-emphasis text-background">
                9+
              </Badge>
            </Link>
          </li>
          <li>
            <Link
              to="/marketing"
              className={cn(
                "flex gap-[14px] group items-center px-4 text-sm w-full h-11 transition-all duration-100 hover:bg-primary hover:text-background text-[#98A2B3] bg-transparent rounded-sm",
                route === "/marketing" &&
                  "text-background font-medium bg-primary"
              )}
            >
              <LoudSpeaker
                className="group-hover:[&>path]:fill-background"
                fill={route === "/marketing" ? "#FFFFFF" : "#98A2B3"}
              />
              Marketing
            </Link>
          </li>
          <li>
            <Link
              to="/finance"
              className={cn(
                "flex gap-[14px] group items-center px-4 text-sm w-full h-11 transition-all duration-100 hover:bg-primary hover:text-background text-[#98A2B3] bg-transparent rounded-sm",
                route === "/finance" && "text-background font-medium bg-primary"
              )}
            >
              <BarChart
                className="group-hover:[&>path]:fill-background"
                fill={route === "/finance" ? "#FFFFFF" : "#98A2B3"}
              />
              Finance
            </Link>
          </li>
          <li>
            <Link
              to="/reporting"
              className={cn(
                "flex gap-[14px] group items-center px-4 text-sm w-full h-11 transition-all duration-100 hover:bg-primary hover:text-background text-[#98A2B3] bg-transparent rounded-sm",
                route === "/reporting" &&
                  "text-background font-medium bg-primary"
              )}
            >
              <ClipboardIcon
                className={cn(
                  "group-hover:[&>path]:stroke-background",
                  route === "/reporting"
                    ? "[&>path]:stroke-background"
                    : "[&>path]:stroke-[#98A2B3]"
                )}
                size={20}
              />
              Reporting
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={cn(
                "flex gap-[14px] group items-center px-4 text-sm w-full h-11 transition-all duration-100 hover:bg-primary hover:text-background text-[#98A2B3] bg-transparent rounded-sm",
                route === "/settings" &&
                  "text-background font-medium bg-primary"
              )}
            >
              <SettingsIcon
                className="group-hover:[&>path]:fill-background"
                fill={route === "/settings" ? "#FFFFFF" : "#98A2B3"}
              />
              Settings
            </Link>
          </li>
        </ul>

        {showFAQ && (
          <div className="w-full">
            <Card className="mx-4 mt-4 bg-transparent border-[#E4E7EC] transition-all duration-300">
              <CardContent className="px-4 py-5 space-y-4 relative">
                <img
                  src={BrowserControls}
                  alt="controls"
                  className="w-[94px] h-[116px] absolute top-1 left-0"
                />
                <div className="pt-10">
                  <p className="text-base font-bold text-[#13191C]">FAQS</p>
                  <p className="text-sm text-[#667185]">
                    Get to know the platform with our Frequently Asked Questions
                    (FAQs).
                  </p>
                </div>
              </CardContent>
              <CardFooter className="pl-4 gap-3">
                <button className="text-sm text-primary font-bold">
                  Check it out
                </button>
                <button
                  className="text-[#98A2B3] text-sm"
                  onClick={() => setShowFAQ(false)}
                >
                  Close
                </button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>

      <div className="border rounded-[15px] border-[#E4E7EC] mx-1 my-2 lg:w-[calc(100%-256px)] bg-background">
        <div className="py-3 px-5 flex justify-end items-center border-b border-b-[#E4E7EC]">
          <div className="flex gap-10 items-center justify-between">
            <Input
              className="w-full sm:w-[375px] h-10 rounded-md pl-10 bg-[#F0F2F5] border-0"
              placeholder="Search here..."
              prefixItem={
                <SearchIcon
                  size={20}
                  color="#667185"
                  className="absolute top-0 left-0 ml-2 mt-2.5 placeholder:text-[#667185] placeholder:text-sm"
                />
              }
            />
            <button>
              <BellIcon />
            </button>

            <Select>
              <SelectTrigger className="border-0 space-x-2 text-[#13191C] text-base  focus:ring-0">
                <SelectValue
                  placeholder={`${profile?.firstName} ${profile?.lastName}`}
                />
              </SelectTrigger>
              <SelectContent className="space-y-4">
                <div className="px-4 py-3 flex items-center gap-3 cursor-pointer border-b border-[#E4E7EC]">
                  <div className="relative">
                    <img src={Avatar} alt="Avatar" width={40} height={40} />
                    <div className="w-[10px] h-[10px] bg-[#04802E] rounded-full absolute right-0 border border-white bottom-1" />
                  </div>
                  <div>
                    <p className="text-sm text-[#13191C] font-bold">
                      {profile?.firstName} {profile?.lastName}
                    </p>
                    <p className="text-[#667185] text-xs">{profile?.email}</p>
                  </div>
                </div>
                <div className="py-1 flex flex-col gap-[10px] border-b border-[#E4E7EC]">
                  <div className="px-4 py-1 cursor-pointer">
                    <p className="text-[#344054] text-sm">View profile</p>
                  </div>
                  <div className="px-4 py-1 cursor-pointer">
                    <p className="text-[#344054] text-sm">Settings</p>
                  </div>
                  <div className="px-4 py-1 cursor-pointer">
                    <p className="text-[#344054] text-sm">Keyboard shortcuts</p>
                  </div>
                </div>
                <div className="py-1 flex flex-col gap-[10px] border-b border-[#E4E7EC]">
                  <div className="px-4 py-1 cursor-pointer">
                    <p className="text-[#344054] text-sm">Changelog</p>
                  </div>
                  <div className="px-4 py-1 cursor-pointer">
                    <p className="text-[#344054] text-sm">Support</p>
                  </div>
                  <div className="px-4 py-1 cursor-pointer">
                    <p className="text-[#344054] text-sm">API</p>
                  </div>
                </div>
                <div className="px-4 py-2 cursor-pointer">
                  <p className="text-[#344054] text-sm">Log out</p>
                </div>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Outlet />
      </div>
    </main>
  );
}

export default Root;
