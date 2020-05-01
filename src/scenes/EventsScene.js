import React from 'react';

import Article from '~/components/Article';
import Form from '~/components/Form';

const EventsScene = ({ events, form }) => (
  <div className="container">
    <div className="row">
      {events.nodes.map((post, i) =>
        i === 3 ? (
          <React.Fragment key={post.id}>
            {form && (
              <div className="col-lg-3 col-sm-6 col-12">
                <Form
                  id={1}
                  className="zm-form--event"
                />
              </div>
            )}
            <div className="col-lg-3 col-sm-6 col-12">
              <Article type="events" post={post} />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment key={post.id}>
            <div className="col-lg-3 col-sm-6 col-12">
              <Article type="events" post={post} />
            </div>
          </React.Fragment>
        )
      )}
    </div>
  </div>
);

export default EventsScene;
