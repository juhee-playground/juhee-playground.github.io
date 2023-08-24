import React from 'react';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import type { RootState } from 'redux/store';
import { changePointColor } from 'redux/modules/settings';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { ColorModeContext } from 'context/ColorModeContext';

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
  const colorMode = React.useContext(ColorModeContext);
  const { pointColor } = useAppSelector((state: RootState) => state.settings);
  const dispatch = useAppDispatch();
  const clickHandler = (color: ColorType) => {
    handlePointColor(color.hex);
  };
  const handlePointColor = (color: string) => {
    dispatch(changePointColor(color));
  };

  const changeHandler = () => {
    colorMode.toggleColorMode();
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
            <FormControlLabel value='light' control={<Radio style={{ color: pointColor }} />} label='Light' />
            <FormControlLabel value='dark' control={<Radio style={{ color: pointColor }} />} label='Dark' />
          </RadioGroup>
        </FormControl>
      </div>
      <h5>Point Color</h5>
      <ul className='paper__list'>
        {colorList.map((color: ColorType) => {
          return (
            <li
              key={`list__${color.text}`}
              className={`paper--radio ${pointColor === color.hex && 'active'}`}
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
