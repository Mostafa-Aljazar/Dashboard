import LinkatikApi from "../../../services/linkatik";
import { GetUserResponse } from "../../../types/get-user-response";

export const GetUserData = async () => {
  const response = await LinkatikApi.get<GetUserResponse>(`users`);
  return response.data.data;
};

export const GetUserPagination = async ({
  per_page,
  page,
}: {
  per_page: number;
  page: number;
}) => {
  const response = await LinkatikApi.get<GetUserResponse>(
    `users?per_page=${per_page}&page=${page}`
  );
  return response.data;
};
