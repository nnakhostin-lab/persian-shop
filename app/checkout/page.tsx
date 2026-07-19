"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function formatToman(value: number) {
  return value.toLocaleString("fa-IR") + " تومان";
}

type Step = "info" | "review" | "done";

type ShippingInfo = {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  paymentMethod: "online" | "cod";
};

const emptyInfo: ShippingInfo = {
  fullName: "",
  phone: "",
  city: "",
  address: "",
  postalCode: "",
  paymentMethod: "online",
};

export default function CheckoutPage() {
  const { itemsWithProduct, totalPrice, lines, clearCart } = useCart();
  const [step, setStep] = useState<Step>("info");
  const [info, setInfo] = useState<ShippingInfo>(emptyInfo);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const isCartEmpty = lines.length === 0;

  function handleInfoSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("review");
  }

  function handleConfirmOrder() {
    setOrderNumber(String(Math.floor(100000 + Math.random() * 900000)));
    setStep("done");
    clearCart();
  }

  if (isCartEmpty && step !== "done") {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-xl font-bold text-navy">سبد خرید شما خالی است</h1>
        <p className="mt-2 text-sm text-ink/60">
          برای ادامه‌ی فرایند خرید، ابتدا چند کالا به سبد اضافه کنید.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream hover:bg-firuzeh-dark"
        >
          بازگشت به فروشگاه
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <ol className="mb-10 flex items-center justify-center gap-4 text-sm">
        {[
          { key: "info", label: "اطلاعات ارسال" },
          { key: "review", label: "بازبینی سفارش" },
          { key: "done", label: "تایید نهایی" },
        ].map((s, idx) => (
          <li key={s.key} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === s.key
                  ? "bg-firuzeh text-white"
                  : "bg-navy/10 text-navy/60"
              }`}
            >
              {(idx + 1).toLocaleString("fa-IR")}
            </span>
            <span className={step === s.key ? "font-semibold text-navy" : "text-ink/50"}>
              {s.label}
            </span>
          </li>
        ))}
      </ol>

      {step === "info" && (
        <form
          onSubmit={handleInfoSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-navy/10 bg-white p-6"
        >
          <h1 className="text-lg font-bold text-navy">اطلاعات گیرنده و ارسال</h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-ink/70">
              نام و نام‌خانوادگی
              <input
                required
                value={info.fullName}
                onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
                className="rounded-lg border border-navy/15 px-3 py-2 text-ink focus:border-firuzeh focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-ink/70">
              شماره موبایل
              <input
                required
                inputMode="numeric"
                value={info.phone}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                className="rounded-lg border border-navy/15 px-3 py-2 text-ink focus:border-firuzeh focus:outline-none"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-ink/70">
              شهر
              <input
                required
                value={info.city}
                onChange={(e) => setInfo({ ...info, city: e.target.value })}
                className="rounded-lg border border-navy/15 px-3 py-2 text-ink focus:border-firuzeh focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-ink/70">
              کد پستی
              <input
                required
                inputMode="numeric"
                value={info.postalCode}
                onChange={(e) => setInfo({ ...info, postalCode: e.target.value })}
                className="rounded-lg border border-navy/15 px-3 py-2 text-ink focus:border-firuzeh focus:outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm text-ink/70">
            آدرس کامل
            <textarea
              required
              rows={3}
              value={info.address}
              onChange={(e) => setInfo({ ...info, address: e.target.value })}
              className="rounded-lg border border-navy/15 px-3 py-2 text-ink focus:border-firuzeh focus:outline-none"
            />
          </label>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-1 text-sm text-ink/70">روش پرداخت</legend>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="payment"
                checked={info.paymentMethod === "online"}
                onChange={() => setInfo({ ...info, paymentMethod: "online" })}
              />
              پرداخت آنلاین
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="payment"
                checked={info.paymentMethod === "cod"}
                onChange={() => setInfo({ ...info, paymentMethod: "cod" })}
              />
              پرداخت در محل
            </label>
          </fieldset>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-navy py-3 text-sm font-bold text-cream hover:bg-firuzeh-dark"
          >
            ادامه و بازبینی سفارش
          </button>
        </form>
      )}

      {step === "review" && (
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-navy">اقلام سفارش</h2>
            <ul className="flex flex-col gap-3">
              {itemsWithProduct.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center justify-between text-sm">
                  <span className="text-ink">
                    {product.name}{" "}
                    <span className="text-ink/50">× {quantity.toLocaleString("fa-IR")}</span>
                  </span>
                  <span className="font-semibold text-navy">
                    {formatToman(product.price * quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="gold-divider my-4" />
            <div className="flex items-center justify-between text-base font-bold text-navy">
              <span>جمع کل</span>
              <span>{formatToman(totalPrice)}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-navy/10 bg-white p-6 text-sm text-ink/80">
            <h2 className="mb-3 text-lg font-bold text-navy">اطلاعات ارسال</h2>
            <p>{info.fullName} — {info.phone}</p>
            <p className="mt-1">
              {info.city}، {info.address} (کد پستی: {info.postalCode})
            </p>
            <p className="mt-1">
              روش پرداخت: {info.paymentMethod === "online" ? "پرداخت آنلاین" : "پرداخت در محل"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("info")}
              className="flex-1 rounded-full border border-navy/20 py-3 text-sm font-semibold text-navy hover:border-firuzeh"
            >
              ویرایش اطلاعات
            </button>
            <button
              onClick={handleConfirmOrder}
              className="flex-1 rounded-full bg-firuzeh py-3 text-sm font-bold text-white hover:bg-firuzeh-dark"
            >
              ثبت نهایی سفارش
            </button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-navy/10 bg-white p-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-firuzeh/10 text-2xl text-firuzeh-dark">
            ✓
          </span>
          <h1 className="text-xl font-bold text-navy">سفارش شما ثبت شد</h1>
          <p className="text-sm text-ink/60">
            شماره پیگیری سفارش: <span className="font-semibold text-ink">{orderNumber}</span>
          </p>
          <p className="max-w-sm text-sm text-ink/60">
            جزئیات سفارش برای شماره {info.phone} پیامک می‌شود. از خرید شما سپاسگزاریم.
          </p>
          <Link
            href="/"
            className="mt-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream hover:bg-firuzeh-dark"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      )}
    </main>
  );
}
