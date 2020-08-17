import {DoctorActions} from './Doctor.types';

export const setDoctorProfile = profile => ({
    type : DoctorActions.SET_DOCTOR_PROFILE,
    payload : profile
});

export const setPatientMonitor = patient => ({
    type : DoctorActions.SET_PATIENT_MONITOR,
    payload : patient
});
export const setInvitations = data => ({
    type: DoctorActions.SET_INVITATIONS,
    payload : data
});
export const removeInvitations = id => ({
    type : DoctorActions.REMOVE_INVITATION,
    payload : id
});
export const setPrescriptions = prescriptions => ({
    type: DoctorActions.SET_PRESCRIPTIONS,
    payload : prescriptions
});
