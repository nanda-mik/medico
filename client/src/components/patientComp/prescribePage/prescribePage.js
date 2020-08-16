import React, { Component } from 'react';
import Axios from 'axios';
import PrescriptionList from '../prescriptionList/prescriptionList';
import {Button,Form,Card } from 'react-bootstrap';
import './prescribePage.css';

class prescribePage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      event: [],
      prescribe : "",
      req: false
    };
  }

  componentDidMount() {
    const id = localStorage.getItem('docId');
    console.log(id);
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/patient/getPrescription/` + id,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    Axios(options).then((res) => {
      console.log(res);
      this.setState({ data: res.data.arr, event: res.data.event });
    });
  }
  sendHandler = (e) => {
    e.preventDefault();
    let data = {
      patientProblem : this.state.prescribe
    }
    console.log(data);
  }
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
            this.setState({req:true});
  
        });
}
  render() {
    var d = new Date();
    let count = 0;
    const data = this.state.data;
    const event = this.state.event;
    console.log(data);
    console.log(this.state.event);
    return (
      <div className="Prescription">
        <h3>Prescriptions</h3>
        {
        (event.length > 0) ? 
        
          this.state.event.map((ev) => {
            const s = new Date(ev.event.startTime);
            const u = s.getTime()-d.getTime()
            if(u > 0 ){
              console.log("done");
              return (
                <div className="Event">
                  <Card
          
          key='Success'
          bg="success"
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Header>Your video Appointment</Card.Header>
          <Card.Body>
            <Card.Title>Event time for your appointment with doctor</Card.Title>
            <Card.Text>
              Your Video appointment is Scheduled at {ev.event.startTime}. For meeting details check the registered email .
            </Card.Text>
          </Card.Body>
        </Card>
                count=count+1;
                </div>
              );
            }
            
          }) :
          <div>
          {
            this.state.req ? <Button disabled>Request sent</Button> : <Button variant="outline-success" onClick={this.submitHandler} style={{ borderRadius: '30px',
            padding: '10px 40px'}} >Request for Video appointment</Button> 
          }
          </div>
  }
  {
    count === 1  ? null :  
      this.state.req ? <Button  variant="outline-success" style={{ borderRadius: '30px',
      padding: '10px 40px'}}  disabled>Request sent</Button> : <Button 
      variant="outline-success" onClick={this.submitHandler} style={{ borderRadius: '30px',
      padding: '10px 40px'}} >Request for Video appointment</Button> 
    
  }
        <div>
          {data.length !== 0 ? (
            <PrescriptionList list={data} />
          ) : (
            <h4>No prescriptions</h4>
          )}
        </div>
        <div className="Patient">
        <Form>
          <Form.Group controlId="prescribe">
            <Form.Label>Have some problems ? Say it to your doctor</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              required
              autoFocus
              type="text"
              value={this.state.prescribe}
              onChange={(e) => this.setState({ prescribe: e.target.value })}
              
            ></Form.Control>
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            style={{
              border: 'none',
              borderRadius: '30px',
              padding: '10px 40px',
            }}
            onClick = {this.sendHandler}
          >
            Send to your doctor
          </Button>
        </Form>
        </div>
      </div>
    );
  }
}

export default prescribePage;
