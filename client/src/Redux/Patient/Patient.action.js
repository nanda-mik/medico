import {PatientActions} from './Patient.types';

export const setPatient = patient => ({
    type : PatientActions.SET_PATIENT,
    payload : patient
});
export const setPatientProfile = profile => ({
    type: PatientActions.SET_PATIENT_PROFILE,
    payload: profile
});
export const setBloodpressure = bloodpressure => ({
    type : PatientActions.SET_BLOODPRESSURE,
    payload : bloodpressure
});
export const setDiabetes = diabetes => ({
    type : PatientActions.SET_DIABETES,
    payload : diabetes
});
export const setMedicines = medicine => ({
    type : PatientActions.SET_MEDICINES,
    payload : medicine
});
export const setPulse = pulse => ({
    type : PatientActions.SET_PULSE,
    payload : pulse
});
export const setCal = cal => ({
    type : PatientActions.SET_CAL,
    payload : cal
});
export const setCovid = covid => ({
    type : PatientActions.SET_COVID,
    payload : covid
});
export const setCovidTracker = count => ({
    type : PatientActions.SET_COVID_TRACKER,
    payload : count
});
export const setRead = read => ({
    type : PatientActions.SET_READ,
    payload : read
});