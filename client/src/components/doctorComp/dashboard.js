import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import {
  setDoctorProfile,
  setPatientMonitor,
} from '../../Redux/Doctor/Doctor.Actions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton } from '@material-ui/core';
import PatientMonitored from './PatientMonitored';
import { Card, Button } from 'react-bootstrap';
import './Dashboard.css';
import Report from './Report';

class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: this.props.patient,
      hidden: true,
      id: null,
    };
  }

  componentDidMount() {
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/doctor/getProfile`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    Axios(options).then((res) => {
      console.log(res);
      this.props.setDoctorProfile(res.data.profile);
      if (res.data.patient.length !== this.props.patient.length) {
        res.data.patient.map((pat) => {
          console.log(pat);
          this.props.setPatientMonitor(pat);
        });
      }
    });
  }

  render() {
    return (
      <div style={{paddingTop:"80px" , textAlign:"center", fontFamily: "sans-serif" ,fontSize:"15px"} }>
        {console.log(this.props.patient)}
        <h1>Doctor dashboard!!</h1>
        {this.props.patient.length > 0
          ? this.props.patient.map((pat) => {
              return (
                <div className="Patient">
                  <Report id={pat.profile.id} users={pat.profile}/>
                </div>
              );
            })
          : <h1>No Patients under monitor!!</h1>}
      </div>
    );
  }
}
let mapStateToProps = function mapStateToProps(state) {
  return {
    patient: state.doctor.patientMonitored,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setDoctorProfile: (profile) => dispatch(setDoctorProfile(profile)),
  setPatientMonitor: (patient) => dispatch(setPatientMonitor(patient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(dashboard);
