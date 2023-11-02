export interface Props {
  title: string;
}

export default function BuyAndWin({ title }: Props) {
  return (
    <section class="w-full h-full flex items-center justify-start">
      <div class="w-[202px] h-[231px] flex flex-col items-center bg-white border-2 border-solid border-[#ffd700] rounded-lg">
        <h1 class="text-black text-center text-base font-semibold">
          {title}
        </h1>
        <img
          src="https://bravtexfashionstore.vtexassets.com/arquivos/ids/155816/casaco-masculino-mostarda.jpg?v=1771805461"
          width={150}
          height={150}
          alt="Produto de Brinde"
        />
      </div>
    </section>
  );
}
