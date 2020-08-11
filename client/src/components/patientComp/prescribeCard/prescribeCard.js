import React, { Component } from 'react';
import "./prescribeCard.css";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import {Button} from 'react-bootstrap';

class Cards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
               
                   <div className="Panel">
                    
                     <Card className="text-center">
  <Card.Header>Featured</Card.Header>
  <Card.Body>
        <Card.Title>Prescribed on {this.props.data.time}</Card.Title>
    <Card.Text>
    {this.props.data.presData}
    </Card.Text>
    <Button variant="primary">Mark as read</Button>
  </Card.Body>
  <Card.Footer className="text-muted">Rate your doctor</Card.Footer>
</Card>
                </div>
            </div>
        );

    }
}

export default Cards;