import React, { useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Modal from './Modal';

import Article from '~/components/Article';
import PostCardLoader from '~/components/Loaders/PostCardLoader';

const CrowdfundingsScene = ({ crowdfundings, children, loading = false }) => {
  const [isModal, setIsModal] = useState(false);

  function onClick() {
    setIsModal(!isModal);
  }

  if (typeof children === 'object' && !loading) {
    return children;
  }

  if (loading) {
    return (
      <div className="container">
        <div className="crowdfundings-archive">
          <main className="row crowdfundings-archive__articles">
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="container crowdfundings-page">
      {/* {children} */}
      <main className="row crowdfundings-archive__articles">
        {crowdfundings.nodes.map((crowdfunding) => {
          return (
            <div className="col-md-4" key={crowdfunding.id}>
              <Article type={'crowdfundings'} post={crowdfunding} />
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

export default CrowdfundingsScene;
