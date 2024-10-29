import { ReactNode } from 'react';

import { useAppSelector } from '@/redux/hooks';
import type { TRootState } from '@/redux/store';

import './Layout.scss';
import './FixButton.scss';

interface IMainLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: IMainLayoutProps) {
  const { isPrintMode } = useAppSelector((state: TRootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  return (
    <main className='container'>
      <div className={isPrintMode ? `main__container main__container--${mode}` : 'main__container'}>{children}</div>
    </main>
  );
}
