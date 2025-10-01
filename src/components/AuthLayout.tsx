"use client";

import type { ReactNode } from "react";

export default function AuthLayout({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="w-full">
      {title ? <h1 className="text-white text-xl font-semibold text-center mb-4">{title}</h1> : null}
      {children}
    </div>
  );
}
