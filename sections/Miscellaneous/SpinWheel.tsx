export { default } from "$store/islands/SpinWheel.tsx";
import type { Props } from "$store/components/ui/SpinWheel.tsx";
import { getCookies } from "std/http/mod.ts";

export const loader = (props: Props, req: Request) => {
  const cookies = getCookies(req.headers);
  const cookieEmpty = req.method === "POST";
  const decoSpinWheelCookie = cookies["DecoSpinWheel"];

  if (
    cookieEmpty ||
    (decoSpinWheelCookie && Number(decoSpinWheelCookie)) === props.chances
  ) {
    return { ...props, isAvailable: false };
  }

  return { ...props, isAvailable: true };
};
