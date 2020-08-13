import React,{Component} from 'react';
import {connect} from 'react-redux';
import Patgraphs from './Patgraphs/Patgraphs';
import Patgraphsd from './Patgraphs/Patgraphsd';
import {Card,Button} from 'react-bootstrap';
import { Redirect } from 'react-router';

class PatientMonitored extends Component {
    constructor(props){
        super(props);
        this.state={
            redirect : false
        }
    }

        render(){
            let redirect = false;
            if(this.state.redirect){
                redirect = <Redirect to="/" />
            }
            return(
                
                <div>
                   {console.log(this.props.patient)}
                    {
                        this.props.patient.map((pat) => {
                           
                            if(pat.profile._id === this.props.match.params.id){
                                return (
                                    <div className="Report">
                                        
                                <Card className="text-center">
                                <Card.Header>Patient's Self Monitored Report</Card.Header>
                                <Card.Body>
                                <Card.Title>{pat.profile.name}</Card.Title>
    
                                    {pat.monitor!==null? <Card.Text>This are my self Monitored data.</Card.Text> : <Card.Text>Sorry!!I have not monitored myself yet!!</Card.Text>}
                                    {pat.monitor!==null?<Patgraphs id={pat.profile._id} />:null}
                                    {pat.monitor!==null? <Patgraphsd id={pat.profile._id}/>:null}
                                    <Button variant="primary" onClick = {()=> this.setState({redirect : true})}>Go To Dashboard</Button>
                                    </Card.Body>
                                     <Card.Footer className="text-muted">2 days ago</Card.Footer>
                                    </Card>
                                    {redirect}
                               
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