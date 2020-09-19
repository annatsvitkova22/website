import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import he from 'he';
import NumberFormat from 'react-number-format';
import { useStateLink } from '@hookstate/core';
import StickyBox from 'react-sticky-box';

import getCFStatus from '~/lib/getCFStatus';
import ArticleStatus from '~/components/Article/Status';
import CrowdfundingProgress from '~/components/Crowdfunding/Progress';
import CrowdfundingStats from '~/components/Crowdfunding/Stats';
import CrowdfundingActions from '~/components/Crowdfunding/Actions';
import CrowdfundingSupported from '~/components/Crowdfunding/Supported';
import FeaturedImage from '~/components/FeaturedImage';
import ArticleAuthor from '~/components/Article/Author';
import ArticleDate from '~/components/Article/Date';
import Content from '~/components/Content';
import useViewsCounter from '~/hooks/useViewsCounter';
import { CreateSingleArticleStore } from '~/stores/SingleArticle';
import Avatar from '~/components/Avatar';

const CrowdfundingSingle = ({ post }) => {
  const [loaded, setLoaded] = useState(false);
  const stateLink = useStateLink(
    CreateSingleArticleStore(post, loaded, post.crowdfundingId)
  );
  const storedPost = stateLink.get()[post.crowdfundingId];

  useEffect(() => {
    setLoaded(true);
  }, [post]);

  useViewsCounter(post);

  const status = getCFStatus(storedPost);

  const {
    cfACF: { tocollect },
  } = storedPost;

  return (
    <div className="crowdfunding-single__container container">
      <Head>
        <title>ЗМІСТ - {storedPost.title}</title>
        {storedPost &&
          storedPost.featuredImage &&
          storedPost.featuredImage.mediaItemUrl && (
            <>
              <meta
                property="twitter:image"
                content={storedPost.featuredImage.mediaItemUrl}
              />
              <meta
                property="og:image"
                content={storedPost.featuredImage.mediaItemUrl}
              />
            </>
          )}
      </Head>

      <div className="crowdfunding-single">
        <div className="row">
          <div className="col-12 crowdfunding-single__top">
            {status && (
              <ArticleStatus
                {...status}
                className="crowdfunding-single__status"
              />
            )}
            <h1 className="crowdfunding-single__title">{he.decode(storedPost.title)}</h1>
          </div>
          <main className="col-md-8 crowdfunding-single__main">
            <FeaturedImage
              className="crowdfunding-single__featured"
              data={storedPost.featuredImage}
            />
            <div className="crowdfunding-single__content">
              <div className="crowdfunding-single__title-mobile">
                {status && (
                  <ArticleStatus
                    {...status}
                    className="crowdfunding-single__status"
                  />
                )}
                <h1 className="crowdfunding-single__title">
                  {he.decode(storedPost.title)}
                </h1>
              </div>
              <div className="crowdfunding-single__about-wrapper title__socials-about">
                <div className="crowdfunding-single__about title__socials-about">
                  <Avatar
                    avatar={storedPost.author.avatar}
                    className="crowdfunding-single__author-avatar"
                  />

                  <div className="crowdfunding-single__author-about title__socials-author">
                    <ArticleAuthor
                      author={storedPost.author}
                      className="crowdfunding-single__author-name title__socials-name"
                    />
                    <ArticleDate
                      format={'DD MMMM, HH:mm'}
                      date={storedPost.date}
                    />
                  </div>
                </div>
              </div>
              <div className="crowdfunding-single__sidebar-mobile">
                <div className="crowdfunding-single__goal">
                  <span>ціль</span>{' '}
                  <NumberFormat
                    value={tocollect}
                    displayType={'text'}
                    thousandSeparator={' '}
                    suffix="ГРН"
                  />
                </div>
                <CrowdfundingProgress
                  className="crowdfunding-single__progress"
                  post={storedPost}
                />
                <CrowdfundingStats
                  post={storedPost}
                  className="crowdfunding-single__stats"
                />
                {(status.value === 'active' || status.value === 'finished') && (
                  <CrowdfundingActions
                    post={storedPost}
                    className="crowdfunding-single__actions"
                    postId={storedPost.crowdfundingId}
                  />
                )}
                <CrowdfundingSupported
                  post={storedPost}
                  className="crowdfunding-single__supported"
                />
              </div>
              {storedPost.blocks.length ? (
                <Content
                  content={storedPost.blocks}
                  className={'content__posts'}
                />
              ) : (
                <Content
                  content={storedPost.content}
                  className={'content__posts'}
                />
              )}
            </div>
          </main>

          <aside className="col-md-4 crowdfunding-single__sidebar">
            <StickyBox offsetTop={70} offsetBottom={20}>
              <div className="crowdfunding-single__sidebar-wrapper">
                <div className="crowdfunding-single__goal">
                  <span>ціль</span>{' '}
                  <NumberFormat
                    value={tocollect}
                    displayType={'text'}
                    thousandSeparator={' '}
                    suffix="ГРН"
                  />
                </div>
                <CrowdfundingProgress
                  className="crowdfunding-single__progress"
                  post={storedPost}
                />
                <CrowdfundingStats
                  post={storedPost}
                  className="crowdfunding-single__stats"
                />
                {(status.value === 'active' || status.value === 'finished') && (
                  <CrowdfundingActions
                    post={storedPost}
                    className="crowdfunding-single__actions"
                    postId={storedPost.crowdfundingId}
                  />
                )}
                <CrowdfundingSupported
                  post={storedPost}
                  className="crowdfunding-single__supported"
                />
              </div>
            </StickyBox>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CrowdfundingSingle;
