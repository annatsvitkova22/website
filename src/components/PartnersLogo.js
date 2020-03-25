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

const PartnersLogo = () => {
  const { loading, data } = useQuery(LOGO_QUERY);
  if (loading) return null;
  return (
    <div className="partners__logo">
      <a href="#">
        <img src="" alt="Logo" />
      </a>
      <a href="#">
        <img src="" alt="Logo" />
      </a>
    </div>
  );
};

export default PartnersLogo;
