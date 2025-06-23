import React from "react";
import { AuthButtonProps } from "@/interfaces/AuthButtonProps";

export default function AuthButton({
  text,
  onClick,
  className = "",
}: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-base bg-[#133856] text-[#f8ffff]
        border-2 border-transparent py-1.5 px-4 rounded
        cursor-pointer transition duration-200 ease-in-out
        hover:bg-transparent hover:border-[#133856] hover:text-[#133856]
        ${className}
      `}
    >
      {text}
    </button>
  );
}
