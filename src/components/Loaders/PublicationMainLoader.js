import React, { useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';

const PublicationMainLoader = () => {
  const [width, setWidth] = useState(null);
  useEffect(() => {
    setWidth(window.innerWidth > 1200 ? 1320 : window.innerWidth);
  }, []);

  return (
    <div className="main-container">
      <div className="publ-page">
        <div className="main-publ">
          <div className="main-publ__image">
            <ContentLoader
              viewBox={`0 0 ${width} 747`}
              style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
            >
              <rect x={'0'} y={'0'} width={'1320'} height={`747`} />
            </ContentLoader>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ContentLoader
                viewBox={'0 0 1320 30'}
                style={{
                  backgroundColor: 'rgba(0,0,0,0.01)',
                }}
              >
                <rect x={'0'} y={'-10'} width={'1320'} height={`30`} />
              </ContentLoader>
            </div>
          </div>
          <div className="last-publs">
            <div className="row">
              <div className="article--publication art-publ--on-medium col-lg-6">
                <ContentLoader
                  viewBox={'0 0 1320 800'}
                  style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
                >
                  <rect x={'0'} y={'0'} width={'1320'} height={`800`} />
                </ContentLoader>
              </div>
              <div className="article--publication art-publ--on-medium col-lg-6">
                <ContentLoader
                  viewBox={'0 0 1320 800'}
                  style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
                >
                  <rect x={'0'} y={'0'} width={'1320'} height={`800`} />
                </ContentLoader>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationMainLoader;
