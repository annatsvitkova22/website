import React from 'react';

import '../styles/components/eventsPost.scss';

const EventsPost = () => {
  return (
    <div className="events__wrapper row">
      <div className="events__date">
        <span>21</span>
        <span>March</span>
        <span>10:00</span>
      </div>
      <div className="events__image">
        <img src="#" alt="event__image" />
      </div>
      <div className="events__description">
        <h2>
          Восьме чудо Полтави. Чому варто побувати в університетському
          ботанічному саду
        </h2>
        <span>м. Полтава, вул. Котляревського, 22 </span>
      </div>
      <div className="events__submit-button">
        <button>Детальніше</button>
      </div>
    </div>
  );
};

export default EventsPost;
