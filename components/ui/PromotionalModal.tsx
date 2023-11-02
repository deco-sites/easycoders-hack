import Modal from "$store/components/ui/Modal.tsx";
import LinkButton from "$store/components/ui/Buttons.tsx";
import Image from "apps/website/components/Image.tsx";

import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @title Modal title
   */
  title: string;
  subtitle?: string;
  button: {
    variation?: "cartoon" | "bg-to-br" | "bg-to-tr" | "bg-gradient" | "psychic";
    label: string;
    link: string;
  };

  /**
   * @format color
   * @description Change the modal background color here. Default: #fff
   * @default #fff
   */
  modalBackground?: string;
  /**
   * @format color
   * @description Change the modal background color here. Default: #000
   * @default #000
   */
  textColor?: string;

  backgroundImage: {
    image: ImageWidget;
    description: string;
    width?: number;
    height?: number;
  };

  /**
   * @title Days to reopen modal if it is closed
   */
  modalCloseExpiredDate: number;

  /**
   * @description Activate this if you want the image to appear first.
   */
  invertOrder?: boolean;
}

export default function PromotionalModal({
  title,
  subtitle,
  button,
  modalBackground,
  textColor,
  backgroundImage,
  isOpen = false,
  modalCloseExpiredDate,
  invertOrder,
}: Props & { isOpen?: boolean }) {
  const setCookieOnCloseModal = (
    cookieValue: string,
    expirationSeconds: number,
  ) => {
    const date = new Date();

    date.setTime(date.getTime() + (expirationSeconds * 24 * 60 * 60 * 1000));

    const expires = "expires=" + date.toUTCString();

    document.cookie = "DecoPromotionalModal" + "=" + cookieValue + ";" +
      expires +
      ";path=/";
  };

  return (
    <Modal
      onClose={() => setCookieOnCloseModal("closed", modalCloseExpiredDate)}
      open={isOpen}
    >
      <div
        style={{ background: modalBackground }}
        class="modal-box rounded-lg p-0"
      >
        <div
          class={`${
            invertOrder ? "flex-row-reverse" : "flex-row"
          } flex gap-2 w-full h-full`}
        >
          <aside
            style={{ color: textColor }}
            class="flex flex-col items-center justify-center text-center w-1/2 px-2.5 gap-2.5"
          >
            <h1 class="tracking-widest leading-tight text-xl font-bold [text-shadow:_0_2px_0_rgb(0_0_0_/_40%)]">
              {title}
            </h1>
            <p class="leading-tight py-2.5">{subtitle}</p>
            <LinkButton
              button={button}
              modalCloseExpiredDate={modalCloseExpiredDate}
              setCookieOnCloseModal={setCookieOnCloseModal}
            />
          </aside>

          <aside class="w-1/2 rounded-r-lg">
            {backgroundImage && (
              <Image
                src={backgroundImage.image}
                alt={backgroundImage.description}
                width={backgroundImage.width || 500}
                height={backgroundImage.height || 500}
                class="rounded-r-md"
                loading="eager"
              />
            )}
          </aside>
        </div>
      </div>
    </Modal>
  );
}
