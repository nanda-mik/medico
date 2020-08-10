import React, { Component } from 'react';
import "./prescribeCard.css";

class Cards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='card-container'>
                    <h3>{this.props.data.presData}</h3>
                    <p>{this.props.data.time}</p>
                </div>
            </div>
        );

    }
}

export default Cards;