import type { ReactNode } from "react";
import BrandLogo from "@/components/BrandLogo";
import "@/styles/globals.css";

export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-bg min-h-dvh grid place-items-center p-6">
      <main className="w-full max-w-md">
        <div className="flex flex-col items-center gap-6">
          <BrandLogo size={140} variant="on-dark" priority />
          <section className="card w-full p-7">{children}</section>
        </div>
      </main>
    </div>
  );
}
