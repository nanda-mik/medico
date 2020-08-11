import React, { useState, useCallback } from 'react';
import Lobby from "../../containers/lobby";
import Room from "../../containers/room";
import Axios from 'axios';

const VideoChat = () => {
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [token, setToken] = useState(null);

    const handleUsernameChange = useCallback(event => {
        setUsername(event.target.value);
    }, []);

    const handleRoomNameChange = useCallback(event => {
        setRoomName(event.target.value);
    }, []);

    const handleSubmit = useCallback(
        async event => {
            event.preventDefault();
            const options = {
                url: "http://localhost:8080/api/video/token",
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    identity: username,
                    room: roomName
                }
            }

            const data = await Axios(options);
            console.log(data);
            setToken(data.data.token);
        },
        [roomName, username]
    );

    const handleLogout = useCallback(event => {
        setToken(null);
    }, []);

    let render;
    if (token) {
        render = (
            <Room roomName={roomName} token={token} handleLogout={handleLogout} />
        );
    } else {
        render = (
            <Lobby
                username={username}
                roomName={roomName}
                handleUsernameChange={handleUsernameChange}
                handleRoomNameChange={handleRoomNameChange}
                handleSubmit={handleSubmit}
            />
        );
    }
    return render;
};

export default VideoChat;
