import React from 'react';
import { Bar } from 'react-chartjs-2';

const Graph = (props) => {

    return (
        <div className="chart">
            <Bar
                data={props.chartData}
                height={50}
                options={props.chartOption}
            />
        </div>
    )
}

export default Graph;