import CampaignTimer, {
  Props as CampaignProps,
} from "$store/components/ui/CampaignTimer.tsx";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";
import type { ImageWidget } from "apps/admin/widgets.ts";

export type InputProps =
  & JSX.IntrinsicElements["input"]
  & {
    name: string;
    label: string;
  };

export interface Props {
  /**
   * @format html
   */
  title: string;
  subtitle: string;
  backgroundImage: ImageWidget;
  campaignTimer: CampaignProps;
  benefits?: {
    title: string;
    items: string[];
  };
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  name,
  label,
  ...props
}, ref) => (
  <div class="flex flex-col gap-0.5 text-white w-full">
    <label for={name}>{label}</label>
    <input
      {...props}
      ref={ref}
      id={name}
      name={name}
      class="bg-[#292627] placeholder:text-white/40 md:max-w-[160px] w-full rounded-lg p-2 focus:border-b focus:border-b-yellow-500 duration-150 transition-colors"
    />
  </div>
));

function SubmitButton() {
  return (
    <button
      type="submit"
      class="font-bold md:max-w-[160px] h-10 w-full rounded-lg p-2 bg-yellow-500 hover:bg-yellow-400 duration-150 transition-colors uppercase"
    >
      Cadastre-se
    </button>
  );
}

export default function CampaignHero(
  { title, subtitle, campaignTimer, backgroundImage, benefits }: Props,
) {
  return (
    <section
      style={`background-image: url(${backgroundImage});`}
      class="w-full h-full bg-center object-cover bg-opacity-80 border-b border-b-gray-200/40"
    >
      <div class="flex flex-col justify-between items-center container mx-auto max-w-[1240px] gap-12 w-full py-12 px-4 xl:px-0 text-white">
        <div class="flex flex-col lg:flex-row w-full justify-between items-center">
          <div class="flex flex-col items-center lg:items-start justify-center text-center lg:text-start gap-1.5">
            <span class="flex items-center justify-center before:bg-yellow-400 before:w-[1px] before:h-5 before:flex font-semibold gap-2">
              {subtitle || "Garanta antecipadamente todas as nossas"}
            </span>
            <div class="text-4xl sm:text-6xl font-bold tracking-wide leading-tight">
              <div dangerouslySetInnerHTML={{ __html: title || "" }} />
            </div>
          </div>

          {campaignTimer && <CampaignTimer {...campaignTimer} />}
        </div>

        <div class="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-0">
          {benefits && (
            <div class="flex flex-col gap-1.5">
              <h2 class="text-lg font-bold">{benefits.title}</h2>

              <ul class="flex flex-col gap-0.5">
                {benefits?.items?.map((item, index) => (
                  <li>
                    <span class="text-yellow-400">{index + 1}.</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div class="flex flex-col md:flex-row items-end justify-center gap-3 w-full md:w-auto">
            <Input
              name="name"
              type="text"
              placeholder="Seu nome"
              label="Nome:"
            />
            <Input
              name="email"
              type="email"
              placeholder="Seu e-mail"
              label="E-mail:"
            />
            <Input
              name="whatsapp"
              type="text"
              placeholder="Seu número"
              label="WhatsApp:"
            />
            <SubmitButton />
          </div>
        </div>
      </div>
    </section>
  );
}
