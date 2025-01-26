import ICookModel from "@/interfaces/ICookModel";
import instance from "../instance";

const ENDPOINT = "http://localhost:5165/CookModel";

export const GetAll = async () => {
  const response = await instance.get(ENDPOINT);
  return response.data;
};
export const PostService = async (model: ICookModel) => {
  const response = await instance.post(ENDPOINT, model);
  return response.data;
};
export const DeleteService = async (nome: string) => {
  const response = await instance.delete(`${ENDPOINT}?name=${nome}`);
  return response.data;
};
export const UpdateService = async (model: ICookModel) => {
  const response = await instance.patch(ENDPOINT, model);
  return response.data;
};
