import { z } from "zod";
import LinkatikApi from "../../../services/linkatik";
import { CreateUserSchema } from "../../../validation/create-user-schema";

export const CreateUser = async (data: z.infer<typeof CreateUserSchema>) => {
  const response = await LinkatikApi.post("/users", data);
  return response.data;
};
