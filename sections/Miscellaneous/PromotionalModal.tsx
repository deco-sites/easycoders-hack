export { default } from "$store/islands/PromotionalModal.tsx";
import type { Props } from "$store/components/ui/PromotionalModal.tsx";
import { getCookies } from "std/http/mod.ts";

export const loader = (props: Props, req: Request) => {
  const cookies = getCookies(req.headers);
  const cookieEmpty = req.method === "POST";
  const isOpen = cookieEmpty
    ? false
    : Boolean(!cookies["DecoPromotionalModal"]);

  return { ...props, isOpen };
};
