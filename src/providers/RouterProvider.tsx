import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from '@/layout/header/Header';
import Layout from '@/layout/Layout';
import Router from '@/router';
import { validPaths } from '@/router/paths';

import 'react-toastify/dist/ReactToastify.css';

export default function RouterProvider() {
  const location = useLocation();
  const shouldRenderHeader = validPaths.includes(location.pathname);

  return (
    <>
      <ToastContainer />
      {shouldRenderHeader && <Header />}
      <Layout>
        <Router />
      </Layout>
    </>
  );
}
