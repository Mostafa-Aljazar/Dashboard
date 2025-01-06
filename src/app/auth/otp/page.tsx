import { Button, Image, Input } from "@mantine/core";
import images from "../../../assets";
import { useForm, zodResolver } from "@mantine/form";
import { OTPSchema } from "../../../validation/auth";
import { useNavigate } from "react-router-dom";
import { LinkatikApiGuest } from "../../../services/linkatik";
import { LOCALSTORAGE_SESSION_KEY } from "../../../config";
import { useEffect } from "react";
import { LoginResponse } from "../../../types/user";
function OTP() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      otp: "",
    },
    validate: zodResolver(OTPSchema),
  });

  const navigate = useNavigate();
  const handleSubmit = form.onSubmit(async (data) => {
    try {
      const response = await LinkatikApiGuest.post<LoginResponse>(
        // otp Api
        "/otpVerify",
        { ...data, email }
      );
      console.log("🚀 ~ onSubmit ~ response:", response);
      const user = response.data.data;
      localStorage.setItem(LOCALSTORAGE_SESSION_KEY, JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  });

  // const [email] = useQueryState("email", parseAsString.withDefault(""));

  // useEffect(() => {
  //   if (!email) {
  //     navigate("/auth/login");
  //   }
  // }, [email, navigate]);

  return (
    <div className="m-auto">
      <div className="gap-5 flex flex-col  items-center w-full p-2 md:w-[498px] md:p-0 h-[336.55px]  ">
        <div className="w-full flex flex-col items-center pb-8">
          <p className="m-0 p-0 text-[36px] sm:text-[48px] text-[#1A1D1F]  ">
            Two-step verification
          </p>
          <p className="m-0 p-0 text-[15px] font-medium text-[#777777]">
            Enter the code that you received in the email
          </p>
        </div>

        <form
          // onSubmit={form.onSubmit((values) => console.log(values))}
          onSubmit={handleSubmit}
          className=" w-full flex flex-col items-center gap-3"
        >
          <Input
            w="100%"
            radius="md"
            color="#F4F4F4"
            placeholder="verification code"
            leftSection={
              <Image
                src={images.verified}
                alt="lock"
                sizes="20"
                className="text-[#6F767E]"
              />
            }
            key={form.key("otp")}
            {...form.getInputProps("otp")}
          />

          <Button
            type="submit"
            size="lg"
            mt={22}
            className="w-full bg-[#8938B2] py-3 text-white rounded-lg"
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default OTP;
