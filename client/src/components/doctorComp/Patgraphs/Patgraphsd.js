
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
            if(pat.profile._id === this.state.id&&pat.monitor.diabetes!==null ){
                arrs = pat.monitor.diabetes.map((bp) => {
                console.log(bp.typeA);
                return ({
                    y : parseInt(bp.typeA), label : bp.date
                })
            })
        }
        })
    
        let arrd = [];
        this.props.patient.map((pat) => {
            if(pat.profile._id === this.state.id ){
                arrd = pat.monitor.diabetes.map((bp) => {
                return ({
                    y : parseInt(bp.typeB) , label : bp.date
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
                text: "Diabetes Monitor"
            },
            axisY : {
                title: "Diabetes"
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                name: "type-B",
                showInLegend: true,
                dataPoints: arrs
            },
            {
                type: "spline",
                name: "type-B",
                showInLegend: true,
                dataPoints: arrd
            }]
    }
    let graphs = null;
    this.props.patient.map((pat) => {
       
        if(pat.profile._id === this.state.id){
           console.log(pat.monitor.diabetes.length);
            if(pat.monitor.diabetes.length>0 && pat.monitor.diabetes !==null){
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