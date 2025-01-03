import { Button, Image, Input } from "@mantine/core";
import images from "../../assets";
import { useForm, zodResolver } from "@mantine/form";
import { OTPSchema } from "../../validation/auth";
function Verifications() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      otp: "",
    },
    validate: zodResolver(OTPSchema),
  });
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
          onSubmit={form.onSubmit((values) => console.log(values))}
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

export default Verifications;
