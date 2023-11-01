import { useState } from "preact/compat";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import type { Props } from "$store/components/product/AddToCartButton/vtex.tsx";

export default function ProductCta(
  {
    seller,
    discount,
    name,
    price,
    productGroupID,
    productID,
    resizeQuantity,
    isProductMatcher,
    url,
  }:
    & Props
    & { resizeQuantity?: boolean; isProductMatcher?: boolean },
) {
  const [quantity, setQuantity] = useState(1);

  const cta = (
    <AddToCartButtonVTEX
      discount={discount}
      url={url}
      name={name}
      price={price}
      productGroupID={productGroupID}
      productID={productID}
      seller={seller}
      quantity={quantity}
    />
  );

  return (
    <div class="flex h-full w-full">
      <div class="hidden md:block">
        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
          resizeQuantity={resizeQuantity}
          isProductMatcher={isProductMatcher}
        />
      </div>
      {cta}
    </div>
  );
}
