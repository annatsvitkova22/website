import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Navigation from './Navigation';
import '../styles/components/header.scss';

const ALL_MENUS = gql`
  query AllMenus {
    menus {
      nodes {
        name
        id
      }
    }
  }
`;

const Header = () => {
  const { loading, data } = useQuery(ALL_MENUS);
  const headerMenu =
    !loading && data.menus.nodes.find((item) => item.name === 'Header');
  return (
    <header>
      <Link href={'/'}>
        <a>Logo</a>
      </Link>
      {headerMenu && <Navigation menuId={headerMenu.id} />}
    </header>
  );
};

export default Header;
