import React, { Component } from 'react';
import {Card,CardDeck} from 'react-bootstrap';
import './Menu.css';
import CallIcon from '@material-ui/icons/Call';

class Cards extends Component{

    render(){
        return(

            <div className="Home">
              <div>
<CardDeck>
  <Card>
    <Card.Img variant="top" src="https://i.pinimg.com/564x/8d/cc/7d/8dcc7de6d866baf1a3228f91b26f0f96.jpg" />
    <Card.Body>
      <Card.Title>Daily Monitoring</Card.Title>
      <Card.Text>
       It has become very important nowadays, to keep a daily track of our bloodpressure, diabetes, pulserate and moreover. So, we have 
       brought the facility of monitoring yourself on a daily basis and monitor your health daily.  
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://i.pinimg.com/564x/8d/7f/fc/8d7ffca11223041be9316fa1c497990a.jpg" />
    <Card.Body>
      <Card.Title>Virtual Prescription</Card.Title>
      <Card.Text>
        We have taken the doctor patient relation into a new way of interaction by facilitating virtual prescription with reminders for your 
        medicines and many more.
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://i.pinimg.com/564x/5d/ff/f3/5dfff3e3fea7d3abf8fc723f3dc72193.jpg" />
    <Card.Body>
      <Card.Title>Panel of best doctors</Card.Title>
      <Card.Text>
        We have brought you the best doctors where you can choose your own doctor, get appointments from them and additionally they can even monitor your daily diets ,
        your health 24*7. You can have your video appointment as well for more convinient way of interaction.
      </Card.Text>
    </Card.Body>
  </Card>
</CardDeck>
            </div>
            <div className="Doc">
              <Card className="bg-dark text-white">
  <Card.Img className="Docc" src="https://www.signaturemedicalgroup.com/webres/Image/Stock_Images/Doctors_870x300.jpg" alt="Card image" />
  <Card.ImgOverlay className="Docc" style={{backgroundColor : "rgba(0,0,0,0.67)" }}>
    <Card.Title>Have privacy issue or network issues??</Card.Title>
    <Card.Text>
     Don't want to turn camera to unknown or got some network issues, we have brought you yet another way of connecting you with 
      your doctor, pick your phone and dial the number below and take the consultation over phone. 
    </Card.Text>
    <Card.Text style={{fontFamily: "bold" , fontSize: "23px"}}><CallIcon/>{' '} Dial on 1800-888-000</Card.Text>
  </Card.ImgOverlay>
</Card>
            </div>
            </div>
        );
    }
}
export default Cards;