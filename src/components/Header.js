import React from 'react';
import Link from 'next/link';

import Navigation from './Navigation';
import '../styles/components/header.scss';
import Logo from './Logo';

const Header = () => {
  return (
    <header>
      <Link href={'/'}>
        <a href={'/'}>
          <Logo />
        </a>
      </Link>
      <Navigation />
    </header>
  );
};

export default Header;
