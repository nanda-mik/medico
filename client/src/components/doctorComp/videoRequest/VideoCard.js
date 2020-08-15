import React from 'react';
import AddToCalender from "react-add-to-calendar";
import {Card,Button} from 'react-bootstrap';

class VideoCard extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            user : props.user
        }
    }
    event = {
        title: "Video Appointment Session",
        description: `You have a Video Appointment session with a patient ${this.props.user.name}`,
        guestEmail: `${this.props.user.patient.email}`
      };
    render(){
        let icon = { 'calendar-plus-o': 'left' };
        let items = [
            
            { google: 'Google' }
         ]
         console.log(this.state.user);
        return(
            <div>
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src="https://i.pinimg.com/564x/69/02/56/69025672dde3b9f5382bfb0f81270fe3.jpg" />
                    <Card.Body>
                    <Card.Title>Request for Video Appointment by { this.state.user.name}</Card.Title>
                        <Card.Text>
                            I want a video session by you.
                            My email : {this.state.user.patient.email}
                        </Card.Text>
                        <Card.Text>
                            Requested on {this.state.user.date}
                        </Card.Text>
                        <AddToCalender event={this.event} buttonTemplate={icon}  title="Generate event through calenders" listItems={items} buttonLabel="Schedule it on my calendar"/>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default VideoCard;