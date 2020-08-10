import React, { Component } from 'react';
import Axios from 'axios';
import UserCardlist from "../UserCardlist/userCardlist";

class prescription extends Component {
    constructor() {
        super();
        this.state = {
            patients: []
        };
    }

    componentDidMount() {
        const options = {
            url: 'http://localhost:8080/api/doctor/getPatients',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        Axios(options)
            .then(res => {
                this.setState({patients: res.data.arr});
            })
    }

    render() {
        const patients = this.state.patients;
        console.log(patients);
        return (
            <div>
                <h2>Patients</h2>
                {patients.length !==0 ? <UserCardlist isReq={false}  users={patients} /> : <h4>No patients</h4>}
            </div>
        );
    }
}

export default prescription;