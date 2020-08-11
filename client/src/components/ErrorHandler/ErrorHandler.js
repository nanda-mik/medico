import React, { Fragment } from 'react';
import Modal from '../Modal/Modal';

const errorHandler = props => (
  <Fragment>
    {props.error && (
      <Modal
        title="An Error Occurred"
        onCancelModal={props.onHandle}

        
        

        acceptEnabled

      >
        <p>{props.error.message}</p>
      </Modal>
    )}
  </Fragment>
);

export default errorHandler;
