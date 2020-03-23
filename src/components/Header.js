import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Navigation from './Navigation';
import '../styles/components/header.scss';

const MAIN_MENU = gql`
  query MainMenu {
    menus(where: { location: MAIN_MENU }) {
      nodes {
        id
      }
    }
  }
`;

const Header = () => {
  const { loading, data } = useQuery(MAIN_MENU);
  const mainMenu = !loading && data.menus.nodes[0];
  return (
    <header>
      <Link href={'/'}>
        <a>Logo</a>
      </Link>
      {mainMenu && <Navigation menuId={mainMenu.id} />}
    </header>
  );
};

export default Header;
