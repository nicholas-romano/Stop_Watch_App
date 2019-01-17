import React, { Component } from 'react';
import './App.css';

class Laps extends Component {
  render(){

    var lap_id = this.props.id;
    var hours = this.props.hours;
    var minutes = this.props.minutes;
    var seconds = this.props.seconds;

    return(
      <tr id={lap_id}>
        <td>{lap_id}</td>
        <td>{hours}:{minutes}:{seconds}</td>
      </tr>
    );
  }
}

export default Laps;
