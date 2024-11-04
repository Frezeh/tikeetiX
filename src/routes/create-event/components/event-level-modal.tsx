import GBP from "@/assets/icons/gbp.svg";
import TicketIcon from "@/assets/icons/ticket-icon";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, generateRandomId } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EVENTLEVEL } from "../create-event";

const FormSchema = z.object({
  category: z.string().min(1, { message: "Category name is required" }),
  quantity: z.string().min(1, { message: "Quantity available is required" }),
  price: z.string().min(1, { message: "Price is required" }),
});

const LEVELTYPE = [
  {
    label: "Regular",
    value: "Regular",
  },
  {
    label: "VIP",
    value: "VIP",
  },
  {
    label: "VVIP",
    value: "VVIP",
  },
];

type Props = {
  openLevel: boolean;
  setOpenLevel: Dispatch<SetStateAction<boolean>>;
  addEventLevel: (level: EVENTLEVEL) => void;
};

export default function EventLevelModal(props: Props) {
  const { openLevel, setOpenLevel, addEventLevel } = props;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
      quantity: "",
      price: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    addEventLevel({
      category: data.category,
      ticketPrice: Number(data.price),
      quantity: Number(data.quantity),
      ticketCurrency: "GBP",
      id: generateRandomId(),
    });
    setOpenLevel(false);
    form.reset();
  };

  return (
    <Dialog open={openLevel} onOpenChange={setOpenLevel}>
      <DialogContent
        className="w-3/4 sm:max-w-[400px] items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2 border-[#E4E7EC]"
        closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
      >
        <DialogHeader className="self-center">
          <div className="w-12 h-12 rounded-[10px] flex items-center justify-center bg-[#F0F2F5] self-center">
            <TicketIcon fill="#13191C" />
          </div>
        </DialogHeader>
        <DialogDescription className="space-y-1">
          <p className="text-[#13191C] text-lg font-medium text-center">
            Ticket
          </p>
          <p className="text-[#667185] text-sm text-center">
            Create different categories of event tickets.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:max-w-[375px] pt-3"
            >
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">
                      Category name
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "bg-white border border-[#C7FFAC] focus:ring-0 h-14 placeholder:text-input w-full sm:w-[357px]",
                            !!form.formState.errors.category &&
                              "border-[#E26E6A]"
                          )}
                          suffixIcon={
                            <div className="w-[45px] border-l border-[#D0D5DD] flex justify-end items-center">
                              <ChevronDown size={24} color="#667185" />
                            </div>
                          }
                        >
                          {field.value ? (
                            <SelectValue placeholder="Select Trading Country *" />
                          ) : (
                            <span className="text-[#D0D5DD] text-sm">
                              i.e Regular
                            </span>
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-auto h-auto max-h-[400px] p-0 m-0 border-[#E4E7EC]">
                        <SelectGroup>
                          {LEVELTYPE.map((add, i) => (
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
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">
                      Ticket price
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="49.99"
                        className=" bg-[#F0F2F5] border text-sm border-[#F0F2F5] h-14 placeholder:text-[#667185] placeholder:font-medium w-full sm:w-[357px] pl-[46px] pr-12"
                        error={!!form.formState.errors.price}
                        prefixItem={
                          <div className="absolute top-[0.6px] left-0 lg:mt-[18px] lg:mr-8 ml-4">
                            <p className="text-[#98A2B3] text-sm">GBP</p>
                          </div>
                        }
                        suffixitem={
                          <div className="absolute top-0 right-0 border-l border-[#D0D5DD] flex justify-end items-center lg:mt-[18px] pl-5 lg:mr-6 mr-3 mt-4">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button className="flex items-center gap-1">
                                  <img
                                    src={GBP}
                                    alt="currency"
                                    className="w-4 h-4"
                                  />
                                  <span className="pl-1 text-[#13191C] text-sm font-medium">
                                    GBP
                                  </span>
                                  <ChevronDown size={24} color="#667185" />
                                </button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-[114px] mt-2.5 mr-244px] right-10"
                                align="center"
                              >
                                <button className="flex items-center gap-2">
                                  <img
                                    src={GBP}
                                    alt="currency"
                                    className="w-4 h-4"
                                  />
                                  <span className="pl-1 text-[#13191C] text-sm font-medium">
                                    GBP
                                  </span>
                                  <Check size={16} color="green" />
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
              <div className="flex justify-between items-center gap-2 pt-2">
                <Button
                  className="h-9 w-[176px] border bg-white border-[#D0D5DD]"
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    setOpenLevel(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="h-9 w-[176px]"
                  variant="default"
                  type="submit"
                >
                  {"Add ticket"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
