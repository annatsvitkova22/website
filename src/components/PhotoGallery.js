import React, { useState, Fragment } from 'react';

import PhotoSwipeWrapper from '~/components/PhotoSwipe';

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const items = [
    {
      html:
        '<div><h1>Any HTML <a href="http://example.com">content</a></h1></div>',
      w: 600,
      h: 400,
    },
    {
      src: 'https://placekitten.com/600/400',
      w: 600,
      h: 400,
    },
    {
      src: 'https://placekitten.com/1200/900',
      w: 1200,
      h: 900,
    },
  ];

  const handleOpen = (ind) => {
    setIsOpen(true);
    setIndex(ind);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onClick = (i) => () => {
    handleOpen(i);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          {items.map((item, i) => {
            return (
              <div key={i} className="col-3">
                {item.src && (
                  <img src={item.src} alt="alt" onClick={onClick(i)} />
                )}
                {item.html && (
                  <div
                    onClick={onClick(i)}
                    dangerouslySetInnerHTML={{ __html: item.html }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <PhotoSwipeWrapper
        isOpen={isOpen}
        index={index}
        items={items}
        onClose={handleClose}
      />
    </Fragment>
  );
};
