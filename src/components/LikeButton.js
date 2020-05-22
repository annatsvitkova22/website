import React, { useState, useEffect } from 'react';
import * as classnames from 'classnames';
import { useStateLink } from '@hookstate/core';
import axios from 'axios';
import getConfig from 'next/config';

import { AuthStore } from '~/stores/Auth';
import Icons from '~/components/Icons';
import { updateLikes } from '~/stores/SingleArticle';

const { publicRuntimeConfig } = getConfig();

const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const LikeButton = ({ post, className, showNumber = true }) => {
  const [liked, setLiked] = useState(false);
  const likeCls = classnames({
    like: true,
    liked: liked,
  });
  const countCls = classnames({
    'like-count': true,
    liked: liked,
  });
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
    setLiked(true);
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
            ? parseInt(currentLikes.data.likes, 10) + 1
            : 1,
        },
      },
      conf
    );
    updateLikes(data.likes);

    setTimeout(() => setLiked(false), 600);
  };

  return (
    <>
      <button
        onClick={handleLike}
        className={`${likeCls} ${classnames(className)}`}
      >
        <Icons icon={'likes'} />
      </button>
      {showNumber && <span className={`${countCls}`}>{likes || '0'}</span>}
    </>
  );
};

export default LikeButton;
