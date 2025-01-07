import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { LoginSchema } from "../../../validation/auth";
import { useNavigate } from "react-router-dom";
import LinkatikApi, { LinkatikApiGuest } from "../../../services/linkatik";
import { LOCALSTORAGE_SESSION_KEY } from "../../../config";
import { LockKeyhole, Mail } from "lucide-react";

function Login() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const HandelSubmit = form.onSubmit(async (data) => {
    try {
      const response = await LinkatikApiGuest.post(
        "/login", //login api
        data
      );

      console.log("🚀 ~ HandelSubmit ~ response:", response);
      if (response.data?.status === 200) {
        console.log("status : ", response.data.status);

        const user = response.data.data;
        localStorage.setItem(LOCALSTORAGE_SESSION_KEY, JSON.stringify(user));
        navigate(`/dashboard/`);
      }
    } catch (error) {
      console.log("🚀 ~ HandelSubmit ~ error:", error);
    }
  });

  return (
    <div className="">
      <div className="gap-5 flex flex-col  items-center w-full p-2 md:w-[498px] md:p-0 h-[336.55px]  ">
        <div className="w-full flex flex-col items-center pb-8">
          <p className="m-0 p-0 text-[36px] sm:text-[48px] text-[#1A1D1F]  ">
            Welcome Admin
          </p>
          <p className="m-0 p-0 text-[15px] font-medium text-[#777777]">
            Log in to your linkatik
          </p>
        </div>

        <form
          className=" w-full flex flex-col items-center gap-3 "
          onSubmit={HandelSubmit}
        >
          <TextInput
            w="100%"
            radius="md"
            color="#F4F4F4"
            placeholder="Your email"
            leftSection={<Mail color="#6F767E" size={24} absoluteStrokeWidth />}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            w="100%"
            variant="filled"
            color="#F4F4F4"
            radius="md"
            placeholder="Your Password"
            leftSection={<LockKeyhole color="#6F767E" strokeWidth={2} />}
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <Text className="text-[#8938B2] self-start" size="sm" pb={20}>
            Forget password ?
          </Text>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-[#8938B2] py-3 text-white rounded-lg"
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
