import api from "./axios";

export async function getCustomer() {
  const res = await api.get("/customer");
  return res.data.data;
}
