import BinIcon from "@/assets/icons/bin-icon";
import DesktopIcon from "@/assets/icons/desktop-icon";
import GBP from "@/assets/icons/gbp.svg";
import MovieIcon from "@/assets/icons/movie-icon";
import PencilIcon from "@/assets/icons/pencil-icon";
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
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { uploadSingleFile } from "@/services/api/file-upload";
import { deleteMovieRoom, getMovieRooms } from "@/services/api/movie-room";
import { getMovie, updateMovie } from "@/services/api/movies";
import { Movie } from "@/services/models/movies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MoveLeft,
  PlusCircleIcon,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import ShowingRoom from "../create-movie/components/showing-room";
import EditMovieDetails from "./edit-movie-details";

export const EditMovieFormSchema = z.object({
  poster: z.string().min(1, { message: "Required" }),
  title: z.string().min(1, { message: "Movie title is required" }),
  genre: z.string().min(1, { message: "Movie genre is required" }),
  rating: z.string().min(1, { message: "Age rating is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  description: z.string().optional(),
});

export default function EditMovie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [layout, setLayout] = useState<"desktop" | "phone">("desktop");
  const [openShowingRoom, setOpenShowingRoom] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);
  const [step, setStep] = useState<"details" | "room">("details");
  const [poster, setPoster] = useState<File | undefined | null>();
  const [room, setRoom] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const { isLoading, data: showingRoom } = useQuery({
    queryKey: ["movie-room"],
    queryFn: getMovieRooms,
  });
  const { isPending, mutate } = useMutation({ mutationFn: updateMovie });
  const { isPending: isRemoving, mutate: remove } = useMutation({
    mutationFn: deleteMovieRoom,
  });
  const {
    isLoading: isMovieLoading,
    data: MOVIE,
    error,
  } = useQuery({
    queryKey: [`movie-${id}`],
    queryFn: () => getMovie(id!),
    enabled: !!id,
  });
  const { isPending: isUploading, mutate: upload } = useMutation({
    mutationFn: uploadSingleFile,
  });
  const isCreating = isPending || isUploading;

  useEffect(() => {
    if (error) {
      toast({
        title: "Movie not found",
        description: "The movie you are looking for does not exist",
        variant: "error",
      });
      navigate("/movies");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (MOVIE) {
      form.setValue("title", MOVIE.data.title);
      form.setValue("description", MOVIE.data.description);
      form.setValue("genre", MOVIE.data.genre);
      form.setValue("rating", MOVIE.data.ageRating);
      form.setValue("poster", MOVIE.data.image);
      form.setValue("location", MOVIE.data.location);
      setPoster(null);
    }
  }, [MOVIE]);

  const form = useForm<z.infer<typeof EditMovieFormSchema>>({
    resolver: zodResolver(EditMovieFormSchema),
  });

  const updateTicket = (data: Partial<Movie>) => {
    mutate(
      { id: id!, body: data },
      {
        onSuccess: (res) => {
          if (res.message) {
            setOpenPublish(true);
            queryClient.invalidateQueries({ queryKey: ["movies"] });
          }
        },
        onError: () => {
          toast({
            title: "Failed to create movie ticket",
            variant: "error",
          });
        },
      }
    );
  };

  const publishTicket = () => {
    let file = new FormData();
    file.append("file", poster as File);

    if (showingRoom?.data.length === 0) {
      toast({
        title: "Showing room not found",
        description: "Please add showing room first",
        variant: "error",
      });
    } else {
      let data: Partial<Movie> = {};

      data["title"] = form.getValues("title");
      data["description"] = form.getValues("description") ?? "";
      data["genre"] = form.getValues("genre");
      data["ageRating"] = form.getValues("rating");
      data["location"] = form.getValues("location");
      data["image"];

      if (!poster) {
        updateTicket({
          title: form.getValues("title"),
          description: form.getValues("description") ?? "",
          genre: form.getValues("genre"),
          ageRating: form.getValues("rating"),
          location: form.getValues("location"),
          image: MOVIE?.data.image,
          movieRooms: showingRoom?.data.map((room) => room.id)!,
        });
      } else {
        upload(file, {
          onSuccess: (res) => {
            if (res.message) {
              updateTicket({
                title: form.getValues("title"),
                description: form.getValues("description") ?? "",
                genre: form.getValues("genre"),
                ageRating: form.getValues("rating"),
                location: form.getValues("location"),
                image: res.data,
                movieRooms: showingRoom?.data.map((room) => room.id)!,
              });
            }
          },
          onError: () => {
            toast({
              title: "Failed to create movie ticket",
              variant: "error",
            });
          },
        });
      }
    }
  };

  const getRoomDetails = useMemo(() => {
    const [name, price, currency] = room.split(",");

    return { name, price, currency };
  }, [room]);

  if (isLoading || isMovieLoading) {
    return <Loader />;
  }

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
          <Link to="/movies" className="flex items-center gap-1">
            <TicketIcon width={16} height={16} />
            <p className="text-[#667185] text-xs">Tickets</p>
          </Link>
          <div className="bg-[#F0F2F5] h-[38px] px-2 rounded-[8px] flex items-center gap-2">
            <ChevronRight size={16} color="#98A2B3" />
            <p className="text-[#667185] font-medium text-xs">Edit ticket</p>
          </div>
        </div>
        <button className="bg-[#F0F2F5] h-[38px] px-4 rounded-[8px] flex items-center gap-2">
          <p className="text-[#667185] font-medium text-xs">Save as draft</p>
        </button>
      </div>

      <div className="flex justify-between h-full">
        <div className="2xl:w-1/3 lg:w-[40%] pl-5 2xl:pl-10 py-5 relative after:content-['_'] after:absolute after:h-[85%] after:my-auto after:border-l-[solid] after:border-l after:right-0 after:top-[0%]">
          <div className="w-full border-b border-[#E4E7EC] pb-1">
            <p className="text-primary font-medium text-2xl">Edit a movie</p>
          </div>
          {step === "details" && (
            <EditMovieDetails
              moveToNext={() => setStep("room")}
              form={form}
              poster={poster}
              setPoster={setPoster}
            />
          )}
          {step === "room" && (
            <ScrollArea className="h-[80vh]">
              <div className="space-y-8 mt-5">
                <div className="space-y-2 mr-5">
                  {showingRoom?.data &&
                    showingRoom?.data.map((room) => (
                      <Card
                        className="p-4 border-[#D0D5DD] rounded-[8px]"
                        key={room.id}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-[8px] border border-[#E4E7EC] flex justify-center items-center">
                              <MovieIcon />
                            </div>
                            <p className="text-[#13191C] font-medium text-base">
                              Room details
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <button>
                              <PencilIcon />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRoom(room.id);
                                setOpenRemove(true);
                              }}
                            >
                              <BinIcon />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1 pt-2">
                          <p className="text-[#667185] text-xs">Room name</p>
                          <p className="text-[#13191C] text-[15px] font-medium">
                            {room.roomName}
                          </p>
                        </div>
                        <div className="flex items-center pt-4">
                          <div className="space-y-1 w-1/2">
                            <p className="text-[#667185] text-xs">
                              Ticket price
                            </p>
                            <div className="flex items-center gap-1">
                              <img src={GBP} alt="gbp" className="w-3 h-3" />
                              <p className="text-[#667185] text-[15px] font-medium">
                                {room.ticketCurrency}{" "}
                                <span className="text-[#13191C]">
                                  {room.ticketPrice}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="space-y-1 w-1/2">
                            <p className="text-[#667185] text-xs">
                              Number of seats
                            </p>
                            <p className="text-[#13191C] text-[15px] font-medium">
                              {room.quantity}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  <Button
                    variant="ghost"
                    className="h-9 w-[175px] rounded-[8px] text-sm font-medium text-primary gap-2"
                    prefixItem={
                      <div>
                        <PlusCircleIcon size={20} color="#133205" />
                      </div>
                    }
                    onClick={() => setOpenShowingRoom(true)}
                  >
                    Add showing room
                  </Button>
                </div>
                <div className="mr-5">
                  <div className="flex items-center gap-2 w-full">
                    <Button
                      variant="ghost"
                      className="w-1/2 h-14 rounded-[8px] text-base flex gap-1 font-medium text-[#13191C] px-10"
                      prefixItem={
                        <div className="">
                          <MoveLeft size={20} color="#13191C" />
                        </div>
                      }
                      onClick={() => setStep("details")}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="gradient"
                      className="w-1/2 h-14 rounded-[8px] gap-2 text-base font-medium px-10"
                      onClick={publishTicket}
                    >
                      {isCreating ? <Loading /> : "Edit ticket"}
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
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
                <Select onValueChange={setRoom}>
                  <SelectTrigger
                    className="w-[142px] h-9 border-[#D0D5DD] rounded-[8px] bg-[#F7F9FC] text-[#344054] focus:ring-0"
                    prefixIcon={<ChevronDown size={20} color="#667185" />}
                    suffixIcon={<div></div>}
                  >
                    <SelectValue
                      className="placeholder:text-[#344054] text-sm"
                      placeholder="Room type"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {showingRoom?.data && (
                      <SelectGroup>
                        {showingRoom.data.map((room) => (
                          <SelectItem
                            value={`${room.roomName},${room.ticketPrice},${room.ticketCurrency}`}
                            key={room.roomName}
                            className="text-[#344054] text-sm"
                          >
                            {room.roomName}
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
                  {poster ? (
                    <img
                      src={poster ? URL.createObjectURL(poster) : undefined}
                      alt="Movie"
                      className="w-20 h-20 rounded-[8px]"
                    />
                  ) : (
                    <img
                      src={form.getValues("poster")}
                      alt="Movie"
                      className="w-20 h-20 rounded-[8px]"
                    />
                  )}
                  {form.watch("title") && (
                    <div className="space-1">
                      <p className="text-[#667185] text-sm">Movie</p>
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
                      <p className="text-[#667185] text-sm">Genre</p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {form.watch("genre")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">Ticket price</p>
                      {room && (
                        <div className="flex items-center gap-1">
                          <img src={GBP} alt="gbp" className="w-3 h-3" />
                          <p className="text-[#667185] text-[15px] font-medium">
                            {getRoomDetails.currency}{" "}
                            <span className="text-[#13191C]">
                              {getRoomDetails.price}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">Age rating</p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {form.watch("rating")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">
                        Playtime/Duration
                      </p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {form.watch("duration")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">Room type</p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {getRoomDetails.name}
                      </p>
                    </div>
                  </div>
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
                    <p className="text-[#667185] text-sm">Organizer</p>
                    <p className="text-[#13191C] text-sm font-medium">---</p>
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
            Remove room
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
              onClick={() =>
                remove(selectedRoom, {
                  onSuccess: (res) => {
                    if (res.message) {
                      setOpenRemove(false);
                      toast({
                        title: "Showing room removed",
                        variant: "success",
                      });
                      queryClient.invalidateQueries({
                        queryKey: ["movie-room"],
                      });
                    }
                  },
                  onError: () => {
                    toast({
                      title: "Failed to remove showing room",
                      variant: "error",
                    });
                  },
                })
              }
            >
              {isRemoving ? <Loading className="w-4 h-4" /> : "Yes, remove"}
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
            <Link to={"/movies"} reloadDocument className="h-9 w-[178px]">
              <Button className="h-9 w-[178px]" variant="ghost">
                Close
              </Button>
            </Link>
            <Button
              className="h-9 w-[178px]"
              variant="default"
              onClick={() => navigate(`/movie-details/${id}`)}
            >
              View ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ShowingRoom
        openShowingRoom={openShowingRoom}
        setOpenShowingRoom={setOpenShowingRoom}
      />
    </div>
  );
}
