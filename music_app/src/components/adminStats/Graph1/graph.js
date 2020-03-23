import React from 'react';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';

import * as selectors from '../../../reducers/index';

const Graph1 = ({ stats }) =>{
    
    return(
        <div>Graphs1</div>
    )
}

export default connect(
    state => ({
        stats: selectors.getStats(state, 1),
    })
)(Graph1)