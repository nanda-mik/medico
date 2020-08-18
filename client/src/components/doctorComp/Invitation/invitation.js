import React, { Component } from 'react';
import Axios from 'axios';
import UserCardlist from '../UserCardlist/userCardlist';
import { setInvitations } from '../../../Redux/Doctor/Doctor.Actions';
import { connect } from 'react-redux';

class invitation extends Component {
  constructor() {
    super();
    this.state = {
      invite: [],
    };
  }

  componentDidMount() {
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/doctor/checkInvitation`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    Axios(options).then((res) => {
      console.log(res.data.arr);
      if (
        res.data.arr.length !== this.props.invitations.length ||
        res.data.arr !== null
      ) {
        this.props.setInvitation(res.data.arr);
      }
      this.setState({ invite: res.data.arr });
    });
  }

  render() {
    const patient = this.state.invite;
    console.log(patient);
    return (
      <div style={{paddingTop: "80px",textAlign:"center"}}>
        <h2>Appointment Requests</h2>
        {patient.length !== 0 ? (
          <UserCardlist isReq={true} users={patient} />
        ) : (
          <h4>No requests</h4>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setInvitation: (invitation) => dispatch(setInvitations(invitation)),
});
let mapStateToProps = function mapStateToProps(state) {
  return {
    invitations: state.doctor.invitations,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(invitation);
