import React from 'react';
import ContentLoader from 'react-content-loader';

const GutenbergLoader = () => {
  const [height, setHeight] = React.useState(null);

  React.useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <ContentLoader viewBox={`0 0 875 ${height}`}>
      <rect
        x={'0'}
        y={'0'}
        rx={'0'}
        rx={'0'}
        width={'875'}
        height={`${height}`}
      />
    </ContentLoader>
  );
};

export default GutenbergLoader;
