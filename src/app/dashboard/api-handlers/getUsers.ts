import LinkatikApi from "../../../services/linkatik"
import { GetUserResponse } from "../../../types/get-user-response"

export const GetUserData = async () => {
  const response = await LinkatikApi.get<GetUserResponse>(`users`)
  return response.data.data
}