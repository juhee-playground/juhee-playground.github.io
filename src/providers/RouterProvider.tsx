import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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

  const isGameMode = (location.state as { gameMode?: boolean } | null)?.gameMode === true;

  return (
    <>
      <ToastContainer />
      <AnimatePresence mode="wait">
        {isLandingPage || isGameMode ? (
          <Router key={location.pathname} />
        ) : (
          <Layout key={location.pathname}>
            {shouldRenderHeader && <Header />}
            <Router />
          </Layout>
        )}
      </AnimatePresence>
    </>
  );
}
