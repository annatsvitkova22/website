import React from 'react';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import Article from '~/components/Article';
import PublCatLoader from '~/components/Loaders/PublCatLoader';

const PublicationCategoriesScene = ({ categories, children, isLoading }) => {
  if (typeof children === 'object' && !isLoading) {
    return children;
  }

  if (isEmpty(categories) && isLoading) {
    return (
      <>
        <div className="loader-container__desktop">
          <PublCatLoader />
        </div>
        <div className="loader-container__mobile">
          <PublCatLoader type={'mobile'} />
          <PublCatLoader type={'mobile'} />
          <PublCatLoader type={'mobile'} />
          <PublCatLoader type={'mobile'} />
        </div>
      </>
    );
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
            (
              { publications: { nodes }, name, slug, zmCategoryACF: { size } },
              k
            ) => {
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
                <div key={k} className={`publ-cat__col--${size} ${colSize}`}>
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
                              key={i}
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
                              key={i}
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
                            key={i}
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

PublicationCategoriesScene.propTypes = {
  categories: PropTypes.object,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default PublicationCategoriesScene;
