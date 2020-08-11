import React, { Component } from 'react';
import Axios from 'axios';
import UserCardlist from "../UserCardlist/userCardlist";

class prescription extends Component {
    constructor() {
        super();
        this.state = {
            doctors: []
        };
    }

    componentDidMount() {
        const options = {
            url: 'http://localhost:8080/api/patient/getAppointedDoctors',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        Axios(options)
            .then(res => {
                this.setState({doctors: res.data.arr});
            })
    }

    render() {
        const doctors = this.state.doctors;
        console.log(doctors);
        return (
            <div>
                <h2>Doctors</h2>
                {doctors.length !==0 ? <UserCardlist isReq={false}  users={doctors} /> : <h4>No Doctors</h4>}
            </div>
        );
    }
}

export default prescription;