import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z
    .string({ required_error: "required" })
    .min(3, "name must be more than 3 char"),
  email: z
    .string({ required_error: "email is required" })
    .min(5, "email must be more than 5 char")
    .email("invalidEmail"),
  password: z
    .string({ required_error: "required" })
    .min(8, "shortPassword")
    .max(32, "longPassword"),
  interest_id: z.union([z.string(), z.number()], {
    required_error: "required",
  }),
  sub_interest_id: z.union([z.string(), z.number()], {
    required_error: "required",
  }),
  username: z
    .string({ required_error: "required" })
    .min(3, "username must be more than 3 char"),
  plan_id: z.union([z.string(), z.number()]),
  is_active: z.boolean(),
  plan_period: z.string(),
});
