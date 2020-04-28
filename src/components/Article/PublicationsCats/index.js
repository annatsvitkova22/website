import React from 'react';

import ArticleAuthor from '~/components/Article/Author';
import ArticleFeatured from '~/components/Article/Featured';
import ArticleTitle from '~/components/Article/Title';

const PublicationsCats = ({
  post,
  post: { categories, title, slug, author, featuredImage },
  children,
  className,
  highlightInTitle,
}) => (
  <div className="publ-cat">
    <ArticleFeatured image={featuredImage} alt={title} slug={slug} />
    <ArticleTitle
      highlightInTitle={highlightInTitle}
      post={post}
      className="text-capitalize publ-cat__title font-weight-semibold"
    />
    <div className="article__meta">
      <ArticleAuthor className="article__author" author={author} />
    </div>
  </div>
);

export default PublicationsCats;
