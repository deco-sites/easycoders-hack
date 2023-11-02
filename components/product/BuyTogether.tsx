import type { Product } from "apps/commerce/types.ts";
import ProductMatch from "$store/islands/BuyTogether.tsx";

export interface Props {
  suggestions: Product[] | null;
}

function NotFound() {
  return null;
}

export default function BuyTogether({ suggestions }: Props) {
  if (!suggestions || suggestions.length === 0) return <NotFound />;

  return (
    <section class="flex flex-col w-full container max-w-[1280px] p-4 lg:p-0 gap-2.5">
      <div class="text-center md:text-start pb-3 border-b border-b-base-200">
        <h1 class="font-bold text-black text-lg">Combinação Perfeita</h1>
      </div>

      <ProductMatch suggestions={suggestions} />
    </section>
  );
}
