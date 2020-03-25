import React from 'react';
import Link from 'next/link';

import Navigation from './Navigation';
import Logo from './Logo';
import '../styles/components/header.scss';

const Header = () => {
  return (
    <header className="row">
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
