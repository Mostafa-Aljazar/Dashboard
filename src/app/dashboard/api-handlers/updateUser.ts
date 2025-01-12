import { z } from "zod";
import LinkatikApi from "../../../services/linkatik";
import { CreateUserSchema } from "../../../validation/create-user-schema";

export const UpdateUser = async (
  id: string,
  data: z.infer<typeof CreateUserSchema>
) => {
  const response = await LinkatikApi.put(`/users/${id}`, data);
  return response.data;
};
