import { z } from "zod";
import LinkatikApi from "../../../services/linkatik";
import { CreatePlanSchema } from "../../../validation/create-plan-schema";

export const CreatePlan = async (data: z.infer<typeof CreatePlanSchema>) => {
  const response = await LinkatikApi.post("/plans", data);
  return response.data;
};
