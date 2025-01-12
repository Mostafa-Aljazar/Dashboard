import LinkatikApi from "../../../services/linkatik";
import { GetPlansResponse } from "../../../types/get-plans-response";

export const GetPlans = async () => {
  const response = await LinkatikApi.get<GetPlansResponse>(`plans`);
  return response.data;
};
