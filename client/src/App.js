import React, { Component, Fragment } from 'react';

import { Redirect, Switch, Route, withRouter } from 'react-router-dom';

import './App.css';
import Menu from './components/Menu/Menu';
import Signup from './components/Signup/signup';
import Login from './components/Login/login';
import DocSignup from './components/signupForm/docSignup';
import PatientSignup from './components/signupForm/patientSignup';
import DocLogin from './components/loginForm/docLogin';
import PatientLogin from './components/loginForm/patientLogin';
import Admin from "./components/admin/admin";
import MobileNavigation from './components/Navigation/MobileNavigation/MobileNavigation';
import Backdrop from './components/Backdrop/Backdrop';
import Alert from 'react-bootstrap/Alert';
import Layout from './components/Layout/Layout';
import Toolbar from './components/Toolbar/Toolbar';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import Location from './components/Location/Location';
import Diet from './components/diet/diet';

//doctor pages
import DocDashboard from './components/doctorComp/dashboard';
import DocProfile from './components/doctorComp/DocProfile/docProfile';
import PrescriptionPanel from './components/doctorComp/PrescriptionPanel/prescriptionPanel';
import InvitationPanel from './components/doctorComp/Invitation/invitation';
import PrescribePage from './components/doctorComp/prescribePage/prescribePage';
import InvProfile from './components/doctorComp/Invitation/invProfile';
import VideoRequest from './components/doctorComp/videoRequest/videoRequest';

//patient pages
import PatDashboard from './components/patientComp/PDashboard';
import PatProfile from './components/patientComp/PatProfile/PatProfile';
import DoctorPanel from './components/patientComp/doctorpanel/doctorPanel';
import PatientPrescriptionPanel from './components/patientComp/prescriptionPanel/prescriptionPanel';
import PatientPrescribePage from './components/patientComp/prescribePage/prescribePage';
import ChatButton from './components/chatButton/chatButton';
import ChatBot from './components/chatbot/chatbot';
import Map from './components/map/map';

import Axios from 'axios';
import MonitorPat from './components/patientComp/MonitorPat/MonitorPat';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setPatient } from './Redux/Patient/Patient.action';
import { connect } from 'react-redux';
import Chat from 'twilio/lib/rest/Chat';
import PatientMonitored from './components/doctorComp/PatientMonitored';

class App extends Component {
  state = {
    showBackdrop: false,
    showMobileNav: false,
    isAuth: false,
    token: null,
    userId: null,
    error: null,
    isDoc: false,
    isPatient: false,
    redirect: false,
    red: false,
    stateName: '',
    chat: false,
  };

  componentDidMount() {
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

    if (type === 'doc') {
      this.setState({
        isDoc: true,
        isAuth: true,
        token: token,
        userId: userId,
      });
    } else if (type === 'patient') {
      this.setState({
        isPatient: true,
        isAuth: true,
        token: token,
        userId: userId,
      });
    }
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setAutoLogout(remainingMilliseconds);
  }

