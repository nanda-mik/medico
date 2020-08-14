import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Axios from 'axios';
import {
  removeInvitations,
  setPatientMonitor,
} from '../../../Redux/Doctor/Doctor.Actions';
import { Redirect } from 'react-router';

class InvProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  submitHandler = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/doctor/confirmInvitation/` + id,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    Axios(options).then((res) => {
      console.log(res);

      this.props.setPatientMonitor(res.data);
    });
    this.props.removeInvitation(this.props.match.params.id);
    this.setState({ redirect: true });
  };
  render() {
    let form = null;
    form = this.props.invitations.map((inv) => {
      if (inv._id === this.props.match.params.id) {
        return (
          <div className="Container">
            <Card className="text-center">
              <Card.Header>Patient's Information</Card.Header>
              <Card.Body>
                <Card.Title>{inv.name}</Card.Title>
                <Card.Text>
                  I am {inv.name} of age {inv.age} . My gender is {inv.gender} .
                  I am suffering from {inv.disease}.Looking forward to you
                  giving me an appointment . My brief description :{' '}
                  {inv.aboutMe}
                </Card.Text>
                <Button variant="primary" onClick={this.submitHandler}>
                  Accept Invitation
                </Button>
              </Card.Body>
              <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
          </div>
        );
      }
    });
    let redirect = null;
    if (this.state.redirect) {
      redirect = <Redirect to="/" />;
    }
    return (
      <div>
        <div>{form}</div>
        {redirect}
      </div>
    );
  }
}
let mapStateToProps = function mapStateToProps(state) {
  return {
    invitations: state.doctor.invitations,
  };
};
const mapDispatchToProps = (dispatch) => ({
  removeInvitation: (id) => dispatch(removeInvitations(id)),
  setPatientMonitor: (profile) => dispatch(setPatientMonitor(profile)),
});
export default connect(mapStateToProps, mapDispatchToProps)(InvProfile);
