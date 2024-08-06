import React, { useState } from 'react';
import './Accordion.scss';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='accordion'>
      <div className='accordion-header'>
        <span className={`arrow ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
          &#9662;
        </span>
        <span className='title'>{title}</span>
      </div>
      {isOpen && <div className='accordion-content open'>{children}</div>}
    </div>
  );
};

export default Accordion;
