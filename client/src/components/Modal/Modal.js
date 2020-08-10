import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const modal = props =>
  ReactDOM.createPortal(
    <div className="modal">
      <header className="modal__header">
        <h1>{props.title}</h1>
      </header>
      <div className="modal__content">{props.children}</div>
      <div className="modal__actions">
        <button onClick={props.onCancelModal}>Cancel</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );

export default modal;
