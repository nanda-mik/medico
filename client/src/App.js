import React, { Component, Fragment } from 'react';

import { Redirect, Switch, Route , withRouter} from 'react-router-dom';


import './App.css';
import Menu from './components/Menu/Menu';
import Signup from './components/Signup/signup';
import Login from "./components/Login/login";
import DocSignup from "./components/signupForm/docSignup";
import PatientSignup from "./components/signupForm/patientSignup";
import DocLogin from "./components/loginForm/docLogin";
import PatientLogin from "./components/loginForm/patientLogin";

import ErrorHandler from "./components/ErrorHandler/ErrorHandler";
import Layout from "./components/Layout/Layout";
import Toolbar from "./components/Toolbar/Toolbar";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";

import VideoPanel from "./components/videoChat/videoPanel";

//doctor pages
import DocDashboard from "./components/doctorComp/dashboard";
import DocProfile from "./components/doctorComp/DocProfile/docProfile";
import PrescriptionPanel from "./components/doctorComp/PrescriptionPanel/prescriptionPanel";
import InvitationPanel from "./components/doctorComp/Invitation/invitation";
import PrescribePage from "./components/doctorComp/prescribePage/prescribePage";
import InvProfile from './components/doctorComp/Invitation/invProfile';

//patient pages
import PatDashboard from "./components/patientComp/PDashboard";
import PatProfile from "./components/patientComp/PatProfile/PatProfile";
import DoctorPanel from "./components/patientComp/doctorpanel/doctorPanel";
import PatientPrescriptionPanel from "./components/patientComp/prescriptionPanel/prescriptionPanel";
import PatientPrescribePage from "./components/patientComp/prescribePage/prescribePage";

import Axios from "axios";
import MonitorPat from './components/patientComp/MonitorPat/MonitorPat';
import "bootstrap/dist/css/bootstrap.min.css";
import {setPatient} from './Redux/Patient/Patient.action';
import {connect} from 'react-redux';


class App extends Component{
  state = {
    isAuth: false,
    token: null,
    userId: null,
    error: null,
    isDoc: false,
    isPatient: false,
    redirect : false,
    red : false
  };

