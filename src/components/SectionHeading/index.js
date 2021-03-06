import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const SectionHeading = ({ title, href, classMode, isRow = false }) => {
  const getRow = () => (
    <div
      className={`row line-height-1 sec-heading${
        classMode ? ` sec-heading--${classMode}` : ''
      }
    `}
    >
      <div className="col-6">
        <h4 className="sec-title text-uppercase tx-family-alt">{title}</h4>
      </div>
      <div className="col-6 text-right tx-green">
        {href && (
          <Link href={href}>
            <a className="video-category__watch-all tx-family-titles font-weight-semibold">
              Дивись Усі
            </a>
          </Link>
        )}
      </div>
    </div>
  );

  if (isRow) {
    return getRow();
  }

  return <div className={`container `}>{getRow()}</div>;
};

SectionHeading.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  classMode: PropTypes.string,
  isRow: PropTypes.bool,
};

export default SectionHeading;
