import Avatar from "@/assets/icons/avatar.svg";
import BinIcon from "@/assets/icons/bin-icon";
import CancelIcon from "@/assets/icons/cancel-icon";
import ChevronDouble from "@/assets/icons/chevron-double";
import GBP from "@/assets/icons/gbp.svg";
import PencilIcon from "@/assets/icons/pencil-icon";
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
import { Label } from "@/components/ui/label";
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
import { COUNTRIES } from "@/lib/constants";
import { capitalizeFirstLetter, cn, getFlag } from "@/lib/utils";
import { useProfileContext } from "@/provider/profile-provider";
import { updateProfileDetails } from "@/services/api/account";
import { uploadSingleFile } from "@/services/api/file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Phone, Upload, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UpgradePlan from "./components/upgrade-plan";

const LANGUAGE = [
  { id: 0, country: "United Kingdom", value: "English", imageUrl: GBP },
];
const FormSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

export default function GeneralSettings() {
  const { profile, updateProfile } = useProfileContext();
  const [formType, setFormType] = useState<"display" | "edit">("display");
  const [poster, setPoster] = useState<File | undefined>(undefined);
  const [openRemove, setOpenRemove] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: profile?.firstName ?? "",
      lastname: profile?.lastName ?? "",
      phone: profile?.phoneNumber ?? "",
      country: profile?.country ?? "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: updateProfileDetails,
  });
  const { isPending: isUploading, mutate: upload } = useMutation({
    mutationFn: uploadSingleFile,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(
      {
        firstName: data.firstname,
        lastName: data.lastname,
        phoneNumber: data.phone,
        country: data.country,
      },
      {
        onSuccess: (res) => {
          setFormType("display");
          updateProfile(res.data);
          toast({
            title: "Profile updated successfully",
            variant: "success",
          });
        },
        onError: (err: any) => {
          toast({
            title: err?.error?.message
              ? err?.error?.message
              : "Failed to update profile",
            variant: "error",
          });
        },
      }
    );
  }

  const handleUpload = (e: FormEvent<HTMLInputElement>) => {
    let file = new FormData();
    const target =
      e.currentTarget.files !== null ? e.currentTarget.files[0] : undefined;

    if (target === undefined) return;

    setPoster(target);
    file.append("file", target);

    upload(file, {
      onSuccess: (res) => {
        if (res.message) {
          mutate(
            { profilePicture: res.data },
            {
              onSuccess: (res) => {
                updateProfile(res.data);
                setPoster(undefined);
                toast({
                  title: "Profile picture updated successfully",
                  variant: "success",
                });
              },
              onError: () => {
                toast({
                  title: "Failed to update profile picture",
                  variant: "error",
                });
              },
            }
          );
        }
      },
      onError: () => {
        toast({
          title: "Failed to upload image",
          variant: "error",
        });
      },
    });
  };

  const removePicture = () => {
    mutate(
      { profilePicture: null },
      {
        onSuccess: (res) => {
          updateProfile(res.data);
          setOpenRemove(false);
          toast({
            title: "Profile picture removed successfully",
            variant: "success",
          });
        },
        onError: () => {
          toast({
            title: "Failed to remove profile picture",
            variant: "error",
          });
        },
      }
    );
  };

  return (
    <div className="px-5 space-y-5">
      <UpgradePlan />
      <div className="space-y-5 border-b border-[#E4E7EC] py-5 transition-all duration-300 ease-in-out">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex items-center gap-[85px]">
            <p className="text-base font-medium">Your profile</p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={
                    profile?.profilePicture ? profile?.profilePicture : Avatar
                  }
                  alt="Avatar"
                  width={40}
                  height={40}
                />
                <div className="w-[10px] h-[10px] bg-[#04802E] rounded-full absolute right-0 border border-white bottom-1" />
              </div>
              <div className="flex items-center gap-3">
                <Label
                  htmlFor="image-file"
                  className="cursor-pointer flex items-center justify-center"
                >
                  <Button
                    variant="ghost"
                    prefixItem={
                      isUploading ? (
                        <Loading />
                      ) : (
                        <Upload size={25} color="#13191C" />
                      )
                    }
                    className="rounded-[8px] h-9 gap-2 text-[#133205] text-sm font-medium px-3 py-[10px] pointer-events-none transition-colors truncate ..."
                  >
                    {!poster ? "Upload" : poster.name ?? "File"}
                  </Button>
                  <div className="hidden">
                    <Input
                      id="image-file"
                      type="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={handleUpload}
                    />
                  </div>
                </Label>

                <button
                  className="flex items-center gap-2 text-sm text-[#E72113] font-medium"
                  onClick={() => setOpenRemove(true)}
                  disabled={isPending}
                >
                  <BinIcon width={20} height={20} color="#E72113" />
                  Remove
                </button>
              </div>
            </div>
          </div>
          {formType === "display" ? (
            <Button
              variant="ghost"
              prefixItem={
                <div>
                  <PencilIcon width={20} height={20} fill="#667185" />
                </div>
              }
              className="h-9 gap-2 bg-white px-3 py-[10px] border border-[#D0D5DD] text-[#667185] text-sm font-medium rounded-[8px]"
              onClick={() => setFormType("edit")}
            >
              Edit
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                className="h-9 text-sm font-medium rounded-[8px]"
                onClick={form.handleSubmit(onSubmit)}
              >
                {isPending ? <Loading /> : "Save changes"}
              </Button>
              <Button
                variant="ghost"
                className="h-9 text-sm text-[#13191C] font-medium rounded-[8px]"
                onClick={() => {
                  form.reset();
                  setFormType("display");
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        {formType === "display" ? (
          <div className="space-y-4 sm:max-w-[352px] pl-[175px]">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <Label className="text-[#101928] text-sm font-bold">
                  Full Name
                </Label>
                <div className="relative w-full">
                  <div
                    className={cn(
                      "bg-[#F0F2F5] border border-[#D0D5DD] h-14 w-full sm:w-[352px] z-10 flex items-center rounded-[6px] px-3 py-2 ring-offset-background file:border-0 file:bg-transparent"
                    )}
                  >
                    <p className="text-sm max-w-[90%] truncate ...">
                      {profile?.firstName ?? ""} {profile?.lastName ?? ""}
                    </p>
                  </div>
                  <UserRound
                    className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                    color="#667185"
                    size={20}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[#101928] text-sm font-bold">
                  Email address
                </Label>
                <div className="relative w-full">
                  <div
                    className={cn(
                      "bg-[#F0F2F5] border border-[#D0D5DD] h-14 w-full sm:w-[352px] z-10 flex items-center rounded-[6px] px-3 py-2 ring-offset-background file:border-0 file:bg-transparent"
                    )}
                  >
                    <p className="text-sm max-w-[90%] truncate ...">
                      {profile?.email ?? ""}
                    </p>
                  </div>
                  <UserRound
                    className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                    color="#667185"
                    size={20}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <Label className="text-[#101928] text-sm font-bold">
                  Phone number
                </Label>
                <div className="relative w-full">
                  <div
                    className={cn(
                      "bg-[#F0F2F5] border border-[#D0D5DD] h-14 w-full sm:w-[352px] z-10 flex items-center rounded-[6px] px-3 py-2 ring-offset-background file:border-0 file:bg-transparent"
                    )}
                  >
                    <p className="text-sm max-w-[90%] truncate ...">
                      {profile?.phoneNumber ?? ""}
                    </p>
                  </div>
                  <Phone
                    className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                    color="#667185"
                    size={20}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[#101928] text-sm font-bold">
                  Country
                </Label>
                <div className="relative w-full">
                  <div
                    className={cn(
                      "bg-[#F0F2F5] border border-[#D0D5DD] h-14 w-full sm:w-[352px] z-10 flex items-center rounded-[6px] px-3 py-2 ring-offset-background file:border-0 file:bg-transparent"
                    )}
                  >
                    <div className="flex items-center max-w-[90%]">
                      <span className="mr-2 text-2xl">
                        {getFlag(profile?.country ?? "")}
                      </span>
                      <p className="text-sm truncate ...">
                        ({capitalizeFirstLetter(profile?.country ?? "")})
                      </p>
                    </div>
                  </div>
                  <ChevronDouble
                    className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                    color="#667185"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <div className="space-y-4 sm:max-w-[352px] pl-[175px]">
              <div className="flex items-center justify-between gap-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#101928]">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="First Name"
                          className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[352px] ring-[#72B354] focus-visible:ring-[#72B354]"
                          error={!!form.formState.errors.firstname}
                          suffixitem={
                            <UserRound
                              className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                              color="#667185"
                              size={20}
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
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#101928]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Last Name"
                          className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[352px] ring-[#72B354] focus-visible:ring-[#72B354]"
                          error={!!form.formState.errors.lastname}
                          suffixitem={
                            <UserRound
                              className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                              color="#667185"
                              size={20}
                            />
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#101928]">
                        Phone number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Phone number"
                          className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[352px] ring-[#72B354] focus-visible:ring-[#72B354]"
                          error={!!form.formState.errors.phone}
                          suffixitem={
                            <Phone
                              className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                              color="#667185"
                              size={20}
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
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#101928]">Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[357px] ring-[#72B354] focus-visible:ring-[#72B354]"
                            )}
                            suffixIcon={<ChevronDouble />}
                          >
                            {field.value ? (
                              <div className="flex items-center max-w-[90%]">
                                <span className="mr-2 text-2xl">
                                  {getFlag(field.value ?? "")}
                                </span>
                                <p className="text-sm truncate ...">
                                  ({capitalizeFirstLetter(field.value ?? "")})
                                </p>
                              </div>
                            ) : (
                              <div className="flex items-center max-w-[90%]">
                                <span className="mr-2 text-2xl">
                                  {getFlag(profile?.country ?? "")}
                                </span>
                                <p className="text-sm truncate ...">
                                  (
                                  {capitalizeFirstLetter(
                                    profile?.country ?? ""
                                  )}
                                  )
                                </p>
                              </div>
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-auto h-auto max-h-[400px] p-0">
                          <SelectGroup>
                            {COUNTRIES.map((add, i) => (
                              <SelectItem value={add.value} key={i}>
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
            </div>
          </Form>
        )}
      </div>
      <div className="flex items-center gap-[85px]">
        <p className="text-base font-medium">Language</p>
        <Select>
          <SelectTrigger
            className="w-fit min-w-[300px] h-9 border-[#D0D5DD] rounded-[8px] bg-white text-[#13191C]"
            suffixIcon={<ChevronDouble width={20} height={20} />}
          >
            <SelectValue
              className="placeholder:text-[#344054] text-sm"
              placeholder={
                <span className="flex">
                  <img src={GBP} alt="Globe" className="mr-2" /> English (United
                  Kingdom)
                </span>
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {LANGUAGE.map((language) => (
                <SelectItem
                  value={language.value}
                  key={language.id}
                  className="text-[#13191C] text-sm flex"
                >
                  <span className="flex">
                    <img src={language.imageUrl} alt="Globe" className="mr-2" />{" "}
                    {language.value} ({language.country})
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Dialog open={openRemove} onOpenChange={setOpenRemove}>
        <DialogContent
          className="w-3/4 sm:max-w-[400px] flex flex-col justify-center items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
          closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
        >
          <DialogHeader className="self-center">
            <div className="w-full flex items-center justify-center self-center">
              <CancelIcon />
            </div>
          </DialogHeader>
          <DialogDescription className="text-center space-y-2">
            <p className="text-[#13191C] text-lg font-medium">
              Remove profile picture
            </p>
            <p className="text-[#667185] text-xs">
              Are you sure you want to remove your profile picture?
            </p>
          </DialogDescription>
          <DialogFooter className="flex justify-between items-center pt-2">
            <Button
              className="h-9 w-[178px]"
              variant="ghost"
              onClick={() => setOpenRemove(false)}
            >
              Cancel
            </Button>
            <Button
              className="h-9 w-[178px]"
              variant="destructive"
              onClick={removePicture}
              disabled={isPending}
            >
              {isPending ? <Loading className="w-4 h-4" /> : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
