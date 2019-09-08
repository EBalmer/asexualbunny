import React, {Component} from 'react';
import "./Stylesheet.css";

export default class ParameterInput extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handlePopulationChange = this.handlePopulationChange.bind(this);

        this.state = {
            parameters: {
                population: [30],
                foodPerDay: 200,
                boundarySize: 30,
                maxAngleVariance: Math.PI / 3,
                stepDistance: 0.2,
                dailySteps: 500,
                eatRadius: 0.2,
                numberOfDays: 60
            }
        }
    }

    handleChange(event) {
        this.setState({parameters:{...this.state.parameters, [event.target.name]: event.target.value}});
    }

    handlePopulationChange(event){
        this.setState({parameters:{...this.state.parameters, population: [event.target.value]}})
    }

    render() {
        return (
            <div>
                Initial Population:
                <input type="number" value={this.state.parameters.population[0]} onChange={this.handlePopulationChange} />
                Food per Day:
                <input type="number" name='foodPerDay' value={this.state.parameters.foodPerDay} onChange={this.handleChange}/>
                Number of Days:
                <input type="number" name='numberOfDays' value={this.state.parameters.numberOfDays} onChange={this.handleChange}/>
                Boundary Size:
                <input type="number" name='boundarySize' value={this.state.parameters.boundarySize} onChange={this.handleChange}/>
                Angle Variance:
                <input type="number" name='maxAngleVariance' value={this.state.parameters.maxAngleVariance} onChange={this.handleChange}/>
                Step Distance:
                <input type="number" name='stepDistance' value={this.state.parameters.stepDistance} onChange={this.handleChange}/>
                Steps per Day:
                <input type="number" name='dailySteps' value={this.state.parameters.dailySteps} onChange={this.handleChange}/>
                Eat Radius:
                <input type="number" name='eatRadius' value={this.state.parameters.eatRadius} onChange={this.handleChange}/>

                <button onClick={() => this.props.run(this.state.parameters)}> Run </button>
            </div>
        );
    }

}