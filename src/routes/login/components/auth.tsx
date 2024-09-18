// import Apple from "@/assets/icons/apple.svg";
import EmailIcon from "@/assets/icons/email-icon";
// import Facebook from "@/assets/icons/facebook.svg";
// import Google from "@/assets/icons/google.svg";
// import Twitter from "@/assets/icons/twitter.svg";
import VisibleIcon from "@/assets/icons/visible-icon";
import { Button } from "@/components/ui/button";
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
import Loading from "@/components/ui/loading";
import { useToast } from "@/hooks/use-toast";
import { one_number, special_character, upper_lowercase } from "@/lib/utils";
import { login } from "@/services/api/auth";
import { User } from "@/services/models/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeOff } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

type Props = {
  moveToNext: VoidFunction;
  setUserPayload: Dispatch<SetStateAction<Partial<User>>>;
};

const FormSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 8 characters" })
    .refine((value) => one_number.test(value), {
      message: "Password must contain atleast 1 number",
    })
    .refine((value) => upper_lowercase.test(value), {
      message: "Password must contain both upper and lower case letters",
    })
    .refine((value) => special_character.test(value), {
      message: "Password must contain a special character",
    }),
  rememberme: z.boolean().optional(),
});

export default function Auth({ moveToNext, setUserPayload }: Props) {
  const [visible, setVisible] = useState(false);
  const { toast } = useToast();

  const { isPending, mutate } = useMutation({ mutationFn: login });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (res) => {
          if (res.data) {
            setUserPayload(res.data);
            moveToNext();
          }
        },
        onError: (err: any) => {
          toast({
            title: err?.error?.message
              ? err?.error?.message
              : "Failed to login",
            variant: "error",
          });
        },
      }
    );
  }

  return (
    <div className="space-y-8 w-full sm:w-auto lg:w-1/2 xl:w-[40%] self-center overflow-y-scroll no-scrollbar px-1 h-auto lg:max-h-[90vh]">
      <div className="space-y-2">
        <p className="text-[#101928] text-[40px] font-medium">
          Let’s sign you in
        </p>
        <p className="text-[#667185] text-base">
          Welcome back, you have been missed!
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:max-w-[375px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#101928]">Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email address"
                    className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-full sm:w-[357px] pr-12"
                    error={!!form.formState.errors.email}
                    suffixitem={
                      <EmailIcon className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] lg:mr-8 mr-4 mt-4" />
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
                          className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] lg:mr-8 mr-4 mt-4"
                          onClick={() => setVisible(!visible)}
                        />
                      ) : (
                        <EyeOff
                          color="#13191C"
                          width={21}
                          height={20}
                          className="absolute top-0 right-0 cursor-pointer lg:mr-8 mr-4 mt-4"
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
          <div className="flex w-full sm:w-[357px] justify-between items-center">
            <FormField
              control={form.control}
              name="rememberme"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-[7px] space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription className="text-sm text-[#13191C]">
                      Remember me
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Link
              to="/forgot-password"
              className="text-sm text-secondary font-medium"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="pt-4">
            <Button
              type="submit"
              variant="gradient"
              className="w-full sm:w-[357px] h-14"
            >
              {isPending ? <Loading /> : "Login to account"}
            </Button>
          </div>
        </form>
      </Form>

      {/* <div className="sm:max-w-[357px] w-full flex justify-center items-center gap-1">
        <div className="w-1/2 bg-[#D0D5DD] h-[1px]" />
        <p className="text-[#D0D5DD] text-xs font-medium">or</p>
        <div className="w-1/2 bg-[#D0D5DD] h-[1px]" />
      </div>

      <div className="sm:max-w-[357px] w-full flex justify-between items-center 2xl:py-2">
        <button>
          <img src={Google} alt="google" />
        </button>
        <button>
          <img src={Apple} alt="apple" />
        </button>
        <button>
          <img src={Facebook} alt="facebook" />
        </button>
        <button>
          <img src={Twitter} alt="twitter" />
        </button>
      </div> */}

      <div className="sm:max-w-[375px] flex flex-col items-center justify-center gap-2">
        <p className="text-xs text-[#98A2B3] font-medium items-center flex gap-2">
          Are you new here?
          <Link to="/onboarding" className="text-sm text-secondary font-medium">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
