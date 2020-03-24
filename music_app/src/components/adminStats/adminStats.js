import React from 'react';

import Graph1 from './Graph1/graph';
import Graph2 from './Graph2/graph';
import Graph3 from './Graph3/graph';
import Graph4 from './Graph4/graph';
// import Graph5 from './Graph5/graph';
import Graph6 from './Graph6/graph';
import Graph7 from './Graph7/graph';
// import Graph8 from './Graph8/graph';

import './styles.css';

const Stats = () => {

    return(
        <div className="stats-wrapper">
            <h1>Estadisticas</h1>
            <div>
                <h4>1. Los 5 artistas con más álbumes publicados</h4>
                <div className='graph-wrapper'>
                    <Graph1/>
                </div>
            </div>
            <div>
                <h4>2. Géneros con más canciones</h4>
                <div className='graph-wrapper'>
                    <Graph2/>
                </div>
            </div>
            <div>
                <h4>3. Total de duración de cada playlist</h4>
                <div className='graph-wrapper'>
                    <Graph3/>
                </div>
            </div>
            <div>
                <h4>4. Canciones de mayor duración con la información de sus artistas (mostrar cinco resultados)</h4>
                <div className='graph-wrapper'>
                    <Graph4/>
                </div>
            </div>
            <div>
                <h4>6.Promedio de duración de canciones por género</h4>
                <div className='graph-wrapper'>
                    <Graph6/>
                </div>
            </div>
            <div>
                <h4>7. Cantidad de artistas diferentes por playlist</h4>
                <div className='graph-wrapper'>
                    <Graph7/>
                </div>
            </div>
        </div>
    )

}

export default Stats;