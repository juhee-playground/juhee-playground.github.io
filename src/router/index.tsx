import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import UnderConstruction from '@/pages/resume/UnderConstruction';

const Main = lazy(() => import('../pages/resume'));
const Dashboard = lazy(() => import('../pages/dashboard'));

const renderLoader = () => <p>Loading</p>;

export default function Router() {
  return (
    <Suspense fallback={renderLoader()}>
      <Routes>
        <Route path='' element={<Main />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='portfolio' element={<UnderConstruction />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Suspense>
  );
}
