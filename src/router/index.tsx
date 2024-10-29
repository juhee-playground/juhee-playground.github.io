import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import NotFound from '@/components/NotFound';
import UnderConstruction from '@/pages/resume/UnderConstruction';

const Main = lazy(() => import('../pages/resume'));
const Dashboard = lazy(() => import('../pages/dashboard'));

const renderLoader = () => <p>Loading</p>;

export default function Router() {
  const location = useLocation();
  const validPaths = ['/', '/dashboard', '/portfolio'];

  return (
    <Suspense fallback={renderLoader()}>
      {validPaths.includes(location.pathname) ? (
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/portfolio' element={<UnderConstruction />} />
        </Routes>
      ) : (
        <NotFound />
      )}
    </Suspense>
  );
}
