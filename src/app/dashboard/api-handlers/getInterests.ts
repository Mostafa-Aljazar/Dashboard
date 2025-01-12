import LinkatikApi from "../../../services/linkatik";
import { GetInterestsResponse } from "../../../types/get-interests-response";

export const GetInterests = async () => {
  const response = await LinkatikApi.get<GetInterestsResponse>(`interests`);
  return response.data;
};

// export const GetUserPagination = async ({
//   per_page,
//   page,
// }: {
//   per_page: number;
//   page: number;
// }) => {
//   const response = await LinkatikApi.get<GetUserResponse>(
//     `users?per_page=${per_page}&page=${page}`
//   );
//   return response.data;
// };
