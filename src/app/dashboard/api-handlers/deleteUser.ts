import LinkatikApi from "../../../services/linkatik";

export const DeleteUser = async (id:string) => {
  const response = await LinkatikApi.delete(`/users/${id}`);
  return response.data;
};
