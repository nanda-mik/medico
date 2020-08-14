import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {Card,Button} from 'react-bootstrap';
 
class Report extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : props.users._id,
            users : props.users,
            redirect : false
        }
    }
    
    render(){
        let redirect = null;
        if(this.state.redirect){
            redirect = <Redirect to = {"/details/"+this.state.id}/>
        }
        return (
            <div>
                <Card>
                            <Card.Header>{this.state.users.name}</Card.Header>
  <Card.Body>
    <Card.Title>{this.state.users.name}'s report</Card.Title>
    <Card.Text>
      I am suffering from {this.state.users.disease}.
    </Card.Text>
    <Button variant="primary" onClick = {()=> this.setState({redirect : true})}>View my report!</Button>
  </Card.Body>
  <Card.Footer className="text-muted" >Your patient</Card.Footer>
  </Card>
  {redirect}
            </div>
        );
    }
}

export default Report;