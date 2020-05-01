import React, { useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Modal from './Modal';

import Article from '~/components/Article';

const CrowdfundingsScene = ({ crowdfundings }) => {
  const [isModal, setIsModal] = useState(false);

  function onClick() {
    setIsModal(!isModal);
  }

  return (
    <div className="container crowdfundings-page">
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
