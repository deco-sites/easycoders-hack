import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title?: HTMLWidget;
  subtitle?: HTMLWidget;
  images?: Array<{
    image: ImageWidget;
    alt: string;
    description: HTMLWidget; //colocar htmlWidget
  }>;
}

export default function Images(
  props: Props,
) {
  const {
    title = "titulo",
    subtitle = "descrição aqui",
    images = [],
  } = props;
  return (
    <div class="flex flex-col items-center justify-center w-full container max-w-[1240px] py-5 px-4">
      <div class="flex flex-col items-center justify-center gap-2 w-full">
        <h1
          class="text-center px-4"
          dangerouslySetInnerHTML={{
            __html: title || "",
          }}
        />
        <p
          class="text-center"
          dangerouslySetInnerHTML={{
            __html: subtitle || "",
          }}
        />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center md:justify-between items-center mt-6">
        {images?.map((item) => (
          <div class="flex flex-col gap-2 items-center justify-center">
            <Image
              src={item.image}
              alt={item.alt}
              width={134}
              height={127}
              loading="lazy"
            />
            <span
              class="flex items-center text-center"
              dangerouslySetInnerHTML={{ __html: item.description || "" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
