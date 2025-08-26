import api from "./axios";

export async function getOrder() {
  const res = await api.get("/order");
  return res.data.data;
}
