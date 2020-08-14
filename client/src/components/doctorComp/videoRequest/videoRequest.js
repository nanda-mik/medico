import React, { Component } from 'react';
import Axios from 'axios';

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
                this.setState({request: res});
            })
            .catch(err =>{
                console.log(err);
            })
    }
    render(){
        console.log(this.state.request);
        let data = this.state.request;
        return(
            <div>
                {data}
            </div>
        );
    }
}

export default VideoRequest;