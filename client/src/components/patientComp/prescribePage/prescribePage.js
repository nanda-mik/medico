import React, { Component } from "react";
import Axios from "axios";
import PrescriptionList from "../prescriptionList/prescriptionList";

class prescribePage extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const id = localStorage.getItem('docId');
        console.log(id);
        const options = {
            url: 'http://localhost:8080/api/patient/getPrescription/' + id,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        Axios(options)
            .then(res => {
                this.setState({ data: res.data.arr });
            });
    }
    render() {
        const data = this.state.data;
        console.log(data);
        return (
            <div>
                <h3>Prescriptions</h3>
                {data.length !== 0 ? <PrescriptionList list={data} /> : <h4>No prescriptions</h4>}
            </div>
        );
    }
}

export default prescribePage;