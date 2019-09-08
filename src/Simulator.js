import React, {Component} from 'react';
import Homepage from './Homepage.js';

export default class Simulator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            popData: []
        }
    }

    initialise(parameters, alfalfas) {
        let bunnies = [];
        for (let i = 0; i < parameters.population[parameters.population.length - 1]; i++) {
            bunnies.push({
                x: (Math.random() - 0.5) * parameters.boundarySize,
                y: (Math.random() - 0.5) * parameters.boundarySize,
                pathAngles: [Math.random() * 2 * Math.PI],
                foodConsumed: 0
            })
        }
        for (let i = 0; i < parameters.foodPerDay - alfalfas.length; i++) {
            alfalfas.push({
                x: (Math.random() - 0.5) * parameters.boundarySize,
                y: (Math.random() - 0.5) * parameters.boundarySize
            })
        }
        return {bunnies, alfalfas}
    }

    bunnyEats(parameters, alfalfas, bunny) {
        return alfalfas.filter((alfalfa) => {
            let isNotEaten = (Math.abs(alfalfa.x - bunny.x) > parameters.eatRadius) || (Math.abs(alfalfa.y - bunny.y) > parameters.eatRadius);
            if (!isNotEaten) bunny.foodConsumed++;
            return isNotEaten
        })
    }

    populationChange(parameters, bunnies) {
        let pregnantBunnies = 0;
        bunnies = bunnies.filter((bunny) => {
            if (bunny.foodConsumed > 1) pregnantBunnies++;
            return bunny.foodConsumed !== 0;
        });
        parameters.population.push(bunnies.length + pregnantBunnies);
        return {parameters, bunnies}
    }

    moveBunnies(parameters, alfalfas, bunnies) {
        for (let i = 0; i < parameters.dailySteps; i++) {
            bunnies = bunnies.map((bunny) => {
                if (Math.abs(bunny.x) > parameters.boundarySize / 2 || Math.abs(bunny.y) > parameters.boundarySize / 2) {
                    if (Math.abs(bunny.x) > parameters.boundarySize / 2) {
                        bunny.pathAngles.push(Math.PI - bunny.pathAngles[bunny.pathAngles.length - 1])

                    }
                    if (Math.abs(bunny.y) > parameters.boundarySize / 2) {
                        bunny.pathAngles.push(2 * Math.PI - bunny.pathAngles[bunny.pathAngles.length - 1])

                    }
                } else {
                    bunny.pathAngles.push(bunny.pathAngles[bunny.pathAngles.length - 1] + ((Math.random() - 0.5) * parameters.maxAngleVariance))
                }
                alfalfas = this.bunnyEats(parameters, alfalfas, bunny);
                return {
                    ...bunny,
                    x: (bunny.x + parameters.stepDistance * Math.cos(bunny.pathAngles[bunny.pathAngles.length - 1])),
                    y: (bunny.y + parameters.stepDistance * Math.sin(bunny.pathAngles[bunny.pathAngles.length - 1]))
                };
            });
        }
        return {bunnies, alfalfas}
        // This below reverts the path, taking the bunny home
        // for (let i = 0; i < this.state.dailySteps; i++) {
        // 	this.state.bunnies = this.state.bunnies.map((bunny) => {
        // 		this.state.data.push({x: bunny.x, y: bunny.y});
        // 		bunny.pathAngles.push(bunny.pathAngles[i] + Math.PI)
        // 		return {
        // 			...bunny,
        // 			x: (bunny.x + this.state.stepDistance * Math.cos(bunny.pathAngles[bunny.pathAngles.length - 1])),
        // 			y: (bunny.y + this.state.stepDistance * Math.sin(bunny.pathAngles[bunny.pathAngles.length - 1]))
        // 		}
        // 	});
        // }
    }

    // setInitialParams = (parameters) => {
    //     console.log(parameters);
    //     this.setState({parameters: parameters}, ()=>{
    //         this.run(parameters)
    //     });
    //     console.log(parameters);
    //     // this.run();
    // };

    run = (parameters) => {
        this.setState({popData: []}, ()=>{
            let alfalfas = [];
            let popData = [];
            for (let i = 0; i < parameters.numberOfDays; i++) {
                let bunnies = []
                let changes = this.initialise(parameters, alfalfas);
                bunnies = changes.bunnies;
                alfalfas = changes.alfalfas;
                changes = this.moveBunnies(parameters, alfalfas, bunnies);
                bunnies = changes.bunnies;
                alfalfas = changes.alfalfas;
                changes =this.populationChange(parameters, bunnies);
                bunnies = changes.bunnies;
                parameters = changes.parameters;
                popData.push({
                    x: i,
                    y: parameters.population[i]
                });
                console.log(parameters.population[i]);
            }
            this.setState({popData: popData})
        })


    };

    render() {
        return (
            <div>
                <button onClick={() => this.run()}/>
                <button onClick={() => console.log(this.state.popData)}/>
                <Homepage popData={this.state.popData} run={this.run}/>
            </div>

        )
    }
}
