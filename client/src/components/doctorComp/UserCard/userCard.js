import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "./userCard.css";
import Axios from 'axios';
import {Card , Button } from 'react-bootstrap';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state ={
           
            redirectToPrescribePage: false,
            redirectv: false
        }
    }

    

    onClick = (e) =>{
        e.preventDefault();
        localStorage.setItem('patId',this.props.user._id);
        this.setState({redirectToPrescribePage: true});
    }

    render() {
        
        let redirectP = null;
        if(this.state.redirectToPrescribePage){
            redirectP = <Redirect to="/prescribePage" />
        }
        let redirectv = null;
        if(this.state.redirectv){
            redirectv = <Redirect to = {"/patientProfile/"+this.props.user._id}/>
        }
        return (
            <div>
                <div className="CardP">
                    
                    <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://i.pinimg.com/564x/77/cd/18/77cd184c35d5c196248ff595a2cd23b7.jpg" />
  <Card.Body>
        <Card.Title>{this.props.user.name}</Card.Title>
        {
            (this.props.isReq) ?  <Card.Text>
            Need your appointment!!
            </Card.Text>:
             <Card.Text>
             See my prescription!!
             </Card.Text>
        }
       
       {(this.props.isReq) ? <Button onClick={() => {this.setState({redirectv : true})}}>View profile</Button> : <Button onClick={this.onClick}>Prescribe</Button>}
  </Card.Body>
</Card>
                    
                </div>
               
                {redirectP}
                {redirectv}
            </div>
        );

    }
}

export default Cards;