  mobileNavHandler = isOpen => {
    this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  };

  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, showMobileNav: false, error: null });
  };

  logoutHandler = () => {
    this.setState({
      isAuth: false,
      token: null,
      isDoc: false,
      isPatient: false,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('type');
    localStorage.clear();
  };

  patientLoginHandler = (event, authData) => {
    console.log(process.env);
    event.preventDefault();
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/auth/patientLogin`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {
        email: authData.email,
        password: authData.password,
      },
    };
    Axios(options)
      .then((resData) => {
        if (resData.status === 422) {
          throw new Error('Validation failed!');
        }
        if (resData.status !== 200 && resData.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        console.log(resData.data.loadedUser);
        let data = { ...resData.data.loadedUser };
        let name = data.name;
        let email = data.email;
        let patient = {
          name,
          email,
        };
        this.props.setPatient(patient);
        localStorage.setItem('token', resData.data.token);
        localStorage.setItem('userId', resData.data.userId);
        localStorage.setItem('type', 'patient');
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setState({
          isAuth: true,
          isPatient: true,
          token: resData.data.token,
          userId: resData.data.userId,
        });
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          isPatient: false,
          error: err,
        });
      });
  };

  docLoginHandler = (event, authData) => {
    console.log(process.env.REACT_APP_LINK);
    event.preventDefault();
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/auth/docLogin`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {
        email: authData.email,
        password: authData.password,
      },
    };
    Axios(options)
      .then((resData) => {
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
        localStorage.setItem('type', 'doc');
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setState({
          isAuth: true,
          isDoc: true,
          token: resData.data.token,
          userId: resData.data.userId,
        });
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          isDoc: false,
          error: err,
        });
      });
  };

  patientSignupHandler = (event, authData) => {
    event.preventDefault();
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/auth/patientSignup`,
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {
        email: authData.signupForm.email.value,
        password: authData.signupForm.password.value,
        name: authData.signupForm.name.value,
      },
    };
    Axios(options)
      .then((resData) => {
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
        this.setState({ isAuth: false });
        this.props.history.replace('/');
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          error: err,
        });
      });
  };

  docSignupHandler = (event, authData) => {
    event.preventDefault();
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/auth/docSignup`,
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {
        email: authData.signupForm.email.value,
        password: authData.signupForm.password.value,
        name: authData.signupForm.name.value,
      },
    };
    Axios(options)
      .then((resData) => {
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
        this.setState({ isAuth: false });
        this.props.history.replace('/');
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          error: err,
        });
      });
  };

  setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  render() {
    let redirectm = null;
    let redirectu = null;
    let routes = (
      <Switch>
        <Route path="/" exact>
          <Menu />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route
          path="/docSignup"
          exact
          render={(props) => (
            <DocSignup {...props} onSignup={this.docSignupHandler} />
          )}
        />
        <Route
          path="/patientSignup"
          exact
          render={(props) => (
            <PatientSignup {...props} onSignup={this.patientSignupHandler} />
          )}
        />
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route
          path="/docLogin"
          exact
          render={(props) => (
            <DocLogin {...props} onLogin={this.docLoginHandler} />
          )}
        />
        <Route
          path="/patientLogin"
          exact
          render={(props) => (
            <PatientLogin {...props} onLogin={this.patientLoginHandler} />
          )}
        />
        <Route path="/admin" exact>
            <Admin/>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
    if (this.state.isAuth && this.state.isDoc) {
      redirectm = <Redirect to="/" />;
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
            <VideoRequest />
          </Route>
          <Route
            path="/patientProfile/:id"
            render={(props) => <InvProfile {...props} />}
          />
          <Route
            path="/details/:id"
            render={(props) => <PatientMonitored {...props} />}
          />
        </Switch>
      );
    }
    if (this.state.isAuth && this.state.isPatient) {
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
            <MonitorPat />
          </Route>
          <Route exact path="/prescription">
            <PatientPrescriptionPanel />
          </Route>
          <Route exact path="/prescribePage">
            <PatientPrescribePage />
          </Route>
          <Route exact path="/diet">
            <Diet />
          </Route>
          <Route exact path="/hospitals">
            <Map />
          </Route>
        </Switch>
      );
    }

    const myStyle = {
      marginTop: "9vh",
      marginLeft: "7vh",
      marginRight: "5vh"
    };

    return (
      <Fragment>
       
        <Location
          stateHandler={(name) => this.setState({ stateName: name })}
        ></Location>
        {(this.state.error)?(
          <div className="errorbox" style={myStyle}>
            <Alert variant="danger" onClose={this.errorHandler} dismissible>
              <Alert.Heading>You got an error!</Alert.Heading>
              <p>Check Your Credentials Again!!</p>
            </Alert>
          </div>
        ):null}
        {routes}
        {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
        <Layout
          header={
            <Toolbar>
              <MainNavigation
               onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
                onLogout={this.logoutHandler}
                isAuth={this.state.isAuth}
                isPatient={this.state.isPatient}
                isDoc={this.state.isDoc}
              />
            </Toolbar>
          }
          mobileNav={
            <MobileNavigation
              open={this.state.showMobileNav}
              mobile
              onChooseItem={this.mobileNavHandler.bind(this, false)}
              onLogout={this.logoutHandler}
              isAuth={this.state.isAuth}
              isPatient={this.state.isPatient}
              isDoc={this.state.isDoc}
            />
          }
        >

        {redirectm}
        {redirectu}
          <ChatButton
            show={!this.state.chat}
            clickHandler={() => {
              console.log('clik');
              this.setState({ chat: true });
            }}
          />
          <ChatBot
            show={this.state.chat}
            clickHandler={() => this.setState({ chat: false })}
          />
        </Layout>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPatient: (patient) => dispatch(setPatient(patient)),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
