import React, { Component } from 'react';
import Axios from 'axios';
import {
  Form,
  Button,
  FormControl,
  Card,
  Col,
  Row,
  Container,
} from 'react-bootstrap';
import PrescriptionList from '../prescriptionList/prescriptionList';
import { connect } from 'react-redux';
import './prescribePage.css';
import { setPrescriptions } from '../../../Redux/Doctor/Doctor.Actions';
import {
  Typeahead,
  Highlighter,
  Menu,
  MenuItem,
} from 'react-bootstrap-typeahead';
import { render } from 'react-dom';
import List from 'react-tiny-virtual-list';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { IoIosAddCircleOutline } from 'react-icons/io';

/*const CLIENT_ID = "185334468057-0ikd8rea7drp4rmkjvte2n1k756e60mf.apps.googleusercontent.com";
    const API_KEY ="AIzaSyB1wAxp6JbIg3GEgnPjOYW_DAfVnMl5Udo";
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";*/
class prescribePage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      prescriptionId: null,
      prescribe: '',
      prescribearr: [],
      patData: [],
    };
  }
  options = [
    'pantacid',
    'Ofloxacin',
    'Paraxin Capsules',
    'betadin',
    'sinarest',
    'paracetamol',
    'digene',
    'pantop',
    'Telvas 40',
    'Montelukast',
    'Allegra',
    'Domstal',
    'Crocin',
    'Namcold',
  ];
  renderMenu = (results, menuProps, props) => {
    const itemHeight = 32;

    return (
      <Menu {...menuProps}>
        <List
          scrollToIndex={props.activeIndex || 0}
          scrollToAlignment="auto"
          height={results.length < 5 ? results.length * itemHeight : 300}
          itemCount={results.length}
          itemSize={itemHeight}
          renderItem={({ index, style }) => {
            const item = results[index];
            return (
              <MenuItem key={item} option={item} position={index} style={style}>
                <Highlighter search={props.text}>{item}</Highlighter>
              </MenuItem>
            );
          }}
        />
      </Menu>
    );
  };
  componentDidMount() {
    const id = localStorage.getItem('patId');
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/doctor/getPrescription/` + id,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    Axios(options).then((res) => {
      console.log(res.data);
      this.setState({ data: res.data.prescArr });
      this.setState({ patData: res.data.problemArr });
      this.setState({ prescriptionId: res.data.prescriptionId });
      console.log(res.data.prescriptionId);
    });
  }

  submtiHandler = (e) => {
    e.preventDefault();

    console.log(this.state.prescribe);
    var d = new Date();
    var time = d.toLocaleString();
    const id = localStorage.getItem('patId');
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/doctor/addPrescription/` + id,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: {
        presData: this.state.prescribe,
        time: time,
      },
    };
    this.setState((state) => {
      return {
        data: [...state.data, options.data],
      };
    });

    Axios(options)
      .then((resData) => {
        if (resData.status !== 200 && resData.status !== 201) {
          console.log('Error!');
          throw new Error('Prescription failed!');
        }
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const id = localStorage.getItem('patId');
    const data = this.state.data;
    const l = this.state.data.length - 1;
    const d = this.state.patData.length - 1;
    console.log(this.state.data[l]);
    let a = { ...this.state.data[l] };
    let b = { ...this.state.patData[d] };
    let dtime = new Date(a.time);
    let ptime = new Date(b.time);
    console.log(data);
    return (
      <div className="Prescription">
        <div>
          <h3>Prescriptions</h3>
          {this.props.patProfile.map((pat) => {
            console.log(pat.profile._id);
            if (pat.profile._id === id) {
              console.log(pat.profile);
              return (
                <div>
                  <Card>
                    <Card.Body>
                      <Container>
                        <Row>
                          <Col>Patient's name : {pat.profile.name} </Col>
                          <Col>Patient's gender : {pat.profile.gender} </Col>
                        </Row>
                        <Row>
                          <Col>Patient's age : {pat.profile.age}years </Col>
                          <Col> Patient's Weight : {pat.profile.weight}kg </Col>
                          <Col>Patient's height : {pat.profile.height}cm </Col>
                        </Row>
                      </Container>
                      {this.state.patData.length > 0 ? (
                        dtime.getTime() - ptime.getTime() > 0 ? null : (
                          <Card border="danger" style={{ width: '18rem' }}>
                            <Card.Header>Patient's problem</Card.Header>
                            <Card.Body>
                              <Card.Title>{b.problemData}</Card.Title>
                              <Card.Text>Posted on {b.time}</Card.Text>
                            </Card.Body>
                          </Card>
                        )
                      ) : null}
                    </Card.Body>
                    <Card.Body>
                      <Form onSubmit={this.submtiHandler}>
                        <Form.Group controlId="prescribe">
                          <Form.Label>Prescribe Here</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="3"
                            required
                            autoFocus
                            type="text"
                            value={this.state.prescribe}
                            onChange={(e) =>
                              this.setState({ prescribe: e.target.value })
                            }
                            style={{ width: '50%' }}
                          ></Form.Control>
                        </Form.Group>
                        <div style={{ width: '50%', marginBottom: 10 }}>
                          <Typeahead
                            id="pagination-example"
                            maxResults={false}
                            options={this.options}
                            paginate={false}
                            placeholder="Type a medicine.."
                            renderMenu={this.renderMenu}
                          />
                        </div>
                        <div style={{ width: '50%', marginBottom: 10 }}>
                          <Typeahead
                            id="pagination-example"
                            maxResults={false}
                            options={this.options}
                            paginate={false}
                            placeholder="Type a medicine.."
                            renderMenu={this.renderMenu}
                          />
                        </div>
                        <div style={{ width: '50%', marginBottom: 10 }}>
                          <Typeahead
                            id="pagination-example"
                            maxResults={false}
                            options={this.options}
                            paginate={false}
                            placeholder="Type a medicine.."
                            renderMenu={this.renderMenu}
                          />
                          <IoIosAddCircleOutline size={26} color="green" />
                        </div>

                        <Button
                          variant="success"
                          type="submit"
                          style={{
                            border: 'none',
                            borderRadius: '30px',
                            padding: '10px 40px',
                          }}
                        >
                          PRESCRIBE
                        </Button>
                      </Form>
                      <div>
                        {data.length !== 0 ? (
                          <PrescriptionList list={data} />
                        ) : (
                          <h4>No prescriptions</h4>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
              console.log(this.state.patientProfile);
            }
          })}
        </div>
      </div>
    );
  }
}

let mapStateToProps = function mapStateTopProps(state) {
  return {
    patProfile: state.doctor.patientMonitored,
  };
};

export default connect(mapStateToProps)(prescribePage);
