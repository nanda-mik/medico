import React, { Component } from 'react';
import { Form, Button, FormControl, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router';
import Axios from 'axios';
import "./DocProfile.css";
import { connect } from 'react-redux';
import { setDoctorProfile } from '../../../Redux/Doctor/Doctor.Actions';

class DocProfile extends Component {
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
      qualification: {
        university: '',
        specialization: '',
        honors: '',
      },
      yearOfExp: '',
      aboutMe: '',
      redirect: false,
    };
  }
  componentDidMount() {
    let l = Object.keys(this.props.profile).length;
    console.log(l);
    if (l > 2 || this.props.profile === null) {
      let data = { ...this.props.profile };
      this.setState({
        loc: {
          ...this.state.loc,
          city: data.city,
          state: data.state,
          zip: data.zip,
        },
        gender: data.gender,
        age: data.age,
        contact: {
          ...this.state.contact,
          contact1: data.contact1,
          contact2: data.contact2,
        },
        qualification: {
          ...this.state.qualification,
          university: data.university,
          specialization: data.specialization,
          honors: data.honors,
        },
        yearOfExp: data.yearOfExp,
        aboutMe: data.aboutMe,
      });
    }
  }
  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);

    const options = {
      url: `${process.env.REACT_APP_LINK}/api/doctor/saveProfile`,
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
        qualification: this.state.qualification,
        yearOfExp: this.state.yearOfExp,
        aboutMe: this.state.aboutMe,
      },
    };
    Axios(options)
      .then((resData) => {
        console.log(resData);
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
  };

  render() {
    let redirect = false;
    if (this.state.redirect) {
      redirect = <Redirect to="/" />;
    }
    let data = { ...this.props.profile };
    const styles = {}
    return (
      <div className="container-prof">
        <div className="row">
          <Form onSubmit={this.submitHandler}>
            <Form.Label>YOUR PROFILE</Form.Label>
            <Form.Group controlId="formPlaintextName">
              <Form.Label as={Row} column sm="2">
                Name :
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={data.name} />
              </Col>
            </Form.Group>
            <Form.Group controlId="formPlaintextEmail">
              <Form.Label as={Row} column sm="2">
                Email :
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={data.email} />
              </Col>
            </Form.Group>
            <Form.Row>
              <Form.Group controlId="city">
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
              <Form.Group controlId="state">
                <Form.Control
                  required
                  autoFocus
                  type="text"
                  placeholder="Your State"
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
            <Form.Row>
              <Form.Group controlId="university">
                <Form.Control
                  required
                  autoFocus
                  type="text"
                  placeholder="university"
                  value={this.state.qualification.university}
                  onChange={(e) =>
                    this.setState({
                      qualification: {
                        ...this.state.qualification,
                        university: e.target.value,
                      },
                    })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="specialization">
                <Form.Control
                  required
                  autoFocus
                  type="text"
                  placeholder="Your Specialization"
                  value={this.state.qualification.specialization}
                  onChange={(e) =>
                    this.setState({
                      qualification: {
                        ...this.state.qualification,
                        specialization: e.target.value,
                      },
                    })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="honors">
                <Form.Control
                  required
                  autoFocus
                  type="text"
                  placeholder="Honors or Awards"
                  value={this.state.qualification.honors}
                  onChange={(e) =>
                    this.setState({
                      qualification: {
                        ...this.state.qualification,
                        honors: e.target.value,
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
            <Form.Group controlId="yearofExp">
              <Form.Control
                required
                autoFocus
                type="number"
                placeholder="Year of Experience"
                value={this.state.yearOfExp}
                onChange={(e) => this.setState({ yearOfExp: e.target.value })}
              ></Form.Control>
            </Form.Group>
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
    profile: state.doctor.doctorProfile,
  };
};

export default connect(mapStateToProps)(DocProfile);
