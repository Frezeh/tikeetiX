import ChevronDouble from "@/assets/icons/chevron-double";
import EmailIcon from "@/assets/icons/email-icon";
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
import Loading from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES } from "@/lib/constants";
import { cn, one_alphabet, one_number, special_character } from "@/lib/utils";
import { register } from "@/services/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, EyeOff } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import ProgressIndicator from "./progress-indicator";

type Props = {
  goBack: VoidFunction;
  moveToNext: VoidFunction;
  type: "Individual" | "Organization";
  setEmail: Dispatch<SetStateAction<string>>;
};

const FormSchema = z
  .object({
    country: z.string().min(1, { message: "Country is required" }),
    businessname: z.string().min(1, { message: "Business name is required" }),
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

export default function RegisterOrganization(props: Props) {
  const { goBack, moveToNext, type, setEmail } = props;
  const [visible, setVisible] = useState(false);
  const [confirmvisible, setConfirmVisible] = useState(false);

  const { toast } = useToast();
  const { isPending, mutate } = useMutation({ mutationFn: register });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
      country: "",
      businessname: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(
      {
        email: data.email,
        password: data.password,
        country: data.country,
        firstName: " ",
        accountType: type,
        lastName: " ",
        businessName: data.businessname,
      },
      {
        onSuccess: () => {
          setEmail(data.email);
          moveToNext();
        },
        onError: () => {
          toast({
            title: "Failed to register",
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
    let specialcharacter = special_character.test(value);

    return { sixcharacters, onenumber, onealphabet, specialcharacter };
  }

  return (
    <div className="space-y-8 lg:w-1/2 xl:w-[40%] self-center overflow-y-scroll no-scrollbar h-auto px-1 max-h-[100vh] py-10">
      <div className="h-10" />
      <button className="flex gap-[10px] items-center" onClick={goBack}>
        <div className="w-9 h-9 bg-[#E4E7EC] rounded-[8px] flex justify-center items-center">
          <ChevronLeft color="#98A2B3" width={24} height={24} />
        </div>
        <p className="text-[#101928] text-xs">go back</p>
      </button>
      <div className="space-y-2">
        <p className="text-[#101928] text-[40px] font-medium">
          Onboard with Tikeeti
        </p>
        <p className="text-[#667185] text-base">
          We just need a few things to get you started.
        </p>
      </div>

      <div className="space-y-8 sm:max-w-[352px]">
        <ProgressIndicator step={2} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:max-w-[352px]"
          >
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
                          "bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[357px]"
                        )}
                        suffixIcon={<ChevronDouble />}
                      >
                        {field.value ? (
                          <SelectValue placeholder="Select Trading Country *" />
                        ) : (
                          <span className="text-input text-sm">
                            Select country
                          </span>
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
            <FormField
              control={form.control}
              name="businessname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#101928]">
                    Business name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter first name"
                      className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[357px]"
                      error={!!form.formState.errors.businessname}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#101928]">
                    Business email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email address"
                      className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[357px] pr-12"
                      error={!!form.formState.errors.email}
                      suffixitem={
                        <EmailIcon className="absolute top-0 right-0 cursor-pointer lg:mr-2 mr-4 mt-4" />
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
                  <FormLabel className="text-[#101928]">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Super s*cret pa**word"
                      className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[357px] pr-12"
                      error={!!form.formState.errors.password}
                      type={visible ? "text" : "password"}
                      suffixitem={
                        visible ? (
                          <VisibleIcon
                            className="absolute top-0 right-0 cursor-pointer mr-4 mt-4"
                            onClick={() => setVisible(!visible)}
                          />
                        ) : (
                          <EyeOff
                            color="#13191C"
                            width={21}
                            height={20}
                            className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] lg:mr-2 mr-4 mt-4"
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
                    <div className="flex items-center justify-between">
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
                      <div className="flex items-center space-x-1">
                        <Checkbox
                          id="specialcharacters"
                          className="transition-all duration-150 w-[14px] h-[14px] rounded-full"
                          iconStyle="w-3 h-3"
                          checked={validate(field.value).specialcharacter}
                        />
                        <label
                          htmlFor="specialcharacters"
                          className="text-xs text-[#13191C]"
                        >
                          Must contain a special character
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#101928]">
                    Re-enter Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Super s*cret pa**word"
                      className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[357px] pr-12"
                      error={!!form.formState.errors.confirmpassword}
                      type={confirmvisible ? "text" : "password"}
                      suffixitem={
                        confirmvisible ? (
                          <VisibleIcon
                            className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] lg:mr-2 mr-4 mt-4"
                            onClick={() => setConfirmVisible(!confirmvisible)}
                          />
                        ) : (
                          <EyeOff
                            color="#13191C"
                            width={21}
                            height={20}
                            className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] lg:mr-2 mr-4 mt-4"
                            onClick={() => setConfirmVisible(!confirmvisible)}
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
                className="w-full lg:w-[357px] h-14"
              >
                {isPending ? <Loading /> : "Login to account"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="sm:max-w-[352px] flex flex-col items-center justify-center gap-2">
        <p className="text-xs text-[#98A2B3] font-medium items-center flex gap-2">
          I already have an account
          <Link to="/login" className="text-sm text-secondary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
