import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import Article from '~/components/Article';
import Form from '~/components/Form';
import PostCardLoader from '~/components/Loaders/PostCardLoader';
import VideoCategoryLoader from '~/components/Loaders/VideoCategoryLoader';

const EventsScene = ({ events, hasForm, children, isLoading }) => {
  if (typeof children === 'object' && !isLoading) {
    return children;
  }

  if (isEmpty(events) && isLoading)
    return (
      <div className="events-page">
        <main>
          <div className="container articles-container">
            <div className="loader-container__desktop">
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
            <div className="loader-container__mobile">
              <div className="row">
                <VideoCategoryLoader
                  type={'mobile'}
                  backgroundColor="#f5f6f7"
                  foregroundColor="#eee"
                />
                <VideoCategoryLoader
                  type={'mobile'}
                  backgroundColor="#f5f6f7"
                  foregroundColor="#eee"
                />
                <VideoCategoryLoader
                  type={'mobile'}
                  backgroundColor="#f5f6f7"
                  foregroundColor="#eee"
                />
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
              {hasForm && (
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
  events: PropTypes.object,
  hasForm: PropTypes.bool,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default EventsScene;
