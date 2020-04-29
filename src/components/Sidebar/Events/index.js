import React from 'react';

import {
  MapComponent,
  MapIcons,
} from '~/components/Sidebar/Events/MapComponent';
import SimpleMap from '~/components/SimpleMap';

const EventsLikeSidebar = ({ data }) => {
  const date = data.eventDate ? data.eventDate.split(' ') : null;
  return (
    <div className="info-card__wrapper">
      <div className={`event__date info-card__date `}>
        {date && <span className="event__day info-card__day">{date[0]}</span>}
        {date && (
          <span className="event__month info-card__month">{date[1]}</span>
        )}
        <span className="event__time info-card__time">{data.eventTime}</span>
      </div>
      <div className="info-card__map">
        <SimpleMap data={data.eventAddress} />
      </div>
      <div className="info-card__info-wrapper">
        <div className="info-card__contact">
          <span className="info-card__description info-card__person">
            Контактна особа
          </span>
          <MapComponent data={data.contactInfo} type={'name'} />
        </div>
        <div className="info-card__contact">
          <span className="info-card__description info-card__phone">
            Телефон
          </span>
          <MapComponent data={data.contactInfo} type={'phone'} />
        </div>
        <div className="info-card__contact">
          <span className="info-card__description info-card__email">email</span>
          <MapComponent data={data.contactInfo} type={'email'} />
        </div>
        <div className="info-card__social">
          <MapIcons data={data.eventSocials} />
        </div>
      </div>
    </div>
  );
};

export default EventsLikeSidebar;
