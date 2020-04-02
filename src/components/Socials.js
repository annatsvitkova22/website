import React from 'react';
import PropTypes from 'prop-types';

import Icons from './Icons';

const Socials = (props) => {
  const { socialsData, color } = props;

  return (
    <div className="socials col-1">
      {socialsData.map((item, i) => {
        return (
          <a href={item.url} title={item.name} key={i}>
            <Icons icon={item.name} color={color} />
          </a>
        );
      })}
    </div>
  );
};

Socials.propTypes = {
  color: PropTypes.string,
  socialsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export default Socials;
