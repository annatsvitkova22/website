import React, { useContext } from 'react';
import Link from 'next/link';
import * as classnames from 'classnames';

import ArticleContext from '~/components/Article/Context';

const ArticleTitle = ({
  post: { slug, title },
  className,
  highlightInTitle,
}) => {
  let displayTitle = title;
  if (highlightInTitle) {
    displayTitle = generateHightlightedParts(title, highlightInTitle).map(
      (part, key) => {
        if (part.isHighlighted) {
          return (
            <span key={key} class="article-title__highlighted">
              {part.value}
            </span>
          );
        }
        return <span key={key}>{part.value}</span>;
      }
    );
  }
  const postType = useContext(ArticleContext);
  return (
    <h2 className={classnames('article-title', className)}>
      <Link href={`/${postType}/[slug]`} as={`/${postType}/${slug}`}>
        <a className="article-title__link" href={`/${postType}/${slug}`}>
          {displayTitle}
        </a>
      </Link>
    </h2>
  );
};

export default ArticleTitle;

const generateHightlightedParts = (string, highlight) => {
  const indices = getIndicesOf(highlight, string);
  const { length } = highlight;
  return string.split('').reduce((acc, current, index) => {
    const startHighlight = indices.find((i) => index === i);
    const endHighlight = indices.find((i) => index === i + length);
    if (startHighlight || endHighlight || !acc.length) {
      acc.push({
        isHighlighted: !!startHighlight,
        value: current,
      });
    } else {
      acc[acc.length - 1].value += current;
    }
    return acc;
  }, []);
};

const getIndicesOf = (searchStr, str, caseSensitive) => {
  let newSearchStr = searchStr;
  let newStr = str;
  const searchStrLen = newSearchStr.length;
  if (searchStrLen == 0) {
    return [];
  }
  let startIndex = 0;
  let index;
  const indices = [];
  if (!caseSensitive) {
    newStr = newStr.toLowerCase();
    newSearchStr = newSearchStr.toLowerCase();
  }
  while ((index = newStr.indexOf(newSearchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
};
