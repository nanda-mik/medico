
import React ,{Component} from 'react';
import canvasJsReact from '../../../Assets/canvasJs/canvasjs.react';
import {connect} from 'react-redux';


const CanvasJSChart = canvasJsReact.CanvasJSChart;

 
class Patgraphs extends Component {	

    constructor(props){
        super(props);
        this.state ={
            id : props.id
        }
    }
   
	render() {
        let arrs = [];
        let count = 0;
        
        this.props.patient.map((pat) => {
            if(pat.profile._id === this.state.id ){
                arrs = pat.monitor.diabetes.map((bp) => {
                console.log(bp.typeA);
                return ({
                    y : parseInt(bp.typeA), label : "bp"
                })
            })
        }
        })
    
        let arrd = [];
        this.props.patient.map((pat) => {
            if(pat.profile._id === this.state.id ){
                arrd = pat.monitor.diabetes.map((bp) => {
                return ({
                    y : parseInt(bp.typeB) , label : "bp"
                })
            })
        }
        })
       console.log(arrs);
       console.log(arrd);
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
    this.props.patient.map((pat) => {
        console.log(pat.monitor.bloodpressure);
        if(pat.profile._id === this.state.id){
           console.log(pat.monitor.diabetes.length);
            if(pat.monitor.diabetes.length>0){
                graphs = <CanvasJSChart options = {options} 
			/>
            }
            else{
                graphs = <h1>Patient did not monitor his/her diabetes!!</h1>
            }
        }
    })


		return (
		<div className="graph">
			{graphs}
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

let mapStateToProps = function mapStateToProps (state) {
    return {
        patient : state.doctor.patientMonitored
    }
} 

                       

export default connect(mapStateToProps)(Patgraphs);