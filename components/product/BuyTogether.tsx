import type { Product } from "apps/commerce/types.ts";
import ProductMatch from "$store/islands/BuyTogether.tsx";

export interface Props {
  title: string;
  subtitle?: string;
  suggestions: Product[] | null;
}

function NotFound() {
  return null;
}

export default function BuyTogether({ title, subtitle, suggestions }: Props) {
  if (!suggestions || suggestions.length === 0) return <NotFound />;

  return (
    <section class="flex flex-col w-full container max-w-[1280px] p-4 lg:p-0 gap-2.5">
      <div class="flex flex-col gap-2.5 text-center md:text-start pb-3 border-b border-b-base-200 text-black">
        <h1 class="font-bold text-lg">{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </div>

      <ProductMatch suggestions={suggestions} />
    </section>
  );
}
