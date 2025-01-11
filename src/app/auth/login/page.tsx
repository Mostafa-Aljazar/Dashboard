import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { LoginSchema } from "../../../validation/auth";
import { useNavigate } from "react-router-dom";
import { LinkatikApiGuest } from "../../../services/linkatik";
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
    <div className=" flex flex-col  items-center w-[300px] sm:w-[350px] md:w-[400px]  ">
      <div className="w-full flex flex-col items-center pb-8">
        <p className="m-0 p-0 text-[24px] sm:text-[36px] text-[#1A1D1F]  ">
          Welcome Admin
        </p>
        <p className="m-0 p-0 text-[15px] font-medium text-[#777777]">
          Log in to your linkatik
        </p>
      </div>

      <form
        className=" w-full flex flex-col items-center gap-8 px-3 md:px-0 "
        onSubmit={HandelSubmit}
      >
        <TextInput
          variant="unstyled"
          w="100%"
          radius="md"
          color="#F4F4F4"
          placeholder="Your email"
          leftSection={<Mail color="#6F767E" size={18} absoluteStrokeWidth />}
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <PasswordInput
        className="text-sm"
        size="md"
          w="100%"
          variant="unstyled"
          color="#F4F4F4"
          radius="md"
          placeholder="Your Password"
          leftSection={<LockKeyhole color="#6F767E" strokeWidth={2} size={18} />}
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Button
          type="submit"
          size="md"
          className="text-sm  md:text-lg w-full bg-[#8938B2]  text-white rounded-lg"
        >
          Log in
        </Button>
      </form>
    </div>
  );
}

export default Login;
