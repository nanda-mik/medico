import React, { Component } from 'react';
import Axios from 'axios';
import PrescriptionList from '../prescriptionList/prescriptionList';
import { Button, Form } from 'react-bootstrap';
import './prescribePage.css';
import Spinner from "../../Spinner/Spinner";


class prescribePage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      event: [],
      problem: "",
      loading: true

    };
  }

  componentDidMount() {
    const id = localStorage.getItem('docId');
    this.setState({ loading: true });
    console.log(id);
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/patient/getPrescription/` + id,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    Axios(options).then((res) => {
      console.log(res.data);
      this.setState({ data: res.data.prescArr, event: res.data.event, loading: false });
    });
  }

  sendHandler = (e) => {
    e.preventDefault();
    var d = new Date();
    var time = d.toLocaleString();
    const id = localStorage.getItem('docId');
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/patient/sendProblem/`+ id,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data:{
        problem: this.state.problem,
        time: time
      }
    };
    Axios(options)
      .then((resData) => {
        if (resData.status !== 200 && resData.status !== 201) {
          console.log('Error!');
          throw new Error('Sending Problem failed!');
        }
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
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
      <div className="Prescription">
        <h3>Prescriptions</h3>
        <Button onClick={this.submitHandler}>Request for Video appointment</Button>
        <div>
          {data.length !== 0 ? (
            <PrescriptionList list={data} />
          ) : (
              <h4>No prescriptions</h4>
            )}
          {this.state.loading ? <Spinner /> : null}
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
                onChange={(e) => this.setState({ problem: e.target.value })}

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
              onClick={this.sendHandler}
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
