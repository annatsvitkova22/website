import React from 'react';

const Image = ({ block }) => {
  // TODO: implement all other attributs
  return <img src={block.attributes.url} alt={block.attributes.alt} />;
};

export default Image;
