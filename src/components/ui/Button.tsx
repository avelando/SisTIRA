import { ButtonProps } from '@/interfaces/ButtonProps';

export default function Button({ content, variant = 'default', onClick }: ButtonProps) {
  const baseClasses =
    'px-5 py-2.5 rounded text-base transition duration-200 ease-in';

  const defaultClasses = [
    'bg-[#f8ffff]',
    'text-[#133856]',
    'border-2 border-[#f8ffff]',
    'shadow-[2px_2px_10px_#f8ffff50]',
    'hover:bg-transparent',
    'hover:text-[#f8ffff]',
    'cursor-pointer',
  ].join(' ');

  const reverseClasses = [
    'bg-[#133856]',
    'text-[#f8ffff]',
    'border-2 border-[#133856]',
    'hover:border-[#f8ffff]',
    'hover:bg-transparent',
    'hover:text-[#f8ffff]',
    'cursor-pointer',
  ].join(' ');

  const buttonClass =
    variant === 'reverse'
      ? `${baseClasses} ${reverseClasses}`
      : `${baseClasses} ${defaultClasses}`;

  return (
    <div className="inline-block">
      <button className={buttonClass} onClick={onClick}>
        {content}
      </button>
    </div>
  );
}
