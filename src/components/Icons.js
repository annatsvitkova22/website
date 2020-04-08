import React from 'react';
import PropTypes from 'prop-types';

import icons from '../static/images/icons';

const Icons = (props) => {
  const { icon, color = 'black' } = props;

  const svgIcon = icons.find((item) => item.type === icon);

  if (!svgIcon) return null;

  return (
    <span
      dangerouslySetInnerHTML={{ __html: svgIcon.tag }}
      style={{ color }}
      className={'social-icon'}
    />
  );
};

Icons.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
};

export default Icons;
