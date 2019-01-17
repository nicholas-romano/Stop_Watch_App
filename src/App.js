import React, { Component } from 'react';
import Timer from './Timer';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      total_laps: 0,
      lap_times: []
    };
  }

  addLap(lap) {
    let data = this.state.lap_times;
    data.push(lap);
    this.setState({lap_times: data});
  }

  addTotalLaps(laps) {
    this.setState({total_laps: laps});
  }

  resetTotalLaps() {
    this.setState({
      total_laps: 0
    });
  }

  resetLapTimes() {
    this.setState({
      lap_times: []
    });
  }

  render() {
    return (
      <div className="App">
        <Timer
        addLap={this.addLap.bind(this)}
        lapTimes={this.state.lap_times}
        addTotalLaps={this.addTotalLaps.bind(this)}
        totalLaps={this.state.total_laps}
        resetLapTimes={this.resetLapTimes.bind(this)}
        resetTotalLaps={this.resetTotalLaps.bind(this)}
        />
      </div>
    );
  }
}

export default App;
