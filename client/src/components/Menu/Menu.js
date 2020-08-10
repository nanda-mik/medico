import React,{Component} from 'react';
import './Menu.css';
import { Redirect } from 'react-router';

class Menu extends Component {
    constructor(){
        super();
        this.state={
            redirect: false
        }
    }
    render(){
        let redirect = null;
        if(this.state.redirect){
            redirect=<Redirect to="/signup"/>
        }
        return(
            <div className="Menu">
                <img className="Images" src="https://i.pinimg.com/564x/5f/8d/d4/5f8dd448a9a6b4d8fce6ff5c12bf43e3.jpg" alt="doc"/>
                <div className="Content">
                    <div className="Con">
                <h1>We are into a new way of interaction.</h1>
                <p>
                    Facing problem to appoint a doctor in these lockdown days?
                    Medico brings a new way of taking care of our health. We bring the new era of interactions between a doctor and patient, 
                    getting updated with your health check-ups, appointments and many more. In these busy days we 
                    need to keep ourselves healthy and fit.
                </p>
                <h1>NOT REGISTERD YET??</h1>
                <button onClick={()=> this.setState({redirect: true})}>Register now</button>
                {redirect}
                </div>
                </div>
                <img className="Image" src="https://i.pinimg.com/564x/79/33/38/793338c1e49ec056d6cee151f2618375.jpg" alt="doc"/>
            </div>
        );
    }
}

export default Menu;