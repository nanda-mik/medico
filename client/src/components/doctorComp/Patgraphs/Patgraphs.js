
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
            if(pat.profile._id === this.state.id&&pat.monitor.bloodpressure!==null ){
                arrs = pat.monitor.bloodpressure.map((bp) => {
                
                return ({
                    y : parseInt(bp.systolic), label : bp.date
                })
            })
        }
        })
    
        let arrd = [];
        this.props.patient.map((pat) => {
            if(pat.profile._id === this.state.id ){
                arrd = pat.monitor.bloodpressure.map((bp) => {
                return ({
                    y : parseInt(bp.diastolic) , label : bp.date
                })
            })
        }
        })
       console.log(arrs);
       console.log(arrd);
		const options = {
            animationEnabled: true,	
            theme: "light2",
            backgroundColor : "white",
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
       
        if(pat.profile._id === this.state.id){
          
            if(pat.monitor.bloodpressure.length>0&&pat.monitor.bloodpressure!==null){
                graphs = <CanvasJSChart options = {options} 
			/>
            }
            else{
                graphs = <h1>Patient did not monitor his/her bloodpressure!!</h1>
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