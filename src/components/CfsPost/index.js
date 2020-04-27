import React from 'react';
import PropTypes from 'prop-types';

import useCfFilterHook from '~/hooks/useCfFilterHook';
import CfPostItem from '~/components/CfsPostItem';

const CfsPost = (props) => {
  const { filter, cfsData, date } = props;
  const { data } = useCfFilterHook(filter, cfsData, date);

  return (
    <>
        {data &&
        data.map((item, index) => {
          return <CfPostItem key={index} item={item} />;
        })}
    </>
  );
};

CfsPost.propTypes = {
  filter: PropTypes.string,
  cfsData: PropTypes.object,
  date: PropTypes.any,
};

export default CfsPost;
