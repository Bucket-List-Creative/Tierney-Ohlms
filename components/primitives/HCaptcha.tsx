"use client";

import { useEffect, useRef } from "react";

/**
 * hCaptcha checkbox widget.
 *
 * Rendered explicitly rather than by hCaptcha's own `class="h-captcha"`
 * auto-scan: that scan runs once when the script loads, so a widget mounted by
 * React afterwards — the contact form only exists after hydration — is never
 * found. Explicit render also gives us the widget id needed to reset a spent
 * token after a failed submission.
 *
 * The widget owns an iframe, so this component holds no React state of its own
 * and never re-renders: everything it has to say, it says through the
 * callbacks. The script injects `h-captcha-response` and `g-recaptcha-response`
 * textareas into the surrounding <form>; we don't read them, the token arrives
 * through `onVerify` instead, which keeps this usable inside a form that
 * serialises itself by hand.
 */

type HCaptchaApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    hcaptcha?: HCaptchaApi;
  }
}

const SCRIPT_SRC = "https://js.hcaptcha.com/1/api.js?render=explicit";

/**
 * One shared load for the whole page. Kept at module scope so a remount — the
 * form re-renders after "Send another message" — reuses the script already in
 * the document instead of appending a second copy.
 */
let scriptPromise: Promise<HCaptchaApi> | null = null;

function loadHCaptcha(): Promise<HCaptchaApi> {
  if (window.hcaptcha) return Promise.resolve(window.hcaptcha);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<HCaptchaApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () =>
      window.hcaptcha
        ? resolve(window.hcaptcha)
        : reject(new Error("hCaptcha script loaded without its API"));
    script.onerror = () => {
      // Let a later attempt retry rather than caching the failure forever.
      scriptPromise = null;
      reject(new Error("hCaptcha script failed to load"));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export function HCaptcha({
  sitekey,
  onVerify,
  onUnavailable,
  resetSignal = 0,
  className,
}: {
  sitekey: string;
  /** A token once solved; null when that token expires or is cleared. */
  onVerify: (token: string | null) => void;
  /**
   * The widget could not be put on the page at all — hCaptcha's script was
   * blocked or failed to load. Nothing the visitor does will fix it, so the
   * form has to offer another way to get in touch.
   */
  onUnavailable?: () => void;
  /** Bump to clear a spent token — hCaptcha tokens are single-use. */
  resetSignal?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Callbacks live in refs so a parent that passes inline functions does not
  // tear down and re-render the widget on every keystroke in the form.
  const onVerifyRef = useRef(onVerify);
  const onUnavailableRef = useRef(onUnavailable);
  useEffect(() => {
    onVerifyRef.current = onVerify;
    onUnavailableRef.current = onUnavailable;
  });

  useEffect(() => {
    let cancelled = false;

    loadHCaptcha()
      .then((api) => {
        if (cancelled || !containerRef.current || widgetIdRef.current !== null) return;
        widgetIdRef.current = api.render(containerRef.current, {
          sitekey,
          // 303px wide at "normal"; below that it would overflow the panel.
          size: window.matchMedia("(max-width: 359px)").matches ? "compact" : "normal",
          callback: (token: string) => onVerifyRef.current(token),
          // A challenge that expires or errors mid-flight leaves the widget in
          // place and re-solvable, so only the token is withdrawn.
          "expired-callback": () => onVerifyRef.current(null),
          "chalexpired-callback": () => onVerifyRef.current(null),
          "error-callback": () => onVerifyRef.current(null),
        });
      })
      .catch(() => {
        if (!cancelled) onUnavailableRef.current?.();
      });

    return () => {
      cancelled = true;
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = null;
      if (widgetId !== null) {
        try {
          window.hcaptcha?.remove(widgetId);
        } catch {
          // Already gone — the script tears its own iframes down on unload.
        }
      }
    };
  }, [sitekey]);

  useEffect(() => {
    if (resetSignal === 0 || widgetIdRef.current === null) return;
    try {
      window.hcaptcha?.reset(widgetIdRef.current);
      onVerifyRef.current(null);
    } catch {
      // A reset that throws leaves the spent token in place; the visitor can
      // still re-solve by hand.
    }
  }, [resetSignal]);

  return <div ref={containerRef} className={className} />;
}
