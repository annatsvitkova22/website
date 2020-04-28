import React from 'react';
import * as classnames from 'classnames';
import Avatar from '~/components/Avatar';
import Socials from '~/components/Footer/Socials';
import BloggerBio from '~/components/Blogger/Bio';

const Blogger = ({ className, avatarSize = 'small', showBio, ...blogger }) => {
  const {
    name,
    description,
    bloggerInfoACF: { avatar, info, socials },
    stats,
  } = blogger;
  const { pageInfo, nodes } = stats;
  const { commentsCount, viewsCount } = nodes.reduce(
    (acc, current) => {
      const { commentCount, statisticsACF: { views } } = current;
      if (commentCount) acc.commentsCount += commentCount;
      if (views) acc.viewsCount += views;
      return acc;
    },
    { commentsCount: 0, viewsCount: 0 }
  );
  return (
    <div className={classnames('blogger', className)}>
      <Avatar
        className={classnames(
          'blogger__avatar',
          `blogger__avatar--${avatarSize}`
        )}
        avatar={avatar}
        alt={name}
      />
      <h4 className="blogger__name">{name}</h4>
      {info && <div className="blogger__info">{info}</div>}
      <ul className="blogger__stats">
        {pageInfo && pageInfo.total && (
          <li>
            <span>icon</span>
            <span>{pageInfo.total}</span>
          </li>
        )}
        <li>
          <span>icon</span>
          <span>{commentsCount}</span>
        </li>
        <li>
          <span>icon</span>
          <span>{viewsCount}</span>
        </li>
      </ul>
      SOCIALS ARE HERE, THEY ARE WHITE BELOW THIS TEXT
      <Socials
        className={'blogger__socials'}
        socialsData={socials}
      />
      {showBio && description && <BloggerBio bio={description} />}
    </div>
  );
};

export default Blogger;
