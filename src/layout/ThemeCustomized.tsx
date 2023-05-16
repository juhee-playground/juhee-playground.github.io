import * as React from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import './ThemeCustomized.scss';

const ThemeCustomized = () => {
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
      <div className='paper__list'>
        <div className='paper--radio purple'></div>
        <div className='paper--radio'></div>
        <div className='paper--radio green'></div>
        <div className='paper--radio blue'></div>
        <div className='paper--radio amber'></div>
        <div className='paper--radio red'></div>
      </div>
      <hr />
    </div>
  );
};

export default ThemeCustomized;
