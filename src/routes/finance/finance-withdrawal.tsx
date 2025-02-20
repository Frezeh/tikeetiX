import BankIcon from "@/assets/icons/bank-icon";
import GBP from "@/assets/icons/gbp.svg";
import ProcessingIcon from "@/assets/icons/processsing-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { getSettlementAccounts, requestPayout } from "@/services/api/finance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronDown, WalletIcon } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }),
  account: z.string().min(1, { message: "Settlement account is required" }),
});

export default function FinanceWithdrawal({
  openWithDrawalModal,
  setOpenWithDrawalModal,
}: {
  openWithDrawalModal: boolean;
  setOpenWithDrawalModal: Dispatch<boolean>;
}) {
  const [level, setLevel] = React.useState(1);

  const { isLoading, data } = useQuery({
    queryKey: ["settlement-accounts"],
    queryFn: getSettlementAccounts,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      account: "",
      amount: "",
    },
  });

  const onSubmit = (_: z.infer<typeof FormSchema>) => {
    setLevel(2);
  };

  const closeModal = () => {
    setOpenWithDrawalModal(false);
    setLevel(1);
    form.reset();
  };

  function Level1() {
    return (
      <>
        <DialogHeader className="self-center">
          <div className="w-full flex items-center justify-center self-center">
            <div className="w-12 h-12 bg-[#F0F2F5] rounded-[10px] flex justify-center items-center">
              <WalletIcon size={24} color="#13191C" />
            </div>
          </div>
        </DialogHeader>
        <DialogDescription className="self-center text-center space-y-2">
          <p className="text-[#13191C] text-lg font-medium">Withdrawal</p>
          <p className="text-[#667185] text-sm">
            Get your funds settled into your preferred account
          </p>
        </DialogDescription>

        <DialogDescription className="flex items-center gap-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:max-w-[375px] pt-3"
            >
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">
                      Select settlement account
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "bg-[#F0F2F5] border-[#F0F2F5] focus:ring-0 h-14 placeholder:text-input w-full sm:w-[357px]",
                            !!form.formState.errors.account &&
                              "border-[#E26E6A]"
                          )}
                          suffixIcon={
                            <div className="w-[45px] flex justify-end items-center">
                              <ChevronDown size={24} color="#667185" />
                            </div>
                          }
                        >
                          {field.value ? (
                            <SelectValue placeholder="Select Trading Country *" />
                          ) : (
                            <span className="text-[#98A2B3] text-sm">
                              i.e First class
                            </span>
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-auto h-auto max-h-[400px] p-0 m-0 border-[#E4E7EC]">
                        <SelectGroup>
                          {isLoading ? (
                            <Loading />
                          ) : data?.data && data?.data?.length > 0 ? (
                            data?.data.map((add, i) => (
                              <SelectItem
                                value={add.id}
                                key={i}
                                className="text-xs text-[#13191C]"
                              >
                                {add.accountNumber}
                              </SelectItem>
                            ))
                          ) : (
                            <p className="text-center self-center">
                              No settlement account
                            </p>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">
                      Enter amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="20"
                        className=" bg-[#F0F2F5] border text-sm border-[#F0F2F5] h-14 placeholder:text-[#667185] placeholder:font-medium w-full sm:w-[357px] pl-[90px]"
                        error={!!form.formState.errors.amount}
                        prefixItem={
                          <div className="absolute top-[0.6px] left-0 lg:mt-[18px] lg:mr-8 ml-4">
                            <div className="flex items-center gap-2">
                              <img
                                src={GBP}
                                alt="currency"
                                className="w-4 h-4"
                              />
                              <span className="pl-1 text-[#13191C] text-sm font-medium">
                                GBP
                              </span>
                            </div>
                          </div>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center gap-2 pt-2">
                <Button
                  className="h-9 w-[176px] border bg-white border-[#D0D5DD]"
                  variant="ghost"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  className="h-9 w-[176px]"
                  variant="default"
                  type="submit"
                >
                  Proceed
                </Button>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </>
    );
  }

  function Level3() {
    return (
      <>
        <DialogHeader className="justify-center items-center">
          <ProcessingIcon />
        </DialogHeader>
        <DialogDescription className="self-center text-center space-y-2">
          <p className="text-[#13191C] text-lg font-medium text-center">
            Request processing!
          </p>
          <p className="text-[#667185] text-sm text-center">
            Your settlement request has been received. We will credit your
            account within 24hrs.
          </p>
        </DialogDescription>
        <DialogFooter className="flex justify-between items-center pt-[15px]">
          <Button
            className="h-9 w-full bg-white border-[#D0D5DD] border rounded-[8px]"
            variant="ghost"
            onClick={closeModal}
          >
            Back to Finance
          </Button>
        </DialogFooter>
      </>
    );
  }

  return (
    <Dialog open={openWithDrawalModal} onOpenChange={() => closeModal()}>
      <DialogContent
        className="w-3/4 sm:max-w-[400px]  gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
        closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
      >
        {level === 1 && <Level1 />}
        {level === 2 && (
          <Level2
            setLevel={setLevel}
            amount={Number(form.getValues("amount"))}
            settlementAccountId={form.getValues("account")}
          />
        )}
        {level === 3 && <Level3 />}
      </DialogContent>
    </Dialog>
  );
}

function Level2({
  setLevel,
  amount,
  settlementAccountId,
}: {
  setLevel: Dispatch<SetStateAction<number>>;
  amount: number;
  settlementAccountId: string;
}) {
  const { isPending, mutate } = useMutation({ mutationFn: requestPayout });

  const sendRequest = () => {
    mutate(
      {
        amount,
        settlementAccountId,
      },
      {
        onSuccess: (res) => {
          if (res.data) {
            setLevel(3);
          } else {
            toast({
              title: "Failed to send request",
            });
          }
        },
        onError: () => {
          toast({
            title: "Failed to send request",
          });
        },
      }
    );
  };

  return (
    <>
      <DialogHeader className="justify-center items-center border-b border-[#E4E7EC] self-center p-3">
        <p className="text-[#667185] font-medium text-lg">Request preview</p>
      </DialogHeader>
      <DialogDescription className="justify-center items-center text-center space-y-4 border-b border-[#E4E7EC] pb-3">
        <div className="flex items-center justify-center gap-2">
          <img src={GBP} alt="currency" className="w-4 h-4" />
          <p className="text-[#13191C] text-sm font-medium">GBP</p>
        </div>
        <div>
          <p className="text-[#98A2B3] text-[28px] font-bold">
            GBP <span className="text-[#13191C]">2,000</span>
          </p>
        </div>
      </DialogDescription>

      <DialogDescription className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white border border-[#E4E7EC] rounded-[8px] flex justify-center items-center">
            <BankIcon fill="#13191C" />
          </div>
          <p className="text-[#13191C] font-medium text-base">
            Account Details
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-base text-[#667185]">Account name</p>
          <p className="text-base text-[#13191C] font-medium">9018275991</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-base text-[#667185]">Account number</p>
          <p className="text-base text-[#13191C] font-medium">
            John Doe D. Rockefeller
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-base text-[#667185]">Sort code</p>
          <p className="text-base text-[#13191C] font-medium">181042</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-base text-[#667185]">Bank name</p>
          <p className="text-base text-[#13191C] font-medium">
            JP Morgan & Chase
          </p>
        </div>
      </DialogDescription>
      <DialogFooter className="flex justify-between items-center pt-[15px]">
        <Button
          className="h-9 w-1/2 bg-white border-[#D0D5DD] border rounded-[8px]"
          variant="ghost"
          onClick={() => setLevel(1)}
        >
          Back
        </Button>
        <Button
          className="h-9 w-1/2"
          onClick={sendRequest}
          disabled={isPending}
        >
          {isPending ? <Loading /> : "Send request"}
        </Button>
      </DialogFooter>
    </>
  );
}
