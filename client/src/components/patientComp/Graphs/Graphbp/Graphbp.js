import React ,{Component} from 'react';
import canvasJsReact from '../../../../Assets/canvasJs/canvasjs.react';
import {connect} from 'react-redux';
import "./Graphbp.css";

const CanvasJSChart = canvasJsReact.CanvasJSChart;

 
class Graphbp extends Component {	
   
	render() {
        let arrs = [];
        console.log(this.props.bloodpressure);
        arrs = this.props.bloodpressure.map((bp) => {
            return({
            y : parseInt(bp.systolic), label : bp.date
            });
        });
        let arrd = [];
        arrd = this.props.bloodpressure.map((bp) => {
            return ({
                y : parseInt(bp.diastolic) , label : bp.date
            });
        })
		const options = {
            animationEnabled: true,	
            theme: "dark2",
            backgroundColor : "dimgrey",
            title:{
                text: "BloodPressure Monitor"
            },
            axisY : {
                title: "Blood Pressure"
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                name: "Systolic",
                showInLegend: true,
                dataPoints: arrs
            },
            {
                type: "spline",
                name: "diastolic",
                showInLegend: true,
                dataPoints: arrd
            }]
    }
    let graphs = null;
    if(this.props.bloodpressure.length > 0){
        graphs = <CanvasJSChart options = {options} />
    }
    else {
        graphs = <h1>Monitor yourself by entering data on a daily basis and check your fitness!!</h1>
    }
		
		return (
		<div className="graphbp">
            {
              graphs
            }
			
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

let mapStateToProps = function mapStateToProps (state) {
    console.log(state.patient.bloodpressure);
    return {
        bloodpressure : state.patient.bloodpressure
    }
} 

export default connect(mapStateToProps)(Graphbp);                            