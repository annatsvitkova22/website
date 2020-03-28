import React from 'react';
import Link from 'next/link';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Navigation from './Navigation';
import Logo from './Logo';
import Socials from './Socials';
import Search from './Search';

import '../styles/components/header.scss';

const HEADER_QUERY = gql`
  query MyQuery {
    info {
      generalInfoACF {
        logo {
          mediaItemUrl
          title
        }
      }
    }
    menus {
      nodes {
        id
        menuItems {
          nodes {
            id
            label
            url
          }
        }
      }
    }
  }
`;

const Header = () => {
  const { loading, data } = useQuery(HEADER_QUERY);

  if (loading) return null;

  return (
    <header className="row">
      <Link href={'/'}>
        <a href={'/'} className="col-xs-2">
          <Logo logoData={data.info.generalInfoACF.logo} />
        </a>
      </Link>
      <Navigation navigationData={data.menus} />
      <Socials />
      <Search />
    </header>
  );
};

export default Header;
