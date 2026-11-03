import { ReactNode } from 'react';

import { useSettings } from '@/stores/useSettings';

interface ISecretTextProps {
  value: string | undefined;
}

const MASK = '••••••••';

export const SecretText = ({ value }: ISecretTextProps) => {
  const isContactVisible = useSettings(state => state.isContactVisible);

  if (!value) return null;
  if (isContactVisible) return <span>{value}</span>;

  return (
    <>
      <span className='inline-block select-none blur-[6px] print:hidden' aria-hidden='true'>
        {value}
      </span>
      <span className='hidden print:inline'>{MASK}</span>
    </>
  );
};

interface IContactRevealButtonProps {
  children: ReactNode;
}

export const ContactRevealButton = ({ children }: IContactRevealButtonProps) => {
  const toggleContactVisible = useSettings(state => state.toggleContactVisible);

  return (
    <button
      type='button'
      tabIndex={-1}
      aria-hidden='true'
      className='m-0 cursor-default appearance-none border-0 bg-transparent p-0 font-[inherit] text-inherit'
      onClick={toggleContactVisible}
    >
      {children}
    </button>
  );
};
