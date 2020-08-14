import React, { Component } from 'react';
import "./prescribeCard.css";
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Axios from 'axios';

class Cards extends Component {

    submitHandler = (e) => {
        e.preventDefault();
        const id = localStorage.getItem('docId');
        console.log(id);
        const options = {
            url: `${process.env.REACT_APP_LINK}/api/patient/sendVideoRequest/` + id,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        Axios(options)
            .then(res => {
                console.log(res);
            });
    }

    render() {
        return (
            <div>
                <div>
                <Button onClick={this.submitHandler}>Request for Video appointment</Button> 
                </div>
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
            </div>

        );

    }
}

export default Cards;