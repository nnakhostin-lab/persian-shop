"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

type CartLine = { productId: string; quantity: number };

type State = { lines: CartLine[] };

type Action =
  | { type: "ADD"; productId: string }
  | { type: "REMOVE"; productId: string }
  | { type: "SET_QTY"; productId: string; quantity: number }
  | { type: "HYDRATE"; lines: CartLine[] }
  | { type: "CLEAR" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return { lines: action.lines };
    case "ADD": {
      const existing = state.lines.find((l) => l.productId === action.productId);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.productId === action.productId ? { ...l, quantity: l.quantity + 1 } : l
          ),
        };
      }
      return { lines: [...state.lines, { productId: action.productId, quantity: 1 }] };
    }
    case "REMOVE":
      return { lines: state.lines.filter((l) => l.productId !== action.productId) };
    case "SET_QTY": {
      if (action.quantity <= 0) {
        return { lines: state.lines.filter((l) => l.productId !== action.productId) };
      }
      return {
        lines: state.lines.map((l) =>
          l.productId === action.productId ? { ...l, quantity: action.quantity } : l
        ),
      };
    }
    case "CLEAR":
      return { lines: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  itemsWithProduct: { product: Product; quantity: number }[];
  totalCount: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  isInCart: (productId: string) => boolean;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "persian-shop-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: "HYDRATE", lines: JSON.parse(raw) });
      }
    } catch {
      // بی‌اهمیت — سبد خالی شروع می‌شود
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
  }, [state.lines, hydrated]);

  const itemsWithProduct = useMemo(
    () =>
      state.lines
        .map((line) => {
          const product = products.find((p) => p.id === line.productId);
          if (!product) return null;
          return { product, quantity: line.quantity };
        })
        .filter((x): x is { product: Product; quantity: number } => x !== null),
    [state.lines]
  );

  const totalCount = itemsWithProduct.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = itemsWithProduct.reduce(
    (sum, i) => sum + i.quantity * i.product.price,
    0
  );

  const value: CartContextValue = {
    lines: state.lines,
    itemsWithProduct,
    totalCount,
    totalPrice,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addToCart: (productId) => {
      dispatch({ type: "ADD", productId });
      setIsOpen(true);
    },
    removeFromCart: (productId) => dispatch({ type: "REMOVE", productId }),
    setQuantity: (productId, quantity) =>
      dispatch({ type: "SET_QTY", productId, quantity }),
    isInCart: (productId) => state.lines.some((l) => l.productId === productId),
    clearCart: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart باید داخل CartProvider استفاده شود");
  return ctx;
}
