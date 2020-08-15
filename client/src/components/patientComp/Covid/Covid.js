import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCovidTracker } from '../../../Redux/Patient/Patient.action';

class Covid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    this.props.covid.map((cov) => {
      let c = 0;
      if (cov.cough === true) {
        c = c + 1;
      }
      if (cov.fever === true) {
        c = c + 1;
      }
      if (cov.tastebud === true) {
        c = c + 1;
      }
      if (cov.dryThroat === true) {
        c = c + 1;
      }
      if (cov.appetite === true) {
        c = c + 1;
      }
      let date = cov.date;
      let count = Math.round((c / 5) * 100);
      let data = { count, date };
      console.log(data);
      if (!this.props.covid.length === this.props.covidTracker.length) {
        this.props.setCovidTracker(data);
      }
    });

    return (
      <div>
        <h1>covid tracker</h1>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setCovidTracker: (count) => dispatch(setCovidTracker(count)),
});

let mapStateToProps = function mapStateToProps(state) {
  return {
    covid: state.patient.covid,
    covidTracker: state.patient.covidTracker,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Covid);
