import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import './ThemeCustomized.scss';

const colorList = ['purple', 'green', 'blue', 'amber', 'red', 'grey'];

const ThemeCustomized = () => {
  const [active, setActive] = useState('green');
  const clickHandler = (color: string) => {
    console.log('color clicked', color);
    setActive(color);
  };
  return (
    <div className='card__container'>
      <h2>Theme Customize</h2>
      <hr />
      <h4>THEMING</h4>
      <div>
        <FormControl>
          <h5>Theme</h5>
          <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='row-radio-buttons-group'>
            <FormControlLabel value='light' control={<Radio />} label='Light' />
            <FormControlLabel value='dark' control={<Radio />} label='Dark' />
          </RadioGroup>
        </FormControl>
      </div>
      <h5>Point Color</h5>
      <ul className='paper__list'>
        {colorList.map((color: string) => {
          return (
            <li
              key={`list__${color}`}
              className={`paper--radio ${color} ${active === color && 'active'}`}
              onClick={() => clickHandler(color)}
            ></li>
          );
        })}
      </ul>
      <hr />
    </div>
  );
};

export default ThemeCustomized;
