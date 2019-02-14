import React, { Component } from 'react';

import ReactGantt from 'gantt-for-react';
import Graph from 'react-graph-vis';

import './App.css';

const tasks = require('./issues.json');
const graph = require('./vis.json');
const options = {
  width: '100%',
  height: '100%',
  autoResize: true,
  layout: {
    hierarchical: false
  },
  edges: {
    color: '#000000'
  }
};


class App extends Component {
  constructor() {
    super();
    this.state = {
      ganttViewMode: 'Week',
      view: 'vis'
    }
  }
  events = ev => {
    console.log(ev);
  }
  render() {
    return (
      <div className='App'>
        {this.state.view === 'vis' && <Graph style={{ width: '100%', height: '100%' }} graph={graph} options={options} events={this.events} />}
        {this.state.view === 'gantt' && <ReactGantt tasks={tasks} viewMode={this.state.viewMode} />}
      </div>
    );
  }
  componentDidMount() {
    // kludge to set vis canvas height, otherwise it defaults to 150px
    if (this.state.view === 'vis') {
      setTimeout(() => document.getElementsByTagName('canvas')[0].height = document.documentElement.scrollHeight - 100, 500);
    }
  }
}

export default App;
