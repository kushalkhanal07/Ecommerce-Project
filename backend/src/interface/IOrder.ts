export interface IOrderAddress {
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
}

export interface IOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface ICreateOrder {
  userId: string;
  items: IOrderItem[];
  shippingAddress: IOrderAddress;
  paymentMethod: string;
  remarks?: string;
}

export interface IOrderResponse {
  id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  items: IOrderItem[];
  shippingAddress: IOrderAddress;
  paymentMethod: string;
  remarks?: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
}