import React, { useState } from 'react';
import { Popper, IconButton, Paper, ClickAwayListener, Divider, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavItems from './NavItems';

const MobileNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <nav className="md:hidden">
      <IconButton aria-describedby={id} onClick={handleClick}>
        <MenuIcon />
      </IconButton>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper sx={{ marginTop: 1 }}>
            <Box
              sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              role="presentation"
            >
              <Divider sx={{ width: '100%', margin: '16px 0' }} />
              <NavItems />
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </nav>
  );
};

export default MobileNav;
