import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PROMOCODE } from "@/routes/create-event/create-event";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronDown, Percent } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";

const FormSchema = z.object({
  promocode: z.string().min(1, { message: "Promo code is required" }),
  quantity: z.string().min(1, { message: "Quantity available is required" }),
  amount: z.string().min(1, { message: "Price is required" }),
  start: z.date({ required_error: "Start date is required" }),
  end: z.date({ required_error: "End date is required" }),
});

type Props = {
  openEditPromoCode: boolean;
  setOpenEditPromoCode: Dispatch<SetStateAction<boolean>>;
  updatePromoCode: (level: PROMOCODE) => void;
  promoCode: PROMOCODE;
};

export default function EditPromoCodeModal(props: Props) {
  const {
    openEditPromoCode,
    setOpenEditPromoCode,
    updatePromoCode,
    promoCode,
  } = props;
  const [type, setType] = useState<"percentage" | "constant">("constant");
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [limit, setLimit] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      promocode: "",
      quantity: "",
      amount: "",
      start: undefined,
      end: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    updatePromoCode({
      promocode: data.promocode,
      quantity: data.quantity,
      amount: data.amount,
      start: data.start,
      end: data.end,
      id: promoCode.id,
      type,
    });
    setOpenEditPromoCode(false);
    form.reset();
  };

  useEffect(() => {
    if (promoCode) {
      form.setValue("promocode", promoCode.promocode);
      form.setValue("quantity", String(promoCode.quantity));
      form.setValue("amount", String(promoCode.amount));
      form.setValue("start", promoCode.start);
      form.setValue("end", promoCode.end);
      setType(promoCode.type);
    }
  }, [promoCode]);

  return (
    <Dialog open={openEditPromoCode} onOpenChange={setOpenEditPromoCode}>
      <DialogContent
        className="w-3/4 sm:max-w-[400px] items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2 border-[#E4E7EC]"
        closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
      >
        <DialogHeader className="self-center">
          <div className="w-12 h-12 rounded-[10px] flex items-center justify-center bg-[#F0F2F5] self-center">
            <Percent size={20} color="#CCCCCC" />
          </div>
        </DialogHeader>
        <DialogDescription className="space-y-1">
          <p className="text-[#13191C] text-lg font-medium text-center">
            Promo code
          </p>
          <p className="text-[#667185] text-sm text-center">
            Promo codes for discounted tickets.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:max-w-[375px] pt-3"
            >
              <FormField
                control={form.control}
                name="promocode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">Promo code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="35"
                        className="bg-[#F0F2F5] border text-sm border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[357px] pr-12"
                        error={!!form.formState.errors.promocode}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row items-center space-x-2">
                <Checkbox
                  className="transition-all duration-200 w-5 h-5"
                  checked={limit}
                  onCheckedChange={() => setLimit(!limit)}
                />
                <div className="space-y-1 leading-none">
                  <p className="text-sm text-primary font-medium">
                    Limit quantity
                  </p>
                </div>
              </div>
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">
                      Quantity available
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="35"
                        className="bg-[#F0F2F5] border text-sm border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[357px] pr-12"
                        error={!!form.formState.errors.quantity}
                      />
                    </FormControl>
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
                      Discount amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="20"
                        className=" bg-[#F0F2F5] border text-sm border-[#F0F2F5] h-14 placeholder:text-[#667185] placeholder:font-medium w-full sm:w-[357px] pl-[56px] pr-12"
                        error={!!form.formState.errors.amount}
                        prefixItem={
                          <div className="absolute top-[0.6px] left-0 lg:mt-[18px] lg:mr-8 ml-4">
                            <p className="text-[#98A2B3] text-sm">
                              {type === "percentage" ? "(%)" : "(GBP)"}
                            </p>
                          </div>
                        }
                        suffixitem={
                          <div className="absolute top-0 right-0 border-l border-[#D0D5DD] flex justify-end items-center lg:mt-[18px] pl-5 lg:mr-6 mr-3 mt-4">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button className="flex items-center gap-1">
                                  <span className="pl-1 text-[#667185] text-sm font-medium">
                                    {type === "percentage"
                                      ? "Percentage"
                                      : "Amount"}
                                  </span>
                                  <ChevronDown size={24} color="#667185" />
                                </button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-[140px] mt-2.5 mr-244px] right-10 space-y-3"
                                align="start"
                              >
                                <button
                                  className="flex items-center gap-2"
                                  onClick={() => setType("percentage")}
                                >
                                  <span className="pl-1 text-[#13191C] text-xs">
                                    Percentage
                                  </span>
                                  {type === "percentage" && (
                                    <Check size={16} color="green" />
                                  )}
                                </button>
                                <button
                                  className="flex items-center gap-2"
                                  onClick={() => setType("constant")}
                                >
                                  <span className="pl-1 text-[#13191C] text-xs">
                                    Amount
                                  </span>
                                  {type === "constant" && (
                                    <Check size={16} color="green" />
                                  )}
                                </button>
                              </PopoverContent>
                            </Popover>
                          </div>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-between gap-4 items-center">
                <div className="flex flex-col">
                  <label className="text-[#13191C] text-sm font-medium">
                    Starts
                  </label>
                  <Select onOpenChange={setOpenStartDate} open={openStartDate}>
                    <SelectTrigger
                      suffixIcon={
                        <CalendarIcon
                          className="ml-auto"
                          color="#667185"
                          size={20}
                        />
                      }
                      className="border-none bg-[#F0F2F5] active:focus:outline-none h-14"
                    >
                      <Button
                        variant={"ghost"}
                        className={cn(
                          "xl:w-[125px] 2xl:w-[145px] ml-[-20px] text-left items-start font-normal bg-transparent text-[#13191C]",
                          !form.watch("end") && "text-[#667185]"
                        )}
                      >
                        {form.watch("start") ? (
                          format(form.watch("start"), "PP")
                        ) : (
                          <span className="text-[#667185]">24 Aug 2024</span>
                        )}
                      </Button>
                    </SelectTrigger>

                    <SelectContent
                      className="w-auto h-auto p-0 rounded-[10px] shadow-lg mt-1 border-[0.3px] bg-card"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={form.watch("start")}
                        onSelect={(d) => {
                          form.setValue("start", d!);
                          setOpenStartDate(false);
                        }}
                        // disabled={(date) => date < new Date()}
                        fromDate={new Date()}
                        toDate={
                          new Date(Date.now() + 10000 * 60 * 60 * 24 * 365)
                        }
                        initialFocus
                      />
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <label className="text-[#13191C] text-sm font-medium">
                    Ends
                  </label>
                  <Select onOpenChange={setOpenEndDate} open={openEndDate}>
                    <SelectTrigger
                      suffixIcon={
                        <CalendarIcon
                          className="ml-auto"
                          color="#667185"
                          size={20}
                        />
                      }
                      className="border-none bg-[#F0F2F5] active:focus:outline-none h-14"
                    >
                      <Button
                        variant={"ghost"}
                        className={cn(
                          "xl:w-[125px] 2xl:w-[145px] ml-[-20px] text-left items-start font-normal bg-transparent text-[#13191C]",
                          !form.watch("end") && "text-[#667185]"
                        )}
                      >
                        {form.watch("end") ? (
                          format(form.watch("end"), "PP")
                        ) : (
                          <span className="text-[#667185]">24 Aug 2024</span>
                        )}
                      </Button>
                    </SelectTrigger>

                    <SelectContent
                      className="w-auto h-auto p-0 rounded-[10px] shadow-lg mt-1 border-[0.3px] bg-card"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={form.watch("end")}
                        onSelect={(d) => {
                          form.setValue("end", d!);
                          setOpenEndDate(false);
                        }}
                        // disabled={(date) => date < new Date()}
                        fromDate={new Date()}
                        toDate={
                          new Date(Date.now() + 10000 * 60 * 60 * 24 * 365)
                        }
                        initialFocus
                      />
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between items-center gap-2 pt-2">
                <Button
                  className="h-9 w-[176px] border bg-white border-[#D0D5DD]"
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    setOpenEditPromoCode(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="h-9 w-[176px]"
                  variant="default"
                  type="submit"
                >
                  {"Create promo code"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
