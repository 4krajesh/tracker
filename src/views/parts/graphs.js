import React from "react";
import SalaryChart from "./graphs/salary";
import { Grid, Row } from "rsuite";


export default class Graphs extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Grid fluid>
          <Row className="show-grid">
            <h1 style={{padding: '20px'}}>Graphs</h1>
          </Row>
	    <Row className="show-grid">
	    <SalaryChart /> 
	    </Row>
        </Grid>
      </>
    );
  }
}

