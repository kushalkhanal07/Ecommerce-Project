import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type User = {
  id: string;
  email: string;
} | null;

type StoreState = {
  user: User;
  cart: CartItem[];
  setUser: (user: User) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      cart: [],

      setUser: (user) => set({ user }),

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((c) => c.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.id === item.id ? { ...c, qty: c.qty + item.qty } : c
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((c) => c.id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "store", // ✅ key in localStorage
    }
  )
);
