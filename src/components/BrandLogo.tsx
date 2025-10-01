import React from "react";
import { LOGO_MGL_BLACK } from "@/brand/logoBase64";

type Props = {
  size?: number;        // largura máxima
  alt?: string;
  className?: string;
  variant?: "on-dark" | "on-light"; // reservado p/ possíveis logos futuras
};

const BrandLogo: React.FC<Props> = ({ size = 200, alt = "MGL", className, variant = "on-dark" }) => {
  // Se no futuro você tiver variações, faça um switch aqui pelo 'variant'
  const src = LOGO_MGL_BLACK;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width: "100%", maxWidth: size, height: "auto" }}
      draggable={false}
    />
  );
};

export default BrandLogo;
export { BrandLogo }; // também exporta nomeado, para não quebrar imports existentes
