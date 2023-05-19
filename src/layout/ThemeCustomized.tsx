import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { ColorModeContext } from 'context/ColorModeContext';
import { useDispatch } from 'react-redux';
import { changePointColor } from 'redux/actions2';

import './ThemeCustomized.scss';
interface ColorType {
  text: string;
  hex: string;
}

const colorList = [
  { text: 'purple', hex: '#8958F4' },
  { text: 'green', hex: '#009688' },
  { text: 'blue', hex: '#52AEF8' },
  { text: 'amber', hex: '#F4B73F' },
  { text: 'red', hex: '#EC5A58' },
  { text: 'grey', hex: '#8B8D92' },
];

const ThemeCustomized = () => {
  const [active, setActive] = useState('green');
  const colorMode = React.useContext(ColorModeContext);
  const dispatch = useDispatch();
  const handleColorChange = (color: string) => {
    dispatch(changePointColor(color));
  };

  const clickHandler = (color: ColorType) => {
    setActive(color.text);
    handleColorChange(color.hex);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('change', event.target.value);
    const mode = event.target.value as ModeType;
    colorMode.toggleColorMode(mode);
  };

  return (
    <div className='card__container'>
      <h2>Theme Customize</h2>
      <hr />
      <h4>THEMING</h4>
      <div>
        <FormControl>
          <h5>Theme</h5>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            defaultValue='light'
            name='row-radio-buttons-group'
            onChange={changeHandler}
          >
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
              className={`paper--radio ${active === color.text && 'active'}`}
              onClick={() => clickHandler(color)}
              style={{ backgroundColor: color.hex }}
            ></li>
          );
        })}
      </ul>
      <hr />
    </div>
  );
};

export default ThemeCustomized;
