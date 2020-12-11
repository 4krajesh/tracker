import React from "react";
import BarChart from "./bar";
import SalaryChart from "./salary";
import { Grid, Row, Col } from "rsuite";


export default class Graphs extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Grid fluid>
          <Row className="show-grid">
            <h1>Graphs</h1>
          </Row>
	    <Row className="show-grid">
	    <SalaryChart /> 
	    </Row>
        </Grid>
      </>
    );
  }
}

