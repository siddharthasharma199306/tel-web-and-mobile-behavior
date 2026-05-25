"use client";

import { useMemo } from "react";

type TelCase = {
  label: string;
  href: string;
  notes?: string;
};

export default function Page() {
  const telCases: TelCase[] = [
    {
      label: "International Format (Recommended)",
      href: "tel:+919876543210",
      notes: "E.164 format",
    },
    {
      label: "Local Number",
      href: "tel:9876543210",
    },
    {
      label: "Hyphenated Number",
      href: "tel:+91-98765-43210",
    },
    {
      label: "Parentheses Format",
      href: "tel:(98765)43210",
    },
    {
      label: "Extension via ext",
      href: "tel:+919876543210;ext=123",
    },
    {
      label: "Pause + Extension",
      href: "tel:+919876543210,,123",
    },
    {
      label: "USSD Style",
      href: "tel:*123%23",
      notes: "# encoded",
    },
  ];

  const handleAnchorClick = (href: string, label: string) => {
    localStorage.setItem(
      "lastTelAttempt",
      JSON.stringify({
        href,
        label,
        timestamp: new Date().toISOString(),
      }),
    );
  };

  const deviceInfo = useMemo(() => {
    if (typeof window === "undefined") return null;

    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
      online: navigator.onLine,
      touchPoints: navigator.maxTouchPoints,
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      pixelRatio: window.devicePixelRatio,
      standalone: (window.navigator as any).standalone ?? false,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            tel: Browser Compatibility Tester
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Use this page to validate tel: behavior across browsers
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Section title="Basic tel: Anchor Tests">
              <div className="grid gap-3 md:grid-cols-2">
                {telCases.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border bg-white p-4 shadow-sm"
                  >
                    <div className="mb-3">
                      <div className="font-semibold">{item.label}</div>

                      <div className="text-sm text-slate-500">{item.href}</div>

                      {item.notes && (
                        <div className="mt-1 text-xs text-slate-400">
                          {item.notes}
                        </div>
                      )}
                    </div>

                    <a
                      href={item.href}
                      onClick={() => handleAnchorClick(item.href, item.label)}
                      className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Test Anchor
                    </a>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <div className="space-y-6">
            <Section title="Environment Info">
              <pre className="overflow-auto rounded-2xl bg-slate-900 p-4 text-xs text-green-300">
                {JSON.stringify(deviceInfo, null, 2)}
              </pre>
            </Section>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4 shadow lg:hidden">
        <a
          href="tel:+919876543210"
          onClick={() => handleAnchorClick("tel:+919876543210", "Sticky CTA")}
          className="block rounded-2xl bg-green-600 py-3 text-center font-semibold text-white"
        >
          Quick Call Test
        </a>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      {children}
    </section>
  );
}
