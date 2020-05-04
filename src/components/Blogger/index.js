import React from 'react';
import * as classnames from 'classnames';
import Link from 'next/link';

import Avatar from '~/components/Avatar';
import BloggerBio from '~/components/Blogger/Bio';
import Icons from '~/components/Icons';
import { MapIcons } from '~/components/Sidebar/Events/MapComponent';

const Blogger = ({
  className,
  avatarSize = 'small',
  withLinks,
  showBio,
  ...blogger
}) => {
  const {
    name,
    slug,
    description,
    bloggerInfoACF: { avatar, info, socials },
    stats,
  } = blogger;

  const { pageInfo, nodes } = stats;
  const { commentsCount, viewsCount } = nodes.reduce(
    (acc, current) => {
      const {
        commentCount,
        statisticsACF: { views },
      } = current;
      if (commentCount) acc.commentsCount += commentCount;
      if (views) acc.viewsCount += views;
      return acc;
    },
    { commentsCount: 0, viewsCount: 0 }
  );
  return (
    <div className={classnames('blogger', className)}>
      {withLinks && (
        <Link href={`/blogs/author/[slug]`} as={`/blogs/author/${slug}`}>
          <a rel="author" href={`/blogs/author/${slug}`}>
            <Avatar
              className={classnames(
                'blogger__avatar',
                `blogger__avatar--${avatarSize}`
              )}
              avatar={avatar}
              alt={name}
            />
          </a>
        </Link>
      )}
      {!withLinks && (
        <Avatar
          className={classnames(
            'blogger__avatar',
            `blogger__avatar--${avatarSize}`
          )}
          avatar={avatar}
          alt={name}
        />
      )}
      <div className="blogger__wrapper">
        <div className="blogger__about">
          {withLinks && (
            <Link href={`/blogs/author/[slug]`} as={`/blogs/author/${slug}`}>
              <a rel="author" href={`/blogs/author/${slug}`}>
                <h4 className="blogger__name">{name}</h4>
              </a>
            </Link>
          )}
          {!withLinks && <h4 className="blogger__name">{name}</h4>}
          {info && <div className="blogger__info">{info}</div>}
        </div>
        <ul className="blogger__stats">
          {pageInfo && pageInfo.total && (
            <li className="blogger__stats-item">
              <Icons icon={'articles-small'} className="blogger__stats-icon" />
              <span>{pageInfo.total}</span>
            </li>
          )}
          <li className="blogger__stats-item">
            <Icons icon={'comment-small'} className="blogger__stats-icon" />
            <span>{commentsCount}</span>
          </li>
          <li className="blogger__stats-item">
            <Icons icon={'eye-small'} className="blogger__stats-icon" />
            <span>{viewsCount}</span>
          </li>
        </ul>
        {socials && (
          <div className="blogger__socials">
            <MapIcons className={'blogger__socials-links'} data={socials} />
          </div>
        )}
      </div>
      {showBio && description && <BloggerBio bio={description} />}
    </div>
  );
};

export default Blogger;
