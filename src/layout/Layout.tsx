import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Header from './Header';
import Nav from './nav/Nav';

import './Layout.scss';

// const Main = lazy(() => import('../pages/MainForProject'));
const Main = lazy(() => import('../pages/Main'));

const renderLoader = () => <p>Loading</p>;

const Layout = () => {
  return (
    <div className='container'>
      {/* <Header /> */}
      <main className='main__container'>
        <Nav />
        <Suspense fallback={renderLoader()}>
          <Routes>
            <Route path='' element={<Main />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
