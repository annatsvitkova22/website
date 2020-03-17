import React from 'react';
import Navigation from "./Navigation";
import Link from 'next/link';
import '../styles/components/header.scss';

const Header = () => {
  return (
    <header>
      <Link href={'/'}>
        <a>Logo</a>
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
