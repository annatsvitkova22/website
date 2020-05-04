import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

import Taxonomies from '~/components/Article/Taxonomies';
import Author from '~/components/Article/Author';
import Featured from '~/components/Article/Featured';

const HeroScene = ({ posts, publications }) => {
  const heroPubRef = useRef(null);
  const heroListRef = useRef(null);

  const onScroll = () => {
    const listHeight = heroListRef.current.clientHeight;

    const heroListPart =
      -((heroListRef.current.getBoundingClientRect().top - 100) / listHeight) *
      100;
    console.log(heroListPart);
    if (heroListPart > 0 && heroListPart < 100) {
      heroPubRef.current.scrollTop =
        (heroListPart * heroPubRef.current.clientHeight) / 100;
    }
    if (heroListPart === 0) {
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
                    className="hero__image bg-cover pos-relative"
                    key={i}
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(29, 158, 116, 0.44), rgba(29, 158, 116, 0.44)), url(${mediaItemUrl})`,
                    }}
                  >
                    <div className="hero__caption tx-white">
                      <Taxonomies
                        categories={categories}
                        className={`article__category`}
                      />
                      <h1 className="heading__big">{title}</h1>
                      <div className="article__meta">
                        <Author className="article__author" author={author} />
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>
        <div className="col-5">
          <div className="row">
            <div className="col-5">
              <div ref={heroPubRef} className="hero-pub__scroll">
                {publications.nodes
                  .slice(1, 6)
                  .map(
                    ({ categories, title, slug, author, featuredImage }, i) => (
                      <div key={i} className="hero-pub">
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
                          <Link href={`publications/${slug}`}>
                            <a className="hero-pub__title font-weight-semibold">
                              {title}
                            </a>
                          </Link>
                        </h6>
                        <div className="article__meta tx-grey">
                          <Author className="article__author" author={author} />
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className="col-7">
              <ul ref={heroListRef} className="hero-list list-reset">
                {posts.nodes
                  .concat(posts.nodes)
                  .concat(posts.nodes)
                  .concat(posts.nodes)
                  .map(({ title, slug }, i) => (
                    <li key={i} className="hero-list__item">
                      <h6 className="tx-tiny font-weight-medium">
                        <Link href={`post/${title}`}>
                          <a>{title}</a>
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
