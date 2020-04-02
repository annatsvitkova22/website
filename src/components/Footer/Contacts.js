import React from 'react';
import PropTypes from 'prop-types';

import Icons from '../Icons';

const Contacts = (props) => {
  const { contactsData } = props;

  if (contactsData) {
    return (
      <ul className="sitemap__list">
        <li className="sitemap__list-item">Контакти</li>
        {contactsData.map((item, i) => {
          return (
            <>
              <li key={i} className="sitemap__list-item">
                {item.role && <span>{item.role}</span>}
                <span>{item.name}</span>
              </li>
              {item.contacts ? (
                item.contacts.map((contacts, k) => {
                  return (
                    <li key={k} className="sitemap__list-item">
                      <Icons icon={contacts.type} />
                      <span>{contacts.info}</span>
                    </li>
                  );
                })
              ) : (
                <>
                  <li key={i + 1} className="sitemap__list-item">
                    <span>{item.phoneNumber}</span>
                  </li>
                  <li key={i + 2} className="sitemap__list-item">
                    <span>{item.email}</span>
                  </li>
                </>
              )}
            </>
          );
        })}
      </ul>
    );
  }

  return '';
};

Contacts.propTypes = {
  contactsData: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      role: PropTypes.string,
    })
  ),
};

export default Contacts;
