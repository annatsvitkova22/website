import React from 'react';
import Link from 'next/link';

const SectionHeading = ({ title, href, classMode }) => (
  <div
    className={`container sec-heading${
      classMode ? ` sec-heading--${classMode}` : ''
    }`}
  >
    <div className="row line-height-1">
      <div className="col-6">
        <h6 className="text-uppercase tx-family-alt">{title}</h6>
      </div>
      <div className="col-6 text-right tx-green">
        <Link href={href}>
          <a className="video-category__watch-all tx-family-titles font-weight-semibold">
            Дивись Усі
          </a>
        </Link>
      </div>
    </div>
  </div>
);

export default SectionHeading;
