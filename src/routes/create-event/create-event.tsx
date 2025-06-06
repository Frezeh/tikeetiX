import DesktopIcon from "@/assets/icons/desktop-icon";
import GBP from "@/assets/icons/gbp.svg";
import PhoneIcon from "@/assets/icons/phone-icon";
import RemoveIcon from "@/assets/icons/remove-icon";
import TicketIcon from "@/assets/icons/ticket-icon";
import ANNOUNCEMENT from "@/assets/images/announcement.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
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
import { uploadSingleFile } from "@/services/api/file-upload";
import { createEventTicket } from "@/services/api/ticket";
import { TEventLevel } from "@/services/models/events";
import { EventTicketBody } from "@/services/models/ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import EditEventLevel from "./components/edit-event-level";
import EditImage from "./components/edit-image";
import EventDetails from "./components/event-details";
import EventLevel from "./components/event-level";
import EventLevelModal from "./components/event-level-modal";
import PromoCodeModal from "@/components/promo-code";
import RemovePromoCode from "@/components/remove-promo-code";
import EditPromoCodeModal from "@/components/edit-promo-code";

export type EVENTLEVEL = Omit<TEventLevel, "createdBy">;
export type PROMOCODE = {
  id: string;
  promocode: string;
  quantity: string;
  amount: string;
  start: Date;
  end: Date;
  type: "constant" | "percentage";
};
export const TICKETPRICE = ["Free event", "Paid event", "Donation"];

