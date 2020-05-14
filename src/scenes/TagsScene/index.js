import React from 'react';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import Featured from '~/components/Article/Featured';
import Author from '~/components/Article/Author';
import Taxonomies from '~/components/Article/Taxonomies';
import SectionHeading from '~/components/SectionHeading';
import { ArticleProvider } from '~/components/Article/Context';
import TagsLoader from '~/components/Loaders/TagsLoader';
import SectionHeadingLoader from '~/components/Loaders/SectionHeadingLoader';

const TagsScene = ({ tags, children, isLoading }) => {
  if (typeof children === 'object' && !isLoading) {
    return children;
  }

  if (isEmpty(tags) && isLoading) {
    return (
      <>
        <SectionHeadingLoader />
        <TagsLoader />
      </>
    );
  }

  const filteredTags = tags.nodes.filter(
    ({ zmTagsACF: { showOnHome } }) => showOnHome === true
  );

  return (
    <div className="container tag-sec">
      {filteredTags.map(
        ({ name, slug, publications: { nodes: publications } }, k) => (
          <div key={k} className="row">
            <div className="col-12">
              <SectionHeading
                isRow={true}
                title={`!${name}`}
                href={`/search?by=tag&q=${slug}`}
              />
            </div>
            {publications.map(
              (
                { title, slug: pubSlug, featuredImage, categories, author },
                i
              ) => {
                const colClass = i === 2 ? 'col-xl-4' : 'col-xl-2';
                return (
                  <div
                    key={i}
                    className={`${colClass} tag-sec__col d-flex flex-row-reverse flex-xl-column justify-content-between justify-content-xl-start`}
                  >
                    <ArticleProvider value="publications">
                      <Featured
                        className={'tag-sec__image'}
                        image={featuredImage}
                        alt={title}
                        slug={pubSlug}
                      />
                      <div className="tag-sec__container">
                        <div className="tag-sec__category d-none d-xl-block">
                          <Taxonomies
                            className="article__category"
                            categories={categories}
                          />
                        </div>
                        <h3
                          className={`article-title tag-sec__title font-weight-semibold tag-sec__title--${
                            i === 2 ? 'big' : 'small'
                          }`}
                        >
                          <Link href={`/`}>
                            <a>{title}</a>
                          </Link>
                        </h3>
                        <div className="article__meta">
                          <Author
                            className="article__author meta-author--grey"
                            author={author}
                          />
                        </div>
                      </div>
                    </ArticleProvider>
                  </div>
                );
              }
            )}
          </div>
        )
      )}
    </div>
  );
};

TagsScene.propTypes = {
  tags: PropTypes.object,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default TagsScene;
