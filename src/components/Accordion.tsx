import React, { useState } from 'react';
import './Accordion.scss';

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
    <div className='accordion'>
      <div className='accordion-header' onClick={handleToggle}>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9662;</span>
        <span className='title'>{title}</span>
      </div>
      {isOpen && <div className='accordion-content open'>{children}</div>}
    </div>
  );
};

export default Accordion;
