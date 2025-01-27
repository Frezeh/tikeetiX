import BankIcon from "@/assets/icons/bank-icon";
import BarChart from "@/assets/icons/bar-chart";
import Pounds from "@/assets/icons/gbp.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserProfile from "@/components/user-profile";
import {
  BellIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddSettlementAccount from "./add-settlement-account";

export default function ManageWithdrawalAccounts() {
  const navigate = useNavigate();
  const [addSettlementAccountModal, setAddSettlementAccountModal] =
    useState(false);

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="pb-3 pt-5 px-5 flex justify-between items-center border-b border-b-[#E4E7EC]">
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} color="#667185" />
            <p className="text-[#667185] font-medium text-sm">Back</p>
          </button>
          <div className="bg-[#E4E7EC] h-[38px] w-[1px]" />
          <Link to="/finance" className="flex items-center gap-1">
            <BarChart width={16} height={16} />
            <p className="text-[#667185] text-xs">Finance</p>
          </Link>
          <div className="bg-[#F0F2F5] h-[38px] px-2 rounded-[8px] flex items-center gap-2">
            <ChevronRight size={16} color="#98A2B3" />
            <p className="text-[#667185] font-medium text-xs">
              Withdrawal accounts
            </p>
          </div>
        </div>
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

      <div className="px-5 pt-5 pb-2 border-b border-[#E4E7EC] flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-[#13191C] font-medium text-[28px]">
            Withdrawal accounts
          </p>
          <p className="text-[#475367] text-base">
            Manage accounts receiving withdrawals from your sales.
          </p>
        </div>

        <Button
          prefixItem={
            <div>
              <PlusIcon width={20} height={20} fill="#FFFFFF" />
            </div>
          }
          className="w-[168px] h-9 gap-2"
          onClick={() => setAddSettlementAccountModal(true)}
        >
          Add new account
        </Button>
      </div>

      <div className="px-5 pt-5 py-6 border-b border-[#E4E7EC] flex justify-between items-start">
        <div className="flex flex-col gap-4 w-2/3 2xl:w-3/4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white border border-[#E4E7EC] rounded-[8px] flex justify-center items-center">
              <BankIcon fill="#13191C" />
            </div>
            <p className="text-[#13191C] font-medium text-xl">
              Account Details
            </p>
          </div>
          <div className="grid grid-cols-4 justify-between gap-5">
            <div className="flex flex-col justify-between gap-2">
              <p className="text-xs text-[#667185]">Account name</p>
              <p className="text-[15px] text-[#13191C] font-medium">
                John Doe D. Rockefeller
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <p className="text-xs text-[#667185]">Account number</p>
              <p className="text-[15px] text-[#13191C] font-medium">
                9018275991
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <p className="text-xs text-[#667185]">Type</p>
              <p className="text-[15px] text-[#13191C] font-medium">Business</p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <p className="text-xs text-[#667185]">Bank name</p>
              <p className="text-[15px] text-[#13191C] font-medium">
                JP Morgan & Chase
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <p className="text-xs text-[#667185]">Bank name</p>
              <p className="text-[15px] text-[#13191C] font-medium">
                JP Morgan & Chase
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <p className="text-xs text-[#667185]">Currency</p>
              <p className="text-[15px] text-[#13191C] font-medium flex gap-1 items-center">
                <img src={Pounds} className="w-3 h-3" alt="Pounds" /> GBP
                (Pounds)
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <p className="text-xs text-[#667185]">Post code</p>
              <p className="text-[15px] text-[#13191C] font-medium">110111</p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <p className="text-xs text-[#667185]">Sort code</p>
              <p className="text-[15px] text-[#13191C] font-medium">18-10-42</p>
            </div>
            <div className="flex flex-col justify-between gap-2 w-[200%]">
              <p className="text-xs text-[#667185]">Address</p>
              <p className="text-[15px] text-[#13191C] font-medium">
                1 John Doe Street, John Doe City, London, United Kingdom
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1">
            <Download color="#667185" size={12} />
            <p className="text-xs text-[#667185] font-medium">
              Download Statement
            </p>
          </button>
          <button className="flex items-center gap-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.99969 3.39784C4.34284 3.39784 2.99969 4.74099 2.99969 6.39784C2.99969 8.0547 4.34284 9.39784 5.99969 9.39784C7.65654 9.39784 8.99969 8.0547 8.99969 6.39784C8.99969 4.74099 7.65654 3.39784 5.99969 3.39784ZM3.99969 6.39784C3.99969 5.29327 4.89512 4.39784 5.99969 4.39784C7.10426 4.39784 7.99969 5.29327 7.99969 6.39784C7.99969 7.50241 7.10426 8.39784 5.99969 8.39784C4.89512 8.39784 3.99969 7.50241 3.99969 6.39784Z"
                fill="#0D67FE"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.2506 1.41229C6.55314 0.737569 5.44625 0.737569 4.74879 1.41229C4.57164 1.58367 4.32531 1.6637 4.08126 1.62918C3.12041 1.49328 2.22492 2.14389 2.05725 3.09971C2.01467 3.34248 1.86243 3.55202 1.6447 3.66754C0.787475 4.12236 0.445427 5.17508 0.8716 6.0469C0.979846 6.26834 0.979846 6.52734 0.8716 6.74878C0.445427 7.62061 0.787475 8.67332 1.6447 9.12814C1.86243 9.24367 2.01467 9.4532 2.05725 9.69597C2.22492 10.6518 3.12041 11.3024 4.08126 11.1665C4.32531 11.132 4.57164 11.212 4.74879 11.3834C5.44625 12.0581 6.55314 12.0581 7.2506 11.3834C7.42775 11.212 7.67407 11.132 7.91812 11.1665C8.87897 11.3024 9.77446 10.6518 9.94213 9.69597C9.98471 9.4532 10.1369 9.24367 10.3547 9.12814C11.2119 8.67332 11.554 7.62061 11.1278 6.74878C11.0195 6.52734 11.0195 6.26834 11.1278 6.0469C11.554 5.17508 11.2119 4.12236 10.3547 3.66754C10.1369 3.55202 9.98471 3.34248 9.94213 3.09971C9.77446 2.14389 8.87897 1.49328 7.91812 1.62918C7.67407 1.6637 7.42775 1.58367 7.2506 1.41229ZM5.44408 2.13102C5.75387 1.83133 6.24551 1.83133 6.5553 2.13102C6.95414 2.51685 7.50871 2.69705 8.05817 2.61933C8.48495 2.55896 8.88269 2.84794 8.95716 3.27249C9.05304 3.81907 9.39579 4.29082 9.88599 4.5509C10.2667 4.75292 10.4187 5.2205 10.2294 5.60774C9.98567 6.10629 9.98567 6.6894 10.2294 7.18795C10.4187 7.57518 10.2667 8.04276 9.88599 8.24478C9.39579 8.50487 9.05304 8.97662 8.95716 9.5232C8.88269 9.94774 8.48495 10.2367 8.05817 10.1764C7.50871 10.0986 6.95414 10.2788 6.5553 10.6647C6.24551 10.9644 5.75387 10.9644 5.44408 10.6647C5.04524 10.2788 4.49067 10.0986 3.94121 10.1764C3.51443 10.2367 3.11669 9.94774 3.04222 9.5232C2.94634 8.97662 2.60359 8.50487 2.11339 8.24478C1.73264 8.04276 1.58071 7.57518 1.77001 7.18795C2.01371 6.6894 2.01371 6.10629 1.77001 5.60774C1.58071 5.2205 1.73264 4.75292 2.11339 4.5509C2.60359 4.29082 2.94634 3.81907 3.04222 3.27249C3.11669 2.84794 3.51443 2.55896 3.94121 2.61933C4.49067 2.69705 5.04524 2.51685 5.44408 2.13102Z"
                fill="#0D67FE"
              />
            </svg>

            <p className="text-xs text-[#0D67FE] font-medium">Manage account</p>
          </button>
        </div>
      </div>

      <AddSettlementAccount
        addSettlementAccountModal={addSettlementAccountModal}
        setAddSettlementAccountModal={setAddSettlementAccountModal}
      />
    </div>
  );
}
