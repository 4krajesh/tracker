import React from 'react';
import BarChart from "./bar";
import { Grid, Row, Col } from 'rsuite';

import "../css/graphs.css"

export default class Graphs extends React.Component {
  componentDidMount() {
  }

  render() {
	  const show = true;
    return (
	    <>
	                  <Grid fluid>
            <Row className="show-grid">
	    <h1>Graphs</h1>
            </Row>
	    <Row className="show-grid">
            <Col xs={24} sm={24} md={12}>
	    <BarChart/>
            </Col>
            <Col xs={24} sm={24} md={12}>
	    <BarChart/>
            </Col>
	    </Row>
            </Grid>

	    </>
    );
  }

}
