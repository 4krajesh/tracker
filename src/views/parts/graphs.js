import React from 'react';
import BarChart from "./bar";
import { CSSTransition } from 'react-transition-group';

import "../css/graphs.css"

export default class Graphs extends React.Component {
	constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {
	  const show = true;
    return (
	    <>
	    <h1>Graphs</h1>
	    <BarChart/>
	    </>
    );
  }

}
