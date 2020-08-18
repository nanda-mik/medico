import {PatientActions} from './Patient.types';

const INITIAL_STATE = {
    patient : null,
    patientProfile : null,
    bloodpressure : [],
    diabetes : [],
    medicines : [],
    pulse : [],
    cal : [],
    covid : [],
    doctorpanel : [],
    covidTracker : [],
    read : []
}

const PatientReducer = (state = INITIAL_STATE , action) => {
    switch(action.type) {
        case PatientActions.SET_PATIENT :
            return{
                ...state,
                patient : action.payload
            }
        case PatientActions.SET_PATIENT_PROFILE : 
            return {
                ...state,
                patientProfile : action.payload
            };
        case PatientActions.SET_BLOODPRESSURE :
            return {
                ...state,
                bloodpressure : action.payload
            }
        case PatientActions.SET_DIABETES :
            return {
                ...state,
                diabetes : action.payload
            }
        case PatientActions.SET_MEDICINES :
            return {
                ...state,
                medicines : action.payload
            }
        case PatientActions.SET_PULSE :
            return{
                ...state,
                pulse : action.payload
            }
        case PatientActions.SET_CAL :
            return {
                ...state,
                cal : action.payload
            }
        case PatientActions.SET_COVID :
            return {
                ...state,
                covid : action.payload
            }
        case PatientActions.SET_COVID_TRACKER : 
        return{
            ...state,
            covidTracker : [...state.covidTracker,action.payload]
        }
        case PatientActions.SET_READ :
            return{
                ...state,
                read : [...state.read , action.payload]
            }
            default:
                return state;
    }
}

export default PatientReducer;