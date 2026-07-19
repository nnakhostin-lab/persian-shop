"use client";

import { useState } from "react";
import Link from "next/link";
import { categoryTree } from "@/data/products";

export default function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categoryTree[0].name);

  const active = categoryTree.find((c) => c.name === activeCategory) ?? categoryTree[0];

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
          open ? "bg-navy text-cream" : "bg-navy/5 text-navy hover:bg-navy/10"
        }`}
      >
        <span aria-hidden="true">☰</span>
        دسته‌بندی کالاها
        <span
          className={`text-xs transition-transform duration-300 ${open ? "-rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* پنل کشویی — با max-height و opacity به‌صورت نرم باز می‌شود */}
      <div
        className={`absolute right-0 top-full z-40 mt-2 w-[560px] max-w-[90vw] origin-top overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-2xl shadow-navy/20 transition-all duration-300 ease-out ${
          open
            ? "max-h-96 translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex">
          <ul className="w-44 shrink-0 border-l border-navy/10 bg-cream/60 py-2">
            {categoryTree.map((cat) => (
              <li key={cat.name}>
                <button
                  onMouseEnter={() => setActiveCategory(cat.name)}
                  className={`flex w-full items-center gap-2 px-4 py-2.5 text-right text-sm transition ${
                    activeCategory === cat.name
                      ? "bg-firuzeh/10 font-semibold text-firuzeh-dark"
                      : "text-ink/70 hover:bg-navy/5"
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex-1 p-5">
            <p className="mb-3 text-xs font-semibold text-ink/40">{active.name}</p>
            <ul className="grid grid-cols-2 gap-2">
              {active.subcategories.map((sub) => (
                <li key={sub}>
                  <Link
                    href={`/?cat=${encodeURIComponent(active.name)}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-ink/70 transition hover:bg-firuzeh/10 hover:text-firuzeh-dark"
                  >
                    {sub}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/?cat=${encodeURIComponent(active.name)}`}
              onClick={() => setOpen(false)}
              className="mt-4 inline-block text-xs font-semibold text-navy underline-offset-2 hover:text-firuzeh-dark hover:underline"
            >
              مشاهده همه‌ی {active.name} ←
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
