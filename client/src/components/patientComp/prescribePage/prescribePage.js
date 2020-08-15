import React, { Component } from 'react';
import Axios from 'axios';
import PrescriptionList from '../prescriptionList/prescriptionList';
import {Button } from 'react-bootstrap';

class prescribePage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      event: []
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
      <div>
        <h3>Prescriptions</h3>
        <Button onClick={this.submitHandler}>Request for Video appointment</Button> 
        <div>
          {data.length !== 0 ? (
            <PrescriptionList list={data} />
          ) : (
            <h4>No prescriptions</h4>
          )}
        </div>
      </div>
    );
  }
}

export default prescribePage;
