import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './userCard.css';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import StripeBtn from '../payment/payment';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      redirectToPrescribePage: false,
      req: false
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    const id = this.props.user._id;
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/patient/sendRequest/` + id,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    Axios(options).then((res) => {
      console.log(res);
      this.setState({ req: true });
    });
  };

  onClick = (e) => {
    e.preventDefault();

    localStorage.setItem('docId', this.props.user._id);

    this.setState({ redirectToPrescribePage: true });

    localStorage.setItem('docId', this.props.user._id);
    this.setState({ redirectToPrescribePage: true });
  };

  render() {
    let redirect = false;
    if (this.state.redirect) {
      redirect = <Redirect to="/" />;
    }
    let redirectP = false;
    if (this.state.redirectToPrescribePage) {
      redirect = <Redirect to="/prescribePage" />;
    }
    let req = null;
    if(this.state.req){
      req=<Button disabled>Requested</Button>
    }
    else{
      req=<Button onClick={this.submitHandler}>
      Request for apointment
    </Button>
    }
    return (
      <div>
        <div>
          <Card style={{ width: '12rem' }}>
            {this.props.user.gender === 'male' ? (
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/8c/84/02/8c8402b071744be0e51b5ed27aed091b.jpg"
              />
            ) : (
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/01/02/e2/0102e203205553c49d02f5097126c909.jpg"
              />
            )}
            <Card.Body>
              <Card.Title>{this.props.user.name}</Card.Title>
              <Card.Text>
                Hey!!I am a {this.props.user.specialization} with{' '}
                {this.props.user.yearOfExp} years of experiance.
              </Card.Text>
              {this.props.isReq ? (
                this.state.req ? <Button disabled>Requested</Button> : <Button onClick={this.submitHandler}>
                Request for apointment
              </Button>
              ) : (
                <div>
                  <Button onClick={this.onClick}>Prescription Page</Button>
                  <StripeBtn />
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
        {redirect}
        {redirectP}
      </div>
    );
  }
}

export default Cards;
