import EmailIcon from "@/assets/icons/email-icon";
import Logo from "@/assets/icons/logo.svg";
import VisibleIcon from "@/assets/icons/visible-icon";
import AuthenticationLayot from "@/components/authentication-layout";
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
import Loading from "@/components/ui/loading";
import { useToast } from "@/hooks/use-toast";
import { one_alphabet, one_number } from "@/lib/utils";
import { resetPassword, verifyOtp } from "@/services/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const FormSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" })
      .refine((value) => one_number.test(value), {
        message: "Password must contain atleast 1 number",
      })
      .refine((value) => one_alphabet.test(value), {
        message: "Password must contain atleast 1 alpbabet",
      }),
    confirmpassword: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" })
      .refine((value) => one_number.test(value), {
        message: "Password must contain atleast 1 number",
      })
      .refine((value) => one_alphabet.test(value), {
        message: "Password must contain atleast 1 alpbabet",
      }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });

export default function ResetPassword() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
  const { isPending: isReseting, mutate: reset } = useMutation({
    mutationFn: resetPassword,
  });
  const { isPending: isVerifying, mutate: verify } = useMutation({
    mutationFn: verifyOtp,
  });

  const code = location.search.split("?")[1] ?? "";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    verify(
      { email: data.email, code },
      {
        onSuccess: (res) => {
          if (res.data) {
            reset(
              { email: data.email, password: data.password },
              {
                onSuccess: () => {
                  toast({
                    title: "Password reset was successful!",
                    variant: "success",
                  });
                  navigate("/login");
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

  const isLoading = isReseting || isVerifying;

  return (
    <AuthenticationLayot>
      <>
        <div className="hidden lg:flex bg-[url('./assets/images/password-background.png')] bg-black h-[96vh] w-[40%] bg-cover rounded-[32px] p-10 flex-col justify-start">
          <img src={Logo} alt="TikeetiX Logo" className="w-32 h-6" />
          <div className="py-20">
            <h1 className="sm:text-2xl lg:text-3xl xl:text-5xl 2xl:text-[64px] text-background leading-[120%] tracking-[-4%] font-medium">
              To forget is human, to recover is Tikeeti.
            </h1>
          </div>
        </div>

        <div className="space-y-8 lg:w-1/2 xl:w-[40%] self-center overflow-y-scroll no-scrollbar h-auto px-1 lg:max-h-[90vh]">
          <div className="space-y-2">
            <p className="text-[#101928] text-[40px] font-medium">
              Reset password
            </p>
            <p className="text-[#667185] text-base">
              You just need to enter a new password below.
            </p>
          </div>

          <div className="space-y-4 sm:max-w-[352px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 sm:max-w-[352px]"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#101928]">
                        Email address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email address"
                          className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[352px]"
                          error={!!form.formState.errors.email}
                          suffixitem={
                            <EmailIcon className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4" />
                          }
                        />
                      </FormControl>
                      <FormMessage />
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
                        Re-enter password
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
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full sm:w-[352px] h-14"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loading /> : "Reset password"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="sm:max-w-[352px] flex flex-col items-center justify-center gap-2">
            <p className="text-xs text-[#98A2B3] font-medium items-center flex gap-2">
              Are you new here?
              <Link
                to="/onboarding"
                className="text-sm text-secondary font-medium"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </>
    </AuthenticationLayot>
  );
}
