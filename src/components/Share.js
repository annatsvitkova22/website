import React from 'react';

import SharePopUp from '~/components/SharePopUp';

const Share = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const changeVisibility = () => {
    setIsVisible(() => {
      return !isVisible;
    });
  };

  return (
    <div className={'share'}>
      <button onClick={changeVisibility} className={'share-button'}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.3"
            d="M13.5 6.37878V12.7538C6.23063 12.8588 3.09703 14.663 5.22234 21.4608C5.45672 22.215 4.54641 22.7996 3.90609 22.3341C1.85531 20.8425 0 17.9897 0 15.1097C0 7.97394 5.97047 6.46503 13.5 6.37878Z"
            fill="#242424"
          />
          <path
            d="M23.7263 10.4859C23.6905 10.5273 23.6518 10.566 23.6105 10.6017L15.3605 17.7267C14.6391 18.3497 13.5 17.8458 13.5 16.875V2.62501C13.5 1.65657 14.6381 1.15032 15.3605 1.77376L23.6105 8.89876C23.8364 9.09384 23.9755 9.37069 23.9972 9.66837C24.0189 9.96605 23.9214 10.2602 23.7263 10.4859V10.4859Z"
            fill="#242424"
          />
        </svg>
      </button>
      <SharePopUp isVisible={isVisible} />
      <span className={'like'}>!</span>
    </div>
  );
};

export default Share;
