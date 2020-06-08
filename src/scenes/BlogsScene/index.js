import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import he from 'he';
import { Defer } from 'react-progressive-loader';

const BlogsScene = ({ users: { nodes: users } }) => (
  <div className="container">
    <div className="row">
      {users.map(
        (
          {
            name,
            slug,
            bloggerInfoACF: { info },
            userAdditionalACF: { avatar },
            blogs: { nodes: blogs },
          },
          i
        ) => {
          return (
            <div key={i} className="col-xl-3 col-sm-6 blogs-user__col">
              <div className="blogs-user__wrapper">
                <Link href={`/blogs/author/${slug}`}>
                  <Defer
                    render={() => <a
                      className="blogs-user__avatar bg-cover d-block pos-relative"
                      style={
                        avatar
                          ? {
                            backgroundImage: `url(${avatar.mediaItemUrl})`,
                          }
                          : {
                            backgroundImage: `url(/assets/placeholders/user-placeholder.jpg)`,
                          }
                      }
                    />}
                    loadOnScreen
                  />
                </Link>
                <span className="blogs-user__container tx-white d-block pos-absolute l-24 r-24">
                  <span className="blogs-user__name h4 font-weight-extrabold d-block">
                    {name}
                  </span>
                  <span className="blogs-user__info d-block font-weight-medium">
                    {info}
                  </span>
                </span>
              </div>
              <ul className="user-pubs list-reset pos-relative z-10 bg-white">
                {blogs.map((blog) => {
                  const { title } = blog;
                  const sl = blog.slug;
                  return (
                    <li key={sl} className="user-pub user-pubs__item">
                      <h5 className="font-weight-semibold line-height-12">
                        <Link href={`/blogs/${sl}`}>
                          <a className="user-pub__title d-block">
                            {he.decode(title)}
                          </a>
                        </Link>
                      </h5>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }
      )}
    </div>
  </div>
);

BlogsScene.propTypes = {
  nodes: PropTypes.array,
  users: PropTypes.object,
};

export default BlogsScene;
