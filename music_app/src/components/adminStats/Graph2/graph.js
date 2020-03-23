import React from 'react';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';

import * as selectors from '../../../reducers/index';
import * as actions from '../../../actions/stats';
import makeRequest from '../../requests/index';

const Graph2 = ({ stats }) =>{

    const options = {
        chart: {
            background: "#f4f4f4",
            foreColor: "#333"
        },
        xaxis: {
            fill: {
                colors: ["#F44336"]
            },
            dataLabels: {
                enabled: false
            },
            title: {
                text: "Largest US Cities By Population",
                align: "center",
                margin: 20,
                offsetY: 20,
                style: {
                    fontSize: "25px"
                }
            },
            categories: [
                "New York",
                "Los Angeles",
                "Chicago",
                "Houston",
                "Philadelphia",
                "Phoenix",
                "San Antonio",
                "San Diego",
                "Dallas",
                "San Jose"
              ]
        }
    }
    
    const series = [{
        name: "Population",
        data: [
            8550405,
            3971883,
            2720546,
            2296224,
            1567442,
            1563025,
            1469845,
            1394928,
            1300092,
            1026908
        ]   
    }]

    return(
            <Chart
                options={options}
                series={series}
                type='bar'
                height='450'
                width='100%'
            />
    )
}

export default connect(
    state => ({
        stats: selectors.getStats(state, 'graph2'),
    })
)(Graph2)