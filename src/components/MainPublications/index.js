import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { times, throttle } from 'lodash';

const MainPublications = ({ publications: { nodes: publications } }) => {
  const [scroll, setScroll] = useState(0);

  const handleWheel = useCallback(
    throttle(
      ({ deltaY }) => {
        setScroll((scroll) => scroll + deltaY);
      },
      100,
      { leading: false }
    ),
    [setScroll]
  );

  useEventListener('wheel', handleWheel, handleWheel.cancel);

  return (
    <section className="primary-publs">
      {publications.slice(0, 3).map(({ title, slug }, index) => {
        return (
          <div className="primary-publ" key={slug}>
            <h3 className="primary-publ__title">
              <Link as={`/publications/${slug}`} href="/publications/[slug]">
                <a
                  href={`/publications/${slug}`}
                  style={{
                    transform: `translateX(${
                      -50 - (scroll * (index === 2 ? 10 : index + 1)) / 1000
                    }%)`,
                  }}
                >
                  <span>
                    {times(7 * (index === 0 ? 11 : index + 1), () => title)}
                  </span>
                </a>
              </Link>
            </h3>
          </div>
        );
      })}
    </section>
  );
};

const useEventListener = (e, handler, cleanup, passive = false) => {
  useEffect(() => {
    window.addEventListener(e, handler, passive);

    return function remove() {
      cleanup && cleanup();

      window.removeEventListener(e, handler);
    };
  }, [e, handler, passive]);
};

export default MainPublications;
