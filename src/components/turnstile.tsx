"use client";

import Script from "next/script";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

// Cloudflare Turnstile widget. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY in .env.local
// (or your host's environment settings) to your real site key. Without one we
// fall back to Cloudflare's public test key, which always passes and is only
// for local development.
const TEST_SITE_KEY = "1x00000000000000000000AA";
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TEST_SITE_KEY;

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string | undefined;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileHandle = { reset: () => void };

type Props = {
  onToken: (token: string | null) => void;
  className?: string;
};

const Turnstile = forwardRef<TurnstileHandle, Props>(function Turnstile({ onToken, className }, ref) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const latestOnToken = useRef(onToken);
  latestOnToken.current = onToken;

  const renderWidget = useCallback(() => {
    if (!window.turnstile || !container.current || widgetId.current) return;
    widgetId.current = window.turnstile.render(container.current, {
      sitekey: siteKey,
      theme: "light",
      size: "flexible",
      appearance: "always",
      callback: (token: string) => latestOnToken.current(token),
      "expired-callback": () => latestOnToken.current(null),
      "error-callback": () => latestOnToken.current(null),
      "timeout-callback": () => latestOnToken.current(null),
    }) ?? null;
  }, []);

  useImperativeHandle(ref, () => ({
    reset() {
      if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current);
      latestOnToken.current(null);
    },
  }), []);

  useEffect(() => {
    renderWidget();
    return () => {
      if (window.turnstile && widgetId.current) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [renderWidget]);

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="lazyOnload" onReady={renderWidget} />
      <div ref={container} className={className} />
    </>
  );
});

export default Turnstile;
