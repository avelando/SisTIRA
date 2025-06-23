import React from 'react';
import Link from 'next/link';
import { ButtonProps } from '@/interfaces/ButtonProps';

const BackButton: React.FC<ButtonProps> = ({ text }) => {
  return (
    <Link href="/">
      <div className="
        absolute top-5 left-5
        flex items-center
        p-[5px_15px]
        bg-transparent
        rounded-full
        text-white font-bold
        cursor-pointer
        transition-colors duration-300
      ">
        <div className="
          w-0 h-0
          border-solid
          border-t-[15px] border-t-transparent
          border-b-[15px] border-b-transparent
          border-r-[10px] border-r-white
          mr-1.5
        " />
        <div className="
          border-2 border-[#F8FFFF]
          rounded-r-lg
          px-2.5 py-0.5
          transition-colors duration-100
          hover:bg-white/10
        ">
          <span>{text}</span>
        </div>
      </div>
    </Link>
  );
};

export default BackButton;
