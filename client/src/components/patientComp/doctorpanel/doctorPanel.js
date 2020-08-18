import React, { Component, Fragment } from 'react';
import UserCardlist from '../UserCardlist/userCardlist';
import Axios from 'axios';
import { SearchBox } from '../search-box/search-box';
import Spinner from "../../Spinner/Spinner";



class Main extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      searchField: '',
      loading: true
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/patient/getDoctors`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    Axios(options).then((res) => {
      console.log(res.data.users);
      this.setState({ users: res.data.users, loading: false });
    });
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { users, searchField } = this.state;

    const fusers = users.filter((el) =>
      el.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div>
        <h1>Doctors</h1>
        <div style={{paddingTop:"80px"}}>
          <SearchBox
            placeholder="search for doctors"
            handleChange={this.handleChange}
          />  
        </div>
        {this.state.users.length !== 0 ? (
          <UserCardlist isReq={true} users={fusers} />
        ) : (
            <h2>No Doctors.</h2>
          )}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Main;
