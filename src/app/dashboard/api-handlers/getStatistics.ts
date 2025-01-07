import LinkatikApi from "../../../services/linkatik"
import { GetStatisticsResponse } from "../../../types/get-statistics-response"

export const GetStatisticsData = async () => {
  const response = await LinkatikApi.get<GetStatisticsResponse>(`statistics`)
  return response.data
}