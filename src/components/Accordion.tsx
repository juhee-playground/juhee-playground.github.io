import React, { useState } from 'react';

import { cn } from '@/utils/classNames';

interface IAccordionProps {
  title: React.ReactNode | string; // title 타입을 React.ReactNode로 변경
  children: React.ReactNode;
}

const Accordion: React.FC<IAccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='border-none mb-[10px] overflow-hidden transition-all duration-300 ease-in-out'>
      <div className='w-full py-[10px] px-0 flex items-center text-base' onClick={handleToggle}>
        <span
          className={cn(
            'cursor-pointer transition-transform duration-300 ease-in-out mr-[10px] inline-block origin-center',
            isOpen ? 'rotate-[270deg]' : 'rotate-0',
            'hover:bg-[#f1f1f1] hover:rounded'
          )}
        >
          &#9662;
        </span>
        <span className='flex-grow'>{title}</span>
      </div>
      {isOpen && <div className='px-5 max-h-[1000px] overflow-hidden transition-[max-height] duration-300 ease-in-out'>{children}</div>}
    </div>
  );
};

export default Accordion;
