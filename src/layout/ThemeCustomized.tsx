import React from 'react';
import { ColorPicker, useColor, type IColor } from 'react-color-palette';

import { PaletteMode } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { useSettings } from '@/stores/useSettings';

import 'react-color-palette/css';
import './ThemeCustomized.scss';

const ThemeCustomized = () => {
  const [color, setColor] = useColor('#5467f5');
  const { themeMode, pointColor, setThemeMode, setPointColor } = useSettings();

  const handleChangeComplete = (selectedColor: IColor) => {
    setColor(selectedColor);
    setPointColor(selectedColor); // Zustand 기반으로 포인트 색상 업데이트
  };

  const handleThemeChange = (_event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setThemeMode(value as PaletteMode);
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
            aria-labelledby='theme-radio-buttons'
            name='theme-mode'
            value={themeMode}
            onChange={handleThemeChange}
          >
            <FormControlLabel value='light' control={<Radio style={{ color: pointColor.hex }} />} label='Light' />
            <FormControlLabel value='dark' control={<Radio style={{ color: pointColor.hex }} />} label='Dark' />
          </RadioGroup>
        </FormControl>
      </div>

      <h5>Point Color</h5>
      <ColorPicker color={color} onChange={handleChangeComplete} />
      <hr />
    </div>
  );
};

export default ThemeCustomized;
