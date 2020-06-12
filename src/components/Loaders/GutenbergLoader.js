import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

const GutenbergLoader = ({ type }) => {
  const [height, setHeight] = React.useState(null);

  React.useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  if (type === 'chart') {
    return (
      <ContentLoader viewBox={`0 0 875 400`}>
        <rect x={'0'} y={'0'} width={'875'} height={'400'} />
      </ContentLoader>
    );
  }

  return (
    <ContentLoader viewBox={`0 0 875 ${height}`}>
      <rect x={'0'} y={'0'} width={'875'} height={`${height}`} />
    </ContentLoader>
  );
};

GutenbergLoader.propTypes = {
  type: PropTypes.string,
};

export default GutenbergLoader;
