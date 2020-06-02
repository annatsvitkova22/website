import React, { useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import Modal from './Modal';

import Article from '~/components/Article';
import PostCardLoader from '~/components/Loaders/PostCardLoader';

const CrowdfundingsScene = ({ crowdfundings, children, isLoading }) => {
  const [isModal, setIsModal] = useState(false);

  function onClick() {
    setIsModal(!isModal);
  }

  if (typeof children === 'object' && !isLoading) {
    return children;
  }

  if (isEmpty(crowdfundings) && isLoading) {
    return (
      <div className="container">
        <main className="row">
          <div className="col-md-4">
            <div className="loader-container__desktop">
              <PostCardLoader type="small" />
            </div>
            <div
              className="lodaer-container__mobile"
              style={{ marginBottom: '25px' }}
            >
              <PostCardLoader type={'mobile'} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="loader-container__desktop">
              <PostCardLoader type="small" />
            </div>
            <div
              className="lodaer-container__mobile"
              style={{ marginBottom: '25px' }}
            >
              <PostCardLoader type={'mobile'} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="loader-container__desktop">
              <PostCardLoader type="small" />
            </div>
            <div
              className="lodaer-container__mobile"
              style={{ marginBottom: '25px' }}
            >
              <PostCardLoader type={'mobile'} />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="container crowdfundings-page">
      <main className="row crowdfundings-archive__articles">
        {crowdfundings.nodes.map((crowdfunding) => {
          return (
            <div className="col-md-4" key={crowdfunding.id}>
              <Article
                imageSize={'mediumLarge'}
                type={'crowdfundings'}
                post={crowdfunding}
              />
            </div>
          );
        })}
        <div className="col-12">
          <button onClick={onClick} className="zm-button tx-green w-100">
            Створити Проект
          </button>
          <ReactCSSTransitionGroup
            transitionName="modal"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {isModal && <Modal trigger={setIsModal} />}
          </ReactCSSTransitionGroup>
        </div>
      </main>
    </div>
  );
};

CrowdfundingsScene.propTypes = {
  crowdfundings: PropTypes.object,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default CrowdfundingsScene;
