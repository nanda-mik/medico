import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "./login.css";

class Login extends Component{
    constructor(){
        super();
        this.state = {
            docRedirect: false,
            patientRedirect: false
        }
    }

    onClick1 = () => {
        this.setState({ docRedirect: true});
    }

    onClick2 = () => {
        this.setState({patientRedirect: true});
    }

    render(){
        let redirect = null;
        if(this.state.docRedirect){
            redirect = <Redirect to="/docLogin" />
        }
        if(this.state.patientRedirect){
            redirect = <Redirect to="/patientLogin" />
        }
        return(
            <div>
                <div className="signup-buttons">
                    <div className="Doclogin">
                    <button onClick={this.onClick1}>Login as Doctor</button>
                    </div>
                    <div className="Patientlogin">
                    <button onClick={this.onClick2}>Login as Patient</button>
                    </div>
                </div>
                {redirect}
            </div>
        )
    }
}

export default Login;