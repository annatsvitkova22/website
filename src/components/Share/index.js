import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
} from 'react-share';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import * as classnames from 'classnames';

import Icons from '~/components/Icons';
import ShareModal from '~/components/Share/Modal';

const { publicRuntimeConfig } = getConfig();

const { frontUrl } = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const Share = ({
  className = '',
  type,
  onShared = () => {},
  color = 'black',
  location,
}) => {
  const { asPath } = useRouter();

  const [opened, setOpened] = useState(false);

  const mainItems = (
    <>
      <FacebookShareButton
        url={location || `${frontUrl}${asPath}`}
        onShareWindowClose={onShared}
      >
        <Icons color={color} icon={'facebook'} />
      </FacebookShareButton>
      <TelegramShareButton
        url={location || `${frontUrl}${asPath}`}
        onShareWindowClose={onShared}
      >
        <Icons color={color} icon={'telegram'} />
      </TelegramShareButton>
    </>
  );

  const additionalItems = (
    <>
      <EmailShareButton
        url={location || `${frontUrl}${asPath}`}
        onShareWindowClose={onShared}
      >
        <Icons color={color} icon={'email'} />
      </EmailShareButton>
      <TwitterShareButton
        url={location || `${frontUrl}${asPath}`}
        onShareWindowClose={onShared}
      >
        <Icons color={color} icon={'twitter'} />
      </TwitterShareButton>
      <ViberShareButton
        url={location || `${frontUrl}${asPath}`}
        onShareWindowClose={onShared}
      >
        <Icons color={color} icon={'viber'} />
      </ViberShareButton>
    </>
  );

  let content;

  switch (type) {
    case 'main-first':
      content = (
        <>
          {opened && (
            <ShareModal
              onClose={() => {
                setOpened(false);
                document.querySelector('body').classList.remove('isB-MenuOpen');
              }}
            />
          )}
          <div className="share-actions__main">{mainItems}</div>
          <button
            className={classnames('share-actions__open', {
              'share-actions__open--active': opened,
            })}
            onClick={() => {
              document.querySelector('body').classList.add('isB-MenuOpen');
              setOpened(true);
            }}
          >
            <Icons color={color} icon={'share'} />
          </button>
        </>
      );
      break;
    case 'compact':
      content = (
        <>
          {opened && (
            <ShareModal
              onClose={() => {
                setOpened(false);
                document.querySelector('body').classList.remove('isB-MenuOpen');
              }}
            />
          )}
          <button
            className={classnames('share-actions__open', {
              'share-actions__open--active': opened,
            })}
            onClick={() => {
              document.querySelector('body').classList.add('isB-MenuOpen');
              setOpened(true);
            }}
          >
            <Icons color={color} icon={'share'} />
          </button>
        </>
      );
      break;
    default:
      content = (
        <>
          <div className="share-actions__main">
            {mainItems}
            {additionalItems}
          </div>
        </>
      );
      break;
  }

  return (
    <div className={classnames('share-actions', className)}>{content}</div>
  );
};

Share.propTypes = {
  className: PropTypes.string,
  type: PropTypes.any,
  onShared: PropTypes.func,
  color: PropTypes.string,
};

export default Share;
