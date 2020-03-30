import React from 'react';

import Icons from './Icons';

const Socials = (props) => {
  const { socialsData, color } = props;

  return (
    <div className="socials col-xs-1">
      {socialsData.map((item) => {
        return (
          <a href={item.url} title={item.name}>
            <Icons icon={item.name} color={color} />
          </a>
        );
      })}
    </div>
  );
};

export default Socials;
