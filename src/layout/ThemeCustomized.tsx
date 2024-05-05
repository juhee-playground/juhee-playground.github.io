import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import type { RootState } from '@/redux/store';
import { changePointColor } from '@/redux/modules/settings';
import { ColorResult, ChromePicker } from 'react-color';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { ColorModeContext } from '../context/ColorModeContext';

import './ThemeCustomized.scss';

const ThemeCustomized = () => {
  const [color, setColor] = useState<string>('');
  const colorMode = React.useContext(ColorModeContext);
  const { pointColor } = useAppSelector((state: RootState) => state.settings);
  const dispatch = useAppDispatch();

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.hex);
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
      <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
      <hr />
    </div>
  );
};

export default ThemeCustomized;
