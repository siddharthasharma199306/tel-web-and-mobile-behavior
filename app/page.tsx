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
      label: "US Toll-Free Number",
      href: "tel:+1-800-555-0199",
    },
    {
      label: "US Local Format (No Country Code)",
      href: "tel:212-555-0143",
    },
    {
      label: "US Number with Extension",
      href: "tel:+1-212-555-0177,1234",
    },
    {
      label: "US E.164 Pure Digits",
      href: "tel:+12125550122",
    },
    {
      label: "US Parentheses and Spaces",
      href: "tel:+1-(212)-555-0155",
    },
    {
      label: "US Dotted Format",
      href: "tel:1.212.555.0166",
    },
    {
      label: "Invalid - Too Short",
      href: "tel:+1-212-555",
    },
    {
      label: "Invalid - Too Long",
      href: "tel:+1-212-555-0143-999",
    },
    {
      label: "Invalid - Bad Characters",
      href: "tel:+1-212-555-01abc",
    },
    {
      label: "Local India Number",
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

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-4 pb-28 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">
            tel: Browser Compatibility Tester
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Use this page to validate tel: behavior across browsers
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <Section title="Basic tel: Anchor Tests">
              <div className="grid gap-3 md:grid-cols-2">
                {telCases.map((item) => (
                  <div
                    key={item.label}
                    className="min-w-0 rounded-2xl border bg-white p-4 shadow-sm"
                  >
                    <div className="mb-3">
                      <div className="text-sm font-semibold leading-snug sm:text-base">
                        {item.label}
                      </div>

                      <div className="break-all text-sm text-slate-500">
                        {item.href}
                      </div>

                      {item.notes && (
                        <div className="mt-1 text-xs text-slate-400">
                          {item.notes}
                        </div>
                      )}
                    </div>

                    <a
                      href={item.href}
                      onClick={() => handleAnchorClick(item.href, item.label)}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 sm:w-auto"
                    >
                      Test Anchor
                    </a>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
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
    <section className="rounded-3xl border bg-white p-4 shadow-sm sm:p-5">
      <h2 className="mb-4 text-lg font-bold sm:text-xl">{title}</h2>

      {children}
    </section>
  );
}
