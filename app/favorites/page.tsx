"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-xl font-bold text-navy">علاقه‌مندی‌های من</h1>

      {favoriteProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-navy/15 py-16 text-center">
          <p className="text-sm text-ink/60">هنوز کالایی را نشان‌دار نکرده‌اید.</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream hover:bg-firuzeh-dark"
          >
            مشاهده کالاها
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} delayMs={idx * 40} />
          ))}
        </div>
      )}
    </main>
  );
}
