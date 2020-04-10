import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Navigation from '../Navigation';
import Logo from '../Logo';
import Search from '../Search';
import Icons from '../Icons';

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
    <header className={'header'}>
      <div className={'header__wrapper'}>
        <Link href={'/'}>
          <a href={'/'} className={'header__logo'}>
            <div className={'header__logo-image'}>
              <Logo logoData={data.info.generalInfoACF.logo} />
            </div>
          </a>
        </Link>
        <Navigation navigationData={data.menus} />
        <div className={'header__icons'}>
          <a href={'#'} className={'header__icons-item'}>
            <Icons icon={'crest'} />
          </a>
          <a href={'#'} className={'header__icons-item'}>
            <Icons icon={'crest-location'} />
          </a>
        </div>
        <div className={'header__search'}>
          <Search color={'white'} className={'header__search-link'} />
        </div>
      </div>
    </header>
  );
};

export default Header;
