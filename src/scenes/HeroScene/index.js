import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

import Taxonomies from '~/components/Article/Taxonomies';
import Author from '~/components/Article/Author';
import Featured from '~/components/Article/Featured';
import { ArticleProvider } from '~/components/Article/Context';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';

const HeroScene = ({ posts, publications }) => {
  const heroPubRef = useRef(null);
  const heroListRef = useRef(null);

  const onScroll = () => {
    const listHeight = heroListRef.current.clientHeight;

    const heroListPart =
      -(heroListRef.current.getBoundingClientRect().top / listHeight) * 100;
    if (heroListPart > 0 && heroListPart < 100) {
      heroPubRef.current.scrollTop =
        (heroListPart * heroPubRef.current.clientHeight) / 100;
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
    <div className="container hero">
      <div className="row">
        <div className="col-xl-7">
          {publications.nodes
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
                          backgroundImage: `linear-gradient(0deg, rgba(29, 158, 116, 0.44), rgba(29, 158, 116, 0.44)), url(${mediaItemUrl})`,
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
            )}
        </div>
        <div className="col-xl-5">
          <div className="row">
            <div className="col-5 d-none d-xl-block">
              <div ref={heroPubRef} className="hero-pub__scroll">
                {publications.nodes
                  .slice(1, 6)
                  .map(
                    ({ categories, title, slug, author, featuredImage }, i) => (
                      <div key={i} className="hero-pub">
                        <ArticleProvider value="publications">
                          <Featured
                            image={featuredImage}
                            alt={title}
                            slug={slug}
                          />
                          <Taxonomies
                            categories={categories}
                            className={`article__category`}
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
                                {title}
                              </a>
                            </Link>
                          </h6>
                          <div className="article__meta tx-grey">
                            <Author
                              className="article__author"
                              author={author}
                            />
                          </div>
                        </ArticleProvider>
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className="col-xl-7">
              <ul ref={heroListRef} className="hero-list list-reset">
                {posts.nodes.map(({ title, slug }, i) => (
                  <li key={i} className="hero-list__item">
                    <ChronologicalSeparator
                      posts={posts.nodes}
                      currentIndex={i}
                    />
                    <h6 className="tx-tiny font-weight-medium">
                      <Link href={`/news/[slug]`} as={`/news/${slug}`}>
                        <a
                          className="hero-list__link d-block"
                          href={`/news/${slug}`}
                        >
                          {title}
                        </a>
                      </Link>
                    </h6>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroScene;
