import React from 'react';

import {
  MapComponent,
  MapIcons,
} from '~/components/Sidebar/Events/MapComponent';
import SimpleMap from '~/components/SimpleMap';
import ArticleDateTime from '~/components/Article/DateTime';
import ArticleList from '~/components/Article/List';

const EventsLikeSidebar = ({ data, withTime, withList }) => {
  const date = data.eventDate;
  return (
    <div className="info-card__wrapper">
      {withTime && <ArticleDateTime time={data.eventTime} date={date} />}
      {withList && <ArticleList info={data} />}
      <div className="info-card__map">
        <SimpleMap data={data.eventAddress} />
      </div>
      <div className="info-card__info-wrapper">
        {data.contactInfo && (
          <>
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
              <span className="info-card__description info-card__email">
                email
              </span>
              <MapComponent data={data.contactInfo} type={'email'} />
            </div>
          </>
        )}
        {data.eventSocials && (
          <div className="info-card__social">
            <MapIcons data={data.eventSocials} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsLikeSidebar;
