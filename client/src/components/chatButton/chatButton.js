import React from 'react';
import Styles from './chatButton.module.css';

const ChatButton = (props) => {
  return (
    <div
      style={{ display: props.show ? 'inherit' : 'none' }}
      className={Styles.chatbot}
      onClick={props.clickHandler}
    ></div>
  );
};

export default ChatButton;
