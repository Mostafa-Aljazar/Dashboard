import LinkatikApi from "../../../services/linkatik";

export const DeletePlan = async (id: number) => {
  const response = await LinkatikApi.post(
    `/plan/delete`,
    {
      id: id,
      new_pan_id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
