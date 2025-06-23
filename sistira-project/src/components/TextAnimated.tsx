"use client";

import React from "react";
import useTypewriter from "@/hooks/components/useTypeWriter";

const phrases = [
  "Automatize avaliações",
  "Maximize resultados",
  "Corrija com precisão",
];

export default function TextAnimated() {
  const text = useTypewriter(phrases, 200, 500);

  return (
    <div className="text-[24px] font-bold text-[#f8ffff] whitespace-nowrap overflow-hidden">
      <span>{text}</span>
      <span
        className="text-[24px] font-bold text-[#f8ffff]"
        style={{ animation: "blink 0.8s steps(2) infinite" }}
      >
        |
      </span>
      {/* Keyframes são globais; certifique-se de ter isso no seu CSS global: 
          @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } } 
      */}
    </div>
  );
}
