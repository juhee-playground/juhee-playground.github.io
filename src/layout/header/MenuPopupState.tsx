import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const MenuPopupState = () => {
  return (
    <PopupState variant='popper' popupId='demo-popup-menu'>
      {(popupState) => (
        <React.Fragment>
          <Button variant='contained' {...bindTrigger(popupState)}>
            <IconButton aria-label='setting'>
              <SettingsIcon />
            </IconButton>
          </Button>

          <Menu
            className='aaaa'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            {...bindMenu(popupState)}
          >
            <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My account</MenuItem>
            <MenuItem onClick={popupState.close}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default MenuPopupState;
