import React ,{Component} from 'react';
import canvasJsReact from '../../../../Assets/canvasJs/canvasjs.react';
import {connect} from 'react-redux';


const CanvasJSChart = canvasJsReact.CanvasJSChart;

 
class GraphCovid extends Component {	
   
	render() {
        let arrs = [];
        console.log(this.props.pulse);
        arrs = this.props.pulse.map((d) => {
            return({
            y : parseInt(d.pulse), label : d.date
            });
        });
       
		const options = {
            animationEnabled: true,	
            theme: "light2",
            backgroundColor : "white",
            title:{
                text: "Pulse rate monitor"
            },
            axisY : {
                title: "Pulserate"
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                name: "type-1",
                showInLegend: true,
                dataPoints: arrs
            }]
    }
    let graphs = null ;
    if(this.props.pulse.length > 0)  {
        graphs = <CanvasJSChart options = {options} 
        
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
        pulse : state.patient.pulse
    }
} 

export default connect(mapStateToProps)(GraphCovid);                            