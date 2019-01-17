import React, { Component } from 'react';
import Laps from './Laps';

class Timer extends Component {

  startWatch() {
    this.timer = setInterval(this.ticker, 1000);

    this.setState({
      start_enabled: false,
      stop_enabled: true,
      reset_enabled: true,
      lap_enabled: true
    });
  }

  stopWatch() {
    clearTimeout(this.timer);
    this.setState({
      start_enabled: true,
      stop_enabled: false
    });
  }

  resetWatch() {
    clearTimeout(this.timer);
    this.setState({
      total_seconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      start_enabled: true,
      stop_enabled: false,
      reset_enabled: false,
      lap_enabled: false
    });
  }

  resetLaps() {
    this.setState({
      total_laps: 0,
      lap_times: {}
    }, function() {
      this.props.resetLapTimes();
      this.props.resetTotalLaps();
    });
  }

  ticker() {

    var total_seconds = this.state.total_seconds;

    total_seconds++;

    this.setState({
      total_seconds
    });

    this.increment(total_seconds);

  }

  increment(total_seconds) {

    if (total_seconds % 60 === 0) {

      var minutes = total_seconds / 60;

      if (minutes % 60 === 0) {
        this.addHours();
      }
      else {
        this.addMinutes();
      }
    }
    else {
      this.addSeconds(total_seconds);
    }
  }

  addSeconds(total_seconds) {
    var whole_minutes_in_seconds = Math.floor(total_seconds / 60) * 60;

    var remaining_seconds = total_seconds - whole_minutes_in_seconds;

    this.setState({
      seconds: remaining_seconds
    });

  }

  addMinutes() {
    var updated_minutes = this.state.minutes + 1;
    this.setState({
      minutes: updated_minutes,
      seconds: 0
    });
  }

  addHours() {
    var updated_hours = this.state.hours + 1;
    this.setState({
      hours: updated_hours,
      minutes: 0,
      seconds: 0
    });

  }

  lap() {
    var lap_id = this.state.total_laps + 1;
    var total_laps = this.state.total_laps + 1;
    var seconds = this.state.seconds;
    var minutes = this.state.minutes;
    var hours = this.state.hours;

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (hours < 10) {
      hours = '0' + hours;
    }

    this.setState({
      total_laps,
      lap_times: {
        lap_id,
        hours,
        minutes,
        seconds
      }
    }, function() {
      this.props.addLap(this.state.lap_times);
      this.props.addTotalLaps(this.state.total_laps);
    });

  }

  handleAddPost(preview) {
    let data = this.state.post_preview;
    data.push(preview);
    this.setState({post_preview: data});
  }

  constructor(props){
    super(props);

    this.state = {
      total_seconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      total_laps: 0,
      lap_times: {},
      start_enabled: true,
      stop_enabled: false,
      reset_enabled: false,
      lap_enabled: false
    };
    this.startWatch = this.startWatch.bind(this);
    this.stopWatch = this.stopWatch.bind(this);
    this.resetWatch = this.resetWatch.bind(this);
    this.lap = this.lap.bind(this);
    this.resetLaps = this.resetLaps.bind(this);
    this.ticker = this.ticker.bind(this);
    this.increment = this.increment.bind(this);
    this.addSeconds = this.addSeconds.bind(this);
    this.addMinutes = this.addMinutes.bind(this);
    this.addHours = this.addHours.bind(this);
  }

  render(){
    var total_laps = this.props.totalLaps;
    var seconds = this.state.seconds;
    var minutes = this.state.minutes;
    var hours = this.state.hours;

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (hours < 10) {
      hours = '0' + hours;
    }

    let laps;

    if (this.props.lapTimes) {
      laps = this.props.lapTimes.map(lap_times => {
        return (
            <Laps id={lap_times.lap_id} key={lap_times.lap_id} hours={lap_times.hours} minutes={lap_times.minutes} seconds={lap_times.seconds} />
        );
      });
    };

    return(
      <div>
        <h1>Stop Watch</h1>
        <div>
          <ul className="clock-labels">
            <li>Hours</li>
            <li>Minutes</li>
            <li>Seconds</li>
          </ul>
          <span className="clock">{hours}:{minutes}:{seconds}</span>
        </div>
        <div className="buttons">
          <button className="start-button" disabled={this.state.start_enabled ? false : true} onClick={this.startWatch}>Start</button>
          <button className="stop-button" disabled={this.state.stop_enabled ? false : true} onClick={this.stopWatch}>Stop</button>
          <button className="reset-button" disabled={this.state.reset_enabled ? false : true} onClick={this.resetWatch}>Reset</button>
          <div className="lap-button">
            <button disabled={this.state.lap_enabled ? false : true} onClick={this.lap}>Lap</button>
          </div>
        </div>
        <div className={total_laps > 0 ? 'display' : 'hide'}>
          <h3>Total Laps: {total_laps}</h3>
          <table className="lap-table">
            <thead>
              <tr>
                <th>Lap</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {laps}
            </tbody>
          </table>
          <div className="reset-table">
            <button className="reset-table-button" onClick={this.resetLaps}>Reset Table</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
