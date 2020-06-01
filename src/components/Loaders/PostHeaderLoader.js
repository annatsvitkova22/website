import React from 'react';
import ContentLoader from 'react-content-loader';

const PostHeaderLoader = ({ type }) => {
  if (type === 'news') {
    return (
      <ContentLoader viewBox={'0 0 872 2000'}>
        <rect x={'0'} y={'0'} width={'85'} height={'22'} />

        <rect x={'0'} y={'40'} width={'750'} height={'34'} />
        <rect x={'0'} y={'83'} width={'850'} height={'34'} />
        <rect x={'0'} y={'126'} width={'650'} height={'34'} />

        <rect x={'0'} y={'200'} width={'872'} height={'510'} />

        <rect x={'112'} y={'750'} width={'648'} height={'44'} />

        <rect x={'112'} y={'834'} width={'648'} height={'116'} />
        <rect x={'112'} y={'950'} width={'648'} height={'500'} />
        <rect x={'112'} y={'1500'} width={'648'} height={'500'} />
      </ContentLoader>
    );
  }

  if (type === 'publication') {
    return (
      <div className={'container'}>
        <ContentLoader
          viewBox={'0 0 1320 705'}
          style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
        >
          <rect x={'200'} y={'455'} width={'921'} height={`15`} />
          <rect x={'200'} y={'475'} width={'875'} height={`20`} />
          <rect x={'200'} y={'500'} width={'850'} height={`20`} />
          <rect x={'200'} y={'525'} width={'921'} height={`10`} />
          <rect x={'200'} y={'540'} width={'921'} height={`10`} />
        </ContentLoader>
      </div>
    );
  }
  if (type === 'blog') {
    return (
      <ContentLoader viewBox={'0 0 872 1300'}>
        <rect x={'0'} y={'0'} width={'85'} height={'22'} />

        <rect x={'0'} y={'40'} width={'750'} height={'34'} />
        <rect x={'0'} y={'83'} width={'850'} height={'34'} />
        <rect x={'0'} y={'126'} width={'650'} height={'34'} />

        <rect x={'0'} y={'200'} width={'872'} height={'510'} />

        <rect x={'112'} y={'750'} width={'648'} height={'44'} />

        <rect x={'112'} y={'834'} width={'648'} height={'116'} />
        <rect x={'112'} y={'950'} width={'648'} height={'270'} />
      </ContentLoader>
    );
  }
  if (type === 'crowdfunding') {
    return (
      <>
        <div className="col-12 crowdfunding-single__top">
          <div
            className="article-status crowdfunding-single__status"
            style={{ paddingLeft: '0' }}
          >
            <ContentLoader
              viewBox={'0 0 102 22'}
              height={'22px'}
              width={'102px'}
            >
              <rect x={'0'} y={'0'} width={'102'} height={'22'} />
            </ContentLoader>
          </div>
          <div className="crowdfunding-single__title">
            <ContentLoader
              viewBox={'0 0 974 54'}
              height={'54px'}
              width={'974px'}
            >
              <rect x={'0'} y={'0'} width={'974'} height={'54'} />
            </ContentLoader>
          </div>
        </div>
        <main className="col-md-8 crowdfunding-single__main">
          <div className="feature__image crowdfunding-single__featured">
            <ContentLoader
              viewBox={'0 0 802 460'}
              height={'460px'}
              width={'802px'}
            >
              <rect x={'0'} y={'0'} width={'802'} height={'460'} />
            </ContentLoader>
          </div>
          <div className="crowdfunding-single__content">
            <div className="crowdfunding-single__about-wrapper title__social-about">
              <div
                className="crowdfunding-single__about title__socials-about"
                style={{ marginBottom: '20px' }}
              >
                <ContentLoader
                  viewBox={'0 0 182 44'}
                  height={'44px'}
                  width={'182px'}
                >
                  <rect x={'0'} y={'0'} width={'182'} height={'44'} />
                </ContentLoader>
              </div>
              <div className="content__posts">
                <ContentLoader
                  viewBox={'0 0 648 500'}
                >
                  <rect x={'0'} y={'0'} width={'648'} height={'500'} />
                </ContentLoader>
              </div>
            </div>
          </div>
        </main>
        <aside className="col-md-4 crowdfunding-single__sidebar">
          <div className="crowdfunding-single__sidebar-wrapper">
            <div
              className="crowdfunding-single__goal"
              style={{ marginBottom: '10px' }}
            >
              <ContentLoader
                viewBox={'0 0 98 16'}
                height={'16px'}
                width={'98px'}
              >
                <rect x={'0'} y={'0'} width={'98'} height={'16'} />
              </ContentLoader>
            </div>
            <div className="crowdfunding-progress crowdfunding-single__progress">
              <ContentLoader
                viewBox={'0 0 424 56'}
                height={'56px'}
                width={'424px'}
              >
                <rect x={'0'} y={'0'} width={'424'} height={'56'} />
              </ContentLoader>
            </div>
            <div className="crowdfunding-stats crowdfunding-single__stats">
              <ContentLoader
                viewBox={'0 0 119 54'}
                height={'54px'}
                width={'119px'}
              >
                <rect x={'0'} y={'0'} width={'119'} height={'54'} />
              </ContentLoader>
            </div>
            <div className="crowdfunding-supported crowdfunding-single__supported">
              <ContentLoader
                viewBox={'0 0 472 472'}
                height={'472px'}
                width={'472px'}
              >
                <rect x={'0'} y={'0'} width={'472'} height={'472'} />
              </ContentLoader>
            </div>
          </div>
        </aside>
      </>
    );
    return (
      <ContentLoader viewBox={'0 0 1044 1000'}>
        <rect x={'0'} y={'0'} width={'1044'} height={'535'} />
        <rect x={'0'} y={'550'} width={'60'} height={'15'} />
        <rect x={'0'} y={'570'} width={'875'} height={'15'} />
        <rect x={'0'} y={'590'} width={'750'} height={'15'} />
        <rect x={'0'} y={'630'} width={'1044'} height={'535'} />
      </ContentLoader>
    );
  }
  return null;
};

export default PostHeaderLoader;
