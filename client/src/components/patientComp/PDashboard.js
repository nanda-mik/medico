import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Axios from "axios";
import {connect} from 'react-redux';
import { setPatientProfile, setMedicines, setBloodpressure, setCovidTracker,setDiabetes, setPulse, setCal, setCovid} from '../../Redux/Patient/Patient.action';
import Covid from './Covid/Covid';
import './Pdashboard.css';
import Graphbp from './Graphs/Graphbp/Graphbp';
import Graphd from './Graphs/Graphd/Graphd';
import GraphCovid from './Graphs/GraphCovid/GraphCovid';
import Carousel from 'react-bootstrap/Carousel'

class Pdashboard extends Component{
    constructor(){
        super();
    }

    componentDidMount() {
        const options = {
            url: 'http://localhost:8080/api/patient/getProfile',
            method: 'GET',
            headers:{
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            }
        };
        Axios(options)
            .then(res => {
                console.log(res.data);
                console.log(this.props.patientprofile)
                if(this.props.patientprofile===null){
                    this.props.setPatientProfile(res.data.profile);
                }
                let profiles = {...res.data.profile};
                console.log(profiles.medicines);
                if(profiles.medicines.length > 0){
                if(this.props.medicines.length !== profiles.medicines){
                    profiles.medicines.map((medicine) => {
                        this.props.setMedicines(medicine);
                    })
                }
            }
            console.log(res.data.monitorData);
            if(res.data.monitorData){
                let monitors = {...res.data.monitorData};
                console.log(this.props.bloodpressure);
                console.log(monitors.bloodpressure);
               
                if(this.props.bloodpressure.length !== monitors.bloodpressure.length){
                    monitors.bloodpressure.map((bp) => {
                        this.props.setBloodpressure(bp);
                    });
                }
            
               
                if(this.props.diabetes.length !== monitors.diabetes.length){
                    monitors.diabetes.map((db) => {
                        this.props.setDiabetes(db);
                    });
                }
                if(this.props.pulse.length !== monitors.pulse.length){
                    monitors.pulse.map((p) => {
                        this.props.setPulse(p);
                    });
                }
                if(this.props.covid.length !== monitors.covid.length){
                    monitors.covid.map((cov) => {
                        this.props.setCovid(cov);
                    })
                }
                if(this.props.cal.length !== monitors.calories.length){
                    monitors.calories.map((cal) => {
                        this.props.setCal(cal);
                    })
                }
                this.props.covid.map((cov)=>{
                    let c=0;
                    if(cov.cough===true){
                        c = c+1;
                    }
                    if(cov.fever===true){
                        c=c+1;
                    }
                    if(cov.tastebud===true){
                        c=c+1;
                    }
                    if(cov.dryThroat===true){
                        c=c+1;
                    }
                    if(cov.appetite===true){
                        c=c+1;
                    }
                    let date = cov.date;
                    let count = Math.round((c/5)*100);
                    let data = { count, date}
                    console.log(data);
                    console.log(this.props.covid.length);
                    console.log(this.props.covidTracker.length);
                    if(this.props.covid.length!== this.props.covidTracker.length){
                        this.props.setCovidTracker(data);
                    }
        
                })
                }

            });
    }

    render(){

        return(
            <div className="Pdash">
                <div className="Caro">
               <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="First slide"
      
    />
    <Carousel.Caption>
      <h3>Let us begin a new era of communication</h3>
      <p>Medico brings u easy monitoring process flexible and userfriendly access and many more.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
      
    />

    <Carousel.Caption>
      <h3>Find best doctors on your fingertips</h3>
      <p>We give you to choose your own doctor from your own locality and get monitored by them.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Chat rooms</h3>
      <p>Chat rooms best quality appointments.Lets stay healthy together.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
                </div>
                <Graphbp/>
                <Graphd/>
               <GraphCovid/>
            </div>
        );
    }
}

let mapStateToProps = function mapStateToProps (state){
    return {
        medicines : state.patient.medicines,
        patientprofile : state.patient.patientProfile,
        bloodpressure : state.patient.bloodpressure,
        diabetes : state.patient.diabetes,
        pulse : state.patient.pulse,
        cal : state.patient.cal,
        covid : state.patient.covid,
        covidTracker : state.patient.covidTracker

    }
}

const mapDispatchToProps = dispatch => ({
    setPatientProfile : patientprofile => dispatch(setPatientProfile(patientprofile)),
    setMedicines : medicines => dispatch(setMedicines(medicines)),
    setBloodpressure : bloopdpressure => dispatch(setBloodpressure(bloopdpressure)),
    setDiabetes : diabetes => dispatch(setDiabetes(diabetes)),
    setPulse : pulse => dispatch(setPulse(pulse)),
    setCal : cal => dispatch(setCal(cal)),
    setCovid : covid => dispatch(setCovid(covid)),
    setCovidTracker : covidt => dispatch(setCovidTracker(covidt))

  });

export default connect(mapStateToProps,mapDispatchToProps)(Pdashboard);