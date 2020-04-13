import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Navigation from '../Navigation';
import Logo from '../Logo';
import Search from '../Search';
import Icons from '../Icons';

import NavLink from '~/components/SiteLink';
import HeaderMenu from '~/components/Header/HeaderMenu';

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

  const [isMobile, setIsMobile] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 1300);
  }, []);

  if (loading) return null;

  return (
    <header className={'header'}>
      <div className={'header__wrapper'}>
        {isMobile ? (
          <>
            <button onClick={handleOpenMenu} className={'header__button'}>
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.8333 2.49984H1.16663C0.890501 2.49984 0.666626 2.27596 0.666626 1.99984V0.666504C0.666626 0.390379 0.890501 0.166504 1.16663 0.166504H18.8333C19.1094 0.166504 19.3333 0.390379 19.3333 0.666504V1.99984C19.3333 2.27596 19.1094 2.49984 18.8333 2.49984ZM18.8333 9.1665H1.16663C0.890501 9.1665 0.666626 8.94263 0.666626 8.6665V7.33317C0.666626 7.05704 0.890501 6.83317 1.16663 6.83317H18.8333C19.1094 6.83317 19.3333 7.05704 19.3333 7.33317V8.6665C19.3333 8.94263 19.1094 9.1665 18.8333 9.1665ZM18.8333 15.8332H1.16663C0.890501 15.8332 0.666626 15.6093 0.666626 15.3332V13.9998C0.666626 13.7237 0.890501 13.4998 1.16663 13.4998H18.8333C19.1094 13.4998 19.3333 13.7237 19.3333 13.9998V15.3332C19.3333 15.6093 19.1094 15.8332 18.8333 15.8332Z"
                  fill="white"
                />
              </svg>
            </button>
            <NavLink href={'/'}>
              <Logo
                logoData={data.info.generalInfoACF.logo}
                className={'header__logo'}
              />
            </NavLink>
            <div className={'header__search'}>
              <Search color={'white'} className={'header__search-link'} />
            </div>
            <HeaderMenu data={data} isOpen={isOpen} />
          </>
        ) : (
          <>
            <NavLink href={'/'}>
              <Logo
                logoData={data.info.generalInfoACF.logo}
                className={'header__logo'}
              />
            </NavLink>
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
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
