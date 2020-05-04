import React from 'react';

import Taxonomies from '~/components/Article/Taxonomies';
import Author from '~/components/Article/Author';
import Featured from '~/components/Article/Featured';

const HeroScene = ({ publications }) => (
  <div className="container hero">
    <div className="row">
      <div className="col-7">
        {publications.nodes
          .slice(0, 1)
          .map(
            (
              { categories, title, author, featuredImage: { mediaItemUrl } },
              i
            ) => {
              return (
                <div
                  className="hero__image bg-cover"
                  key={i}
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(29, 158, 116, 0.44), rgba(29, 158, 116, 0.44)), url(${mediaItemUrl})`,
                  }}
                >
                  <Taxonomies
                    categories={categories}
                    className={`article__category`}
                  />
                  <div className="hero__caption tx-white">
                    <h1 className="heading__big">{title}</h1>
                  </div>
                  <div className="article__meta">
                    <Author className="article__author" author={author} />
                  </div>
                </div>
              );
            }
          )}
      </div>
      {/* <div className="col-5">
        {publications.nodes
          .slice(1, publications.nodes.length)
          .map(({ categories, title, slug, author, featuredImage }, i) => (
            <div key={i}>
              <Taxonomies
                categories={categories}
                className={`article__category`}
              />
              <Featured image={featuredImage} alt={title} slug={slug} />
              <div className="article__meta">
                <Author className="article__author" author={author} />
              </div>
            </div>
          ))}
      </div> */}
    </div>
  </div>
);

export default HeroScene;
