import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import IntegrationIcon from "./integration-icon";
import StripeIcon from "./stripe";

export default function Integrations() {
  const [manage, setManage] = useState<
    {
      id: number;
      selected: boolean;
    }[]
  >(new Array(10).fill("").map((_, index) => ({ id: index, selected: false })));

  return (
    <div className="pb-20 pt-3">
      <div className="flex items-center justify-between rounded-[8px] px-5 bg-gradient-to-r from-[#FFFFFF] to-[#E4E7EC] from-[0%] to-[100%]">
        <div className="space-y-1 py-2">
          <h1 className="font-medium text-[28px]">Integrations</h1>
          <p className="text-[#475367]">Manage your integrations settings</p>
        </div>
        <IntegrationIcon />
      </div>

      <div className="grid grid-cols-4 gap-2 p-5">
        {new Array(10).fill("").map((_, index) => (
          <Card
            key={index}
            x-chunk="dashboard-06-chunk-0"
            className="rounded-[8px] border-[#F0F2F5] shadow-none mb-2"
          >
            <CardContent className="p-0 m-0 px-3 py-3 flex justify-between">
              <div className="space-y-1">
                <StripeIcon />
                <div className="space-y-2">
                  <p>Stripe</p>
                </div>
                <p className="text-xs text-[#667185]">
                  A suite of APIs powering online payment processing and
                  commerce solutions
                </p>
              </div>
              <button className="flex gap-1 justify-start items-start h-3">
                <div className="border-b border-[#98A2B3] justify-end items-end flex flex-col">
                  <p className="text-[10px] text-[#98A2B3] justify-end self-end">
                    stripe
                  </p>
                </div>
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                  <path
                    d="M10.6036 4.60355C10.7988 4.40829 10.7988 4.09171 10.6036 3.89645L8.60355 1.89645C8.40829 1.70118 8.09171 1.70118 7.89645 1.89645C7.70118 2.09171 7.70118 2.40829 7.89645 2.60355L9.04289 3.75H8.25C4.38401 3.75 1.25 6.88401 1.25 10.75C1.25 11.0261 1.47386 11.25 1.75 11.25C2.02614 11.25 2.25 11.0261 2.25 10.75C2.25 7.43629 4.93629 4.75 8.25 4.75H9.04289L7.89645 5.89645C7.70118 6.09171 7.70118 6.40829 7.89645 6.60355C8.09171 6.79882 8.40829 6.79882 8.60355 6.60355L10.6036 4.60355Z"
                    fill="#98A2B3"
                  />
                </svg>
              </button>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-[#E4E7EC] mt-2 p-3">
              <button className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.99969 3.39784C4.34284 3.39784 2.99969 4.74099 2.99969 6.39784C2.99969 8.0547 4.34284 9.39784 5.99969 9.39784C7.65654 9.39784 8.99969 8.0547 8.99969 6.39784C8.99969 4.74099 7.65654 3.39784 5.99969 3.39784ZM3.99969 6.39784C3.99969 5.29327 4.89512 4.39784 5.99969 4.39784C7.10426 4.39784 7.99969 5.29327 7.99969 6.39784C7.99969 7.50241 7.10426 8.39784 5.99969 8.39784C4.89512 8.39784 3.99969 7.50241 3.99969 6.39784Z"
                    fill="#667185"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.2506 1.41229C6.55314 0.737569 5.44625 0.737569 4.74879 1.41229C4.57164 1.58367 4.32531 1.6637 4.08126 1.62918C3.12041 1.49328 2.22492 2.14389 2.05725 3.09971C2.01467 3.34248 1.86243 3.55202 1.6447 3.66754C0.787475 4.12236 0.445427 5.17508 0.8716 6.0469C0.979846 6.26834 0.979846 6.52734 0.8716 6.74878C0.445427 7.62061 0.787475 8.67332 1.6447 9.12814C1.86243 9.24367 2.01467 9.4532 2.05725 9.69597C2.22492 10.6518 3.12041 11.3024 4.08126 11.1665C4.32531 11.132 4.57164 11.212 4.74879 11.3834C5.44625 12.0581 6.55314 12.0581 7.2506 11.3834C7.42775 11.212 7.67407 11.132 7.91812 11.1665C8.87897 11.3024 9.77446 10.6518 9.94213 9.69597C9.98471 9.4532 10.1369 9.24367 10.3547 9.12814C11.2119 8.67332 11.554 7.62061 11.1278 6.74878C11.0195 6.52734 11.0195 6.26834 11.1278 6.0469C11.554 5.17508 11.2119 4.12236 10.3547 3.66754C10.1369 3.55202 9.98471 3.34248 9.94213 3.09971C9.77446 2.14389 8.87897 1.49328 7.91812 1.62918C7.67407 1.6637 7.42775 1.58367 7.2506 1.41229ZM5.44408 2.13102C5.75387 1.83133 6.24551 1.83133 6.5553 2.13102C6.95414 2.51685 7.50871 2.69705 8.05817 2.61933C8.48495 2.55896 8.88269 2.84794 8.95716 3.27249C9.05304 3.81907 9.39579 4.29082 9.88599 4.5509C10.2667 4.75292 10.4187 5.2205 10.2294 5.60774C9.98567 6.10629 9.98567 6.6894 10.2294 7.18795C10.4187 7.57518 10.2667 8.04276 9.88599 8.24478C9.39579 8.50487 9.05304 8.97662 8.95716 9.5232C8.88269 9.94774 8.48495 10.2367 8.05817 10.1764C7.50871 10.0986 6.95414 10.2788 6.5553 10.6647C6.24551 10.9644 5.75387 10.9644 5.44408 10.6647C5.04524 10.2788 4.49067 10.0986 3.94121 10.1764C3.51443 10.2367 3.11669 9.94774 3.04222 9.5232C2.94634 8.97662 2.60359 8.50487 2.11339 8.24478C1.73264 8.04276 1.58071 7.57518 1.77001 7.18795C2.01371 6.6894 2.01371 6.10629 1.77001 5.60774C1.58071 5.2205 1.73264 4.75292 2.11339 4.5509C2.60359 4.29082 2.94634 3.81907 3.04222 3.27249C3.11669 2.84794 3.51443 2.55896 3.94121 2.61933C4.49067 2.69705 5.04524 2.51685 5.44408 2.13102Z"
                    fill="#667185"
                  />
                </svg>

                <p className="text-xs text-[#667185] font-medium">Manage</p>
              </button>
              <Switch
                className="w-8 h-4"
                thumbStyle="h-[14px] w-[14px] data-[state=checked]:translate-x-[14px] data-[state=unchecked]:translate-x-0"
                checked={manage[index]?.selected ?? false}
                onCheckedChange={() => {
                  const manageCopy = [...manage];
                  manageCopy[index].selected = !manage[index].selected;

                  setManage(manageCopy);
                }}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
