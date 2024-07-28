import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import logo from "../../assets/logo.png";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import NavItems from './NavItems';
import MobileNav from './MobileNav';


function Navbar() {
 

  return (
    <header className="w-full border-b">
    <div className="wrapper flex items-center justify-between">
      <a href="/" className="w-36">
        <img
          src={logo} width={35} height={20}
          alt="EZEvent logo" 
        />
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
          <Button  className="rounded-full" size="lg">
            <Link to="/sign-in">
              Login
            </Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  </header>
  );
}

export default Navbar;
