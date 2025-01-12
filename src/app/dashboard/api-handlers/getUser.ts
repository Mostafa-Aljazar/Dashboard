import LinkatikApi from "../../../services/linkatik";
import { GetUserResponse } from "../../../types/get-user-response";

export const GetUser = async (id: string) => {
  try {
    if (id) {
      const response = await LinkatikApi.get<GetUserResponse>(`/users/${id}`);
      return response.data;
    } else throw new Error("Id is not valid");
  } catch (err: any) {
    return { error: "Id is not valid" };
  }
};
