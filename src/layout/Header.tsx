import * as React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const DenseAppBar = () => {
  return (
    <header className='header'>
      <div className='logo-button'>
        {/* <Link to='/'> */}
        {/* <h4> 백주희의 이력서</h4> */}
        {/* </Link> */}
      </div>
    </header>
  );
};

export default DenseAppBar;
