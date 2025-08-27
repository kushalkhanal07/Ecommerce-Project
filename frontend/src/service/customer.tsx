import api from "./axios";

export async function getAllCustomer() {
  const res = await api.get("/users/all");
  return res.data;
}
