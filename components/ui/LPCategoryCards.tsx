import Image from "apps/website/components/Image.tsx";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import type { ImageWidget } from "apps/admin/widgets.ts"; 
export interface Props{
    title?: HTMLWidget;
    subTitle?: HTMLWidget;
    cards?: {
        link: string;
        image: {
            link: ImageWidget;
            description: string;
          };
          
        titleCategory: string;
    }[];
}

export default function LPCategoryCards( {title, subTitle, cards}: Props ) {
    return(
        <div class="w-full h-[420px] bg-black">
            <section class="w-full h-full flex flex-col items-center justify-center">
                <div class="w-full text-center mt-4">
                    <h1 class="text-2xl text-white font-bold"
                    dangerouslySetInnerHTML={{ __html: title || ""}}/>
                    <p class="text-sm text-white"
                    dangerouslySetInnerHTML={{ __html: subTitle || ""}}/>
                </div>
                <div class="w-full h-full flex flex-wrap items-center justify-center my-4 gap-4">
                    {cards?.map((item) => (
                        <a href={item.link} class="flex flex-col items-center justify-center">
                            <Image src={item.image.link} width={191} height={191} class="rounded-lg" alt={item.image.description}/>
                            <p class="w-[130px] min-h-[58px] text-lg text-center text-white font-semibold" >{item.titleCategory}</p>
                        </a>
                    ))}
                </div>
            </section>
        </div>
        )
}