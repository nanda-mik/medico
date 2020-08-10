import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Axios from "axios";
import {connect} from 'react-redux';
import {setDoctorProfile,setPatientMonitor} from '../../Redux/Doctor/Doctor.Actions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton } from '@material-ui/core';
import PatientMonitored from './PatientMonitored';

class dashboard extends Component{
   constructor(props){
       super(props);
       this.state = {
           patient : this.props.patient,
           hidden : true
       }
   }

    componentDidMount() {
        const options = {
            url: 'http://localhost:8080/api/doctor/getProfile',
            method: 'GET',
            headers:{
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            }
        };
        Axios(options)
            .then(res => {
                console.log(res);
                this.props.setDoctorProfile(res.data.profile);
                if(res.data.patient.length!==this.props.patient.length){
                res.data.patient.map((pat) => {
                    console.log(pat);
                    this.props.setPatientMonitor(pat);
                });
            }
            });

        }
        
    
    

    render(){
        
         
        return(
            <div>
                {console.log(this.props.patient)}
                <h1>Doctor dashboard!!</h1>
                {
                    this.props.patient.map((pat) => {
            
                        return(
                            <div>
                                <h1>{pat.profile.name}</h1>
                                <h2>{pat.profile.disease}</h2>
                                <IconButton onClick={() => this.setState({ hidden : !this.state.hidden })}> <ExpandMoreIcon/> </IconButton>
                                {
                                    this.state.hidden ? null : <PatientMonitored id = {pat.profile._id}/>
                                }
                            </div>
                     );
                            
            
                    })
                }
            </div>
        );
    }
}
let mapStateToProps = function mapStateToProps (state) {
    return {
        patient : state.doctor.patientMonitored
    }
}

const mapDispatchToProps = dispatch => ({
    setDoctorProfile : profile => (dispatch(setDoctorProfile(profile))),
    setPatientMonitor : patient => (dispatch(setPatientMonitor(patient)))
});

export default connect(mapStateToProps, mapDispatchToProps)(dashboard);