import React, { useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import Modal from './Modal';

import getCFStatus from '~/lib/getCFStatus';
import Article from '~/components/Article';
import PostCardLoader from '~/components/Loaders/PostCardLoader';

const CrowdfundingsScene = ({ crowdfundings, children, isLoading }) => {
  const [isModal, setIsModal] = useState(false);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (crowdfundings) {
      const sorted = crowdfundings.nodes;
      const transform = sorted.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.id]: { ...cur },
        };
      }, {});

      const ss = sorted
        .map((post) => {
          return {
            id: post.id,
            value: getCFStatus(post).value === 'active' ? getRandomInt(100) : 0,
            status: getCFStatus(post).value,
          };
        })
        .sort((a, b) => b.value - a.value)
        .map((item) => {
          return {
            ...transform[item.id],
          };
        });

      setState(ss);
    }
  }, [crowdfundings]);

  function onClick() {
    setIsModal(!isModal);

    document.querySelector('body').classList.add('isB-MenuOpen');
  }

  if (typeof children === 'object' && !isLoading) {
    return children;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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
              className="loader-container__mobile"
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
              className="loader-container__mobile"
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
              className="loader-container__mobile"
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
    <>
      {state && (
        <div className="container crowdfundings-page">
          <main className="row crowdfundings-archive__articles">
            {state.slice(0, 3).map((crowdfunding) => {
              return (
                <div className="col-md-4" key={crowdfunding.id}>
                  <Article
                    imageSize={'zm_md_rect'}
                    type={'crowdfundings'}
                    post={crowdfunding}
                  />
                </div>
              );
            })}
            <div className="col-12">
              <button
                onClick={onClick}
                className="zm-button zm-button--dark tx-green w-100"
              >
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
      )}
    </>
  );
};

CrowdfundingsScene.propTypes = {
  crowdfundings: PropTypes.object,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default CrowdfundingsScene;
