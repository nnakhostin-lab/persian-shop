import { Suspense } from "react";
import ShopSection from "@/components/ShopSection";

export default function Home() {
  return (
    <main>
      <section className="tile-pattern relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-firuzeh-dark/90" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-firuzeh-light">
            دست‌ساز · اصیل · محدود
          </p>
          <h1 className="text-3xl font-black leading-relaxed text-cream sm:text-5xl">
            هر قطعه، روایتی از دست‌های یک استادکار
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-cream/70 sm:text-base">
            کالاها را ببینید، به سبد اضافه کنید و در پایان یک‌جا مرور کنید.
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <ShopSection />
      </Suspense>
    </main>
  );
}
