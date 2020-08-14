import React, { Component } from "react";
import Axios from "axios";
import { Form, Button, FormControl } from 'react-bootstrap';
import PrescriptionList from "../prescriptionList/prescriptionList";
import {connect} from 'react-redux';


    /*const CLIENT_ID = "185334468057-0ikd8rea7drp4rmkjvte2n1k756e60mf.apps.googleusercontent.com";
    const API_KEY ="AIzaSyB1wAxp6JbIg3GEgnPjOYW_DAfVnMl5Udo";
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";*/
class prescribePage extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            prescriptionId: null,
            prescribe: ""
        };
    }
    
   

    componentDidMount() {
        const id = localStorage.getItem('patId');
        const options = {
            url: 'http://localhost:8080/api/doctor/getPrescription/' + id,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        Axios(options)
            .then(res => {
                console.log(res.data.arr);
                this.setState({ data: res.data.arr });
                this.setState({prescriptionId: res.data.prescriptionId});
            });

          
    }

    submtiHandler = (e) => {
        e.preventDefault();
        console.log(this.state.prescribe);
        var d = new Date();
        var time = d.toLocaleString();
        const id = localStorage.getItem('patId');
        const options = {
            url: "http://localhost:8080/api/doctor/addPrescription/"+id,
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                prescribed: this.state.prescribe,
                time: time
            }
        }
        Axios(options)
        .then(resData => {
            if (resData.status !== 200 && resData.status !== 201) {
                console.log('Error!');
                throw new Error('Prescription failed!');
            }
            console.log(resData);
        })
        .catch(err => {
            console.log(err);
        })
    }


    render() {
       const id = localStorage.getItem('patId');
        const data = this.state.data;
        console.log(data);
        return (
            <div>
                <div>
                    <h3>Prescriptions</h3>
                    {
                         
                    this.props.patProfile.map((pat) => {
                        console.log(pat.profile._id);
                        if(pat.profile._id===id){
                        console.log(pat.profile);
                        return(
                            <div>
                            <h4>{pat.profile.name}</h4>
                        <h4>{pat.profile.gender}</h4>
                        <h4>{pat.profile.age}</h4>
                        <h4>{pat.profile.weight}</h4>
                        <h4>{[pat.profile.height]}</h4>
                        </div>
                    );
                        console.log(this.state.patientProfile);
                }
            })
                    }
                    {data.length !== 0 ? <PrescriptionList list={data}/>:<h4>No prescriptions</h4>}
                </div>
                <Form onSubmit={this.submtiHandler}>
                    <Form.Group controlId="prescribe">
                        <Form.Label>Prescribe Here</Form.Label>
                        <Form.Control as="textarea" rows="3"
                            required
                            autoFocus
                            type="text"
                            value={this.state.prescribe}
                            onChange={(e) => this.setState({ prescribe: e.target.value })}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button

                        variant="success"
                        type="submit"
                        style={{
                            border: "none",
                            borderRadius: "30px",
                            padding: "10px 40px",
                        }}
                    >
                        PRESCRIBE
                    </Button>
                    
                </Form>
            </div>
        );
    }
}


let mapStateToProps = function mapStateTopProps (state) {
    return{
    patProfile : state.doctor.patientMonitored
    }
}

export default connect(mapStateToProps)(prescribePage);