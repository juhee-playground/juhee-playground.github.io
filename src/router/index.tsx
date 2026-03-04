import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import NotFound from '@/components/NotFound';
import { validPaths } from '@/router/paths';

const Dashboard = lazy(() => import('../pages/dashboard'));
const LandingPage = lazy(() => import('../pages/landing'));
const Main = lazy(() => import('../pages/resume'));
const ProjectDetailPage = lazy(() => import('../pages/projects/detail'));
const ProjectsPage = lazy(() => import('../pages/projects'));
const SitePage = lazy(() => import('../pages/site'));

const renderLoader = () => <p>Loading</p>;

export default function Router() {
  const location = useLocation();
  const isValid =
    validPaths.includes(location.pathname) ||
    location.pathname.startsWith('/projects/');

  return (
    <Suspense fallback={renderLoader()}>
      {isValid ? (
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/resume' element={<Main />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/projects/:slug' element={<ProjectDetailPage />} />
          <Route path='/site' element={<SitePage />} />
        </Routes>
      ) : (
        <NotFound />
      )}
    </Suspense>
  );
}
