import React from 'react';
import PropTypes from 'prop-types';

import Icons from '../Icons';

const Contacts = (props) => {
  const {
    contactsData,
    className = '',
    isVisible,
    handleContactsClick,
  } = props;

  if (contactsData) {
    return (
      <ul className={`footer__sitemap-list ${className}`}>
        <li className={'footer__sitemap-title'} onClick={handleContactsClick}>
          <span>Контакти</span>
          <Icons
            className={'footer__sitemap-chevron'}
            icon={'footer-chevron'}
          />
        </li>
        {isVisible && (
          <ul className={'footer__sitemap-navigation'}>
            {contactsData.map((item, i) => {
              return (
                <>
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
                            <a href={`tel: ${contacts.info}`}>
                              {contacts.info}
                            </a>
                          )}
                          {contacts.type === 'email' && (
                            <a href={`mailto: ${contacts.info}`}>
                              {contacts.info}
                            </a>
                          )}
                        </li>
                      );
                    })
                  ) : (
                    <>
                      <li key={i + 1} className="sitemap__list-item">
                        <a href={`tel: ${item.phoneNumber}`}>
                          {item.phoneNumber}
                        </a>
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
        )}
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
  className: PropTypes.sting,
  isVisible: PropTypes.bool,
  handleResClick: PropTypes.any,
};

export default Contacts;
