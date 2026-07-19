"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

function formatToman(value: number) {
  return value.toLocaleString("fa-IR") + " تومان";
}

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    itemsWithProduct,
    totalPrice,
    setQuantity,
    removeFromCart,
  } = useCart();

  return (
    <>
      {/* پس‌زمینه تیره برای بستن سبد با کلیک بیرون */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-navy-dark/50 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-label="سبد خرید"
        className={`fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-navy/10 px-6 py-4">
          <h2 className="text-lg font-bold text-navy">سبد خرید شما</h2>
          <button
            onClick={closeCart}
            aria-label="بستن سبد خرید"
            className="rounded-full p-2 text-navy/60 hover:bg-navy/5 hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-firuzeh"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {itemsWithProduct.length === 0 ? (
            <p className="mt-10 text-center text-sm text-ink/60">
              سبد خرید شما خالی است. کالایی را از فروشگاه انتخاب کنید.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {itemsWithProduct.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex items-start gap-3 border-b border-navy/5 pb-4"
                >
                  <div
                    className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${product.swatch}`}
                  >
                    <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{product.name}</p>
                    <p className="mt-1 text-xs text-ink/60">
                      {formatToman(product.price)}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        aria-label="کاهش تعداد"
                        className="h-7 w-7 rounded-full border border-navy/15 text-navy hover:border-firuzeh hover:text-firuzeh-dark"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-medium">
                        {quantity.toLocaleString("fa-IR")}
                      </span>
                      <button
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        aria-label="افزایش تعداد"
                        className="h-7 w-7 rounded-full border border-navy/15 text-navy hover:border-firuzeh hover:text-firuzeh-dark"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="mr-auto text-xs text-ink/50 underline-offset-2 hover:text-red-600 hover:underline"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {itemsWithProduct.length > 0 && (
          <div className="border-t border-navy/10 px-6 py-4">
            <div className="gold-divider mb-4" />
            <div className="flex items-center justify-between text-base font-bold text-navy">
              <span>جمع کل</span>
              <span>{formatToman(totalPrice)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-4 block w-full rounded-full bg-firuzeh py-3 text-center text-sm font-bold text-white transition hover:bg-firuzeh-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              ادامه فرایند خرید
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
