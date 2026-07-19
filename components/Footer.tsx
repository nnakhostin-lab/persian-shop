"use client";

import Link from "next/link";
import { categories } from "@/data/products";
import Logo from "@/components/Logo";

const socials = [
  { label: "اینستاگرام", icon: "IG", href: "#" },
  { label: "تلگرام", icon: "TG", href: "#" },
  { label: "واتساپ", icon: "WA", href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-navy/10 bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3">
            <Logo variant="dark" />
          </div>
          <p className="text-sm leading-6 text-cream/60">
            تولید و فروش مستقیم صنایع‌دستی اصیل ایرانی؛ هر قطعه دست‌ساز و محدود.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-xs font-semibold text-cream/80 transition hover:border-firuzeh hover:text-firuzeh-light"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-cream">دسته‌بندی‌ها</h3>
          <ul className="flex flex-col gap-2 text-sm text-cream/60">
            {categories
              .filter((c) => c !== "همه")
              .map((c) => (
                <li key={c}>
                  <Link href={`/?cat=${encodeURIComponent(c)}`} className="hover:text-firuzeh-light">
                    {c}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-cream">ارتباط با ما</h3>
          <ul className="flex flex-col gap-2 text-sm text-cream/60">
            <li>تلفن پشتیبانی: ۰۲۱-۱۲۳۴۵۶۷۸</li>
            <li>ایمیل: info@example.com</li>
            <li>آدرس: تهران، خیابان نمونه، پلاک ۱</li>
            <li>پاسخگویی: شنبه تا پنجشنبه، ۹ تا ۱۸</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-cream">عضویت در خبرنامه</h3>
          <p className="mb-3 text-sm text-cream/60">
            از کالاهای جدید و تخفیف‌ها باخبر شوید.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex overflow-hidden rounded-full border border-cream/20"
          >
            <input
              type="email"
              required
              placeholder="ایمیل شما"
              className="w-full bg-transparent px-4 py-2 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-firuzeh px-4 py-2 text-sm font-semibold text-white hover:bg-firuzeh-dark"
            >
              عضویت
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/10 px-6 py-4 text-center text-xs text-cream/40">
        تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
