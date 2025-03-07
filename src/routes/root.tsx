import Avatar from "@/assets/icons/avatar.svg";
import BarChart from "@/assets/icons/bar-chart";
import BellIcon from "@/assets/icons/bell-icon";
import ChevronDouble from "@/assets/icons/chevron-double";
import GBP from "@/assets/icons/gbp.svg";
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
import Loading from "@/components/ui/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserProfile from "@/components/user-profile";
import useAuth from "@/hooks/use-auth";
import { cn, removeItem, routesWithoutHeader, ticketRoutes } from "@/lib/utils";
import { useProfileContext } from "@/provider/profile-provider";
import { logout } from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ChevronDown, ClipboardIcon, LogOut, SearchIcon } from "lucide-react";
import { useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const CURRENCY = [
  {
    id: 0,
    country: "United Kingdom",
    value: "GBP",
    imageUrl: GBP,
  },
];

function Root() {
  const { pathname } = useLocation();
  const route = pathname;
  const { isRefreshing, isLoading } = useAuth();
  const { profile } = useProfileContext();
  const [showFAQ, setShowFAQ] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  if (isRefreshing || isLoading) {
    return <Loader />;
  }

  const { isPending, mutate } = useMutation({ mutationFn: logout });

  return (
    <main className="flex w-screen h-screen bg-[#F7F9FC] overflow-hidden">
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
                    ticketRoutes(id).includes(route) && "bg-[#E4E7EC]"
                  )}
                  triggerIcon={
                    <ChevronDown
                      className="group-hover:stroke-background shrink-0 transition-transform duration-200"
                      color={
                        ticketRoutes(id).includes(route) ? "#667185" : "#98A2B3"
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
                        ticketRoutes(id).includes(route) ? "#667185" : "#98A2B3"
                      }
                    />
                    <p
                      className={cn(
                        "text-sm group-hover:text-background text-[#98A2B3] group-[.hover]:text-background",
                        ticketRoutes(id).includes(route) &&
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
                        (route === "/events" ||
                          route === "/create-event" ||
                          route === `/event-details/${id}`) &&
                          "text-primary font-bold"
                      )}
                    >
                      Events
                    </Link>
                    <Link
                      to="/movies"
                      className={cn(
                        "text-sm text-[#98A2B3] text-left hover:text-primary hover:font-bold transition-colors",
                        (route === "/movies" ||
                          route === "/create-movie" ||
                          route === `/movie-details/${id}`) &&
                          "text-primary font-bold"
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
                (route === "/finance" ||
                  route === "/finance/withdraw-accounts") &&
                  "text-background font-medium bg-primary"
              )}
            >
              <BarChart
                className="group-hover:[&>path]:fill-background"
                fill={
                  route === "/finance" || route === "/finance/withdraw-accounts"
                    ? "#FFFFFF"
                    : "#98A2B3"
                }
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
          <li>
            <button
              className={cn(
                "flex gap-3 items-center px-4 text-sm w-full h-11 transition-all duration-100 text-[#BD1B0F]"
              )}
              onClick={() => {
                mutate(undefined, {
                  onSuccess: () => {
                    removeItem("user");
                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    navigate("/login");
                  },
                  onError: () => {
                    navigate("/login");
                  },
                });
              }}
            >
              <LogOut size={20} color="#BD1B0F" />
              {isPending ? <Loading /> : <span>Log out</span>}
            </button>
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

      <div className="border rounded-[15px] border-[#E4E7EC] mx-1 my-2 lg:w-[calc(100%-256px)] bg-background overflow-hidden">
        {!routesWithoutHeader(id).includes(route) && (
          <div className="py-3 px-5 flex justify-between items-center border-b border-b-[#E4E7EC]">
            <Select>
              <SelectTrigger
                className="w-fit min-w-[97px] h-9 border-[#D0D5DD] rounded-[8px] bg-[#F0F2F5] text-[#344054]"
                prefixIcon={<img src={GBP} alt="Globe" className="mr-1" />}
              >
                <SelectValue
                  className="placeholder:text-[#344054] text-sm"
                  placeholder={
                    <span>
                      <strong>GBP</strong> (United Kingdom)
                    </span>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CURRENCY.map((currency) => (
                    <SelectItem
                      value={currency.value}
                      key={currency.id}
                      className="text-[#344054] text-sm"
                    >
                      {currency.value} ({currency.country})
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex gap-10 items-center justify-between">
              <Input
                className="w-[175px] sm:w-[200px] xl:w-[375px] h-10 rounded-md pl-10 bg-[#F0F2F5] border-0"
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
              <UserProfile />
            </div>
          </div>
        )}
        {/* <div className="h-full overflow-scroll no-scrollbar pb-20"> */}
        <ScrollArea className="h-screen overflow-scroll no-scrollbar">
          <Outlet />
        </ScrollArea>
        {/* </div> */}
      </div>
    </main>
  );
}

export default Root;
