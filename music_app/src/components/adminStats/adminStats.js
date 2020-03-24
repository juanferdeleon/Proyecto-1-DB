import React from 'react';

import Graph1 from './Graph1/graph';
import Graph2 from './Graph2/graph';
// import Graph3 from './Graph3/graph';
// import Graph4 from './Graph4/graph';
// import Graph5 from './Graph5/graph';
// import Graph6 from './Graph6/graph';
// import Graph7 from './Graph7/graph';
// import Graph8 from './Graph8/graph';

import './styles.css';

const Stats = () => {

    return(
        <div className="stats-wrapper">
            <h1>Estadisticas</h1>
            <div>
                <h4>Géneros con más canciones</h4>
                <div className='graph-wrapper'>
                    <Graph2/>
                </div>
            </div>
            <div>
                <h4>Géneros con más canciones</h4>
                <div className='graph-wrapper'>
                    <Graph2/>
                </div>
            </div>
            <div>
                <h4>Géneros con más canciones</h4>
                <div className='graph-wrapper'>
                    <Graph2/>
                </div>
            </div>
        </div>
    )

}

export default Stats;