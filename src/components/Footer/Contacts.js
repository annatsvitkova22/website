import React from 'react';
import PropTypes from 'prop-types';

import Icons from '../Icons';

const Contacts = (props) => {
  const { contactsData, className = '' } = props;

  if (contactsData) {
    return (
      <ul className={`sitemap__list ${className}`}>
        <li className={'sitemap__list-item'}>Контакти</li>
        {contactsData.map((item, i) => {
          console.log(item.contacts);
          return (
            <>
              <li key={i} className={'sitemap__list-item'}>
                {item.role && <span>{item.role}</span>}
                <span>{item.name}:</span>
              </li>
              {item.contacts ? (
                item.contacts.map((contacts, k) => {
                  return (
                    <li key={k} className={'sitemap__list-item d-flex'}>
                      <Icons icon={contacts.type} />
                      {contacts.type === 'phone' && (
                        <a href={`tel: ${contacts.info}`}>{contacts.info}</a>
                      )}
                      {contacts.type === 'email' && (
                        <a href={`mailto: ${contacts.info}`}>{contacts.info}</a>
                      )}
                    </li>
                  );
                })
              ) : (
                <>
                  <li key={i + 1} className="sitemap__list-item">
                    <a href={`tel: ${item.phoneNumber}`}>{item.phoneNumber}</a>
                  </li>
                  <li key={i + 2} className="sitemap__list-item">
                    <a href={`mailto: ${item.email}`}>{item.email}</a>
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
