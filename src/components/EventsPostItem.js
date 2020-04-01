import React from 'react';

import NavLink from '~/components/SiteLink';
import useIntersectionObserver from '~/hooks/useIntersectionObserver';

const EventPostItem = (props) => {
  const ref = React.useRef();
  const { item } = props;
  const [isVisible, setIsVisible] = React.useState(false);

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!isVisible) {
          setIsVisible(true);
        }
        observerElement.unobserve(ref.current);
      }
    },
  });

  const monthNames = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];

  const eventDate = new Date(item.date);

  return (
    <div className="events__wrapper row" key={item.id} ref={ref}>
      {isVisible && (
        <>
          <div className="events__date">
            <span>{eventDate.getDate()}</span>
            <span>{monthNames[eventDate.getMonth()]}</span>
            <span>
              {eventDate.getHours()} : {eventDate.getMinutes()}
            </span>
          </div>
          <div className="events__image">
            <img src="#" alt="event__image" />
          </div>
          <div className="events__description">
            <h2>{item.title}</h2>
            <span>м. Полтава, вул. Котляревського, 22 </span>
          </div>
          <div className="events__submit-button">
            <NavLink href={item.link}>Докладніше</NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default EventPostItem;
