import React, { Component } from 'react';
import "./prescribeCard.css";
import {Card} from 'react-bootstrap';

class Cards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Pres">
                <div className="Data">
                    <Card className="text-center">
  <Card.Header>Precribed data</Card.Header>
  <Card.Body>
        <Card.Title>{this.props.data.presData}</Card.Title>
  </Card.Body>
        <Card.Footer className="text-muted">Prescribed on {this.props.data.time}</Card.Footer>
</Card>
                </div>
            </div>
        );

    }
}

export default Cards;