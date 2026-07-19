"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import Logo from "@/components/Logo";
import CategoryMenu from "@/components/CategoryMenu";

export default function Header() {
  const { totalCount, openCart } = useCart();
  const { favoriteIds } = useFavorites();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [cartBump, setCartBump] = useState(false);
  const prevCount = useRef(totalCount);

  useEffect(() => {
    if (totalCount !== prevCount.current) {
      setCartBump(true);
      prevCount.current = totalCount;
      const t = setTimeout(() => setCartBump(false), 400);
      return () => clearTimeout(t);
    }
  }, [totalCount]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(query ? `/?q=${encodeURIComponent(query)}` : "/");
  }

  return (
    <header className="sticky top-0 z-30 relative">
      <div className="glass-nav absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/favorites"
            className="glass-pill relative flex h-10 w-10 items-center justify-center rounded-full text-navy transition hover:text-firuzeh-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-firuzeh"
            aria-label="علاقه‌مندی‌ها"
          >
            ♥
            {favoriteIds.length > 0 && (
              <span suppressHydrationWarning className="absolute -top-1 -left-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-navy px-1 text-[10px] font-bold text-white">
                {favoriteIds.length.toLocaleString("fa-IR")}
              </span>
            )}
          </Link>

          <button
            onClick={openCart}
            className={`glass-pill relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-navy transition hover:text-firuzeh-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-firuzeh ${
              cartBump ? "animate-bump" : ""
            }`}
          >
            سبد خرید
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-firuzeh px-1 text-xs font-bold text-white">
              {totalCount.toLocaleString("fa-IR")}
            </span>
          </button>
        </div>
      </div>

      {/* ردیف دوم: دسته‌بندی کالاها کنار نوار جستجو، مانند نمونه‌های ارسالی */}
      <div className="relative border-t border-navy/5">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-2.5">
          <CategoryMenu />

          <form
            onSubmit={handleSearchSubmit}
            className="glass-pill flex flex-1 items-center gap-2 rounded-full px-4 py-2"
          >
            <span className="text-navy/50" aria-hidden="true">
              ⌕
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="جستجوی کالا، مثلاً «گلیم» یا «سفال»..."
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
            />
          </form>
        </div>
      </div>
    </header>
  );
}
