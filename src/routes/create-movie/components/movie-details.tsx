import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronDown,
  Clock3,
  Download,
  MapPin,
  MoveLeft,
} from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  memo,
  useCallback,
  useMemo,
} from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  moveToNext: () => void;
  form: UseFormReturn<
    {
      poster: string;
      title: string;
      genre: string;
      rating: string;
      duration: string;
      location: string;
      startTime: Date;
      description?: string | undefined;
    },
    any,
    undefined
  >;
  poster: File | undefined;
  setPoster: Dispatch<SetStateAction<File | undefined>>;
};

const GENRES = ["Action", "Comedy", "Drama", "Horror", "Romance"];
const RATINGS = ["PG 13", "R", "PG", "G"];

function MovieDetails(props: Props) {
  const { moveToNext, form, poster, setPoster } = props;

  const onSubmit = () => {
    moveToNext();
  };

  const validate = useMemo(() => {
    let imageFormat = poster?.type.split("/")[1];
    let imageSize = Number(poster?.size) / 1024 / 1024;
    let format =
      imageFormat === "jpeg" || imageFormat === "png" || imageFormat === "jpg"
        ? true
        : false;
    let size = imageSize < 5 ? true : false;

    return {
      format,
      size,
      aspectRatio: size,
      errorMessage: !format
        ? "Invalid image format"
        : !size
        ? "File size should be less than 5 MB"
        : "",
    };
  }, [poster]);

  const handleUpload = useCallback((e: FormEvent<HTMLInputElement>) => {
    const target =
      e.currentTarget.files !== null ? e.currentTarget.files[0] : undefined;

    if (target === undefined) return;

    // const reader = new FileReader();

    // reader.readAsDataURL(target);

    // reader.onload = () => {
    //   if (reader.result) {
    //     setImage(reader.result as string);
    //     uploadImage({
    //       // ...profile,
    //       profilePictures: reader.result as string,
    //     });
    //   }
    // };
    form.setValue("poster", target.name);
    setPoster(target);
  }, []);

  return (
    <ScrollArea className="h-[80vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:max-w-[330px] 2xl:max-w-[375px] pt-5"
        >
          <div className="flex items-center gap-3">
            <FormField
              control={form.control}
              name="poster"
              render={() => (
                <FormItem>
                  <FormLabel className="text-[#101928]">Movie poster</FormLabel>
                  <FormControl>
                    <Label
                      htmlFor="image-file"
                      className="cursor-pointer flex items-center justify-center bg-white border text-sm border-[#D0D5DD] border-dashed h-[106px] w-[106px] rounded-[8px]"
                    >
                      {!form.watch("poster") ? (
                        <div className="flex items-center gap-2">
                          <Download size={12} color="#667185" />
                          <span className="text-xs text-[#13191C]">Upload</span>
                        </div>
                      ) : (
                        <p className="text-xs text-[#13191C] truncate ...">
                          {form.watch("poster")}
                        </p>
                      )}
                      <div className="hidden">
                        <Input
                          id="image-file"
                          type="file"
                          accept=".png,.jpeg,.jpg"
                          //   className="hidden"
                          error={!!form.formState.errors.poster}
                          onChange={handleUpload}
                        />
                      </div>
                    </Label>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.poster
                      ? String(form.formState.errors.poster?.message)
                      : poster
                      ? validate.errorMessage
                      : ""}
                  </FormMessage>
                </FormItem>
              )}
            />
            <div
              className={cn(
                "space-y-2 h-[67px] pt-3.5",
                form.formState.errors.poster && "pt-0"
              )}
            >
              <div className="flex items-center space-x-1">
                <Checkbox
                  id="format"
                  className="transition-all duration-150 w-[14px] h-[14px] rounded-full"
                  iconStyle="w-3 h-3"
                  checked={validate.format}
                />
                <label htmlFor="format" className="text-xs text-[#13191C]">
                  Must be a JPEG or PNG Image
                </label>
              </div>
              <div className="flex items-center space-x-1">
                <Checkbox
                  id="size"
                  className="transition-all duration-150 w-[14px] h-[14px] rounded-full"
                  iconStyle="w-3 h-3"
                  checked={validate.size}
                />
                <label htmlFor="size" className="text-xs text-[#13191C]">
                  Less than 5MB
                </label>
              </div>
              <div className="flex items-center space-x-1">
                <Checkbox
                  id="aspect-ratio"
                  className="transition-all duration-150 w-[14px] h-[14px] rounded-full"
                  iconStyle="w-3 h-3"
                  checked={validate.aspectRatio}
                />
                <label
                  htmlFor="aspect-ratio"
                  className="text-xs text-[#13191C]"
                >
                  Preferably 2:1 Dimensions
                </label>
              </div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#101928]">Movie title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="League of extraordinary gentlemen"
                    className="bg-white border text-sm border-[#C7FFAC] h-14 placeholder:text-[#98A2B3] w-full focus-visible:ml-0.5 transition-opacity duration-100"
                    error={!!form.formState.errors.title}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#101928] flex items-center gap-2">
                  Description{" "}
                  <Badge className="bg-[#E4E7EC] text-xs text-[#667185] font-medium">
                    Optional
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter text here..."
                    className="bg-white border text-sm border-[#D0D5DD] h-[104px] placeholder:text-[#98A2B3] w-full focus-visible:ml-0.5 transition-opacity duration-100"
                    error={!!form.formState.errors.description}
                    maxLength={800}
                  />
                </FormControl>
                <FormDescription className="text-[#667185] text-sm">
                  Max of 800 words
                </FormDescription>
                <FormMessage className="w-full" />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#101928]">Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "bg-white border border-[#D0D5DD] focus:ring-0 h-14 placeholder:text-[#667185] w-1/2 lg:w-[160px] 2xl:w-[180px]",
                          !!form.formState.errors.genre && "border-[#E26E6A]"
                        )}
                        suffixIcon={<ChevronDown size={24} color="#667185" />}
                      >
                        {field.value ? (
                          <SelectValue placeholder="Adventure" />
                        ) : (
                          <span className="text-[#667185] text-sm">
                            Adventure
                          </span>
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-auto h-auto max-h-[400px] p-0 m-0 border-[#E4E7EC]">
                      <SelectGroup>
                        {GENRES.map((add, i) => (
                          <SelectItem
                            value={add}
                            key={i}
                            className="text-xs text-[#13191C]"
                          >
                            {add}
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
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#101928]">Age rating</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "bg-white border border-[#D0D5DD] focus:ring-0 h-14 placeholder:text-[#667185] w-1/2 lg:w-[160px] 2xl:w-[180px]",
                          !!form.formState.errors.rating && "border-[#E26E6A]"
                        )}
                        suffixIcon={<ChevronDown size={24} color="#667185" />}
                      >
                        {field.value ? (
                          <SelectValue placeholder="PG 13" />
                        ) : (
                          <span className="text-[#667185] text-sm">PG 13</span>
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-auto h-auto max-h-[400px] p-0 m-0 border-[#E4E7EC]">
                      <SelectGroup>
                        {RATINGS.map((add, i) => (
                          <SelectItem
                            value={add}
                            key={i}
                            className="text-xs text-[#13191C]"
                          >
                            {add}
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
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#101928]">
                  Playtime/Duration
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="2:15:20"
                    className="bg-white border text-sm border-[#D0D5DD] h-14 placeholder:text-[#98A2B3] w-full pr-12 focus-visible:ml-0.5 transition-opacity duration-100"
                    error={!!form.formState.errors.duration}
                    suffixitem={
                      <Clock3
                        size={20}
                        color="#98A2B3"
                        className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] lg:mr-8 mr-4 mt-4"
                      />
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-[#101928]">Start time</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger
                      suffixIcon={
                        <CalendarIcon
                          className="ml-auto"
                          color="#667185"
                          size={20}
                        />
                      }
                      className="border-[#D0D5DD] active:focus:outline-none h-14"
                    >
                      <Button
                        variant={"ghost"}
                        className={cn(
                          "xl:w-[125px] 2xl:w-[145px] ml-[-20px] text-left items-start font-normal bg-transparent text-[#13191C]",
                          !form.watch("startTime") && "text-[#667185]"
                        )}
                      >
                        {form.watch("startTime") ? (
                          format(form.watch("startTime"), "PP")
                        ) : (
                          <span className="text-[#667185]">24 Aug 2024</span>
                        )}
                      </Button>
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent
                    className="w-auto h-auto p-0 rounded-[10px] shadow-lg mt-1 border-[0.3px] bg-card"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      // selected={form.watch("end")}
                      // onSelect={(d) => {
                      //   form.setValue("end", d!);
                      //   setOpenEndDate(false);
                      // }}
                      disabled={(date) => date < new Date()}
                      fromDate={new Date()}
                      toDate={new Date(Date.now() + 10000 * 60 * 60 * 24 * 365)}
                      // fromYear={1800}
                      // toYear={new Date().getFullYear()}
                      initialFocus
                    />
                  </SelectContent>
                </Select>
                <FormMessage className="w-full" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#101928]">Location</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Select location"
                    className="bg-white border text-sm border-[#D0D5DD] h-14 placeholder:text-[#98A2B3] w-full pr-12 focus-visible:ml-0.5 transition-opacity duration-100"
                    error={!!form.formState.errors.location}
                    suffixitem={
                      <MapPin
                        size={20}
                        color="#98A2B3"
                        className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] lg:mr-8 mr-4 mt-4"
                      />
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2 pt-4">
            <Button
              variant="ghost"
              disabled
              className="w-full h-14 rounded-[8px] text-base flex gap-1 font-medium text-[#13191C] px-10 opacity-30 pointer-events-none"
              prefixItem={
                <div className="">
                  <MoveLeft size={20} color="#13191C" />
                </div>
              }
            >
              Previous
            </Button>
            <Button
              variant="gradient"
              className="w-full h-14 rounded-[8px] gap-2 text-base font-medium px-10"
              type="submit"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}

export default memo(MovieDetails);
