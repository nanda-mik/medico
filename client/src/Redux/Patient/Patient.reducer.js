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
    covidTracker : []
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
                bloodpressure : [...state.bloodpressure , action.payload]
            }
        case PatientActions.SET_DIABETES :
            return {
                ...state,
                diabetes : [...state.diabetes , action.payload]
            }
        case PatientActions.SET_MEDICINES :
            return {
                ...state,
                medicines : [...state.medicines , action.payload]
            }
        case PatientActions.SET_PULSE :
            return{
                ...state,
                pulse : [...state.pulse , action.payload]
            }
        case PatientActions.SET_CAL :
            return {
                ...state,
                cal : [...state.cal , action.payload]
            }
        case PatientActions.SET_COVID :
            return {
                ...state,
                covid : [...state.covid , action.payload]
            }
        case PatientActions.SET_COVID_TRACKER : 
        return{
            ...state,
            covidTracker : [...state.covidTracker,action.payload]
        }
            default:
                return state;
    }
}

export default PatientReducer;