import type { Product } from "apps/commerce/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";

import SuggestionCard from "$store/components/product/ProductSuggestions.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
// import useAddToCart from "$store/actions/addToCart.ts";

import { useState } from "preact/compat";

export interface Props {
  suggestions: Product[];
}

export default function Matcher({ suggestions }: Props) {
  const [isChecked, setIsChecked] = useState(true);
  // const { seller } = useOffer(product.offers);

  return (
    <div class="flex flex-col lg:flex-row items-center justify-start w-full lg:gap-8 mb-8">
      <div class="flex flex-col lg:flex-row items-center justify-start border border-b-base-200 lg:border-none rounded-xl px-2 lg:px-0 lg:gap-8">
        <SuggestionCard product={suggestions[0]} />

        <div class="btn btn-circle btn-outline text-black/90 hover:text-black hover:bg-transparent">
          <Icon id="Plus" width={12} height={12} strokeWidth={3} />
        </div>

        <SuggestionCard
          product={suggestions[1]}
          hasCheckbox={{
            isChecked,
            setIsChecked,
          }}
        />

        <div class="btn btn-circle btn-outline text-black/90 hover:text-black hover:bg-transparent mb-2 lg:mb-0">
          =
        </div>
      </div>

      <div class="flex flex-col items-center lg:items-start gap-1 mt-4 lg:mt-0">
        <p class="text-gray-base">
          {isChecked ? "Compre os 2 produtos por:" : "Compre um 1 produto por:"}
        </p>
        <span class="font-bold leading-[22px]">
          1222,00
        </span>
        <span class="flex">
          <div class="text-sm leading-[22px]">
            ou{"  "}<span class="font-bold text-lg">8x</span>{"  "}de{"  "}
            <span class="font-bold text-lg">
              1222,00
            </span>{"  "}
            s/juros
          </div>
        </span>
        {isChecked
          ? (
            <Button
              data-deco="add-to-cart"
              class="w-full h-[41px] min-h-min bg-emerald-500 hover:bg-emerald-400 text-white text-sm border-transparent hover:border-transparent rounded-md mt-2"
            >
              COMPRAR JUNTO
            </Button>
          )
          : (
            <Button
              data-deco="add-to-cart"
              class="w-full h-[41px] min-h-min bg-emerald-500 hover:bg-emerald-400 text-white text-sm border-transparent hover:border-transparent rounded-md mt-2"
            >
              COMPRAR ÚNICO
            </Button>
          )}
      </div>
    </div>
  );
}
