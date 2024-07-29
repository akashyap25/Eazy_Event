import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assets/logo.png';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import NavItems from './NavItems';
import MobileNav from './MobileNav';

// Custom styled button
const LoginButton = styled(Button)({
  backgroundColor: '#705CF7',
  '&:hover': {
    backgroundColor: '#5c49D9',
  },
  borderRadius: '9999px', // Full rounded corners
  color: 'white', // Text color
  padding: '6px 16px', // Padding for the button
});

function Navbar() {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <a href="/" className="w-36">
          <img src={logo} width={35} height={20} alt="EZEvent logo" />
        </a>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <LoginButton size="large" variant="contained">
              <Link to="/sign-in" style={{ color: 'white', textDecoration: 'none' }}>
                Login
              </Link>
            </LoginButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
