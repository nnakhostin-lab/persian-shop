"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

export default function ShopSection() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();
  const catParam = searchParams.get("cat");
  const [activeCategory, setActiveCategory] = useState<string>(catParam ?? "همه");

  useEffect(() => {
    if (catParam) setActiveCategory(catParam);
  }, [catParam]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "همه" || p.category === activeCategory;
      const matchesQuery =
        query === "" ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-navy">
          {query ? `نتایج جستجو برای «${query}»` : "همه کالاها"}
        </h2>
        <span className="text-sm text-ink/50">
          {filtered.length.toLocaleString("fa-IR")} کالا
        </span>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === cat
                ? "border-firuzeh bg-firuzeh text-white"
                : "border-navy/15 bg-white text-navy/70 hover:border-firuzeh hover:text-firuzeh-dark"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-navy/15 py-16 text-center text-sm text-ink/50">
          کالایی با این مشخصات پیدا نشد.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, idx) => (
            <ProductCard key={product.id} product={product} delayMs={idx * 40} />
          ))}
        </div>
      )}
    </section>
  );
}
