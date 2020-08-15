import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItems.css';

const navItems = [
  {
    id: 'Home',
    text: 'Home',
    link: '/',
    auth: false,
    isPatient: false,
    isDoc: false,
  },
  {
    id: 'login',
    text: 'Login',
    link: '/login',
    auth: false,
    isPatient: false,
    isDoc: false,
  },
  {
    id: 'signup',
    text: 'Signup',
    link: '/signup',
    auth: false,
    isPatient: false,
    isDoc: false,
  },

  {
    id: 'dashboard',
    text: 'Dashboard',
    link: '/',
    auth: true,
    isPatient: true,
    isDoc: false,
  },
  {
    id: 'profile',
    text: 'Profile',
    link: '/patientProfile',
    auth: true,
    isPatient: true,
    isDoc: false,
  },
  {
    id: 'monitor',
    text: 'Monitor',
    link: '/selfMonitor',
    auth: true,
    isPatient: true,
    isDoc: false,
  },
  {
    id: 'doctor',
    text: 'Doctors',
    link: '/doctorPanel',
    auth: true,
    isPatient: true,
    isDoc: false,
  },
  {
    id: 'prescription',
    text: 'Prescription',
    link: '/prescription',
    auth: true,
    isPatient: true,
    isDoc: false,
  },
  {
    id: 'diet',
    text: 'Diet',
    link: '/diet',
    auth: true,
    isPatient: true,
    isDoc: false,
  },
  {
    id: 'hospitals',
    text: 'Hospitals',
    link: '/hospitals',
    auth: true,
    isPatient: true,
    isDoc: false,
  },

  {
    id: 'dashboard',
    text: 'Dashboard',
    link: '/',
    auth: true,
    isPatient: false,
    isDoc: true,
  },
  {
    id: 'profile',
    text: 'Profile',
    link: '/doctorProfile',
    auth: true,
    isPatient: false,
    isDoc: true,
  },
  {
    id: 'invitation',
    text: 'Appointment Request',
    link: '/invitation',
    auth: true,
    isPatient: false,
    isDoc: true,
  },
  {
    id: 'prescription',
    text: 'Prescriptions',
    link: '/prescription',
    auth: true,
    isPatient: false,
    isDoc: true,
  },
  {
    id: 'videopanel',
    text: 'Video Request',
    link: '/videodoctorPanel',
    auth: true,
    isPatient: false,
    isDoc: true,
  },
];

const navigationItems = (props) => [
  ...navItems
    .filter(
      (item) =>
        item.auth === props.isAuth &&
        item.isPatient === props.isPatient &&
        item.isDoc === props.isDoc
    )
    .map((item) => (
      <li
        key={item.id}
        className={['navigation-item', props.mobile ? 'mobile' : ''].join(' ')}
      >
        <NavLink to={item.link} exact onClick={props.onChoose}>
          {item.text}
        </NavLink>
      </li>
    )),
  props.isAuth && (
    <li className="navigation-item" key="logout">
      <button onClick={props.onLogout}>Logout</button>
    </li>
  ),
];

export default navigationItems;
