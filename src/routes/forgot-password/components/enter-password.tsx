import EmailIcon from "@/assets/icons/email-icon";
import SendIcon from "@/assets/icons/send-icon";
import { Button } from "@/components/ui/button";
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
import { forgotPassword } from "@/services/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

type Props = {
  moveToNext: VoidFunction;
  setEmail: Dispatch<SetStateAction<string>>;
};

const FormSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
});

export default function EnterPassword({ moveToNext, setEmail }: Props) {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({ mutationFn: forgotPassword });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(
      { email: data.email },
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            setEmail(data.email);
            moveToNext();
          }
        },
        onError: (err) => {
          console.log("err", err.message);
        },
      }
    );
  }

  return (
    <div className="space-y-8 lg:w-1/2 xl:w-[40%] self-center overflow-y-scroll no-scrollbar h-auto px-1 lg:max-h-[90vh]">
      <button
        className="flex gap-[10px] items-center"
        onClick={() => navigate(-1)}
      >
        <div className="w-9 h-9 bg-[#E4E7EC] rounded-[8px] flex justify-center items-center">
          <ChevronLeft color="#98A2B3" width={24} height={24} />
        </div>
        <p className="text-[#101928] text-xs">go back</p>
      </button>
      <div className="space-y-2">
        <p className="text-[#101928] text-[40px] font-medium">
          Forgot password?
        </p>
        <p className="text-[#667185] text-base">
          Understandable, lets help u recover it.
        </p>
      </div>

      <div className="space-y-4 sm:max-w-[375px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 sm:max-w-[375px]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#101928] text-sm font-medium">
                    Enter your email and we'll send you a link to reset your
                    password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email address"
                      className="bg-[#F0F2F5] border border-[#F0F2F5] h-14 placeholder:text-input w-[375px]"
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
            <Button type="submit" variant="gradient" className="w-full h-14">
              {isPending ? (
                <Loading />
              ) : (
                <div className="flex gap-1 items-center justify-center">
                  <p className="text-center">Send link to email</p> <SendIcon />
                </div>
              )}
            </Button>
          </form>
        </Form>
      </div>

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
