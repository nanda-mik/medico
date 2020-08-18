import React, { Component } from 'react';
import Axios from 'axios';
import UserCardlist from '../UserCardlist/userCardlist';
import Spinner from "../../Spinner/Spinner";

class prescription extends Component {
  constructor() {
    super();
    this.state = {
      doctors: [],
      loading: true
    };
  }

  componentDidMount() {
    this.setState({loading:true});
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/patient/getAppointedDoctors`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    Axios(options).then((res) => {
      this.setState({ doctors: res.data.arr, loading: false });
    });
  }

  render() {
    const doctors = this.state.doctors;
    console.log(doctors);
    return (
      <div style={{paddingTop:"80px"}}>
        <h2>Doctors</h2>
        {doctors.length !== 0 ? (
          <UserCardlist isReq={false} users={doctors} />
        ) : (
          <h4>No Doctors</h4>
        )}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default prescription;
