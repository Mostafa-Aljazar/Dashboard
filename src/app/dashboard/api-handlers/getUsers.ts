import { GetUserResponse } from './../home/types';
import LinkatikApi from "../../../services/linkatik"

export const GetUserData = async () => {
  const response = await LinkatikApi.get<GetUserResponse>(`users`)
  return response.data.data
}