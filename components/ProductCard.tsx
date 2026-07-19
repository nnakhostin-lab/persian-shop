"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import type { Product } from "@/data/products";

function formatToman(value: number) {
  return value.toLocaleString("fa-IR") + " تومان";
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span className="flex items-center gap-0.5 text-gold" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rounded ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function ProductCard({
  product,
  delayMs = 0,
}: {
  product: Product;
  delayMs?: number;
}) {
  const { addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);
  const discount = product.oldPrice
    ? Math.round(100 - (product.price / product.oldPrice) * 100)
    : null;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  }

  return (
    <Link
      href={`/product/${product.id}`}
      style={{ animationDelay: `${delayMs}ms` }}
      className="shine-on-hover animate-card-in group relative flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-firuzeh/40 hover:shadow-xl hover:shadow-navy/15"
    >
      <div className={`relative h-40 w-full overflow-hidden bg-gradient-to-br ${product.swatch}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute right-3 top-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="rounded-full bg-navy/90 px-2 py-0.5 text-[11px] font-bold text-cream">
              جدید
            </span>
          )}
          {discount && (
            <span className="rounded-full bg-gold px-2 py-0.5 text-[11px] font-bold text-navy-dark">
              {discount.toLocaleString("fa-IR")}٪ تخفیف
            </span>
          )}
          {!product.inStock && (
            <span className="rounded-full bg-ink/70 px-2 py-0.5 text-[11px] font-bold text-cream">
              ناموجود
            </span>
          )}
        </div>

        <button
          onClick={handleToggleFavorite}
          aria-label={favorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition ${
            favorite ? "bg-white text-rose" : "bg-white/70 text-navy/60 hover:text-rose"
          }`}
        >
          {favorite ? "♥" : "♡"}
        </button>

        {/* دکمه‌ی افزودن سریع که هنگام هاور از پایین کارت بالا می‌آید */}
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className="absolute inset-x-3 bottom-3 translate-y-14 rounded-full bg-navy/90 py-2 text-xs font-semibold text-cream opacity-0 backdrop-blur transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 disabled:cursor-not-allowed disabled:bg-ink/40"
        >
          {product.inStock ? "افزودن سریع به سبد" : "ناموجود"}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-firuzeh-dark">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-ink/50">
            <Stars rating={product.rating} />
            <span>({product.reviewCount.toLocaleString("fa-IR")})</span>
          </span>
        </div>

        <h3 className="text-lg font-bold text-ink transition group-hover:text-firuzeh-dark">
          {product.name}
        </h3>
        <p className="flex-1 text-sm leading-6 text-ink/70">{product.description}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-black text-navy">{formatToman(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-ink/40 line-through">
                {formatToman(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`relative overflow-hidden rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-firuzeh disabled:cursor-not-allowed disabled:bg-navy/10 disabled:text-ink/30 ${
              inCart
                ? "bg-firuzeh/10 text-firuzeh-dark"
                : "bg-navy text-cream hover:bg-firuzeh-dark"
            }`}
          >
            {justAdded ? "اضافه شد ✓" : inCart ? "افزودن یکی دیگر" : "افزودن به سبد"}
          </button>
        </div>
      </div>
    </Link>
  );
}
