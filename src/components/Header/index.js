import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Navigation from '../Navigation';
import Logo from '../Logo';
import Socials from '../Socials';
import Search from '../Search';
import Icons from '~/components/Icons';

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
      <div className="container-fluid">
        <div className="row">
          <Link href={'/'}>
            <a href={'/'}>
              <Logo logoData={data.info.generalInfoACF.logo} />
            </a>
          </Link>
          <Navigation navigationData={data.menus} />
          <div>
            <Icons icon={'crest'} />
            <Icons icon={'crest-location'} />
            <Search />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
