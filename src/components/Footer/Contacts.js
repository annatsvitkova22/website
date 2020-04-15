import React from 'react';
import PropTypes from 'prop-types';

import Icons from '../Icons';

const Contacts = (props) => {
  const { contactsData, className = '' } = props;

  if (contactsData) {
    return (
      <ul className={`footer__sitemap-list ${className}`}>
        <li className={'footer__sitemap-link'}>Контакти</li>
        {contactsData.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <li key={i} className={'footer__sitemap-link'}>
                {item.role && <span>{item.role}:</span>}
                <span>{item.name}</span>
              </li>
              {item.contacts ? (
                item.contacts.map((contacts, k) => {
                  return (
                    <li key={k} className={'footer__sitemap-link d-flex'}>
                      <Icons
                        icon={contacts.type}
                        className={'footer__sitemap-icons'}
                        color={'white'}
                      />
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
                <React.Fragment>
                  <li className="sitemap__list-item">
                    <a href={`tel: ${item.phoneNumber}`}>{item.phoneNumber}</a>
                  </li>
                  <li className="sitemap__list-item">
                    <a href={`mailto: ${item.email}`}>{item.email}</a>
                  </li>
                </React.Fragment>
              )}
            </React.Fragment>
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
