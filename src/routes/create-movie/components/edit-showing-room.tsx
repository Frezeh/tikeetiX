import GBP from "@/assets/icons/gbp.svg";
import TicketIcon from "@/assets/icons/ticket-icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
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
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { updateMovieRoom } from "@/services/api/movie-room";
import { MovieRoomResponse } from "@/services/models/movies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  type: z.string().min(1, { message: "Room type name is required" }),
  numberofroom: z
    .string()
    .min(1, { message: "Number of room type is required" }),
  quantity: z.string().min(1, { message: "Quantity available is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  save: z.boolean().optional(),
});

const ROOMTYPE = [
  {
    label: "IMAX(5 rooms) - 45 seats | 49.99",
    value: "IMAX(5 rooms) - 45 seats | 49.99",
  },
  {
    label: "Premium 2D(8 rooms) - 10 seats | 29.99",
    value: "Premium 2D(8 rooms) - 10 seats | 29.99",
  },
  {
    label: "IMAX(5 rooms) - 95 seats | 69.99",
    value: "IMAX(5 rooms) - 95 seats | 69.99",
  },
];

type Props = {
  room: MovieRoomResponse;
  openEditRoom: boolean;
  setOpenEditRoom: Dispatch<SetStateAction<boolean>>;
};

export default function EditShowingRoom(props: Props) {
  const { openEditRoom, setOpenEditRoom, room } = props;
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({ mutationFn: updateMovieRoom });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate(
      {
        id: room.id,
        body: {
          roomName: data.type,
          typeNumber: Number(data.numberofroom),
          ticketPrice: Number(data.price),
          quantity: Number(data.quantity),
          ticketCurrency: "GBP",
        },
      },
      {
        onSuccess: (res) => {
          if (res.data) {
            setOpenEditRoom(false);
            toast({
              title: "Showing room eidted",
              variant: "success",
            });
            queryClient.invalidateQueries({ queryKey: ["movie-room"] });
          }
        },
        onError: () => {
          toast({
            title: "Failed to edit showing room",
            variant: "error",
          });
        },
      }
    );
  };

  useEffect(() => {
    if (room) {
      form.setValue("type", room.roomName);
      form.setValue("numberofroom", String(room.typeNumber));
      form.setValue("quantity", String(room.quantity));
      form.setValue("price", String(room.ticketPrice));
    }
  }, [room]);

  return (
    <Dialog open={openEditRoom} onOpenChange={setOpenEditRoom}>
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
            Showing room
          </p>
          <p className="text-[#667185] text-sm text-center">
            Edit room categories for movie tickets.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:max-w-[375px] pt-3"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">
                      Room type name
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "bg-white border border-[#C7FFAC] focus:ring-0 h-14 placeholder:text-input w-full sm:w-[357px]",
                            !!form.formState.errors.type && "border-[#E26E6A]"
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
                              i.e IMAX, 3D Premium etc
                            </span>
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-auto h-auto max-h-[400px] p-0 m-0 border-[#E4E7EC]">
                        <SelectGroup>
                          {ROOMTYPE.map((add, i) => (
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
                name="numberofroom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#101928]">
                      Number of room type
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="5"
                        className="bg-[#F0F2F5] border text-sm border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[357px] pr-12"
                        error={!!form.formState.errors.numberofroom}
                      />
                    </FormControl>
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
              <div className="flex w-full sm:w-[357px] justify-between items-center">
                <FormField
                  control={form.control}
                  name="save"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="w-5 h-5"
                        />
                      </FormControl>
                      <div className="leading-none">
                        <FormDescription className="text-sm text-[#13191C] font-medium">
                          Save room template for this Cinema
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between items-center gap-2 pt-2">
                <Button
                  className="h-9 w-[176px] border bg-white border-[#D0D5DD]"
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    setOpenEditRoom(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="h-9 w-[176px]"
                  variant="default"
                  type="submit"
                >
                  {isPending ? <Loading className="w-5 h-5" /> : "Edit room"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
