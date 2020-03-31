import React from 'react';

import '../styles/components/eventsPost.scss';
import NavLink from '~/components/SiteLink';

const EventsPost = (props) => {
  const { eventsData } = props;

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

  return (
    <div>
      {eventsData &&
        eventsData.map((item) => {
          const date = new Date(item.date);

          return (
            <div className="events__wrapper row" key={item.id}>
              <div className="events__date">
                <span>{date.getDate()}</span>
                <span>{monthNames[date.getMonth()]}</span>
                <span>
                  {date.getHours()} : {date.getMinutes()}
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
            </div>
          );
        })}
    </div>
  );
};

export default EventsPost;
