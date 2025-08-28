import api from "./axios";

export async function addProduct(data: any) {
  const res = await api.post("/products/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function getProducts() {
  const res = await api.get("/products");
  return res.data.data;
}

export async function deleteProducts(id: any) {
  const res = await api.delete(`/products/${id}`);
  return res.data;
}

export async function updateProducts(datas: any) {
  console.log(await datas);
  const res = await api.patch(`/products/update/${datas?.id}`, datas, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
