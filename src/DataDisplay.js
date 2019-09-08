import React, {Component} from 'react';
import {VictoryTheme, VictoryChart, VictoryLine} from "victory";

export default class DataDisplay extends Component {


    render() {

        console.log(this.props)

        return(
        <VictoryChart
            // theme={VictoryTheme.material}
        >
            <VictoryLine
                style={{
                    data: {stroke: "#c43a31"},
                    parent: {border: "1px solid #c43a31"}
                }}
                data={
                    this.props.popData
                }
            />
        </VictoryChart>
        )
    }
}