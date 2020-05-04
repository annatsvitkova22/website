import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

import Taxonomies from '~/components/Article/Taxonomies';
import Author from '~/components/Article/Author';
import Featured from '~/components/Article/Featured';

const HeroScene = ({ publications }) => {
  const heroPubRef = useRef(null);
  const heroListRef = useRef(null);

  const onScroll = () => {
    const height = heroPubRef.current.clientHeight;
    heroListRef.current.style.height = `${height}px`;

    const heroPubPart =
      -(heroPubRef.current.getBoundingClientRect().top / height) * 100;
    if (heroPubPart > 0 && heroPubPart < 100) {
      heroListRef.current.scrollTop =
        (heroPubPart * heroListRef.current.clientHeight) / 100;
    }
    if (heroPubPart < 0) {
      heroListRef.current.scrollTop = 0;
    }
    if (heroPubPart > 100) {
      heroListRef.current.scrollTop = heroListRef.current.clientHeight;
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
                            <a className="hero-pub__title">{title}</a>
                          </Link>
                        </h6>
                        <div className="article__meta">
                          <Author className="article__author" author={author} />
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className="col-7">
              <ul ref={heroListRef} className="hero-list list-reset">
                {publications.nodes
                  .concat(publications.nodes)
                  .concat(publications.nodes)
                  .concat(publications.nodes)
                  .map(({ title, slug }, i) => (
                    <li key={i} className="hero-list__item">
                      <h6 className="tx-tiny font-weight-medium">
                        <Link href={`publications/${title}`}>
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
