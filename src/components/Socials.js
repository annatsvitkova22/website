import React from 'react';

const Socials = (props) => {
  const { socialsData } = props;
  return (
    <div className="socials">
      {socialsData.map((item) => {
        return (
          <a href={item.url} title={item.name}>
            <img src="#" alt={item.name} />
          </a>
        );
      })}
    </div>
  );
};

export default Socials;
