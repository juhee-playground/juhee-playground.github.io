import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from '@/layout/header/Header';
import Layout from '@/layout/Layout';
import Router from '@/router';
import { validPaths } from '@/router/paths';

import 'react-toastify/dist/ReactToastify.css';

export default function RouterProvider() {
  const location = useLocation();
  const { pathname } = location;

  const isLandingPage = pathname === '/';
  const isProjectsPath = pathname === '/projects' || pathname.startsWith('/projects/');
  const shouldRenderHeader =
    (validPaths.includes(pathname) || isProjectsPath) && !isLandingPage;
  const isScrollablePage =
    ['/resume', '/portfolio', '/projects', '/dashboard'].includes(pathname) || isProjectsPath;

  useEffect(() => {
    document.body.style.overflow = isScrollablePage ? 'auto' : 'hidden';
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, [isScrollablePage]);

  return (
    <>
      <ToastContainer />
      {isLandingPage ? (
        <Router />
      ) : (
        <Layout>
          {shouldRenderHeader && <Header />}
          <Router />
        </Layout>
      )}
    </>
  );
}
