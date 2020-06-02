import React from 'react';

import Content from '~/components/Content';
import EventsLikeSidebar from '~/components/Sidebar/Events';

const Contacts = ({ page }) => {
  return (
    <div className="feedback__outer">
      <div className="feedback__inner-form">
        <Content content={page.blocks} />
      </div>
      <div className="feedback__inner-map">
        <EventsLikeSidebar data={page.zmAfishaACF} withAdress={true}/>
      </div>
    </div>
  );
};

export default Contacts;
