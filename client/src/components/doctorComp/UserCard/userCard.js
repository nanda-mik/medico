import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "./userCard.css";
import Axios from 'axios';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state ={
            redirect: false,
            redirectToPrescribePage: false
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        const id = this.props.user._id;
        const options = {
            url: 'http://localhost:8080/api/doctor/confirmInvitation/'+id,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        Axios(options)
            .then(res => {
                this.setState({redirect: true})
            });
    }

    onClick = (e) =>{
        e.preventDefault();
        localStorage.setItem('patId',this.props.user._id);
        this.setState({redirectToPrescribePage: true});
    }

    render() {
        let redirect = false;
        if(this.state.redirect){
            redirect = <Redirect to="/" />
        }
        let redirectP = false;
        if(this.state.redirectToPrescribePage){
            redirect = <Redirect to="/prescribePage" />
        }
        return (
            <div>
                <div className='card-container'>
                    <h3>name: {this.props.user.name}</h3>
                    {(this.props.isReq) ? <button onClick={this.submitHandler}>Confirm appointment</button> : <button onClick={this.onClick}>Prescribe</button>}
                </div>
                {redirect}
                {redirectP}
            </div>
        );

    }
}

export default Cards;