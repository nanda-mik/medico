import React, { Component } from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  setBloodpressure,
  setCal,
  setCovid,
  setPulse,
} from '../../../Redux/Patient/Patient.action';
import { setDiabetes } from '../../../Redux/Patient/Patient.action';
import './MonitorPat.css';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import { IconButton } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

class MonitorPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bloodpressure: {
        diastolic: '',
        systolic: '',
        date: new Date().toDateString(),
      },
      diabetes: {
        typeA: '',
        typeB: '',
        date: new Date().toDateString(),
      },
      covid: {
        cough: false,
        fever: false,
        tastebuds: false,
        dryThroat: false,
        appetite: false,
        date: new Date().toDateString(),
      },
      pulserate: {
        pulse: '',
        date: new Date().toDateString(),
      },
      calories: {
        calorie: '',
        date: new Date().toDateString(),
      },
      redirect: false,
      bloodpressurearr : [],
      diabetesarr : [],
      covidarr : [],
      pulsearr : [],
      caloriesarr : []
    };
  }
  componentDidMount(){
    this.setState({bloodpressurearr: this.props.bloodpressure,
    diabetesarr: this.props.diabetes,
  covidarr: this.props.covid,
pulsearr : this.props.pulse,
caloriesarr : this.props.cal})
  }
  bphandler = (e) => {
    e.preventDefault();
    var d = new Date();
    var time = d.toLocaleString();
    this.setState({
      bloodpressure: { ...this.state.bloodpressure, date: time },
    });
    console.log(this.state.bloodpressure);
    this.setState(state => {
      
      return {
        bloodpressurearr :  [...state.bloodpressurearr , state.bloodpressure],
        bloodpressure : {...state.bloodpressure ,  diastolic: '', systolic: '', date: new Date().toDateString()}
      }
    })

  };
  dhandler = (e) => {
    e.preventDefault();
    
    this.setState(state => {
      
      return {
        diabetesarr :  [...state.diabetesarr , state.diabetes],
        diabetes : {...state.diabetes ,  typeA: '', typeB: '', date: new Date().toDateString()}
      }
    })
  };
  cvhandler = (e) => {
  e.preventDefault();
    this.setState(state => {
      
      return {
        covidarr :  [...state.covidarr , state.covid],
        covid : {...state.covid ,   cough: false,
          fever: false,
          tastebuds: false,
          dryThroat: false,
          appetite: false,
          date: new Date().toDateString(),}
      }
    })
  };
  phandler = (e) => {
    e.preventDefault();
    this.setState(state => {
      
      return {
        pulsearr :  [...state.pulsearr , state.pulserate],
        pulserate : {...state.pulserate ,  pulse : '', date: new Date().toDateString()}
      }
    })
  };
  chandler = (e) => {
    e.preventDefault();
    this.setState(state => {
      
      return {
        caloriesarr :  [...state.caloriesarr , state.calories],
        calories : {...state.calories ,  calorie : '', date: new Date().toDateString()}
      }
    })
  };
  submitHandler = (e) => {
    
    e.preventDefault();
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/patient/saveMonitorData`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: {
        bloodpressure: this.state.bloodpressurearr,
        diabetes: this.state.diabetesarr,
        covid: this.state.covidarr,
        calories: this.state.caloriesarr,
        pulse: this.state.pulsearr,
      },
    };
    console.log(options.data);
    Axios(options)
      .then((resData) => {
        if (resData.status !== 200 && resData.status !== 201) {
          console.log('Error!');
          throw new Error('Profile Creation failed!');
        } else {
          this.setState({ redirect: true });
        }
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          redirect: false,
        });
      });
      console.log(this.props.bloodpressure);
    this.props.setBloodpressure(this.state.bloodpressurearr);
    this.props.setDiabetes(this.state.diabetesarr);
    this.props.setCovid(this.state.covidarr);
    this.props.setPulse(this.state.pulsearr);
    this.props.setCal(this.state.caloriesarr);
  };
  render() {
    let redirect = null;
    if (this.state.redirect) {
      redirect = <Redirect to="/" />;
    }
    console.log(this.state.bloodpressurearr);
    return (
      <div className="column">
        <div className="row">
          <Form onSubmit={this.submitHandler}>
            <Form.Label>YOUR PROFILE</Form.Label>

            <Form.Row>
              <Form.Group controlId="formGridbloodPressure">
                <Form.Control
                  required
                  autoFocus
                  type="number"
                  placeholder="Your systolic bloopressure(last recored)"
                  value={this.state.bloodpressure.systolic}
                  onChange={(e) =>
                    this.setState({
                      bloodpressure: {
                        ...this.state.bloodpressure,
                        systolic: e.target.value,
                      },
                    })
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridbloodpressure">
                <Form.Control
                  required
                  autoFocus
                  type="number"
                  placeholder="Your disystolic bloodpressure"
                  value={this.state.bloodpressure.diastolic}
                  onChange={(e) =>
                    this.setState({
                      bloodpressure: {
                        ...this.state.bloodpressure,
                        diastolic: e.target.value,
                      },
                    })
                  }
                ></Form.Control>
                <IconButton onClick={this.bphandler}>
                  <SystemUpdateAltIcon fontSize="small" />
                </IconButton>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="formGriddiabetes">
                <Form.Control
                  required
                  autoFocus
                  type="number"
                  placeholder="Your diabetes (type-1)"
                  value={this.state.diabetes.typeA}
                  onChange={(e) =>
                    this.setState({
                      diabetes: {
                        ...this.state.diabetes,
                        typeA: e.target.value,
                      },
                    })
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="formGriddiabetes">
                <Form.Control
                  required
                  autoFocus
                  type="number"
                  placeholder="Your type-2 diabetes"
                  value={this.state.diabetes.typeB}
                  onChange={(e) =>
                    this.setState({
                      diabetes: {
                        ...this.state.diabetes,
                        typeB: e.target.value,
                      },
                    })
                  }
                ></Form.Control>
                <IconButton onClick={this.dhandler}>
                  <SystemUpdateAltIcon fontSize="small" />
                </IconButton>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>YOUR COVID SYMPTOMS</Form.Label>
              <Form.Check
                name="cough"
                label="Cough"
                onChange={() =>
                  this.setState({
                    covid: {
                      ...this.state.covid,
                      cough: !this.state.covid.cough,
                    },
                  })
                }
                id="cough"
              />
              <Form.Check
                name="fever"
                label="Fever"
                onChange={() =>
                  this.setState({
                    covid: {
                      ...this.state.covid,
                      fever: !this.state.covid.fever,
                    },
                  })
                }
                id="fever"
              />
              <Form.Check
                name="tastebuds"
                label="Tastebuds not responding"
                onChange={() =>
                  this.setState({
                    covid: {
                      ...this.state.covid,
                      tastebuds: !this.state.covid.tastebuds,
                    },
                  })
                }
                id="tastebud"
              />
              <Form.Check
                name="dryThroat"
                label="Dry and sour throat"
                onChange={() =>
                  this.setState({
                    covid: {
                      ...this.state.covid,
                      dryThroat: !this.state.covid.dryThroat,
                    },
                  })
                }
                id="drythroat"
              />
              <Form.Check
                name="appetite"
                label="Loss of appetite"
                onChange={() =>
                  this.setState({
                    covid: {
                      ...this.state.covid,
                      appetite: !this.state.covid.appetite,
                    },
                  })
                }
                id="drythroat"
              />
              <IconButton onClick={this.cvhandler}>
                <SystemUpdateAltIcon fontSize="small" />
              </IconButton>
            </Form.Group>
            <Form.Group controlId="heartbeat">
              <Form.Control
                required
                autoFocus
                type="number"
                placeholder="Pulse rate"
                value={this.state.pulserate.pulse}
                onChange={(e) => this.setState({pulserate: {...this.state.pulserate, pulse: e.target.value}})}
              ></Form.Control>
              <IconButton onClick={this.phandler}>
                <SystemUpdateAltIcon fontSize="small" />
              </IconButton>
            </Form.Group>
            <Form.Group controlId="calories">
              <Form.Control
                required
                autoFocus
                type="number"
                placeholder="Calories you loose per day"
                value={this.state.calories.calorie}
                onChange={(e) => this.setState({calories :{...this.state.calories , calorie:e.target.value} })}
              ></Form.Control>
              <IconButton onClick={this.chandler}>
                <SystemUpdateAltIcon fontSize="small" />
              </IconButton>
            </Form.Group>
            <Button
              style={{
                border: 'none',
                borderRadius: '30px',
                padding: '10px 40px',
              }}
              onClick={this.submitHandler}
            >
              Monitor
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
    bloodpressure: state.patient.bloodpressure,
    diabetes: state.patient.diabetes,
    covid: state.patient.covid,
    pulse: state.patient.pulse,
    cal: state.patient.cal,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setBloodpressure: (bloodpressure) =>
    dispatch(setBloodpressure(bloodpressure)),
  setDiabetes: (diabetes) => dispatch(setDiabetes(diabetes)),
  setPulse: (pulse) => dispatch(setPulse(pulse)),
  setCal: (cal) => dispatch(setCal(cal)),
  setCovid: (covid) => dispatch(setCovid(covid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MonitorPatient);
