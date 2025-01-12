import LinkatikApi from "../../../services/linkatik";

export const BlockUser = async (id:string) => {
  const response = await LinkatikApi.get(`/user/block/${id}`);
  return response.data;
};
