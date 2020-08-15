import React, { useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { Chat, ChatMessage } from '@progress/kendo-react-conversational-ui';
import { IoIosClose } from 'react-icons/io';
import Axios from 'axios';

const Chatbot = (props) => {
  const ref = React.createRef();
  const user = {
    id: 1,
    avatarUrl:
      'https://caknowledge.com/wp-content/uploads/2020/03/Rashmika-Mandanna-Net-Worth.jpeg',
  };
  const bot = {
    id: 0,
    avatarUrl:
      'https://www.filmibeat.com/img/popcorn/profile_photos/rashmika-mandanna-20190705125340-37195.jpg',
  };
  const [messages, setMessages] = useState([
    {
      author: bot,
      text:
        "Hello, this is a demo bot. I don't do much, but I can count symbols!",
      timestamp: new Date(),
    },
  ]);
  const getBotResponse = async (text) => {
    const res = await Axios.post(
      'https://api.eu-de.assistant.watson.cloud.ibm.com/v2/assistants/4d523037-72b3-4759-af0a-a650a2694dcb/message?version=2020-04-01',
      {
        input: {
          text: text.text,
        },
      },
      {
        auth: {
          username: 'apikey',
          password: 'KzQ2sf9QxcspZmsWAvcd0kN6jqcJXoa5REvZ91Y-yimS',
        },
      }
    );
    console.log(res.data.output.generic[0].text);
    const botResponse = Object.assign({}, text);
    botResponse.author = bot;
    botResponse.text = res.data.output.generic[0].text;
    // const message = { author: bot, text: res.data.output.generic[0].text };
    setMessages((pre) => {
      return [...pre, botResponse];
    });
    // this.scrollTo({ behavior: 'smooth' });
    // ref.current.scrollTo({})
  };
  const addNewMessage = (e) => {
    // console.log(e.message);
    getBotResponse(e.message);
    setMessages((pre) => {
      return [...pre, e.message];
    });
    // console.log(e.message);
  };

  return (
    <div
      style={{
        height: '100%',
        position: 'fixed',
        right: props.show ? 0 : '-100%',
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 15,
        display: 'flex',
        transitionDuration: props.show ? '0.3s' : '0s',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://www.filmibeat.com/img/popcorn/profile_photos/rashmika-mandanna-20190705125340-37195.jpg"
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '35px',
              padding: '5px 5px',
            }}
          />
          <div>Chat bot</div>
        </div>

        <IoIosClose
          onClick={props.clickHandler}
          color="grey"
          size={70}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <Chat
        user={user}
        messages={messages}
        onMessageSend={addNewMessage}
        placeholder={'Type a message...'}
        width={400}
        dir="down"
      ></Chat>
    </div>
  );
};

export default Chatbot;
