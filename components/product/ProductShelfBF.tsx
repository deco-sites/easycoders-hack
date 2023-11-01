import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCardBF.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  products: Product[] | null;
  /** @format html */
  title?: string;
  /** @format html */
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section class="w-full container py-8 flex flex-col gap-12 lg:gap-16 lg:py-10">
      <div
        class={`flex flex-col gap-1.5 ${
          layout?.headerAlignment === "center" &&
          "items-center justify-center"
        }`}
      >
        {title && <h1 dangerouslySetInnerHTML={{ __html: title }} />}
        {description && (
          <h2
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>

      <div
        id={id}
        class="container max-w-[1280px] grid grid-cols-[48px_1fr_48px] sm:px-5"
      >
        <Slider class="md:carousel md:carousel-end inline-flex overflow-x-scroll snap-mandatory scroll-smooth gap-1 md:gap-6 col-span-full row-start-2 row-end-5 scrollbar pb-4 lg:pb-0">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[175px] sm:w-[292px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
              />
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="absolute flex items-center justify-center text-white w-8 h-8 lg:rounded-[5px] border-none bg-gradient-to-l from-yellow-300 to-yellow-500 disabled:opacity-40 right-1/2">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="absolute flex items-center justify-center text-white w-8 h-8 lg:rounded-[5px] border-none bg-gradient-to-r from-yellow-300 to-yellow-500 disabled:opacity-40 left-1/2">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>
        <SliderJS rootId={id} />
        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </section>
  );
}

export default ProductShelf;
