import React from 'react';
import Link from 'next/link';
import { isEmpty } from 'lodash';

import Article from '~/components/Article';

const PublicationCategoriesScene = ({ categories, children, loading }) => {
  if (typeof children === 'object' && !loading) {
    return children;
  }

  if (isEmpty(categories) && loading) {
    return <div className="text-center">loading...</div>;
  }

  const filteredCategories = categories.nodes.filter(
    ({ zmCategoryACF: { showOnPublications } }) => showOnPublications === true
  );

  const sortedCategories = filteredCategories.sort(
    (categoryA, categoryB) =>
      categoryA.zmCategoryACF.order - categoryB.zmCategoryACF.order
  );

  return (
    <div className="container">
      <div className="row">
        {sortedCategories
          .slice(0, 4)
          .map(
            ({
              publications: { nodes },
              name,
              slug,
              zmCategoryACF: { size },
            }) => {
              let colSize = '';
              switch (size) {
                case 'medium':
                  colSize = 'col-xl-3';
                  break;
                case 'big':
                  colSize = 'col-xl-4';
                  break;
                case 'small':
                  colSize = 'col-xl-2';
                  break;

                default:
                  break;
              }

              return (
                <div className={`publ-cat__col--${size} ${colSize}`}>
                  <h6 className="publ-page__title text-uppercase">
                    <Link href={`/search?category=${slug}`}>
                      <a>{name}</a>
                    </Link>
                  </h6>
                  <div className="publ-cats__container">
                    {size === 'big' && nodes.length && (
                      <>
                        <div className="row main-cat__row main-cat__row--primary">
                          {nodes.slice(0, 1).map((post, i) => (
                            <Article
                              isFirst={true}
                              size={size}
                              type="publications-cats"
                              post={post}
                              key={post.id}
                            />
                          ))}
                        </div>
                        <div className="row main-cat__row main-cat__row--sub">
                          {nodes.slice(1, nodes.length).map((post, i) => (
                            <Article
                              isFirst={false}
                              index={i}
                              size={size}
                              type="publications-cats"
                              post={post}
                              key={post.id}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {!(size === 'big') && nodes.length !== 1 && (
                      <div className="row">
                        {nodes.map((post, i) => (
                          <Article
                            index={i}
                            size={size}
                            type="publications-cats"
                            post={post}
                            key={post.id + i}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default PublicationCategoriesScene;
