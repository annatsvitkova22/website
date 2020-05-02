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
import Popover from 'react-tiny-popover';

import Icons from '~/components/Icons';

const { publicRuntimeConfig } = getConfig();

const { frontUrl } = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const Share = ({ className = '', type, onShared = () => {} }) => {
  const { asPath } = useRouter();

  const [opened, setOpened] = useState(false);

  const mainItems = (
    <>
      <FacebookShareButton
        url={`${frontUrl}${asPath}`}
        onShareWindowClose={onShared}
      >
        <Icons icon={'facebook'} />
      </FacebookShareButton>
      <TelegramShareButton
        url={`${frontUrl}${asPath}`}
        onShareWindowClose={onShared}
      >
        <Icons icon={'telegram'} />
      </TelegramShareButton>
    </>
  );

  const additionalItems = (
    <>
      <EmailShareButton
        url={`${frontUrl}${asPath}`}
        onShareWindowClose={onShared}
      >
        <Icons icon={'email'} />
      </EmailShareButton>
      <TwitterShareButton
        url={`${frontUrl}${asPath}`}
        onShareWindowClose={onShared}
      >
        <Icons icon={'twitter'} />
      </TwitterShareButton>
      <ViberShareButton
        url={`${frontUrl}${asPath}`}
        onShareWindowClose={onShared}
      >
        <Icons icon={'viber'} />
      </ViberShareButton>
    </>
  );

  let content;

  switch (type) {
    case 'main-first':
      content = (
        <>
          <div className="share-actions__main">{mainItems}</div>
          <Popover
            isOpen={opened}
            content={
              <div className="share-actions__popover">{additionalItems}</div>
            }
          >
            <button
              className={classnames('share-actions__open', {
                'share-actions__open--active': opened,
              })}
              onClick={() => setOpened(!opened)}
            >
              <Icons icon={'share'} />
            </button>
          </Popover>
        </>
      );
      break;
    case 'compact':
      content = (
        <>
          <Popover
            isOpen={opened}
            content={
              <div className="share-actions__popover">
                {mainItems}
                {additionalItems}
              </div>
            }
          >
            <button
              className={classnames('share-actions__open', {
                'share-actions__open--active': opened,
              })}
              onClick={() => setOpened(!opened)}
            >
              <Icons icon={'share'} />
            </button>
          </Popover>
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
};

export default Share;
