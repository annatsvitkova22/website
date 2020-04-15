import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

import Navigation from '../Navigation';
import Logo from '../Logo';
import Search from '../Search';
import Icons from '../Icons';

import HeaderMenu from '~/components/Header/HeaderMenu';
import Burger from '~/components/Header/Burger';
import HeaderCategory from '~/components/Header/HeaderCategory';

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
  const [isOpen, setIsOpen] = React.useState('');

  const ref = React.useRef(null);

  const handleOpenClick = () => {
    // console.log(ref.current.classList.toggle('isOpen'));
    isOpen === 'isOpen' ? setIsOpen('') : setIsOpen('isOpen');
  };

  if (loading) return null;

  return (
    <header className={'header'}>
      <div className={'header__wrapper'}>
        <Burger handleOpenClick={handleOpenClick} className={isOpen} />
        <HeaderCategory className="navigation__list-link header__burger-category" />
        <Link href="/">
          <a>
            <Logo
              logoData={data.info.generalInfoACF.logo}
              className={'header__logo'}
            />
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
      <div className={`header__overlay ${isOpen}`} ref={ref}>
        <HeaderMenu data={data} />
      </div>
    </header>
  );
};

export default Header;
