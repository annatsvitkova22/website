import React from 'react';
import { createPortal } from 'react-dom';

import Times from '~/static/images/times-small';

const Modal = ({ trigger }) => {
  function onClick() {
    trigger(false);
  }

  return createPortal(
    <div className="modal">
      <div onClick={onClick} className="modal__overlay" />
      <div className="modal-content">
        <h2 className="font-weight-semibold">Створити проект</h2>
        <button className="modal__close" onClick={onClick}>
          <Times />
        </button>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
