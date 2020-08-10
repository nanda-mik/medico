import { combineReducers } from 'redux';
import doctorReducer from './Doctor/Doctor.reducer';


import patientReducer from './Patient/Patient.reducer';

/*{const persistConfig ={
    key: 'root',
    storage,
    whitelist : ['doctor','patient']
}}*/

const rootReducer = combineReducers({
    
    doctor: doctorReducer,
    patient : patientReducer
});

export default rootReducer;