export const CreateEventFormSchema = z.object({
  poster: z.string().min(1, { message: "Required" }),
  title: z.string().min(1, { message: "Event title is required" }),
  description: z.string().optional(),
  category: z.string().min(1, { message: "Event category is required" }),
  type: z.string().min(1, { message: "Event type is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  name: z.string().optional(),
  startTime: z.date({
    required_error: "Start time is required",
  }),
});

export const AddEventLevelFormSchema = z.object({
  price: z.string().min(1, { message: "Required" }),
  start: z.date({
    required_error: "Sales start date is required",
  }),
  end: z.date({
    required_error: "Sales end date is required",
  }),
  maxpurchase: z.string().min(1, { message: "Max purchase is required" }),
});

export default function CreateEvent() {
  const navigate = useNavigate();
  const [layout, setLayout] = useState<"desktop" | "phone">("desktop");
  const [openLevel, setOpenLevel] = useState(false);
  const [openEditLevel, setOpenEditLevel] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);
  const [step, setStep] = useState<"event-details" | "level">("event-details");
  const [croppedPoster, setCroppedPoster] = useState<File | undefined>();
  const [poster, setPoster] = useState<File | undefined>();
  const [event, setEvent] = useState("");
  const [openEditImage, setOpenEditImage] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<EVENTLEVEL>(
    {} as EVENTLEVEL
  );
  const [selectedPromoCode, setSelectedPromoCode] = useState<PROMOCODE>(
    {} as PROMOCODE
  );
  const [eventLevel, setEventLevel] = useState<EVENTLEVEL[]>([]);
  const [promoCode, setPromoCode] = useState<PROMOCODE[]>([]);
  const [price, setPrice] = useState(TICKETPRICE[0]);
  const [selected, setSelected] = useState<Date>();
  const [timeValue, setTimeValue] = useState("00:00");
  const [openPromoCode, setOpenPromoCode] = useState(false);
  const [openRemovePromoCode, setOpenRemovePromoCode] = useState(false);
  const [openEditPromoCode, setOpenEditPromoCode] = useState(false);

  const [id, setId] = useState("");
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({ mutationFn: createEventTicket });
  const { isPending: isUploading, mutate: upload } = useMutation({
    mutationFn: uploadSingleFile,
  });
  const isCreating = isPending || isUploading;

  const form = useForm<z.infer<typeof CreateEventFormSchema>>({
    resolver: zodResolver(CreateEventFormSchema),
    defaultValues: {
      poster: "",
      title: "",
      category: "",
      type: "",
      location: "",
      name: "",
      description: "",
    },
  });

  const levelForm = useForm<z.infer<typeof AddEventLevelFormSchema>>({
    resolver: zodResolver(AddEventLevelFormSchema),
    defaultValues: {
      price: "",
      start: undefined,
      end: undefined,
      maxpurchase: "",
    },
  });

  const createTicket = (data: EventTicketBody) => {
    mutate(data, {
      onSuccess: (res) => {
        if (res.data) {
          form.reset();
          setId(res.data[0].activity);
          setOpenPublish(true);
          queryClient.invalidateQueries();
        }
      },
      onError: () => {
        toast({
          title: "Failed to create event ticket",
          variant: "error",
        });
      },
    });
  };

  const publishTicket = () => {
    let file = new FormData();
    file.append("file", poster as File);

    upload(file, {
      onSuccess: (res) => {
        if (res.message) {
          createTicket({
            isMovie: false,
            event: {
              title: form.getValues("title"),
              description: form.getValues("description") ?? "",
              location: form.getValues("location"),
              startTime: selected,
              image: res.data,
              maxPurchasePerUser: Number(levelForm.getValues("maxpurchase")),
              organizerName: form.getValues("name") ?? "",
              type: form.getValues("type"),
              salesStartDate: levelForm.getValues("start"),
              salesEndDate: levelForm.getValues("end"),
              category: form.getValues("category"),
            },
            ticketPayload:
              price === "Paid event"
                ? eventLevel.map((event) => {
                    return {
                      name: event.category,
                      ticketPrice: Number(event.ticketPrice),
                      quantity: Number(event.quantity),
                      ticketType: "Events",
                    };
                  })
                : [
                    {
                      name: "Free event",
                      ticketPrice: 0,
                      quantity: 0,
                      ticketType: "Events",
                    },
                  ],
            discounts: promoCode.map((promo) => {
              return {
                code: promo.promocode,
                quantity: Number(promo.quantity),
                amount: Number(promo.amount),
                rangeType: promo.type,
                startDate: promo.start,
                endDate: promo.end,
              };
            }),
          });
        }
      },
      onError: () => {
        toast({
          title: "Failed to create event ticket",
          variant: "error",
        });
      },
    });
  };

  const getEventDetails = useMemo(() => {
    const [name, price, currency] = event.split(",");

    return { name, price, currency };
  }, [event]);

  const addEventLevel = (level: EVENTLEVEL) => {
    setEventLevel((prev) => [...prev, level]);
  };

  const removeEventLevel = (level: EVENTLEVEL) => {
    setEventLevel((prev) => prev.filter((l) => l.id !== level.id));
  };
  const updateEventLevel = (level: EVENTLEVEL) => {
    setEventLevel((prev) => prev.map((l) => (l.id === level.id ? level : l)));
  };

  const addPromoCode = (level: PROMOCODE) => {
    setPromoCode((prev) => [...prev, level]);
  };

  const removePromoCode = (level: PROMOCODE) => {
    setPromoCode((prev) => prev.filter((l) => l.id !== level.id));
  };
  const updatePromoCode = (level: PROMOCODE) => {
    setPromoCode((prev) => prev.map((l) => (l.id === level.id ? level : l)));
  };

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
          <Link to="/events" className="flex items-center gap-1">
            <TicketIcon width={16} height={16} />
            <p className="text-[#667185] text-xs">Tickets</p>
          </Link>
          <div className="bg-[#F0F2F5] h-[38px] px-2 rounded-[8px] flex items-center gap-2">
            <ChevronRight size={16} color="#98A2B3" />
            <p className="text-[#667185] font-medium text-xs">Create ticket</p>
          </div>
        </div>
        <button className="bg-[#F0F2F5] h-[38px] px-4 rounded-[8px] flex items-center gap-2">
          <p className="text-[#667185] font-medium text-xs">Save as draft</p>
        </button>
      </div>

      <div className="flex justify-between h-full">
        <div className="2xl:w-1/3 lg:w-[40%] pl-5 2xl:pl-10 py-5 relative after:content-['_'] after:absolute after:h-[85%] after:my-auto after:border-l-[solid] after:border-l after:right-0 after:top-[0%]">
          <div className="w-full border-b border-[#E4E7EC] pb-1">
            <p className="text-primary font-medium text-2xl">Create Event</p>
          </div>
          {step === "event-details" && (
            <EventDetails
              moveToNext={() => setStep("level")}
              form={form}
              poster={poster}
              setCroppedPoster={setCroppedPoster}
              setOpenEditImage={setOpenEditImage}
              selected={selected}
              timeValue={timeValue}
              setSelected={setSelected}
              setTimeValue={setTimeValue}
            />
          )}
          {step === "level" && (
            <EventLevel
              moveToPrevious={() => setStep("event-details")}
              form={levelForm}
              publishTicket={publishTicket}
              openTicketLevel={() => setOpenLevel(true)}
              openEditTicketLevel={() => setOpenEditLevel(true)}
              openRemoveTicketLevel={() => setOpenRemove(true)}
              openPromoCode={() => setOpenPromoCode(true)}
              openRemovePromoCode={() => setOpenRemovePromoCode(true)}
              setSelectedLevel={setSelectedLevel}
              isCreating={isCreating}
              eventLevel={eventLevel ?? []}
              price={price}
              setPrice={setPrice}
              promoCode={promoCode}
              setSelectedPromoCode={setSelectedPromoCode}
              setOpenEditPromoCode={setOpenEditPromoCode}
            />
          )}
        </div>

        <div className="2xl:w-2/3 lg:w-[60%] h-full px-5 flex flex-col items-center justify-center gap-[10px] pt-10">
          <div className="w-[88px] h-9 flex items-center">
            <button
              className={cn(
                "w-9 h-9 bg-white rounded-l-[8px] flex items-center justify-center border-y border-l border-[#D0D5DD] transition-all duration-200",
                layout === "desktop" && "bg-[#F0F2F5]"
              )}
              onClick={() => setLayout("desktop")}
            >
              <DesktopIcon
                fill={layout === "desktop" ? "#13191C" : "#98A2B3"}
              />
            </button>
            <button
              className={cn(
                "w-9 h-9 bg-white rounded-r-[8px] flex items-center justify-center border border-[#D0D5DD] transition-all duration-200",
                layout === "phone" && "bg-[#F0F2F5]"
              )}
              onClick={() => setLayout("phone")}
            >
              <PhoneIcon fill={layout === "phone" ? "#13191C" : "#98A2B3"} />
            </button>
          </div>

          <Card className="w-full h-full rounded-none rounded-t-[8px] border border-[#F0F2F5] shadow-sm flex flex-col items-center justify-center relative transition-all duration-200">
            <div className="absolute top-0 w-full bg-[#F7F9FC] h-5 rounded-t-[8px] flex items-center gap-10 px-3">
              <div className="flex items-center gap-1">
                <div className="w-[7px] h-[7px] rounded-full bg-[#E4E7EC]" />
                <div className="w-[7px] h-[7px] rounded-full bg-[#E4E7EC]" />
                <div className="w-[7px] h-[7px] rounded-full bg-[#E4E7EC]" />
              </div>
              <div className="w-2/3 bg-[#F0F2F5] h-[7px] rounded-[8px]" />
            </div>
            <div className="h-[90%] overflow-y-scroll no-scrollbar w-full flex flex-col justify-betwee items-center">
              <CardHeader
                className={cn(
                  "p-0 pb-4 transition-all duration-200",
                  layout === "desktop" ? "w-[80%]" : "w-1/2"
                )}
              >
                <Select onValueChange={setEvent}>
                  <SelectTrigger
                    className="w-[142px] h-9 border-[#D0D5DD] rounded-[8px] bg-[#F7F9FC] text-[#344054] focus:ring-0"
                    prefixIcon={<ChevronDown size={20} color="#667185" />}
                    suffixIcon={<div></div>}
                  >
                    <SelectValue
                      className="placeholder:text-[#344054] text-sm"
                      placeholder={"ticket class"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {eventLevel && (
                      <SelectGroup>
                        {eventLevel.map((event) => (
                          <SelectItem
                            value={`${event.category},${event.ticketPrice},${event.ticketCurrency}`}
                            key={event.category}
                            className="text-[#344054] text-sm"
                          >
                            {event.category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent
                className={cn(
                  "p-0 border border-[#F0F2F5] rounded-[16px] bg-white transition-all duration-200 self-center pb-7 mb-20",
                  layout === "desktop" ? "w-[80%]" : "w-1/2"
                )}
              >
                <div className="p-4 w-full flex items-center gap-4 bg-[#F7F9FC] rounded-t-[16px]">
                  {poster && (
                    <div className="w-20 h-20 rounded-[8px] inline-flex">
                      <img
                        src={poster ? URL.createObjectURL(poster) : undefined}
                        alt="Event"
                        className="w-full h-auto rounded-[8px]"
                      />
                    </div>
                  )}
                  {form.watch("title") && (
                    <div className="space-1">
                      <p className="text-[#667185] text-sm">Event</p>
                      <p className="text-[#13191C] text-lg font-medium">
                        {form.watch("title")}
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-7 py-7 mx-4 border-b border-[#E4E7EC]">
                  <div className="space-y-1">
                    <p className="text-[#667185] text-sm">Description</p>
                    <p className="text-[#13191C] text-sm">
                      {form.watch("description")}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "grid grid-cols-3 gap-7",
                      layout === "phone" && "grid-cols-2"
                    )}
                  >
                    <div>
                      <p className="text-[#667185] text-sm">Category</p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {form.watch("category")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">Ticket price</p>
                      {event && (
                        <div className="flex items-center gap-1">
                          <img src={GBP} alt="gbp" className="w-3 h-3" />
                          <p className="text-[#667185] text-[15px] font-medium">
                            {getEventDetails.currency}{" "}
                            <span className="text-[#13191C]">
                              {getEventDetails.price}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">Type</p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {form.watch("type")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "grid grid-cols-2 gap-7",
                      layout === "phone" && "grid-cols-2"
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[#667185] text-sm">Location</p>
                        <MapPin size={20} color="#98A2B3" />
                      </div>
                      <p className="text-[#13191C] text-sm font-medium">
                        {form.watch("location")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">Level</p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {getEventDetails.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">Organizer</p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {form.getValues("name")
                          ? form.getValues("name")
                          : "---"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[26px] py-7 px-4">
                  <QRCodeSVG
                    value="https://reactjs.org/"
                    width={60}
                    height={60}
                  />
                  <p className="text-[#13191C] text-xs">
                    Sample QR Code for <br /> customers
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={openRemove} onOpenChange={setOpenRemove}>
        <DialogContent
          className="w-3/4 sm:max-w-[400px] flex flex-col justify-center items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
          closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
        >
          <DialogHeader className="self-center">
            <div className="w-full flex items-center justify-center self-center">
              <RemoveIcon />
            </div>
          </DialogHeader>
          <DialogDescription className="text-center text-[#13191C] text-lg font-medium">
            Remove ticket
          </DialogDescription>

          <DialogFooter className="flex justify-between items-center pt-2">
            <Button
              className="h-9 w-[178px]"
              variant="ghost"
              onClick={() => setOpenRemove(false)}
            >
              No, cancel
            </Button>
            <Button
              className="h-9 w-[178px]"
              variant="destructive"
              onClick={() => {
                removeEventLevel(selectedLevel);
                setOpenRemove(false);
                setSelectedLevel({} as EVENTLEVEL);
              }}
            >
              {"Yes, remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openPublish} onOpenChange={setOpenPublish}>
        <DialogContent
          className="w-3/4 sm:max-w-[400px] fle flex-col justify-center items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
          closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
        >
          <DialogHeader>
            <img
              src={ANNOUNCEMENT}
              alt="this slowpoke moves"
              className="w-[92px] h-[123px] self-center"
            />
          </DialogHeader>
          <DialogDescription className="text-center space-y-2">
            <p className="text-[#13191C] text-lg font-medium">
              Ticket Published
            </p>
            <p className="text-[#667185] text-sm">
              Your ticket is now available for users to purchase on the Tikeeti
              platform
            </p>
          </DialogDescription>

          <DialogFooter className="flex justify-between items-center pt-2">
            <Link to={"/events"} reloadDocument className="h-9 w-[178px]">
              <Button className="h-9 w-[178px]" variant="ghost">
                Close
              </Button>
            </Link>
            <Button
              className="h-9 w-[178px]"
              variant="default"
              onClick={() => navigate(`/event-details/${id}`)}
            >
              View ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EventLevelModal
        openLevel={openLevel}
        setOpenLevel={setOpenLevel}
        addEventLevel={addEventLevel}
      />
      <EditEventLevel
        eventLevel={selectedLevel}
        openEditEventLevel={openEditLevel}
        setOpenEditEventLevel={setOpenEditLevel}
        updateEventLevel={updateEventLevel}
      />
      <EditImage
        openEditImage={openEditImage}
        setOpenEditImage={setOpenEditImage}
        croppedPoster={croppedPoster}
        setPoster={setPoster}
        cropPoster={(name: string) => form.setValue("poster", name)}
      />
      <PromoCodeModal
        openPromoCode={openPromoCode}
        setOpenPromoCode={setOpenPromoCode}
        addPromoCode={addPromoCode}
      />
      <RemovePromoCode
        openRemove={openRemovePromoCode}
        setOpenRemove={setOpenRemovePromoCode}
        removePromoCode={removePromoCode}
        selectedPromoCode={selectedPromoCode}
      />
      <EditPromoCodeModal
        openEditPromoCode={openEditPromoCode}
        setOpenEditPromoCode={setOpenEditPromoCode}
        updatePromoCode={updatePromoCode}
        promoCode={selectedPromoCode}
      />
    </div>
  );
}
