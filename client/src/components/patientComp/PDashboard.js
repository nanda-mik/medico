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

class Pdashboard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
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

      this.props.setPatientProfile(res.data.profile);

      let profiles = { ...res.data.profile };
      console.log(profiles.medicines);
      if (profiles.medicines.length > 0) {
        if (this.props.medicines.length !== profiles.medicines) {
          profiles.medicines.map((medicine) => {
            this.props.setMedicines(medicine);
          });
        }
      }
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
    return (
      <div className="dashboard-Pat">
        <div className="Pdash">
          <Graphbp />
          <Graphd />
          <GraphCovid />
        </div>
        <div className="dashboard-card">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://i.pinimg.com/564x/b3/74/10/b37410384d879643d85b390cdb10c7d1.jpg" />
            <Card.Body>
              <Card.Title>Your Records</Card.Title>
              <Card.Text>
                hello profile details
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
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
