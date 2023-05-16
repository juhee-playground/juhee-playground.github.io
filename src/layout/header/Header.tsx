import * as React from 'react';

import './Header.scss';
import MenuPopupState from './MenuPopupState';

const DenseAppBar = () => {
  return (
    <header className='header'>
      <div className='setting__box'>{/* <MenuPopupState /> */}</div>
      {/* <div className='logo-button'>
        <Link to='/'>
        <h4> 백주희의 이력서</h4>
        </Link>
      </div> */}
    </header>
  );
};

export default DenseAppBar;
