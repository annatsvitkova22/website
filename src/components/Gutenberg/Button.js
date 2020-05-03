import React from 'react';
import PropTypes from 'prop-types';
import SiteLink from '~/components/SiteLink';

const Button = ({ block }) => {
  const style = {
    color: block.attributes.textColor,
    backgroundColor: block.attributes.backgroundColor,
    textAlign: block.attributes.align,
    borderRadius: block.attributes.borderRadius,
  };
  return (
    <SiteLink
      href={block.attributes.url}
      style={style}
      className={`zm-button ${block.attributes.className}`}
    >
      {block.attributes.text}
    </SiteLink>
  );
};

Button.propTypes = {
  block: PropTypes.any,
};

export default Button;
