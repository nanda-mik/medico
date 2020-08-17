import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Axios from 'axios';
import Spinner from "../Spinner/Spinner";

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            doctors: [],
            patients: [],
            consultation: [],
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        const options = {
            url: `${process.env.REACT_APP_LINK}/api/admin/data`,
            method: 'GET'
        };
        Axios(options)
            .then(res => {
                this.setState({ doctors: res.data.doctors, patients: res.data.patients, consultation: res.data.underConsult, loading: false });
                console.log(res);
            })
    }
    render() {
        const { doctors, patients, consultation } = this.state;
        return (
            <div>
                <h2>Doctors</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Name</th>
                            <th>Specialization</th>
                            <th>Age</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((el, i) => {
                            return (
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{el.name}</td>
                                    <td>{el.specialization}</td>
                                    <td>{el.age}</td>
                                    <td>{el.gender}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <h2>Patients</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Name</th>
                            <th>Disease</th>
                            <th>Age</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((el, i) => {
                            return (
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{el.name}</td>
                                    <td>{el.disease}</td>
                                    <td>{el.age}</td>
                                    <td>{el.gender}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <h2>Patients Under Consultation</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Doctor</th>
                            <th>Patient</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultation.map((el, i) => {
                            return (
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{el.docName}</td>
                                    <td>{el.patName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {this.state.loading ? <Spinner /> : null}
            </div>
        );
    }
}

export default Admin;