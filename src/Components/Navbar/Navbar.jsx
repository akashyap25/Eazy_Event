import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assets/logo.png';
import { useAuth } from '../../contexts/AuthContext';
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
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <a href="/" className="w-36">
          <img src={logo} width={35} height={20} alt="EZEvent logo" />
        </a>

        {isAuthenticated && (
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        )}

        <div className="flex w-32 justify-end gap-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {user?.firstName} {user?.lastName}
                </span>
                <Button 
                  size="small" 
                  variant="outlined" 
                  onClick={logout}
                  sx={{ color: '#705CF7', borderColor: '#705CF7' }}
                >
                  Logout
                </Button>
              </div>
              <MobileNav />
            </>
          ) : (
            <LoginButton size="large" variant="contained">
              <Link to="/sign-in" style={{ color: 'white', textDecoration: 'none' }}>
                Login
              </Link>
            </LoginButton>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
