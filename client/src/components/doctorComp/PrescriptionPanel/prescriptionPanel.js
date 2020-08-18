import React, { Component } from 'react';
import Axios from 'axios';
import UserCardlist from '../UserCardlist/userCardlist';
import Spinner from "../../Spinner/Spinner";

class prescription extends Component {
  constructor() {
    super();
    this.state = {
      patients: [],
      loading: true
    };
  }

  componentDidMount() {
    this.setState({loading:true});
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/doctor/getPatients`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    Axios(options).then((res) => {
      this.setState({ patients: res.data.arr, loading: false });
    });
  }

  render() {
    const patients = this.state.patients;
    console.log(patients);
    return (
      <div style={{paddingTop: "80px" , textAlign:"center"}}>
        <h2>Patients</h2>
        {patients.length !== 0 ? (
          <UserCardlist isReq={false} users={patients} />
        ) : (
          <h4>No patients</h4>
        )}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default prescription;
