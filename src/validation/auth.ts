import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string({ required_error: "required" }).min(1, "required").email("invalidEmail"),
  password: z.string({ required_error: "required" }).min(6, "shortPassword").max(32, "longPassword"),
})
export const OTPSchema = z.object({
  otp: z.string({ required_error: "required" }).min(4, "required"),
})

