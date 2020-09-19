// import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Taxonomies from '~/components/Article/Taxonomies';
import Featured from '~/components/Article/Featured';
import { ArticleProvider } from '~/components/Article/Context';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';
import HeroPublication from '~/components/HeroPublication';
import ArticleDateTime from '~/components/Article/DateTime';

const HeroScene = ({ info, posts, publications, heroEvents }) => {
  // const heroPubRef = useRef(null);
  // const heroListRef = useRef(null);

  // const onScroll = () => {
  //   const listHeight = heroListRef.current.clientHeight;
  //   const heroListPart =
  //     -(
  //       heroListRef.current.getBoundingClientRect().top /
  //       (listHeight - window.innerHeight)
  //     ) * 100;

  //   if (heroListPart > 0 && heroListPart < 100) {
  //     heroPubRef.current.scrollTop =
  //       (heroListPart *
  //         (heroPubRef.current.scrollHeight - window.innerHeight)) /
  //       100;
  //   }

  //   if (heroListPart < 0) {
  //     heroPubRef.current.scrollTop = 0;
  //   }

  //   if (heroListPart > 100) {
  //     heroPubRef.current.scrollTop = heroListRef.current.clientHeight;
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', onScroll);
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // }, []);

  return (
    <div className="container container--full-hd hero">
      <div className="row">
        <div className="col-xl-7">
          <HeroPublication {...info.generalInfoACF.mainPublication} />
          <div className="row hero__selected-publications">
            {info.generalInfoACF.selectedPublications.map(
              ({ categories, title, slug, author, featuredImage }, i) => (
                <div key={i} className="hero-pub col-xl-4">
                  <ArticleProvider value="publications">
                    <Featured
                      image={featuredImage}
                      size={'zm_xs'}
                      alt={title}
                      slug={slug}
                    />
                    <Taxonomies
                      categories={categories}
                      className={`article__category mt-l--small`}
                    />
                    <h2 className="publ-title">
                      <Link
                        href={`/publications/[slug]`}
                        as={`/publications/${slug}`}
                      >
                        <a
                          href={`/publications/${slug}`}
                          className="hero-pub__title font-weight-semibold"
                        >
                          {title}
                        </a>
                      </Link>
                    </h2>
                  </ArticleProvider>
                </div>
              )
            )}
          </div>
        </div>
        <div className="hero-pub-wrap d-none d-xl-block">
          {info.generalInfoACF.selectedNews.map(
            ({ categories, title, slug, author, featuredImage }, i) => (
              <div key={i} className="hero-pub">
                <ArticleProvider value="publications">
                  <Featured
                    image={featuredImage}
                    size={'zm_xs'}
                    alt={title}
                    slug={slug}
                  />
                  <Taxonomies
                    categories={categories}
                    className={`article__category mt-l--small`}
                  />
                  <h2 className="publ-title">
                    <Link
                      href={`/publications/[slug]`}
                      as={`/publications/${slug}`}
                    >
                      <a
                        href={`/publications/${slug}`}
                        className="hero-pub__title font-weight-semibold"
                      >
                        {title}
                      </a>
                    </Link>
                  </h2>
                </ArticleProvider>
              </div>
            )
          )}
        </div>
        <div className="hero-pub-news">
          <h3 className="hero-pub-news__title">Новини</h3>
          <ul className="hero-list list-reset">
            {posts.nodes.slice(0, 12).map(({ title, slug }, i) => (
              <li key={i} className="hero-list__item line-height-1">
                <ChronologicalSeparator
                  posts={posts.nodes}
                  currentIndex={i}
                  showTime={true}
                  showForEach={true}
                />
                {/* <ArticleDateTime time={eventTime} date={eventDate} /> */}
                <div className="hero-list__data">
                  <h4 className="tx-tiny font-weight-medium">
                    <Link href={`/news/[slug]`} as={`/news/${slug}`}>
                      <a
                        className="hero-list__link d-flex"
                        href={`/news/${slug}`}
                      >
                        {title}
                      </a>
                    </Link>
                  </h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

HeroScene.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.object,
  publications: PropTypes.object,
  events: PropTypes.object,
};

export default HeroScene;
