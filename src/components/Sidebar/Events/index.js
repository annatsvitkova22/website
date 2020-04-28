import React from 'react';

import {
  MapComponent,
  MapIcons,
} from '~/components/Sidebar/Events/MapComponent';
import SimpleMap from '~/components/SimpleMap';

const EventsLikeSidebar = ({ data }) => {
  return (
    <div className="info-card__wrapper">
      <div className={`event__date info-card__date `}>
        <span className="event__day info-card__day">24</span>
        <span className="event__month info-card__month">Березня</span>
        <span className="event__time info-card__time">11:00</span>
      </div>
      <div className="info-card__map">
        <SimpleMap data={data.eventAddress} />
      </div>
      <div className="info-card__contact">
        <span className="info-card__description info-card__person">
          Контактна особа
        </span>
        <MapComponent data={data.contactInfo} type={'name'} />
      </div>
      <div className="info-card__contact">
        <span className="info-card__description info-card__phone">Телефон</span>
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
  );
};

export default EventsLikeSidebar;
