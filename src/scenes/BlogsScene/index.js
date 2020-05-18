import React from 'react';
import Link from 'next/link';

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
              <Link href={`/blogs/author/${slug}`}>
                <a
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
                >
                  <span className="blogs-user__container tx-white d-block pos-absolute l-24 r-24 b-52">
                    <span className="blogs-user__name h4 font-weight-extrabold d-block">
                      {name}
                    </span>
                    <span className="blogs-user__info d-block font-weight-medium">
                      {info}
                    </span>
                  </span>
                </a>
              </Link>
              <ul className="user-pubs list-reset pos-relative z-10 bg-white">
                {blogs.map(({ title, slug }) => (
                  <li key={slug} className="user-pub user-pubs__item">
                    <h6 className="font-weight-semibold line-height-12">
                      <Link href={`/blogs/${slug}`}>
                        <a className="user-pub__title d-block">{title}</a>
                      </Link>
                    </h6>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
      )}
    </div>
  </div>
);

export default BlogsScene;
