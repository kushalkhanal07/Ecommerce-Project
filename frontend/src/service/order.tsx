import api from "./axios";

export async function getOrders() {
  const res = await api.get("/orders");
  return res.data.data;
}

export async function addOrder(data: any) {
  console.log(data);
  const res = await api.post("/orders/create", data);
  return res.data;
}

export async function getUserOrder(id: any) {
  const res = await api.get(`/orders/user/${id}`);
  return res.data;
}

export async function getOrderById(id: any) {
  const res = await api.get(`/orders/${id}`);
  return res.data;
}

export async function updateOrderStatus(id: any) {
  const res = await api.patch(`/orders/${id}/status`);
  return res.data;
}
