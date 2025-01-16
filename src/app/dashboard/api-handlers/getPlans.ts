import LinkatikApi from "../../../services/linkatik";
import { GetPlansResponse } from "../../../types/get-plans-response";

export const GetPlans = async () => {
  const response = await LinkatikApi.get<GetPlansResponse>(`plans`);
  return response.data;
};
/*
const queryClient = useQueryClient();

  const {
    data: allPlans,
    isLoading: isLoadingAllPlans,
    isError: isErrorAllPlans,
    error: errorAllPlans,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: () =>
      GetPlansPagination({
        per_page: 1000000,
        page: 1,
      }),
    placeholderData: keepPreviousData, // Use keepPreviousData here
  });


*/
export const GetPlansPagination = async ({
  per_page = 15,
  page,
}: {
  per_page: number;
  page: number;
}) => {
  const response = await LinkatikApi.get<GetPlansResponse>(
    `plans?per_page=${per_page}&page=${page}`
  );
  return response.data;
};
