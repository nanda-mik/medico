import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import {
  setPatientProfile,
  setMedicines,
  setBloodpressure,
  setCovidTracker,
  setDiabetes,
  setPulse,
  setCal,
  setCovid,
} from '../../Redux/Patient/Patient.action';
import Covid from './Covid/Covid';
import './Pdashboard.css';
import Graphbp from './Graphs/Graphbp/Graphbp';
import Graphd from './Graphs/Graphd/Graphd';
import GraphCovid from './Graphs/GraphCovid/GraphCovid';
import Card from 'react-bootstrap/Card'

import { fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
 
const styles = {
  fadeIn: {
    animation: 'x 1.5s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}

import Spinner from "../Spinner/Spinner";


class Pdashboard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/patient/getProfile`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    Axios(options).then((res) => {
      console.log(res.data);
      console.log(this.props.patientprofile);
      this.setState({loading: false});
      this.props.setPatientProfile(res.data.profile);

      let profiles = { ...res.data.profile };
      console.log(profiles.medicines);
        
            this.props.setMedicines(profiles.medicines);
      console.log(res.data.monitorData);
      if (res.data.monitorData) {
        let monitors = { ...res.data.monitorData };
        console.log(this.props.bloodpressure);
        console.log(monitors.bloodpressure);

        this.props.setBloodpressure(monitors.bloodpressure);
        this.props.setDiabetes(monitors.diabetes);
        this.props.setPulse(monitors.pulse);
        this.props.setCovid(monitors.covid);
        this.props.setCal(monitors.calories);
        this.props.covid.map((cov) => {
          let c = 0;
          if (cov.cough === true) {
            c = c + 1;
          }
          if (cov.fever === true) {
            c = c + 1;
          }
          if (cov.tastebud === true) {
            c = c + 1;
          }
          if (cov.dryThroat === true) {
            c = c + 1;
          }
          if (cov.appetite === true) {
            c = c + 1;
          }
          let date = cov.date;
          let count = Math.round((c / 5) * 100);
          let data = { count, date };
          console.log(data);
          console.log(this.props.covid.length);
          console.log(this.props.covidTracker.length);
          if (this.props.covid.length !== this.props.covidTracker.length) {
            this.props.setCovidTracker(data);
          }
        });
      }
    });
  }
 
  render() {
    let patient = {...this.props.patientprofile};
    return (
      <StyleRoot>
      <div className="dasPat" style={styles.fadeIn}>
        <div className="Dascard">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://i.pinimg.com/564x/b3/74/10/b37410384d879643d85b390cdb10c7d1.jpg" />
            <Card.Body>
              <Card.Title>Your Breif Records</Card.Title>
              <Card.Text>
                Hello , {patient.name} you are suffering from {patient.disease} and some of the medicine you are intaking are 
                {
                  this.props.medicines.map((med)=>{
                    return(
                      <Card.Text>{med}{' '}</Card.Text>
                    );
                    
                  })
                }
                Your weight is {patient.weight}.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="Pdash">
          <Graphbp />
          <Graphd />
          <GraphCovid />
        </div>
        

        {this.state.loading ? <Spinner /> : null}

      </div>
      </StyleRoot>
    );
  }
}

let mapStateToProps = function mapStateToProps(state) {
  return {
    medicines: state.patient.medicines,
    patientprofile: state.patient.patientProfile,
    bloodpressure: state.patient.bloodpressure,
    diabetes: state.patient.diabetes,
    pulse: state.patient.pulse,
    cal: state.patient.cal,
    covid: state.patient.covid,
    covidTracker: state.patient.covidTracker,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setPatientProfile: (patientprofile) =>
    dispatch(setPatientProfile(patientprofile)),
  setMedicines: (medicines) => dispatch(setMedicines(medicines)),
  setBloodpressure: (bloopdpressure) =>
    dispatch(setBloodpressure(bloopdpressure)),
  setDiabetes: (diabetes) => dispatch(setDiabetes(diabetes)),
  setPulse: (pulse) => dispatch(setPulse(pulse)),
  setCal: (cal) => dispatch(setCal(cal)),
  setCovid: (covid) => dispatch(setCovid(covid)),
  setCovidTracker: (covidt) => dispatch(setCovidTracker(covidt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pdashboard);
