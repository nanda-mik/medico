import React ,{Component} from 'react';
import canvasJsReact from '../../../../Assets/canvasJs/canvasjs.react';
import {connect} from 'react-redux';


const CanvasJSChart = canvasJsReact.CanvasJSChart;

 
class GraphCovid extends Component {	
   
	render() {
        let arrs = [];
        console.log(this.props.diabetes);
        arrs = this.props.covidTracker.map((d) => {
            return({
            y : parseInt(d.count), label : d.date
            });
        });
       
		const options = {
            animationEnabled: true,	
            theme: "dark2",
            backgroundColor : "dimgrey",
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
                type: "column",
                name: "type-1",
                showInLegend: true,
                dataPoints: arrs
            }]
    }
    let graphs = null ;
    if(this.props.covidTracker.length > 0)  {
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
        covidTracker : state.patient.covidTracker
    }
} 

export default connect(mapStateToProps)(GraphCovid);                            