import React from 'react';

import Article from '~/components/Article';
import EventsForm from '~/components/EventsForm';

const EventsScene = ({ events }) => (
  <div className="container articles-container">
    <div className="row">
      <div className="col-12">
        <h6 className="text-uppercase tx-family-alt">Афіша</h6>
      </div>
      {events.nodes.map((post, i) =>
        i === 3 ? (
          <>
            <div className="col-lg-3 col-sm-6 col-12">
              <EventsForm
                personText="Контактна особа"
                phoneText="Телефон"
                nameText="Назва"
                dateText="Дата"
                descText="Опис Події"
                submitText="Запропонувати"
                className="zm-form--event"
              />
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <Article type="events" post={post} key={post.id} />
            </div>
          </>
        ) : (
          <div className="col-lg-3 col-sm-6 col-12">
            <Article type="events" post={post} key={post.id} />
          </div>
        )
      )}
    </div>
  </div>
);

export default EventsScene;
