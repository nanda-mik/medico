import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "./userCard.css";
import Axios from 'axios';


import StripeBtn from "../payment/payment";


class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectToPrescribePage: false
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        const id = this.props.user._id;
        const options = {
            url: 'http://localhost:8080/api/patient/sendRequest/' + id,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        Axios(options)
            .then(res => {
                console.log(res);
                this.setState({ redirect: true })
            });
    }

    onClick = (e) => {
        e.preventDefault();

        localStorage.setItem('docId',this.props.user._id);
        
        this.setState({redirectToPrescribePage: true});

        localStorage.setItem('docId', this.props.user._id);
        this.setState({ redirectToPrescribePage: true });

    }

    render() {
        let redirect = false;
        if (this.state.redirect) {
            redirect = <Redirect to="/" />
        }
        let redirectP = false;
        if (this.state.redirectToPrescribePage) {
            redirect = <Redirect to="/prescribePage" />
        }
        return (
            <div>
                <div className='card-container'>
                    <h2>{this.props.user.name}</h2>
                    <h4>Specialization: {this.props.user.specialization}</h4>
                    <h5>Year of experience: {this.props.user.yearOfExp}</h5>
                    <p>About: {this.props.user.aboutMe}</p>
                    {(this.props.isReq) ? <button onClick={this.submitHandler}>Request for apointment</button> : <div><button onClick={this.onClick}>Prescription Page</button><StripeBtn /></div>}
                </div>
                {redirect}
                {redirectP}
            </div>
        );

    }
}


export default Cards;