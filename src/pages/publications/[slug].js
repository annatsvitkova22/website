import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';

const PUBLICATION = gql`
  query Publication($slug: String!) {
    publicationBy(slug: $slug) {
      title
      content
    }
  }
`;

const Publication = (props) => {
  const { publication } = props;
  return (
    <div className="single-news">
      <Head>
        <title>{publication.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{publication.title}</h1>

        <div className="description">{publication.content}</div>
      </main>
    </div>
  );
};

Publication.propTypes = {
  publication: PropTypes.object,
};

Publication.getInitialProps = async ({ query: { slug } }) => {


  const { data } = await apolloClient.query({
    query: PUBLICATION,
    variables: { slug },
  });

  return {
    publication: data.publicationBy,
  };
};

export default Publication;
