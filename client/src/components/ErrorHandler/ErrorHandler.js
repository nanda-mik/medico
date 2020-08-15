import React, { Fragment } from 'react';
import Modal from '../Modal/Modal';

const errorHandler = (props) => {
  console.log(props.error);
  return (
    <Fragment>
      {props.error ? (
        <Modal
          title="An Error Occurred"
          onCancelModal={props.onHandle}
          acceptEnabled
        >
          <p>{props.error.message}</p>
        </Modal>
      ) : null}
    </Fragment>
  );
};

export default errorHandler;
