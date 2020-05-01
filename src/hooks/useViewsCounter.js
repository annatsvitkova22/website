import { useEffect } from 'react';
import getConfig from 'next/config';
import { useStateLink } from '@hookstate/core';
import * as axios from 'axios';

import { AuthStore } from '~/stores/Auth';

const { publicRuntimeConfig } = getConfig();

const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const useViewsCounter = (post) => {
  const authStateLink = useStateLink(AuthStore);

  useEffect(() => {
    if (post) {
      let type = `${post.__typename.toLowerCase()}`;
      const id = post[`${type}Id`];
      type = `${type}s`;
      if (type === 'opportunitys') {
        type = 'opportunities';
      }

      const updateViews = async () => {
        const { token } = authStateLink.get();

        const { apiUrl } = config;
        const conf = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const currentViews = await axios.get(
          `${apiUrl}/wp-json/acf/v3/${type}/${id}/views`,
          conf
        );
        await axios.post(
          `${apiUrl}/wp-json/acf/v3/${type}/${id}/views`,
          {
            fields: {
              views: currentViews.data.views
                ? parseInt(currentViews.data.views) + 1
                : 1,
            },
          },
          conf
        );
      };

      setTimeout(updateViews, 10000);
    }
  }, [post]);
};

export default useViewsCounter;
