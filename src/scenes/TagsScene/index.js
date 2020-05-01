import React from 'react';
import Link from 'next/link';

import Featured from '~/components/Article/Featured';
import Author from '~/components/Article/Author';
import Taxonomies from '~/components/Article/Taxonomies';

const TagsScene = ({ tags: { nodes: tags } }) => {
  const filteredTags = tags.filter(
    ({ zmTagsACF: { showOnHome } }) => showOnHome === true
  );
  return (
    <div className="container tag-sec">
      <div className="row">
        {filteredTags.map(({ publications: { nodes: publications } }) => (
          <>
            {publications.map(
              ({ title, slug, featuredImage, categories, author }, i) => {
                const colClass =
                  i === 2 ? 'col-xl-4 col-sm-6' : 'col-xl-2 col-sm-6';
                return (
                  <div key={i} className={`${colClass} tag-sec__col`}>
                    <Featured
                      className={'tag-sec__image'}
                      image={featuredImage}
                      alt={title}
                      slug={slug}
                    />
                    <div className="tag-sec__category d-none d-sm-block">
                      <Taxonomies
                        className="article__category"
                        categories={categories}
                      />
                    </div>
                    <h3
                      className={`tag-sec__title font-weight-semibold tag-sec__title--${
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
                );
              }
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default TagsScene;
