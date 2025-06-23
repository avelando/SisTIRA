import React from 'react';
import Image from 'next/image';
import { ButtonProps } from '@/interfaces/ButtonProps';

interface GoogleAuthButtonProps extends ButtonProps {
  redirectUrl: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ content, redirectUrl }) => {
  const handleClick = () => {
    window.location.href = redirectUrl;
  };

  return (
    <button
      onClick={handleClick}
      className="
        flex items-center justify-center gap-2
        w-full mb-5
        bg-transparent border-2 border-[#133856] rounded
        py-2.5 px-4 text-base text-[#133856]
        cursor-pointer transition duration-200 ease-in-out
        hover:bg-[#133856] hover:text-[#f8ffff] focus:outline-none
      "
    >
      <Image src="/assets/google-logo.png" alt="Google Icon" width={20} height={20} />
      {content}
    </button>
  );
};

export default GoogleAuthButton;
