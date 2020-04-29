import React from 'react';
import Icons from '~/components/Icons';
import * as classnames from 'classnames';
import { useStateLink } from '@hookstate/core';
import { AuthStore } from '~/stores/Auth';
import axios from 'axios';
import getConfig from 'next/config';

import { updateLikes } from '~/stores/SingleArticle';
const { publicRuntimeConfig } = getConfig();

const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const LikeButton = ({ post, className }) => {
  let type = `${post.__typename.toLowerCase()}`;
  const id = post[`${type}Id`];
  type = `${type}s`;
  if (type === 'opportunitys') {
    type = 'opportunities';
  }
  const stateLink = useStateLink(AuthStore);
  const { token } = stateLink.get();

  const {
    statisticsACF: { likes },
  } = post;

  const handleLike = async () => {
    const { apiUrl } = config;
    const conf = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const currentLikes = await axios.get(
      `${apiUrl}/wp-json/acf/v3/${type}/${id}/likes`,
      conf
    );
    const { data } = await axios.post(
      `${apiUrl}/wp-json/acf/v3/${type}/${id}/likes`,
      {
        fields: {
          likes: currentLikes.data.likes
            ? parseInt(currentLikes.data.likes) + 1
            : 1,
        },
      },
      conf
    );
    updateLikes(data.likes);
  };

  return (
    <>
      <button onClick={handleLike} className={classnames('like', className)}>
        <Icons icon={'likes'} />
      </button>
      <span>{likes ? likes : '0'}</span>
    </>
  );
};

export default LikeButton;
