import React from 'react';
import Link from 'next/link';

import Navigation from './Navigation';
import Logo from './Logo';
import Socials from './Socials';
import Search from './Search';
import '../styles/components/header.scss';

const Header = () => {
  return (
    <header className="row">
      <Link href={'/'}>
        <a href={'/'} className="col-xs-2">
          <Logo />
        </a>
      </Link>
      <Navigation />
      <Socials />
      <Search />
    </header>
  );
};

export default Header;
