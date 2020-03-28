import React from 'react';

const Contacts = (props) => {
  const { navigationData } = props;

  return (
    <ul className="sitemap__list">
      <li className="sitemap__list-item">Контакти</li>
      <li>Project Owner</li>
      <li>
        <img src="" alt="email" />
        <span>zmist@pl.ua</span>
      </li>
      <li>
        <img src="" alt="telephone" />
        <span>3804012399</span>
      </li>
    </ul>
  );
};

export default Contacts;
