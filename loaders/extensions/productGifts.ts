import { ExtensionOf } from "apps/website/loaders/extension.ts";
import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";
import listLoader from "apps/vtex/loaders/legacy/productList.ts";
import { batch } from "apps/vtex/utils/batch.ts";

export interface Props {
  gifts?: boolean;
}

const giftsExt = async (
  productDetails: ProductDetailsPage | null,
  req: Request,
  ctx: AppContext,
): Promise<Product[] | null> => {
  if (
    !productDetails || !productDetails.product ||
    !productDetails.product.offers?.offers[0].giftSkuIds
  ) return null;

  const giftIDs = new Set<string>();
  const gifts: Product[] = [];

  for (const item of productDetails.product.offers?.offers[0].giftSkuIds) {
    giftIDs.add(item);
  }

  const batched = await Promise.all(
    batch(giftIDs.values(), 6).map((batch) =>
      listLoader({ props: { ids: batch } }, req, ctx)
    ),
  );

  for (const batch of batched) {
    for (const product of batch || []) {
      gifts.push(product);
    }
  }

  return gifts;
};

/**
 * @title Add Product Gift
 */
export default function productGift(
  { gifts }: Props,
  req: Request,
  ctx: AppContext,
): ExtensionOf<ProductDetailsPage | null> {
  return (p: ProductDetailsPage | null) => {
    if (!p) return null;

    if (gifts) {
      const giftsAvailable = giftsExt(p, req, ctx);

      return {
        ...p,
        product: {
          ...p.product,
          gifts: giftsAvailable ?? null,
        },
      };
    }

    return {
      ...p,
      product: {
        ...p.product,
        gifts: null,
      },
    };
  };
}
