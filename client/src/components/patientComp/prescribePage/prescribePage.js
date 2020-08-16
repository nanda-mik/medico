import React, { Component } from 'react';
import Axios from 'axios';
import PrescriptionList from '../prescriptionList/prescriptionList';
import {Button,Form } from 'react-bootstrap';
import './prescribePage.css';

class prescribePage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      event: [],
      prescribe : ""
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

  
        });
}
  render() {
    const data = this.state.data;
    console.log(data);
    console.log(this.state.event);
    return (
      <div className="Prescription">
        <h3>Prescriptions</h3>
        <Button onClick={this.submitHandler}>Request for Video appointment</Button> 
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
