import React,{Component} from 'react';
import {connect} from 'react-redux';
import Patgraphs from './Patgraphs/Patgraphs';
import Patgraphsd from './Patgraphs/Patgraphsd';

class PatientMonitored extends Component {
    constructor(props){
        super(props);
        this.state ={
            id : props.id

        }
    }
        render(){

            return(
                
                <div>
                   {console.log(this.props.patient)}
                    {
                        this.props.patient.map((pat) => {
                           
                            if(pat.profile._id === this.state.id){
                                return (
                                    <div>
                                        <h2>{pat.profile.gender}</h2>
                                <h2>{pat.profile.age}</h2>
                                        <h2>{pat.profile.height}</h2>
                                <h2>{pat.profile.weight}</h2>
                                <h2>{pat.profile.contact1}</h2>
                                <h2>{pat.profile.city}</h2>
                                <Patgraphs id={pat.profile._id} />
                                <Patgraphsd id={pat.profile._id}/>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            );
        }
    }


let mapStateToProps = function mapStateToProps(state) {
    return {
    patient : state.doctor.patientMonitored
    }
}

export default connect(mapStateToProps)(PatientMonitored);