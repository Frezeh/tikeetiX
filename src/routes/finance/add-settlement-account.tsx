import BankIcon from "@/assets/icons/bank-icon";
import ProcessingIcon from "@/assets/icons/processsing-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import OtpInput from "@/components/ui/otp-input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { useProfileContext } from "@/provider/profile-provider";
import { sendEmailOtp } from "@/services/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronDown, WalletIcon } from "lucide-react";
import React, { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  bank: z.string().min(1, { message: "Bank is required" }),
  accountnumber: z.string().min(1, { message: "Account number is required" }),
  sortcode: z.string().min(1, { message: "Sort code is required" }),
  accountname: z.string().optional(),
  type: z.string().optional(),
  postcode: z.string().optional(),
  address: z.string().optional(),
});

const TYPE = [
  {
    value: "private",
    label: "Private",
  },
  {
    value: "business",
    label: "Business",
  },
];

const BANKS = [
  {
    value: "Barclays",
    label: "Barclays",
  },
  {
    value: "HSBC Holdings",
    label: "HSBC Holdings",
  },
  {
    value: "Lloyds Banking Group",
    label: "Lloyds Banking Group",
  },
  {
    value: "NatWest Group",
    label: "NatWest Group",
  },
];

export default function AddSettlementAccount({
  addSettlementAccountModal,
  setAddSettlementAccountModal,
}: {
  addSettlementAccountModal: boolean;
  setAddSettlementAccountModal: Dispatch<boolean>;
}) {
  const [level, setLevel] = React.useState(1);
  //TODO: Lift state to parent
  const [otp, setOtp] = React.useState("");
  const [timer, setTimer] = React.useState(120);
  const [resendOtp, setResendOtp] = React.useState(false);
  const { profile } = useProfileContext();

  const { isPending: isSending, mutate: sendOtp } = useMutation({
    mutationFn: sendEmailOtp,
  });

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (timer > 0) {
  //         setTimer((prev) => prev - 1);
  //       } else {
  //         setResendOtp(true);
  //         clearInterval(interval);
  //       }
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }, [timer]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bank: "",
      accountnumber: "",
      accountname: "",
      address: "",
      postcode: "",
      sortcode: "",
      type: "",
    },
  });

  const onSubmit = (_: z.infer<typeof FormSchema>) => {
    setLevel(2);
  };

  const closeModal = () => {
    setAddSettlementAccountModal(false);
    setLevel(1);
    form.reset();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const resendOTP = () => {
    sendOtp(
      { email: profile?.email! },
      {
        onSuccess: (res) => {
          if (res.data) {
            toast({
              title: "OTP sent successfully",
              variant: "success",
            });
            setResendOtp(false);
            setTimer(120);
          }
        },
        onError: (err: any) => {
          toast({
            title: err?.error?.message
              ? err?.error?.message
              : "Failed to send OTP",
            variant: "error",
          });
        },
      }
    );
  };

  function level1() {
    return (
      <ScrollArea className="max-h-[90vh]">
        <DialogHeader className="self-center">
          <div className="w-full flex items-center justify-center self-center">
            <div className="w-12 h-12 bg-[#F0F2F5] rounded-[10px] flex justify-center items-center">
              <WalletIcon size={24} color="#13191C" />
            </div>
          </div>
        </DialogHeader>
        <DialogDescription className="self-center text-center space-y-2">
          <p className="text-[#13191C] text-lg font-medium">
            Add withdrawal account
          </p>
          <p className="text-[#667185] text-sm">
            Add an account for us to settle your funds into.
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
                name="accountnumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">
                      Account number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="5"
                        className=" bg-[#F0F2F5] border text-sm border-[#F0F2F5] h-14 placeholder:text-[#667185] placeholder:font-medium w-full sm:w-[357px]"
                        error={!!form.formState.errors.accountnumber}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">
                      Select bank
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "bg-[#F0F2F5] border-[#F0F2F5] focus:ring-0 h-14 placeholder:text-input w-full sm:w-[357px]",
                            !!form.formState.errors.bank && "border-[#E26E6A]"
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
                              Select
                            </span>
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-auto h-auto max-h-[400px] p-0 m-0 border-[#E4E7EC]">
                        <SelectGroup>
                          {BANKS.map((add, i) => (
                            <SelectItem
                              value={add.value}
                              key={i}
                              className="text-sm text-[#13191C]"
                            >
                              {add.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">
                      Account name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="Enter account name"
                        placeholder="20"
                        className=" bg-[#F0F2F5] border text-sm border-[#F0F2F5] h-14 placeholder:text-[#667185] placeholder:font-medium w-full sm:w-[357px]"
                        error={!!form.formState.errors.accountname}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-between gap-4 items-center">
                <FormField
                  control={form.control}
                  name="sortcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#101928]">
                        SORT Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="Enter account name"
                          placeholder="20"
                          className=" bg-[#F0F2F5] border text-sm border-[#F0F2F5] h-14 placeholder:text-[#667185] placeholder:font-medium w-full sm:w-[172px] text-left"
                          error={!!form.formState.errors.sortcode}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#101928]">
                        Account Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "bg-[#F0F2F5] border-[#F0F2F5] focus:ring-0 h-14 placeholder:text-input w-full sm:w-[172px] text-left",
                              !!form.formState.errors.type && "border-[#E26E6A]"
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
                                Select
                              </span>
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-auto h-auto max-h-[400px] p-0 m-0 border-[#E4E7EC]">
                          <SelectGroup>
                            {TYPE.map((add, i) => (
                              <SelectItem
                                value={add.value}
                                key={i}
                                className="text-xs text-[#13191C]"
                              >
                                {add.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">
                      Postal Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="Enter account name"
                        placeholder="20"
                        className=" bg-[#F0F2F5] border text-sm border-[#F0F2F5] h-14 placeholder:text-[#667185] placeholder:font-medium w-full sm:w-[357px]"
                        error={!!form.formState.errors.postcode}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="Enter account name"
                        placeholder="20"
                        className=" bg-[#F0F2F5] border text-sm border-[#F0F2F5] h-14 placeholder:text-[#667185] placeholder:font-medium w-full sm:w-[357px]"
                        error={!!form.formState.errors.address}
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
      </ScrollArea>
    );
  }

  function level2() {
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
          <p className="text-[#13191C] text-lg font-medium">
            Add withdrawal account
          </p>
          <p className="text-[#667185] text-sm">
            Add an account for us to settle your funds into.
          </p>
        </DialogDescription>
        <DialogDescription className="justify-center items-center text-center space-y-4 border-b border-[#E4E7EC] pb-3 pt-5">
          <p className="text-[#667185] text-lg font-medium">Request preview</p>
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
            <p className="text-base text-[#13191C] font-medium">
              John Doe D. Rockefeller
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base text-[#667185]">Account number</p>
            <p className="text-base text-[#13191C] font-medium">9018275991</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base text-[#667185]">Bank name</p>
            <p className="text-base text-[#13191C] font-medium">
              JP Morgan & Chase
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base text-[#667185]">Sort code</p>
            <p className="text-base text-[#13191C] font-medium">181042</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base text-[#667185]">Post code</p>
            <p className="text-base text-[#13191C] font-medium">181042</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base text-[#667185]">Account type</p>
            <p className="text-base text-[#13191C] font-medium">Private</p>
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
          <Button className="h-9 w-1/2" onClick={() => setLevel(3)}>
            Confirm request
          </Button>
        </DialogFooter>
      </>
    );
  }

  function level3() {
    return (
      <>
        <DialogDescription className="self-center text-center space-y-2 pt-5">
          <p className="text-[#13191C] text-lg font-medium text-center">
            Confirm withdrawal account
          </p>
          <p className="text-[#667185] text-sm text-center">
            We have sent an OTP to your registered email, please enter it below
            to confirm your request.
          </p>
          <div className="pt-5 space-y-1">
            <p className="text-[#101928] text-sm font-medium">Enter OTP</p>
            <OtpInput length={5} onUpdate={handleOtpChange} />
            {/* <div className="pt-1 justify-center items-center flex w-full gap-1">
              {resendOtp ? (
                <button
                  className="w-full h-14 bg-white border border-[#D0D5DD] text-[#475367]"
                  disabled={isSending}
                  onClick={resendOTP}
                >
                  <p className="text-center text-[#98A2B3] text-xs">
                    {isSending ? "Resending OTP...." : "Resend OTP"}
                  </p>
                </button>
              ) : (
                <>
                  <p className="text-center text-[#98A2B3] text-xs">
                    Resend OTP in
                  </p>
                  <span className="text-center text-[#98A2B3] text-xs w-4">
                    {formatTime(timer)}
                  </span>
                </>
              )}
            </div> */}
          </div>
        </DialogDescription>
        <DialogFooter className="flex justify-between items-center pt-[15px]">
          <Button
            className="h-9 w-1/2 bg-white border-[#D0D5DD] border rounded-[8px]"
            variant="ghost"
            onClick={() => setLevel(1)}
          >
            Cancel
          </Button>
          <Button className="h-9 w-1/2" onClick={() => setLevel(4)}>
            Confirm
          </Button>
        </DialogFooter>
      </>
    );
  }

  function level4() {
    return (
      <>
        <DialogHeader className="justify-center items-center">
          <ProcessingIcon width={108} height={82} />
        </DialogHeader>
        <DialogDescription className="self-center text-center space-y-2">
          <p className="text-[#13191C] text-lg font-medium text-center">
            Request processing!
          </p>
          <p className="text-[#667185] text-sm text-center">
            We’re currently processing your request, we will send you a mail as
            soon as the process is concluded.
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
    <Dialog open={addSettlementAccountModal} onOpenChange={() => closeModal()}>
      <DialogTitle className="invisible">Add settlemnt modal</DialogTitle>
      <DialogContent
        className="w-3/4 sm:max-w-[400px] gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
        closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
      >
        {level === 1 && level1()}
        {level === 2 && level2()}
        {level === 3 && level3()}
        {level === 4 && level4()}
      </DialogContent>
    </Dialog>
  );
}
