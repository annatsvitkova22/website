import React from 'react';

import Icons from '../Icons';

const Contacts = (props) => {
  const { contactsData } = props;

  return (
    <ul className="sitemap__list">
      {contactsData &&
        contactsData.map((item) => {
          return (
            <>
              <li className="sitemap__list-item">Контакти</li>
              <li className="sitemap__list-item">
                <span>{item.role}</span>
                <span>{item.name}</span>
              </li>
              {item.contacts.map((contacts) => {
                return (
                  <li className="sitemap__list-item">
                    <Icons icon={contacts.type} />
                    <span>{contacts.info}</span>
                  </li>
                );
              })}
            </>
          );
        })}
    </ul>
  );
};

export default Contacts;
