import React from 'react';
import PropTypes from 'prop-types';
// import Head from 'next/head';
// import NumberFormat from 'react-number-format';
// import ProgressBar from 'react-bootstrap/ProgressBar';
//
// import useIntersectionObserver from '~/hooks/useIntersectionObserver';
// import NavLink from '~/components/SiteLink';

const CfPostItem = (/* props */) => {
  // const ref = React.useRef();
  // const { item } = props;
  // const [isVisible, setIsVisible] = React.useState(false);

  /*
  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!isVisible) {
          setIsVisible(true);
        }
        observerElement.unobserve(ref.current);
      }
    },
  });
  */

  // const cfDate = new Date(item.date);

  return (
    <>
      <h1>work it</h1>
    </>
  );
};

CfPostItem.propTypes = {
  item: PropTypes.any,
};

export default CfPostItem;
