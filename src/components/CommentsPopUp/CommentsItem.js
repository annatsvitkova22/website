import React from 'react';

import Icons from '~/components/Icons';

const CommentsItem = () => {
  return (
    <div className={'comments-pp__comment'}>
      <div className={'comments-pp__author'}>
        <div className={'comments-pp__name'}>
          <span>Егор Рудь</span>
          <span>12 Березня, 14:24</span>
        </div>
      </div>
      <div className={'comments-pp__text'}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
        dignissimos dolor ea eaque enim et, ex hic illo illum impedit incidunt
        ipsam iusto, laborum neque pariatur perspiciatis possimus quas quidem!
        Adipisci alias amet assumenda dolorem eaque earum eum exercitationem
        fugit incidunt labore magnam magni nemo nihil optio quisquam, tempore,
        vel velit vero vitae voluptatem? Ab aperiam cum deleniti earum quidem.
      </div>
      <div className={'comments-pp__actions'}>
        <div className={'comments-pp__actions-item'}>
          <Icons
            icon={'like-comment'}
            className={'comments-pp__actions-icon'}
          />
          <span>Лайк</span>
        </div>
        <div className={'comments-pp__actions-item'}>
          <Icons
            icon={'answer-comment'}
            className={'comments-pp__actions-icon'}
          />
          <span>Відповісти</span>
        </div>
        <div className={'comments-pp__actions-item'}>
          <Icons
            icon={'complain-comment'}
            className={'comments-pp__actions-icon'}
          />
          <span>Поскаржитися</span>
        </div>
      </div>
    </div>
  );
};

export default CommentsItem;
