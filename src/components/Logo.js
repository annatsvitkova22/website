import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const LOGO_QUERY = gql`
  query MyQuery {
    info {
      generalInfoACF {
        logo {
          mediaItemUrl
        }
      }
    }
  }
`;

const Logo = () => {
  const { loading, data } = useQuery(LOGO_QUERY);
  if (loading) return null;
  return <img src={data.info.generalInfoACF.logo.mediaItemUrl} alt="" />;
};

export default Logo;
