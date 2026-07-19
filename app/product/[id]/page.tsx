"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/ProductCard";

function formatToman(value: number) {
  return value.toLocaleString("fa-IR") + " تومان";
}

function Stars({ rating, size = "text-base" }: { rating: number; size?: string }) {
  const rounded = Math.round(rating);
  return (
    <span className={`flex items-center gap-0.5 text-gold ${size}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rounded ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
    </span>
  );
}

type Tab = "description" | "specs" | "reviews";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = products.find((p) => p.id === params.id);

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState<Tab>("description");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const favorite = isFavorite(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  function handleAdd() {
    if (!product!.inStock) return;
    for (let i = 0; i < quantity; i++) addToCart(product!.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <nav className="mb-6 text-xs text-ink/50">
        <Link href="/" className="hover:text-firuzeh-dark">
          فروشگاه
        </Link>
        <span className="mx-1">/</span>
        <Link href={`/?cat=${encodeURIComponent(product.category)}`} className="hover:text-firuzeh-dark">
          {product.category}
        </Link>
        <span className="mx-1">/</span>
        <span className="text-ink/70">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* گالری تصاویر */}
        <div className="relative">
          <div
            className={`relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-br sm:h-96 ${product.swatch}`}
          >
            <Image
              src={product.gallery[activeImage]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-cover"
            />
            {product.isNew && (
              <span className="absolute right-4 top-4 rounded-full bg-navy/90 px-3 py-1 text-xs font-bold text-cream">
                جدید
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            {product.gallery.map((g, idx) => (
              <button
                key={g}
                onClick={() => setActiveImage(idx)}
                aria-label={`تصویر ${(idx + 1).toLocaleString("fa-IR")}`}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br transition ${product.swatch} ${
                  activeImage === idx ? "ring-2 ring-firuzeh ring-offset-2" : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={g} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* اطلاعات کالا */}
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-firuzeh/10 px-3 py-1 text-xs font-semibold text-firuzeh-dark">
            {product.category}
          </span>
          <h1 className="text-2xl font-black text-navy">{product.name}</h1>

          <div className="flex items-center gap-2 text-sm text-ink/60">
            <Stars rating={product.rating} />
            <span>{product.rating.toLocaleString("fa-IR")}</span>
            <button onClick={() => setTab("reviews")} className="underline-offset-2 hover:text-firuzeh-dark hover:underline">
              ({product.reviewCount.toLocaleString("fa-IR")} نظر)
            </button>
          </div>

          <p className="text-sm leading-7 text-ink/70">{product.description}</p>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-navy">{formatToman(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-ink/40 line-through">{formatToman(product.oldPrice)}</span>
            )}
          </div>

          <p className={`text-sm font-semibold ${product.inStock ? "text-firuzeh-dark" : "text-rose"}`}>
            {product.inStock ? "موجود در انبار" : "ناموجود"}
          </p>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-full border border-navy/15 px-3 py-1.5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="کاهش تعداد"
                className="text-lg text-navy hover:text-firuzeh-dark"
              >
                −
              </button>
              <span className="w-5 text-center text-sm font-semibold">
                {quantity.toLocaleString("fa-IR")}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="افزایش تعداد"
                className="text-lg text-navy hover:text-firuzeh-dark"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="flex-1 rounded-full bg-navy py-3 text-sm font-bold text-cream transition hover:bg-firuzeh-dark disabled:cursor-not-allowed disabled:bg-navy/20"
            >
              {justAdded ? "به سبد اضافه شد ✓" : "افزودن به سبد خرید"}
            </button>

            <button
              onClick={() => toggleFavorite(product.id)}
              aria-label="افزودن به علاقه‌مندی‌ها"
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
                favorite ? "border-rose bg-rose-light text-rose" : "border-navy/15 text-navy/60 hover:text-rose"
              }`}
            >
              {favorite ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>

      {/* تب‌ها: توضیحات / مشخصات / نظرات */}
      <div className="mt-14">
        <div className="flex gap-2 border-b border-navy/10">
          {(
            [
              { key: "description", label: "توضیحات" },
              { key: "specs", label: "مشخصات فنی" },
              { key: "reviews", label: `نظرات (${product.reviewCount.toLocaleString("fa-IR")})` },
            ] as { key: Tab; label: string }[]
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative px-4 py-3 text-sm font-semibold transition ${
                tab === t.key ? "text-navy" : "text-ink/40 hover:text-ink/70"
              }`}
            >
              {t.label}
              {tab === t.key && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-firuzeh" />
              )}
            </button>
          ))}
        </div>

        <div className="py-6">
          {tab === "description" && (
            <p className="max-w-3xl text-sm leading-8 text-ink/70">{product.longDescription}</p>
          )}

          {tab === "specs" && (
            <table className="w-full max-w-xl text-sm">
              <tbody>
                {product.specs.map((s) => (
                  <tr key={s.label} className="border-b border-navy/5">
                    <td className="w-40 py-2.5 text-ink/50">{s.label}</td>
                    <td className="py-2.5 font-medium text-ink">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "reviews" && (
            <div className="max-w-2xl">
              {product.reviews.length === 0 ? (
                <p className="text-sm text-ink/50">هنوز نظری برای این کالا ثبت نشده است.</p>
              ) : (
                <ul className="flex flex-col gap-5">
                  {product.reviews.map((r) => (
                    <li key={r.id} className="rounded-xl border border-navy/10 bg-white p-4">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-semibold text-ink">{r.author}</span>
                        <span className="text-xs text-ink/40">{r.date}</span>
                      </div>
                      <Stars rating={r.rating} size="text-sm" />
                      <p className="mt-2 text-sm leading-7 text-ink/70">{r.text}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* کالاهای مرتبط */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-lg font-bold text-navy">کالاهای مرتبط</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((p, idx) => (
              <ProductCard key={p.id} product={p} delayMs={idx * 40} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
