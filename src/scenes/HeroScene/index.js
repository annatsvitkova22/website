import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Taxonomies from '~/components/Article/Taxonomies';
import Author from '~/components/Article/Author';
import Featured from '~/components/Article/Featured';
import { ArticleProvider } from '~/components/Article/Context';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';
import HeroPublication from '~/components/HeroPublication';
import ArticleDateTime from '~/components/Article/DateTime';
import ArticleDate from '~/components/Article/Date';

const HeroScene = ({ info, posts, publications }) => {
  const heroPubRef = useRef(null);
  const heroListRef = useRef(null);

  const onScroll = () => {
    const listHeight = heroListRef.current.clientHeight;
    const heroListPart =
      -(
        heroListRef.current.getBoundingClientRect().top /
        (listHeight - window.innerHeight)
      ) * 100;

    if (heroListPart > 0 && heroListPart < 100) {
      heroPubRef.current.scrollTop =
        (heroListPart *
          (heroPubRef.current.scrollHeight - window.innerHeight)) /
        100;
    }

    if (heroListPart < 0) {
      heroPubRef.current.scrollTop = 0;
    }

    if (heroListPart > 100) {
      heroPubRef.current.scrollTop = heroListRef.current.clientHeight;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="container container--full-hd hero">
      <div className="row">
        <div className="col-xl-7">
          <HeroPublication {...info.generalInfoACF.mainPublication} />
          {/* {publications.nodes
            .slice(0, 1)
            .map(
              (
                {
                  categories,
                  title,
                  slug,
                  author,
                  featuredImage: { mediaItemUrl },
                },
                i
              ) => {
                return (
                  <div className="hero__container pos-relative" key={i}>
                    <Link
                      href={`/publications/[slug]`}
                      as={`/publications/${slug}`}
                    >
                      <a
                        href={`/publications/${slug}`}
                        className="hero__image bg-cover d-block"
                        style={{
                          backgroundImage: `url(${mediaItemUrl})`,
                        }}
                      >
                        <span />
                      </a>
                    </Link>
                    <div className="hero__caption tx-white">
                      <Taxonomies
                        categories={categories}
                        className={`article__category`}
                      />
                      <h1 className="hero__title heading__big">
                        <Link
                          href={`/publications/[slug]`}
                          as={`/publications/${slug}`}
                        >
                          <a href={`/publications/${slug}`}>{title}</a>
                        </Link>
                      </h1>
                      <div className="article__meta">
                        <Author className="article__author" author={author} />
                      </div>
                    </div>
                  </div>
                );
              }
            )} */}
        </div>
        <div className="col-xl-2 d-none d-xl-block">
          <div ref={heroPubRef} className="hero-pub__scroll">
            {publications.nodes
              .slice(0, 5)
              .map(({ categories, title, slug, author, featuredImage }, i) => (
                <div key={i} className="hero-pub">
                  <ArticleProvider value="publications">
                    <Featured
                      image={featuredImage}
                      size={'medium'}
                      alt={title}
                      slug={slug}
                    />
                    <Taxonomies
                      categories={categories}
                      className={`article__category mt-l--small`}
                    />
                    <h6>
                      <Link
                        href={`/publications/[slug]`}
                        as={`/publications/${slug}`}
                      >
                        <a
                          href={`/publications/${slug}`}
                          className="hero-pub__title font-weight-semibold"
                        >
                          {title.toLowerCase()}
                        </a>
                      </Link>
                    </h6>
                    <div className="article__meta tx-grey">
                      <Author className="article__author" author={author} />
                    </div>
                  </ArticleProvider>
                </div>
              ))}
          </div>
        </div>
        <div className="col-xl-3">
          <ul ref={heroListRef} className="hero-list list-reset">
            {posts.nodes.slice(0, 40).map(({ date, title, slug }, i) => (
              <li key={i} className="hero-list__item line-height-1">
                <ChronologicalSeparator posts={posts.nodes} currentIndex={i} />
                <h6 className="tx-tiny font-weight-medium">
                  <Link href={`/news/[slug]`} as={`/news/${slug}`}>
                    <a
                      className="hero-list__link d-flex"
                      href={`/news/${slug}`}
                    >
                      <ArticleDate date={date} />
                      {title.toLowerCase()}
                    </a>
                  </Link>
                </h6>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="row">
          <div className="col-5"></div>
        </div> */}
      </div>
    </div>
  );
};

HeroScene.propTypes = {
  info: PropTypes.any,
  posts: PropTypes.any,
  publications: PropTypes.any,
};

export default HeroScene;
