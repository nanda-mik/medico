import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "./signup.css";

class signup extends Component {
    constructor() {
        super();
        this.state = {
            docRedirect: false,
            patientRedirect: false
        }
    }

    onClick1 = () => {
        this.setState({ docRedirect: true });
    }

    onClick2 = () => {
        this.setState({ patientRedirect: true });
    }

    render() {
        let redirect = null;
        if (this.state.docRedirect) {
            redirect = <Redirect to="/docSignup" />
        }
        if (this.state.patientRedirect) {
            redirect = <Redirect to="/patientSignup" />
        }
        return (
            <div>
                <div className="signup-buttons">
                    <div className="Docbutton">
                    <button onClick={this.onClick1}>Signup as Doctor</button>
                    </div>
                    <div className="Patientbutton">
                    <button onClick={this.onClick2}>Signup as Patient</button>
                    </div>
                </div>
                {redirect}
            </div>
        )
    }
}

export default signup;