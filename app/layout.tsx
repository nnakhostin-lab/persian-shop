import type { Metadata } from "next";
import { Suspense } from "react";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  weight: ["300", "400", "600", "800", "900"],
});

export const metadata: Metadata = {
  title: "کارگاه صنایع‌دستی نخستین ",
  description: "فروشگاه آنلاین صنایع‌دستی ایرانی — سفال، فلزکاری و بافت دست‌ساز",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="flex min-h-screen flex-col font-vazir">
        <FavoritesProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <div className="flex-1">{children}</div>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
