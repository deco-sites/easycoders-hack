import type { Product } from "apps/commerce/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";

import SuggestionCard from "$store/components/product/ProductSuggestions.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import useAddToCart from "$store/actions/addToCart.ts";

import { useState } from "preact/compat";

export interface Props {
  suggestions: Product[];
}

export default function Matcher({ suggestions }: Props) {
  const [isChecked, setIsChecked] = useState(true);

  const firstProduct = suggestions[0];
  const secondProduct = suggestions[1];
  const { seller } = useOffer(firstProduct.offers);

  const definitiveListPrice =
    firstProduct.offers?.offers[0].priceSpecification[0].price;
  const definitivePrice =
    firstProduct.offers?.offers[0].priceSpecification[1].price;

  const {
    offers,
  } = secondProduct;

  const { seller: secondSeller } = useOffer(offers);

  const secondListPrice =
    secondProduct.offers?.offers[0].priceSpecification[0].price;
  const secondPrice =
    secondProduct.offers?.offers[0].priceSpecification[1].price;

  const items = useAddToCart({
    items: isChecked
      ? [
        {
          skuId: firstProduct.productID,
          sellerId: seller!,
          price: definitivePrice ?? 0,
          discount: definitivePrice && definitiveListPrice
            ? definitiveListPrice - definitivePrice
            : 0,
          name: firstProduct.name ?? "",
          quantity: 1,
          productGroupId: firstProduct.isVariantOf?.productGroupID ?? "",
        },
        {
          skuId: secondProduct.productID,
          sellerId: secondSeller!,
          price: secondPrice ?? 0,
          discount: secondPrice && secondListPrice
            ? secondListPrice - secondPrice
            : 0,
          name: secondProduct.name ?? "",
          quantity: 1,
          productGroupId: secondProduct.isVariantOf?.productGroupID ?? "",
        },
      ]
      : [
        {
          skuId: firstProduct.productID,
          sellerId: seller!,
          price: definitivePrice ?? 0,
          discount: definitivePrice && definitiveListPrice
            ? definitiveListPrice - definitivePrice
            : 0,
          name: firstProduct.name ?? "",
          quantity: 1,
          productGroupId: firstProduct.isVariantOf?.productGroupID ?? "",
        },
      ],
  });

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
          {formatPrice(
            (definitivePrice ?? 0) + (isChecked ? (secondPrice ?? 0) : 0),
            offers!.priceCurrency!,
          )}
        </span>
        <span class="flex">
          <div class="text-sm leading-[22px]">
            ou até{"  "}<span class="font-bold text-lg">8x</span>{"  "}de{"  "}
            <span class="font-bold text-lg">
              {formatPrice(
                ((definitivePrice ?? 0) +
                  (isChecked ? (secondPrice ?? 0) : 0)) / 8,
                offers!.priceCurrency!,
              )}
            </span>{"  "}
            s/juros
          </div>
        </span>
        {isChecked
          ? (
            <Button
              data-deco="add-to-cart"
              {...items}
              class="w-full h-[41px] min-h-min bg-emerald-500 hover:bg-emerald-400 text-white text-sm border-transparent hover:border-transparent rounded-md mt-2"
            >
              COMPRAR JUNTO
            </Button>
          )
          : (
            <Button
              data-deco="add-to-cart"
              {...items}
              class="w-full h-[41px] min-h-min bg-emerald-500 hover:bg-emerald-400 text-white text-sm border-transparent hover:border-transparent rounded-md mt-2"
            >
              COMPRAR ÚNICO
            </Button>
          )}
      </div>
    </div>
  );
}
