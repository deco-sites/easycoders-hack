import "preact";

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "call-us": unknown;
    }
  }
}

/**
 * @description Integration with the 3cx platform. Link: https://www.3cx.com/live-chat/
 */
export interface Props {
  /**
   * @description Your 3cx team
   */
  party: string;
  /**
   * @description The text that appears at the beginning
   * @default Olá, Tudo bem? Envie-nos uma mensagem sobre sua dúvida para que possamos responder.
   */
  authenticationMessage?: string;
  /**
   * @description The text that appears when there is no online support
   * @default Olá! Como podemos ajudar?
   */
  greetingMessage?: string;
  /**
   * @description The text that appears when there is no online support
   * @default Estamos ausentes no momento. Volte mais tarde.
   */
  greetingOfflineMessage?: string;
}

export default function LiveChat({
  party,
  authenticationMessage,
  greetingMessage,
  greetingOfflineMessage,
}: Props) {
  return (
    <>
      <call-us
        phonesystem-url="https://1550.3cx.cloud"
        style="position: fixed; font-size: 16px; line-height: 17px; z-index: 99999; --call-us-main-accent-color:#D63004; --call-us-main-background-color:#FFFFFF; --call-us-plate-background-color:#D97E18; --call-us-plate-font-color:#E6E6E6; --call-us-main-font-color:#292929; --call-us-agent-bubble-color:#29292910; right: 20px; bottom: 20px;"
        id="wp-live-chat-by-3CX"
        minimized="true"
        animation-style="fadein"
        party={party}
        minimized-style="bubbleright"
        allow-call="true"
        allow-video="false"
        allow-soundnotifications="true"
        enable-mute="true"
        enable-onmobile="true"
        offline-enabled="true"
        enable="true"
        ignore-queueownership="false"
        authentication="none"
        operator-name="Time de Suporte"
        show-operator-actual-name="true"
        aknowledge-received="true"
        gdpr-enabled="true"
        message-userinfo-format="both"
        message-dateformat="both"
        lang="pt-br"
        button-icon-type="doublebubble"
        authentication-message={authenticationMessage ||
          "Olá, Tudo bem? Envie-nos uma mensagem sobre sua dúvida para que possamos responder."}
        greeting-visibility="both"
        greeting-offline-visibility="both"
        greeting-message={greetingMessage || "Olá! Como podemos ajudar?"}
        greeting-offline-message={greetingOfflineMessage ||
          "Estamos ausentes no momento. Volte mais tarde."}
        chat-delay="2000"
        enable-direct-call="true"
        enable-ga="false"
      />

      <script
        defer
        src="https://downloads-global.3cx.com/downloads/livechatandtalk/v1/callus.js"
        id="tcx-callus-js"
        charSet="utf-8"
      />
    </>
  );
}
