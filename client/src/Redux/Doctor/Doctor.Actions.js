import {DoctorActions} from './Doctor.types';

export const setDoctorProfile = profile => ({
    type : DoctorActions.SET_DOCTOR_PROFILE,
    payload : profile
});

export const setPatientMonitor = patient => ({
    type : DoctorActions.SET_PATIENT_MONITOR,
    payload : patient
});


