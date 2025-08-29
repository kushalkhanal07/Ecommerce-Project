import api from "./axios";
import axiosInstance from "./clientAxios";

export async function addWishlist(id: number) {
  const res = await axiosInstance.post(`/wishlist/add`, {
    id,
  });
  return res.data;
}

export async function getWishlist() {
  const res = await axiosInstance.get("/wishlist/list");
  return res.data.data;
}

export async function removeWishlist(id: number | string) {
  const res = await axiosInstance.delete(`/wishlist/${id}`);
  return res.data.data;
}
