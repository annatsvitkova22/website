import React from 'react';
import PropTypes from 'prop-types';

import useCfFilterHook from '~/hooks/useCfFilterHook';
import CfPostItem from '~/components/CfsPostItem';
import EventPostItem from '~/components/EventsPostItem';
import { Waypoint } from 'react-waypoint';
import CfsLoader from '~/components/Loaders/CfsLoader';

const CfsPost = (props) => {
  const { filter, cfsData, date } = props;
  const { data } = useCfFilterHook(filter, cfsData, date);



  return (
    <>
        {data &&
        data.map((item, index) => {
          return <CfPostItem key={index} item={item} />;
          <Waypoint onEnter={fetchingContent} />
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
