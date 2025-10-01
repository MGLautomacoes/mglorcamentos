// scripts/validate-structure.mjs
import { existsSync } from "node:fs";
import { join } from "node:path";

const mustExist = [
  "src/styles/globals.css",
  "src/components/AuthLayout.tsx",
  "src/components/BrandLogo.tsx",
  "src/brand/logoBase64.ts",
  "tailwind.config.js",
  "postcss.config.js",

  "src/app/layout.tsx",        // layout raiz
  "src/app/(auth)/layout.tsx", // layout do grupo

  // páginas de auth:
  "src/app/(auth)/login/page.tsx",
  "src/app/(auth)/signup/page.tsx",
  "src/app/(auth)/forgot/page.tsx",

  // opcional, se já criou:
  // "src/app/(auth)/reset/page.tsx",
];

const missing = [];

for (const p of mustExist) {
  if (!existsSync(join(process.cwd(), p))) missing.push(p);
}

if (missing.length === 0) {
  console.log("✅ Estrutura OK! Todas as rotas e layouts esperados foram encontrados.");
  process.exit(0);
} else {
  console.error("❌ Arquivos/pastas ausentes ou fora do lugar:");
  for (const p of missing) console.error("  -", p);
  console.error("\nDica: mova/renomeie esses itens exatamente para os caminhos acima.");
  process.exit(1);
}
