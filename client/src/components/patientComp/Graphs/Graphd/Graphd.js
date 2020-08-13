import React ,{Component} from 'react';
import canvasJsReact from '../../../../Assets/canvasJs/canvasjs.react';
import {connect} from 'react-redux';
import "./Graphd.css";

const CanvasJSChart = canvasJsReact.CanvasJSChart;

 
class Graphbp extends Component {	
   
	render() {
        let arrs = [];
        console.log(this.props.diabetes);
        arrs = this.props.diabetes.map((d) => {
            return({
            y : parseInt(d.typeA), label : d.date
            });
        });
        let arrd = [];
        arrd = this.props.diabetes.map((d) => {
            return ({
                y : parseInt(d.typeB) , label : d.date
            });
        })
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
                name: "type-1",
                showInLegend: true,
                dataPoints: arrs
            },
            {
                type: "spline",
                name: "type-2",
                showInLegend: true,
                dataPoints: arrd
            }]
    }
    let graphs = null ;
    if(this.props.diabetes.length > 0)  {
        graphs = <CanvasJSChart options = {options} 
        /* onRef={ref => this.chart = ref} */
    />
    }
    
		
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
        diabetes : state.patient.diabetes
    }
} 

export default connect(mapStateToProps)(Graphbp);                            