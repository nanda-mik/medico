import React from 'react';
import AddToCalender from "react-add-to-calendar";
import {Card,Button} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';


class VideoCard extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            user : props.user,
            startTime : "",
            endTime : "",
            disabled : false
        }
    }
    submitHandler = (e) => {
        e.preventDefault();
        const id = this.state.user.patient._id;
        const options = {
          url: `${process.env.REACT_APP_LINK}/api/doctor/saveAppointments/`+ id,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: {
            title: "Video Appointment Session",
            description: `You have a Video Appointment session with a patient ${this.state.user.patient.name}`,
            guestEmail: this.state.user.patient.email,
            startTime: this.state.startTime,
            endTime: this.state.endTime
          }
        };
    
        Axios(options).then((res) => {
          console.log(res);
        });
        
        this.setState({ disabled: true });
      };
  
     
    render(){
        let icon = { 'calendar-plus-o': 'left' };
        let items = [
            { google: 'Google' }
         ]
         let event = {
            title: "Video Appointment Session",
            description: `You have a Video Appointment session with a patient ${this.state.user.patient.name}`,
            startTime: `${this.state.startTime}:00+05:30`,
            endTime: `${this.state.endTime}:00+05:30`

          };
         console.log(this.state.startTime);
         console.log(this.state.endTime);
        return(
            <div>
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src="https://i.pinimg.com/564x/69/02/56/69025672dde3b9f5382bfb0f81270fe3.jpg" />
                    <Card.Body>
                    <Card.Title>Request for Video Appointment by { this.state.user.patient.name}</Card.Title>
                        <Card.Text>
                            I want a video session by you.
                            My email : {this.state.user.patient.email}
                            <form noValidate>
                                <TextField
                                     id="datetime-local"
                                     placeholder="Start time"
                                     type="datetime-local"
                                     label="Start-time"
                                     InputLabelProps={{
                                     shrink: true,
                                    }}
                                     onChange={(e)=>this.setState({startTime : e.target.value})}
                                />
                                <TextField
                                     id="datetime-local"
                                     label="end-time"
                                     type="datetime-local"
                                     placeholder="End Time"
                                     InputLabelProps={{
                                     shrink: true,
                                    }}
                                     onChange={(e)=>this.setState({endTime : e.target.value})}
                                />
                            </form>
                        </Card.Text>

                        
                        <AddToCalender event={event} buttonTemplate={icon}  title="Generate event through calenders" listItems={items} buttonLabel="Schedule it on my calendar"/>
                        {
                            (!this.state.disabled)?
                            <Button onClick={this.submitHandler}>Mark as Sceduled</Button>:
                            <Button disabled>Scheduled</Button>
                        }
                        
                    </Card.Body>
                    <Card.Footer className="text-muted">Requested on {this.state.user.date}</Card.Footer>
                </Card>
            </div>
        );
    }
}

export default VideoCard;