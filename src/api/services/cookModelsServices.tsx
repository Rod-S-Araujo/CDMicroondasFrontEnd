import instance from "../instance";

const ENDPOINT = "http://localhost:5165/CookModel";

export const GetAll = async () => {
  const response = await instance.get(ENDPOINT);
  return response.data;
};
