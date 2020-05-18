import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import Article from '~/components/Article';
import Form from '~/components/Form';
import PostCardLoader from '~/components/Loaders/PostCardLoader';

const EventsScene = ({ events, form, children, loading }) => {
  if (typeof children === 'object' && !loading) {
    return children;
  }

  if (isEmpty(events) && loading)
    return (
      <div className="events-page">
        <main>
          <div className="container articles-container">
            <div className="row">
              <div className="col-lg-3 col-sm-6 col-12">
                <PostCardLoader type="event" />
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <PostCardLoader type="event" />
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <PostCardLoader type="event" />
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <PostCardLoader type="event" />
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <PostCardLoader type="event" />
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <PostCardLoader type="event" />
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <PostCardLoader type="event" />
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <PostCardLoader type="event" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );

  return (
    <div className="container">
      <div className="row">
        {events.nodes.map((post, i) =>
          i === 3 ? (
            <React.Fragment key={post.id}>
              {form && (
                <div className="col-lg-3 col-sm-6 col-12">
                  <Form id={1} className="zm-form--event" />
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
};

EventsScene.propTypes = {
  events: PropTypes.any,
  form: PropTypes.any,
  children: PropTypes.any,
  loading: PropTypes.bool,
};

export default EventsScene;
