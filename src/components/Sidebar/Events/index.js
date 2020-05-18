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
        {data.eventAddress && <SimpleMap data={data.eventAddress} />}
      </div>
      <div className="info-card__info-wrapper">
        {data.contactInfo && (
          <>
            <MapComponent data={data.contactInfo} type={'name'} />
            <MapComponent data={data.contactInfo} type={'phone'} />
            <MapComponent data={data.contactInfo} type={'email'} />
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
