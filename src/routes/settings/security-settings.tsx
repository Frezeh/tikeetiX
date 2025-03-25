import PencilIcon from "@/assets/icons/pencil-icon";
import VisibleIcon from "@/assets/icons/visible-icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { toast } from "@/hooks/use-toast";
import { cn, one_alphabet, one_number, special_character } from "@/lib/utils";
import { useProfileContext } from "@/provider/profile-provider";
import { resetPassword } from "@/services/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UpgradePlan from "./components/upgrade-plan";

const FormSchema = z
  .object({
    currentpassword: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" })
      .refine((value) => one_number.test(value), {
        message: "Password must contain atleast 1 number",
      })
      .refine((value) => one_alphabet.test(value), {
        message: "Password must contain atleast 1 alpbabet",
      })
      .refine((value) => special_character.test(value), {
        message: "Password must contain a special character",
      }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" })
      .refine((value) => one_number.test(value), {
        message: "Password must contain atleast 1 number",
      })
      .refine((value) => one_alphabet.test(value), {
        message: "Password must contain atleast 1 alpbabet",
      })
      .refine((value) => special_character.test(value), {
        message: "Password must contain a special character",
      }),
    confirmpassword: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" })
      .refine((value) => one_number.test(value), {
        message: "Password must contain atleast 1 number",
      })
      .refine((value) => one_alphabet.test(value), {
        message: "Password must contain atleast 1 alpbabet",
      })
      .refine((value) => special_character.test(value), {
        message: "Password must contain a special character",
      }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });

export default function SecuritySettings() {
  const { profile } = useProfileContext();
  const [formType, setFormType] = useState<"display" | "edit">("display");
  const [visible, setVisible] = useState(false);

  const { isPending: isReseting, mutate: reset } = useMutation({
    mutationFn: resetPassword,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentpassword: "",
      password: "",
      confirmpassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    reset(
      { email: profile?.email ?? "", password: data.password },
      {
        onSuccess: () => {
          toast({
            title: "Password reset was successful!",
            variant: "success",
          });
          form.reset();
          setFormType("display");
        },
        onError: () => {
          toast({
            title: "Failed to reset password!",
            variant: "error",
          });
        },
      }
    );
  }

  function validate(value: string) {
    let sixcharacters = value.length >= 6;
    let onenumber = one_number.test(value);
    let onealphabet = value.length > 0;

    return { sixcharacters, onenumber, onealphabet };
  }

  return (
    <div className="px-5 space-y-5">
      <UpgradePlan />
      <div className="space-y-5 border-b border-[#E4E7EC] py-5 transition-all duration-300 ease-in-out">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex gap-[85px]">
            <p className="text-base font-medium">Password</p>
            {formType === "display" ? (
              <div className="space-y-4 sm:max-w-[352px]">
                <div className="space-y-1">
                  <Label className="text-[#101928] text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative w-full">
                    <div
                      className={cn(
                        "bg-[#F0F2F5] border border-[#D0D5DD] h-14 w-full sm:w-[352px] z-10 flex items-center rounded-[6px] px-3 py-2 ring-offset-background file:border-0 file:bg-transparent"
                      )}
                    >
                      <p className="text-sm max-w-[90%] truncate ...">
                        ************
                      </p>
                    </div>
                    <EyeOff
                      color="#13191C"
                      width={21}
                      height={20}
                      className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] lg:mr-2 mr-4 mt-4"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <div className="space-y-4 sm:max-w-[352px]">
                  <FormField
                    control={form.control}
                    name="currentpassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#101928]">
                          Current password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Super s*cret pa**word"
                            className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[352px] pr-10"
                            error={!!form.formState.errors.currentpassword}
                            type={visible ? "text" : "password"}
                            suffixitem={
                              visible ? (
                                <VisibleIcon
                                  className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                                  onClick={() => setVisible(!visible)}
                                />
                              ) : (
                                <EyeOff
                                  color="#13191C"
                                  width={21}
                                  height={20}
                                  className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                                  onClick={() => setVisible(!visible)}
                                />
                              )
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#101928]">
                          New password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Super s*cret pa**word"
                            className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[352px] pr-10"
                            error={!!form.formState.errors.password}
                            type={visible ? "text" : "password"}
                            suffixitem={
                              visible ? (
                                <VisibleIcon
                                  className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                                  onClick={() => setVisible(!visible)}
                                />
                              ) : (
                                <EyeOff
                                  color="#13191C"
                                  width={21}
                                  height={20}
                                  className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                                  onClick={() => setVisible(!visible)}
                                />
                              )
                            }
                          />
                        </FormControl>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <Checkbox
                                id="characters"
                                className="transition-all duration-150 w-[14px] h-[14px] rounded-full"
                                iconStyle="w-3 h-3"
                                checked={validate(field.value).sixcharacters}
                              />
                              <label
                                htmlFor="characters"
                                className="text-xs text-[#13191C]"
                              >
                                At least 6 characters long
                              </label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Checkbox
                                id="alphabet"
                                className="transition-all duration-150 w-[14px] h-[14px] rounded-full"
                                iconStyle="w-3 h-3"
                                checked={validate(field.value).onealphabet}
                              />
                              <label
                                htmlFor="alphabet"
                                className="text-xs text-[#13191C]"
                              >
                                Must contain an Alphabet
                              </label>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Checkbox
                              id="number"
                              className="transition-all duration-150 w-[14px] h-[14px] rounded-full"
                              iconStyle="w-3 h-3"
                              checked={validate(field.value).onenumber}
                            />
                            <label
                              htmlFor="number"
                              className="text-xs text-[#13191C]"
                            >
                              Must contain a number
                            </label>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmpassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#101928]">
                          Re-enter new password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Super s*cret pa**word"
                            className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[352px] pr-10"
                            error={!!form.formState.errors.confirmpassword}
                            type={visible ? "text" : "password"}
                            suffixitem={
                              visible ? (
                                <VisibleIcon
                                  className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                                  onClick={() => setVisible(!visible)}
                                />
                              ) : (
                                <EyeOff
                                  color="#13191C"
                                  width={21}
                                  height={20}
                                  className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4"
                                  onClick={() => setVisible(!visible)}
                                />
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            )}
          </div>
          <div>
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
                  disabled={isReseting}
                >
                  {isReseting ? <Loading /> : "Save changes"}
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
        </div>
      </div>
      <div className="hidden flex-col sm:flex-row justify-between">
        <div className="flex gap-[35px]">
          <div>
            <p className="text-base font-medium">Two factor auth.</p>
          </div>
          <div className="space-y-2 max-w-[271px]">
            <p className="text-base font-medium text-black">
              Activate Two-factor-authentication
            </p>
            <p className="text-sm text-[#667185]">
              This will require you to enter a code sent to your registered
              email before gaining access to your account
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="h-9 gap-2 bg-white px-3 py-[10px] border border-[#0ea66729] text-[#0DA767] text-sm font-medium rounded-[8px]"
        >
          Activate
        </Button>
      </div>
    </div>
  );
}
