// src/brand/logoBase64.ts

/** Paleta da marca para reuso em UI */
export const BRAND_COLORS = {
  blue: "#0018FF",
  orange: "#FF6A00",
  black: "#0B0B0C",
  white: "#FFFFFF",
} as const;

/** Caminho de fallback (coloque um PNG/SVG em /public/brand se quiser) */
export const LOGO_FALLBACK_PATH = "/brand/mgl-logo.png";

/**
 * Versões da logo em Data URL.
 * ➜ Substitua o conteúdo entre crases pelo SEU Base64 completo.
 * Dica: usar template string (`) evita problemas com quebras de linha gigantes.
 */
export const LOGO_MGL_BLACK = `data:image/png;base64,SEU_BASE64_AQUI...`;

/**
 * Opcional: versão branca (para fundos claros). Por padrão,
 * apontamos para a mesma arte — troque quando tiver a versão em branco.
 */
export const LOGO_MGL_WHITE = LOGO_MGL_BLACK;

/** Tipos aceitos ao escolher a arte */
export type LogoVariant = "on-dark" | "on-light" | "black" | "white";

/** Retorna a melhor Data URL conforme o fundo/variante escolhida */
export function getLogoDataUrl(variant: LogoVariant = "on-dark"): string {
  if (variant === "white" || variant === "on-dark") {
    return LOGO_MGL_WHITE || LOGO_MGL_BLACK;
  }
  // 'on-light' ou 'black'
  return LOGO_MGL_BLACK || LOGO_MGL_WHITE;
}

/** Garante um src válido (Data URL ou fallback em /public) */
export function logoSrc(variant: LogoVariant = "on-dark"): string {
  const dataUrl = getLogoDataUrl(variant);
  const isDataUrl = typeof dataUrl === "string" && dataUrl.startsWith("data:image");
  return isDataUrl ? dataUrl : LOGO_FALLBACK_PATH;
}
