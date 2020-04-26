import React from 'react';
import * as classnames from 'classnames';

const Blogger = ({ className, ...blogger }) => {
  const { name } = blogger;
  return (
    <div className={classnames('blogger', className)}>
      <h4 className="blogger__name">{name}</h4>
    </div>
  );
}

export default Blogger;
