import React from 'react';
import Link from 'next/link';

import Featured from '~/components/Article/Featured';
import Author from '~/components/Article/Author';
import Taxonomies from '~/components/Article/Taxonomies';
import SectionHeading from '~/components/SectionHeading';
import { ArticleProvider } from '~/components/Article/Context';

const TagsScene = ({ tags: { nodes: tags } }) => {
  const filteredTags = tags.filter(
    ({ zmTagsACF: { showOnHome } }) => showOnHome === true
  );
  return (
    <div className="container tag-sec">
      {filteredTags.map(
        ({ name, slug, publications: { nodes: publications } }) => (
          <div className="row">
            <div className="col-12">
              <SectionHeading
                isRow={true}
                title={`!${name}`}
                href={`/search?tags=${slug}`}
              />
            </div>
            {publications.map(
              ({ title, slug, featuredImage, categories, author }, i) => {
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
                        slug={slug}
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
                          <Author className="article__author" author={author} />
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

export default TagsScene;
