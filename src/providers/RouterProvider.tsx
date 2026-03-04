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
  const isLandingPage = location.pathname === '/';
  const shouldRenderHeader = validPaths.includes(location.pathname) && !isLandingPage;
  const isResumePage = location.pathname === '/resume';

  useEffect(() => {
    if (isResumePage) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, [isResumePage]);

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
