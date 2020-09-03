import React from 'react';
import ContentLoader from 'react-content-loader';

const BloggerLoader = () => {
  return (
    <div className="blogger-row row">
      <div className="blogger col-md-3">
        <ContentLoader
          viewBox={'0, 0, 110, 110'}
          height={'110px'}
          width={'110px'}
        >
          <rect
            x={'0'}
            y={'0'}
            rx={'110'}
            ry={'110'}
            width={'110'}
            height={'110'}
          />
        </ContentLoader>
        <div className="blogger__wrapper">
          <div className="blogger__about">
            <ContentLoader
              viewBox={'0, 0, 170, 36'}
              height={'36px'}
              width={'170px'}
            >
              <rect x={'0'} y={'0'} width={'170'} height={`16`} />
              <rect x={'0'} y={'18'} width={'130'} height={`16`} />
            </ContentLoader>
          </div>
          <div className="blogger__stats">
            <ContentLoader
              viewBox={'0, 0, 202, 36'}
              height={'57px'}
              width={'202px'}
            >
              <rect x={'0'} y={'0'} width={'202'} height={`16`} />
              <rect x={'0'} y={'20'} width={'58'} height={`16`} />
            </ContentLoader>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-9 col-xl-9">
        <div
          className="blogger-row__wrapper row"
          style={{ justifyContent: 'space-between' }}
        >
          <div className="article--blog article com-md-6">
            <ContentLoader
              viewBox={'0,0,424,388'}
              height={'388px'}
              width={'424px'}
              className={'blog-loader'}
            >
              <rect x={'0'} y={'0'} width={'424'} height={`250`} />

              <rect x={'0'} y={'267'} width={'86'} height={`21`} />

              <rect x={'0'} y={'305'} width={'424'} height={`50`} />

              <rect x={'0'} y={'372'} width={'111'} height={`16`} />
            </ContentLoader>
          </div>
          <div className="article--blog article com-md-6">
            <ContentLoader
              viewBox={'0,0,424,388'}
              height={'388px'}
              width={'424px'}
              className={'blog-loader'}
            >
              <rect x={'0'} y={'0'} width={'424'} height={`250`} />

              <rect x={'0'} y={'267'} width={'86'} height={`21`} />

              <rect x={'0'} y={'305'} width={'424'} height={`50`} />

              <rect x={'0'} y={'372'} width={'111'} height={`16`} />
            </ContentLoader>
          </div>
          <div className="article--blog article com-md-6">
            <ContentLoader
              viewBox={'0,0,424,388'}
              height={'388px'}
              width={'424px'}
              className={'blog-loader'}
            >
              <rect x={'0'} y={'0'} width={'424'} height={`250`} />

              <rect x={'0'} y={'267'} width={'86'} height={`21`} />

              <rect x={'0'} y={'305'} width={'424'} height={`50`} />

              <rect x={'0'} y={'372'} width={'111'} height={`16`} />
            </ContentLoader>
          </div>
          <div className="article--blog article com-md-6">
            <ContentLoader
              viewBox={'0,0,424,388'}
              height={'388px'}
              width={'424px'}
              className={'blog-loader'}
            >
              <rect x={'0'} y={'0'} width={'424'} height={`250`} />

              <rect x={'0'} y={'267'} width={'86'} height={`21`} />

              <rect x={'0'} y={'305'} width={'424'} height={`50`} />

              <rect x={'0'} y={'372'} width={'111'} height={`16`} />
            </ContentLoader>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloggerLoader;
