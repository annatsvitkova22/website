import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Navigation from '../Navigation';
import Logo from '../Logo';
import Socials from '../Socials';
import Search from '../Search';

const HEADER_QUERY = gql`
  query HeaderQuery {
    info {
      generalInfoACF {
        logo {
          mediaItemUrl
          title
        }
        socials {
          url
          name
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
    <header>
      <div className="container">
        <div className="row justify-content-between">
          <Link href={'/'}>
            <a href={'/'} className="col-2">
              <Logo logoData={data.info.generalInfoACF.logo} />
            </a>
          </Link>
          <Navigation navigationData={data.menus} />
          <Socials
            socialsData={data.info.generalInfoACF.socials}
            color={'red'}
          />
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
