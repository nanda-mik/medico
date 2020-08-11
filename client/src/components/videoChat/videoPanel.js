import React from 'react';
import "./videoPanel.css";
import VideoChat from './videoChat';

const VideoPanel = () => {
    return (
        <div className="panel">
            <h1>Video Chat with Doctor</h1>
            <VideoChat />
        </div>
    );
}

export default VideoPanel;