  componentDidMount(){
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    const type = localStorage.getItem('type');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    if(type === "doc"){
      this.setState({isDoc: true});
    }else if(type === "patient"){
      this.setState({isPatient: true});
    }
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, isAdmin:false, token: token, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
  }

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null, isDoc: false, isPatient: false });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('type');
    localStorage.clear();
  }

  patientLoginHandler = (event, authData) => {
    event.preventDefault();
    const options = {
      url: 'http://localhost:8080/api/auth/patientLogin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        email: authData.email,
        password: authData.password
      }
    };
    Axios(options)
      .then(resData => {
        if (resData.status === 422) {
          throw new Error('Validation failed!');
        }
        if (resData.status !== 200 && resData.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        console.log(resData.data.loadedUser);
        let data = {...resData.data.loadedUser}
        let name = data.name;
        let email = data.email;
        let patient = {
          name,email
        }
        this.props.setPatient(patient)
        localStorage.setItem('token', resData.data.token);
        localStorage.setItem('userId', resData.data.userId);
        localStorage.setItem('type',"patient");
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setState({
          isAuth: true,
          isPatient: true,
          token: resData.data.token,
          userId: resData.data.userId
        });
        this.setAutoLogout(remainingMilliseconds);
        this.setState({
          isAuth: true,
          isPatient: true,
          token: resData.data.token,
          userId: resData.data.userId
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          isPatient: false,
          error: err
        });
      });
  };

  docLoginHandler = (event, authData) => {
    event.preventDefault();
    const options = {
      url: 'http://localhost:8080/api/auth/docLogin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        email: authData.email,
        password: authData.password
      }
    };
    Axios(options)
      .then(resData => {
        if (resData.status === 422) {
          throw new Error('Validation failed!');
        }
        if (resData.status !== 200 && resData.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        console.log(resData.data.loadedUser);
        localStorage.setItem('token', resData.data.token);
        localStorage.setItem('userId', resData.data.userId);
        localStorage.setItem('type',"doc");
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setState({
          isAuth: true,
          isDoc: true,
          token: resData.data.token,
          userId: resData.data.userId
        });
        this.setAutoLogout(remainingMilliseconds);
        this.setState({
          isAuth: true,
          isDoc: true,
          token: resData.data.token,
          userId: resData.data.userId
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          isDoc: false,
          error: err
        });
      });
  };

  patientSignupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    const options = {
      url: 'http://localhost:8080/api/auth/patientSignup',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data:{
        email: authData.signupForm.email.value,
        password: authData.signupForm.password.value,
        name: authData.signupForm.name.value
      }
    }
   Axios(options)
      .then(resData => {
        if (resData.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (resData.status !== 200 && resData.status !== 201) {
          console.log('Error!');
          throw new Error('Creating a user failed!');
        }
        console.log(resData);
        this.setState({ isAuth: false});
        this.props.history.replace('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          error: err
        });
      });
  };

  docSignupHandler = (event, authData) => {
    event.preventDefault();
    const options = {
      url: 'http://localhost:8080/api/auth/docSignup',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data:{
        email: authData.signupForm.email.value,
        password: authData.signupForm.password.value,
        name: authData.signupForm.name.value
      }
    }
   Axios(options)
      .then(resData => {
        if (resData.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (resData.status !== 200 && resData.status !== 201) {
          console.log('Error!');
          throw new Error('Creating a user failed!');
        }
        console.log(resData);
        this.setState({ isAuth: false});
        this.props.history.replace('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          error: err
        });
      });
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  render(){
    let redirectm = null;
    let redirectu= null;
    let routes = (
      <Switch>
        <Route path="/" exact>
          <Menu />  
        </Route>
        <Route path="/signup" exact>
          <Signup/>
        </Route>
        <Route
          path="/docSignup"
          exact
          render={(props)=>(
            <DocSignup
            {...props}
            onSignup ={this.docSignupHandler}
            />
          )}
          />
        <Route
          path="/patientSignup"
          exact
          render={(props)=>(
            <PatientSignup
            {...props}
            onSignup ={this.patientSignupHandler}
            />
          )}
        />
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route
          path="/docLogin"
          exact
          render={(props)=>(
            <DocLogin
            {...props}
            onLogin ={this.docLoginHandler}
            />
          )}
        />
        <Route
          path="/patientLogin"
          exact
          render={(props)=>(
            <PatientLogin
            {...props}
            onLogin ={this.patientLoginHandler}
            />
          )}
        />
        <Redirect to ="/" />
      </Switch>
    )
    if(this.state.isAuth && this.state.isDoc){

     
      redirectm =  <Redirect to ="/"/>;
      routes = (
        <Switch>
          <Route exact path="/">
            <DocDashboard />
          </Route>
          <Route exact path="/doctorProfile">
            <DocProfile />
          </Route>
          <Route exact path="/prescription">
            <PrescriptionPanel />
          </Route>
          <Route exact path="/invitation">
            <InvitationPanel />
          </Route>
          <Route exact path="/prescribePage">
            <PrescribePage />
          </Route>
          <Route exact path="/videodoctorPanel">
            <VideoPanel />
          </Route>
          <Route path = "/patientProfile/:id"
          render = {(props) => (
         <InvProfile {...props}/>
         )}/>
          
          
         
        </Switch>
      );
    }
    if(this.state.isAuth && this.state.isPatient){
      redirectu = <Redirect to="/" />;
      routes = (
        <Switch>
          <Route exact path="/">
            <PatDashboard />
          </Route>
          <Route exact path="/patientProfile">
            <PatProfile />
          </Route>
          <Route exact path="/doctorPanel">
            <DoctorPanel />
          </Route>
          <Route exact path="/selfMonitor">
            <MonitorPat/>
            </Route>
          <Route exact path="/prescription">
            <PatientPrescriptionPanel />
          </Route>
          <Route exact path="/prescribePage">
            <PatientPrescribePage />
          </Route>
          <Route exact path="/videoPanel">
            <VideoPanel />
          </Route>
          
        </Switch>
      );
    }
    return (
      <Fragment>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
        <Layout
          header={
            <Toolbar>
              <MainNavigation
                onLogout={this.logoutHandler}
                isAuth={this.state.isAuth}
                isPatient = {this.state.isPatient}
                isDoc={this.state.isDoc}
              />
            </Toolbar>
          }
        />
        {routes} 
        {redirectm}
        {redirectu}     
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setPatient : patient => dispatch(setPatient(patient))
});

export default withRouter(connect(null,mapDispatchToProps)(App));