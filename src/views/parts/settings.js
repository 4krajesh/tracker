import React, { Component } from "react";

import { Grid, Row, Col} from "rsuite";

import Providers from './settings/providers'

class Settings extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={24} sm={24} md={8}>
            <h1 className="text-center" style={{ padding: "20px" }}>
              Settings
            </h1>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={24} sm={16} md={5}>
	    <Providers/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Settings;
