import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  gift: {
    image: string;
    link: string;
  };
  isExpandedWidth?: boolean;
}

export default function BuyAndWin({ 
  title,
  gift,
  isExpandedWidth = true,
}: Props) {
  return (
    <section class="w-full h-full flex items-center justify-start relative">
      <div
        class="flex items-center justify-center top-0 absolute w-[65%] -translate-x-1/2 left-1/2 -translate-y-5 text-black font-semibold p-2 bg-gradient-to-r from-yellow-500 to-orange-600 shadow-inner border border-black tracking-wide leading-tight rounded"
      >
        Buy and Win Promotion
      </div>

      <div class={`${isExpandedWidth ? 'flex-row w-full text-start justify-between' : 'w-[202px] flex-col text-center'} h-full flex items-center bg-white border border-solid border-black rounded-lg p-2`}>
        <h1 class={`${isExpandedWidth && 'max-w-[50%]'} text-black text-base font-semibold`}>
          {title}
        </h1>

        {gift && (
          <a href={gift.link}>
            <Image
              src={gift.image}
              width={150}
              height={150}
              alt="Produto de Brinde"
              loading="lazy"
            />
          </a>
        )}
      </div>
    </section>
  );
}
