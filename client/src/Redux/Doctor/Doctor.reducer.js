import {DoctorActions} from './Doctor.types';

const INITIAL_STATE = {
    doctorProfile : null,
    patientMonitored : [],
    invitations : [],
    prescriptions : []
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
        case DoctorActions.SET_INVITATIONS: 
            return {
                ...state,
                invitations : action.payload
            }
        case DoctorActions.REMOVE_INVITATION:
            
                let arr = state.invitations.filter(item => item._id !== action.payload)
                return{
                    ...state,
                    invitations : [arr]
                }
        case DoctorActions.SET_PRESCRIPTIONS:
            return{
                ...state,
                prescriptions : action.payload
            }    
           
        default :
            return state;
    }
}

export default DoctorReducer ;