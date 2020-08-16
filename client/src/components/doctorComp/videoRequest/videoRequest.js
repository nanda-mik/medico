import React, { Component } from 'react';
import Axios from 'axios';

import VideoCard from './VideoCard';

class VideoRequest extends Component{
    constructor(){
        super();
        this.state={
            request: []
        }
    }
    componentDidMount() {
        const options = {
            url: `${process.env.REACT_APP_LINK}/api/doctor/checkRequest`,
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          };
          Axios(options)
            .then(res => {
                console.log(res);
                this.setState({request: res.data.arr});
            })
            .catch(err =>{
                console.log(err);
            })
    }
    render(){
        console.log(this.state.request);
        let datas = this.state.request;
        return(
            <div>
                {
                    (datas.length>0)?
                    datas.map((data) => {
                        if(data.patient!==null){
                        return(
                            <div>
                        <VideoCard user={data}/>
                        </div>
                        );
                        }
                    }):
                    <h2>No video appointments</h2>
                }
                  {/*<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src="https://i.pinimg.com/564x/69/02/56/69025672dde3b9f5382bfb0f81270fe3.jpg" />
  <Card.Body>
    <Card.Title>Request for Video Appointment</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>*/}
            </div>
        );
    }
}

export default VideoRequest;