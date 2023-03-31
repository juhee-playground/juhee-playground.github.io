import React from 'react';
// import Header from './Header';
import Nav from './Nav';

import './Layout.scss';

const Layout = () => {
  return (
    <div className='container'>
      {/* <Header /> */}
      <main className='main__container'>
        <Nav />
        <div className='section-right'>
          <section className='action'>탭 및 필터 영역</section>
          <section className='career'>회사 및 프로젝트 영역</section>
          <section className='toy'>사이드 프로젝트 영역</section>
        </div>
      </main>
    </div>
  );
};

export default Layout;
