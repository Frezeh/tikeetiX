import Avatar from "@/assets/icons/avatar.svg";
import { removeItem } from "@/lib/utils";
import { useProfileContext } from "@/provider/profile-provider";
import { logout } from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./ui/loading";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

export default function UserProfile() {
  const navigate = useNavigate();
  const { profile } = useProfileContext();
  const { isPending, mutate } = useMutation({ mutationFn: logout });

  return (
    <Select>
      <SelectTrigger className="border-0 space-x-2 text-[#13191C] text-base  focus:ring-0">
        <SelectValue
          placeholder={`${profile?.firstName} ${profile?.lastName}`}
        />
      </SelectTrigger>
      <SelectContent className="space-y-4 shadow-sm border-[#F2F4F7]">
        <div className="px-4 py-3 flex items-center gap-3 cursor-pointer border-b border-[#F2F4F7]">
          <div className="relative">
            <img
              src={profile?.profilePicture ? profile?.profilePicture : Avatar}
              alt="Avatar"
              width={40}
              height={40}
            />
            <div className="w-[10px] h-[10px] bg-[#04802E] rounded-full absolute right-0 border border-white bottom-1" />
          </div>
          <div>
            <p className="text-sm text-[#13191C] font-bold">
              {profile?.firstName} {profile?.lastName}
            </p>
            <p className="text-[#667185] text-xs">{profile?.email}</p>
          </div>
        </div>
        <div className="py-1 flex flex-col gap-[10px] border-b border-[#F2F4F7]">
          <div
            className="px-4 py-1 cursor-pointer"
            onClick={() => navigate("/settings")}
            role="button"
          >
            <p className="text-[#344054] text-sm">View profile</p>
          </div>
        </div>
        <div className="py-1 flex flex-col gap-[10px] border-b border-[#F2F4F7]">
          <div className="px-4 py-1 cursor-pointer">
            <Link
              to="/faq"
              rel="noreferrer"
              target={"_blank"}
              className="text-[#344054] text-sm"
            >
              FAQs
            </Link>
          </div>
        </div>
        <button
          className="px-4 py-2 cursor-pointer flex items-center"
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
          {isPending ? (
            <Loading />
          ) : (
            <p className="text-[#E72113] text-sm">Log out</p>
          )}
        </button>
      </SelectContent>
    </Select>
  );
}
