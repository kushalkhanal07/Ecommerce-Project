import api from "./axios";

export async function AddToCart(id: number) {
  console.log(id);
  const res = await api.post("/api/cart");
  return res.data.data;
}

export async function removeCart(id: number | string) {
  const res = await api.delete(`/api/cart/${id}`);
  return res.data.data;
}
