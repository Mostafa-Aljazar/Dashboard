import { z } from "zod";
import LinkatikApi from "../../../services/linkatik";
import { CreatePlanSchema } from "../../../validation/create-plan-schema";

export const UpdatePlan = async (
  id: string,
  data: z.infer<typeof CreatePlanSchema>
) => {
  const response = await LinkatikApi.put(`/plans/${id}`, data);
  return response.data;
};
