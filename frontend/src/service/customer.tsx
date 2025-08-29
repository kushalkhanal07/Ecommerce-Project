import api from "./axios";
import axiosInstance from "./clientAxios";

export async function getAllCustomer() {
  const res = await api.get("/users/all");
  return res.data;
}

export async function getCustomer() {
  const res = await axiosInstance.get("/users/me");
  return res.data;
}
