import api from "./axios";
import axiosInstance from "./clientAxios";

export async function AddToCart(id: any) {
  console.log(id);
  const res = await axiosInstance.post("/cart/add", {
    productId: id,
    quantity: 1,
  });
  return res.data.data;
}

export async function removeCart(id: number | string) {
  const res = await axiosInstance.delete(`/cart/${id}`);
  return res.data.data;
}

export async function listCart() {
  const res = await axiosInstance.get(`/cart/list`);
  return res.data.data;
}
