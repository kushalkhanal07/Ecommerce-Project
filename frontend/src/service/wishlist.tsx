import api from "./axios";

export async function addWishlist(id: number) {
  const res = await api.post("/cart");
  return res.data.data;
}

export async function removeWishlist(id: number | string) {
  const res = await api.delete(`/cart/${id}`);
  return res.data.data;
}
