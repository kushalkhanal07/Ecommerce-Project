import api from "../axios";

export async function userLogin(data: any) {
  const res = await api.post("/users/login", data);
  return res.data;
}

export async function userRegister(data: any) {
  console.log("register", data);
  const res = await api.post("/users/register", data);
  return res.data.data;
}

export async function adminRegister(data: any) {
  console.log("register", data);
  const res = await api.post("/admin/register", data);
  return res.data.data;
}

export async function adminLogin(data: any) {
  const res = await api.post("/admin/login", data);
  return res.data;
}
