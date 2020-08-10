import {DoctorActions} from './Doctor.types';

const INITIAL_STATE = {
    doctorProfile : null,
    patientMonitored : []
}

const DoctorReducer =(state = INITIAL_STATE , action) => {
    switch(action.type) {
        case DoctorActions.SET_DOCTOR_PROFILE : 
            return {
                ...state,
                doctorProfile : action.payload
            }
        case DoctorActions.SET_PATIENT_MONITOR :
            return {
                ...state,
                patientMonitored : [...state.patientMonitored , action.payload]
            }
           
        default :
            return state;
    }
}

export default DoctorReducer ;