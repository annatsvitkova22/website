import React from 'react';
import * as classnames from 'classnames';

const CrowdfundingSupported = ({ className, post }) => {
  const {
    cfACF: { supported },
  } = post;
  if (!supported) return null;

  const anon = (
    <div className="crowdfunding-supported__img">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18 4.5H21L24 1.5V7.8C24 10.2853 21.9853 12.3 19.5 12.3C17.0147 12.3 15 10.2853 15 7.8V1.5L18 4.5ZM16.875 7.5C16.875 7.91421 17.2108 8.25 17.625 8.25C18.0392 8.25 18.375 7.91421 18.375 7.5C18.375 7.08579 18.0392 6.75 17.625 6.75C17.2108 6.75 16.875 7.08579 16.875 7.5ZM21.375 8.25C20.9608 8.25 20.625 7.91421 20.625 7.5C20.625 7.08579 20.9608 6.75 21.375 6.75C21.7892 6.75 22.125 7.08579 22.125 7.5C22.125 7.91421 21.7892 8.25 21.375 8.25ZM12 9.13547C12.5356 9.04435 13.0781 8.99903 13.6214 9C14.1788 11.7352 16.6027 13.8 19.5 13.8C20.007 13.7933 20.5111 13.7218 21 13.5872V23.25C21 23.6642 20.6642 24 20.25 24H18.75C18.3358 24 18 23.6642 18 23.25V16.5L12 21H13.5C14.3284 21 15 21.6716 15 22.5V23.25C15 23.6642 14.6642 24 14.25 24H6C4.34379 23.9984 3.00155 22.6562 3 21V9C3 8.17157 2.32843 7.5 1.5 7.5C0.671573 7.5 0 6.82843 0 6C0 5.17157 0.671573 4.5 1.5 4.5C3.98421 4.50258 5.99742 6.51579 6 9V12.75L6.14344 12.8217L9 14.25L7.8975 10.9425C8.5298 10.4381 9.22995 10.0251 9.97734 9.71578L12 12.75V9.13547Z"
          fill="#1D9E74"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.8751 7.5C16.8751 7.08579 17.2109 6.75 17.6251 6.75C18.0393 6.75 18.3751 7.08579 18.3751 7.5C18.3751 7.91421 18.0393 8.25 17.6251 8.25C17.2109 8.25 16.8751 7.91421 16.8751 7.5ZM20.6251 7.5C20.6251 7.08579 20.9609 6.75 21.3751 6.75C21.7893 6.75 22.1251 7.08579 22.1251 7.5C22.1251 7.91421 21.7893 8.25 21.3751 8.25C20.9609 8.25 20.6251 7.91421 20.6251 7.5ZM6.14355 12.8217L9.00012 14.25L7.89762 10.9425C7.22605 11.4818 6.63534 12.1146 6.14355 12.8217ZM12.0001 9.13547V12.75L9.97746 9.71578C10.6276 9.44653 11.3061 9.25185 12.0001 9.13547Z"
          fill="#1D9E74"
        />
      </svg>
    </div>
  );

  return (
    <ul className={classnames('crowdfunding-supported', className)}>
      {supported.map(({ name, photo, date }) => {
        return (
          <li className="crowdfunding-supported__item">
            {photo && photo.mediaItemUrl ? (
              <img
                src={photo.mediaItemUrl}
                alt={name}
                className="crowdfunding-supported__photo"
              />
            ) : (
              anon
            )}
            <div className="crowdfunding-supported__info">
              <div className="crowdfunding-supported__name">{name}</div>
              <div className="crowdfunding-supported__date">{date}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CrowdfundingSupported;
