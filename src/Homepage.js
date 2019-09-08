import React, {Component} from 'react';
import DataDisplay from './DataDisplay.js';
import ParameterInput from './ParameterInput.js';
import './Stylesheet.css';



export default class Homepage extends Component{

    render(){

        console.log(this.props)

        return(
            <div className = "frame">
                <DataDisplay popData = {this.props.popData}/>
                <ParameterInput run={this.props.run}/>
            </div>
        );
           }
}