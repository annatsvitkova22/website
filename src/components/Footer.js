import React from 'react';

import '../styles/components/footer.scss';

import Logo from './Logo';
import Socials from './Socials';
import FooterNavigator from './FooterNavigation';
import FooterContacts from './FooterContacts';
import PartnersLogo from './PartnersLogo';
import FooterResources from './FooterResourses';
import FooterCounter from './FooterCounter';

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer>
      <div className="navigation container row">
        <div className="col-xs-4">
          <Logo />
          <Socials />
        </div>
        <div className="sitemap col-xs-8 around-xs">
          <FooterNavigator />
          <FooterNavigator />
          <FooterContacts />
          <FooterResources />
        </div>
      </div>
      <div className="data container row between-xs">
        <div className="partners">
          <span>Наші партнери</span>
          <PartnersLogo />
        </div>
        <div className="counter  container col-xs-4">
          <FooterCounter />
        </div>
      </div>
      <div className="developers between-xs">
        <div className="developers__copyrights-date">
          <img src="#" alt="C" />
          <span>Copyrights {date}</span>
        </div>
        <div className="developers__copyrights-logo">
          <span>Design and development by Outright Digital</span>
          <a href="#">
            <img src="#" alt="logo" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
