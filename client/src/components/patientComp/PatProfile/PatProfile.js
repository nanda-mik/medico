import React, { Component } from 'react';
import {
  setPatientProfile,
  setMedicines,
} from '../../../Redux/Patient/Patient.action';
import { Form, Button, FormControl, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';

class PatProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loc: {
        city: '',
        state: '',
        zip: '',
      },
      gender: '',
      age: '',
      contact: {
        contact1: '',
        contact2: '',
      },
      weight: '',
      height: '',

      disease: '',
      redirect: false,
      medicines: '',
      aboutMe: '',
      file: null,
      medicinesarr : []
    };
  }
  componentDidMount() {
    let profdata = { ...this.props.patientProfile };
    let l = Object.keys(this.props.patientProfile).length;
    console.log(l);
    if (l > 2 || this.props.patientProfile !== null) {
      this.setState({
        loc: {
          ...this.state.loc,
          zip: profdata.zip,
          state: profdata.state,
          city: profdata.city,
        },
        age: profdata.age,
        gender: profdata.gender,
        contact: {
          ...this.state.contact,
          contact2: profdata.contact2,
          contact1: profdata.contact1,
        },
        weight: profdata.weight,
        height: profdata.height,
        disease: profdata.disease,
        aboutMe: profdata.aboutMe,
        medicinesarr : profdata.medicines
      });
    }
  }
  mHandler = (e) => {
    e.preventDefault();
    this.setState(state=>{
      return {
        medicinesarr: [...state.medicinesarr,state.medicines],
        medicines: ""
      }
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);

    const options = {
      url: `${process.env.REACT_APP_LINK}/api/patient/saveProfile`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: {
        location: this.state.loc,
        gender: this.state.gender,
        age: this.state.age,
        contact: this.state.contact,
        weight: this.state.weight,
        height: this.state.height,
        disease: this.state.disease,
        medicines: this.state.medicinesarr,
        aboutMe: this.state.aboutMe,
      },
    };
    let d = { ...options };
    console.log(d.data);
    Axios(options)
      .then((resData) => {
        if (resData.status !== 200 && resData.status !== 201) {
          console.log('Error!');
          throw new Error('Profile Creation failed!');
        }
        console.log(resData);
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          redirect: false,
        });
      });
      this.props.setMedicines(this.state.medicinesarr);
  };

  render() {
    let redirect = false;
    if (this.state.redirect) {
      redirect = <Redirect to="/" />;
    }
    let profdata = { ...this.props.patientProfile };

    return (
      <div className="container">
        <div className="row">
          <Form onSubmit={this.submitHandler}>
            <Form.Label>YOUR PROFILE</Form.Label>

            <Form.Group controlId="formPlaintextName">
              <Form.Label as={Row} column sm="2">
                Name :
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={profdata.name} />
              </Col>
            </Form.Group>
            <Form.Group controlId="formPlaintextEmail">
              <Form.Label as={Row} column sm="2">
                Email :
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={profdata.email}
                />
              </Col>
            </Form.Group>
            <Form.Row>
              <Form.Group md="4" controlId="city">
                <Form.Control
                  required
                  autoFocus
                  type="text"
                  placeholder="Your city"
                  value={this.state.loc.city}
                  onChange={(e) =>
                    this.setState({
                      loc: { ...this.state.loc, city: e.target.value },
                    })
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group md="4" controlId="state">
                <Form.Control
                  required
                  autoFocus
                  type="text"
                  placeholder="Your state"
                  value={this.state.loc.state}
                  onChange={(e) =>
                    this.setState({
                      loc: { ...this.state.loc, state: e.target.value },
                    })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="zip">
                <Form.Control
                  required
                  autoFocus
                  type="text"
                  placeholder="Your Zip"
                  value={this.state.loc.zip}
                  onChange={(e) =>
                    this.setState({
                      loc: { ...this.state.loc, zip: e.target.value },
                    })
                  }
                ></Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="contact">
                <Form.Control
                  required
                  autoFocus
                  type="number"
                  placeholder="Your contact"
                  value={this.state.contact.contact1}
                  onChange={(e) =>
                    this.setState({
                      contact: {
                        ...this.state.contact,
                        contact1: e.target.value,
                      },
                    })
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="contact2">
                <Form.Control
                  required
                  autoFocus
                  type="number"
                  placeholder="Any other contact : "
                  value={this.state.contact.contact2}
                  onChange={(e) =>
                    this.setState({
                      contact: {
                        ...this.state.contact,
                        contact2: e.target.value,
                      },
                    })
                  }
                ></Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="gender">
              <Form.Control
                required
                autoFocus
                type="text"
                placeholder="Enter your gender"
                value={this.state.gender}
                onChange={(e) => this.setState({ gender: e.target.value })}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="age">
              <Form.Control
                required
                autoFocus
                type="text"
                placeholder="Enter your age"
                value={this.state.age}
                onChange={(e) => this.setState({ age: e.target.value })}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="weight">
              <Form.Control
                required
                autoFocus
                type="number"
                placeholder="Enter your weight"
                value={this.state.weight}
                onChange={(e) => this.setState({ weight: e.target.value })}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="height">
              <Form.Control
                required
                autoFocus
                type="text"
                placeholder="Enter your height"
                value={this.state.height}
                onChange={(e) => this.setState({ height: e.target.value })}
              ></Form.Control>
            </Form.Group>

            <Form.Group md="4" controlId="disease">
              <Form.Control
                autoFocus
                type="text"
                placeholder="Name your disease(if any)"
                value={this.state.disease}
                onChange={(e) => this.setState({ disease: e.target.value })}
              ></Form.Control>
            </Form.Group>

            <Form.Row>
              <Col xs="10">
                <Form.Group md="4" controlId="medicines">
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Name medicines"
                    value={this.state.medicines}
                    onChange={(e) =>
                      this.setState({ medicines: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
              </Col>

              <IconButton onClick={this.mHandler}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Form.Row>
            <Form.Group controlId="aboutme">
              <Form.Label>About me</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                required
                autoFocus
                type="text"
                value={this.state.aboutMe}
                onChange={(e) => this.setState({ aboutMe: e.target.value })}
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
            >
              SUBMIT
            </Button>
          </Form>
          {redirect}
        </div>
      </div>
    );
  }
}

let mapStateToProps = function mapStateToProps(state) {
  return {
    patientProfile: state.patient.patientProfile,
    medicines: state.patient.medicines,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setMedicines: (medicine) => dispatch(setMedicines(medicine)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatProfile);
