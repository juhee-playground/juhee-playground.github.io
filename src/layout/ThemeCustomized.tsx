import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'redux/store';
import { changePointColor } from 'redux/actions2';

import './ThemeCustomized.scss';
interface ColorType {
  text: string;
  hex: string;
}

const colorList = [
  { text: 'purple', hex: '#8958F4' },
  { text: 'green', hex: '#76C73B' },
  { text: 'blue', hex: '#52AEF8' },
  { text: 'amber', hex: '#F4B73F' },
  { text: 'red', hex: '#EC5A58' },
  { text: 'grey', hex: '#8B8D92' },
];

const ThemeCustomized = () => {
  const dispatch = useDispatch();
  const { pointColor } = useSelector((state: RootState) => state.pointColor);
  const handleColorChange = (color: string) => {
    dispatch(changePointColor(color));
  };

  const [active, setActive] = useState('green');
  const clickHandler = (color: ColorType) => {
    setActive(color.text);
    handleColorChange(color.hex);
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
        {colorList.map((color: ColorType) => {
          return (
            <li
              key={`list__${color.text}`}
              className={`paper--radio ${color.text} ${active === color.text && 'active'}`}
              onClick={() => clickHandler(color)}
            ></li>
          );
        })}
      </ul>
      <hr />

      <div>
        change point color
        <div style={{ backgroundColor: pointColor, width: '100px', height: '100px' }}></div>
      </div>
    </div>
  );
};

export default ThemeCustomized;
