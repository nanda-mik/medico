import React, { Component, Fragment } from 'react';
import UserCardlist from "../UserCardlist/userCardlist";
import Axios from 'axios';
import {SearchBox} from "../search-box/search-box";




class Main extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            searchField: ''
        }
    }

    componentDidMount() {
        const options = {
            url: 'http://localhost:8080/api/patient/getDoctors',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        Axios(options)
            .then(res => {
                console.log(res.data.users);
                
               
            this.setState({ users: res.data.users }) 
            });
            }
                
           
    

    handleChange = (e) => {
        this.setState({ searchField: e.target.value });
    }

    render() {
        const {users , searchField } = this.state;
        
        const fusers = users.filter(el => el.name.toLowerCase().includes(searchField.toLowerCase()));
        return (
            <Fragment>
                <h1>Doctors</h1>
                <SearchBox
                    
                    placeholder='search doctors'
                    handleChange={this.handleChange}
                />
                {this.state.users.length !== 0 ? <UserCardlist  isReq={true} users={fusers} /> : <h2>No Doctors.</h2>}
            </Fragment>
        );
    }
}



export default Main;