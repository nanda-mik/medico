import React, {Component} from "react";
import Axios from "axios";
import UserCardlist from "../UserCardlist/userCardlist";

class invitation extends Component{
    constructor(){
        super();
        this.state = {
            invite : []
        }
    }

    componentDidMount(){
        const options = {
            url: 'http://localhost:8080/api/doctor/checkInvitation',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        Axios(options)
            .then(res =>{
                this.setState({invite: res.data.arr})
            })
    }

    render(){
        const patient = this.state.invite;
        console.log(patient);
        return(
            <div>
                <h2>Appointment Requests</h2>
                {patient.length !==0 ? <UserCardlist isReq={true} users={patient} /> : <h4>No requests</h4>}
            </div>
        );
    }

}

export default invitation;