import React from 'react';

//import { Button, ButtonToolbar, Modal, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Schema, RadioGroup, Radio, Alert} from 'rsuite';

import { Panel,Container, Notification, DatePicker} from 'rsuite';
import { Grid, Row, Col } from 'rsuite';

import "./test.css"

export default class Test extends React.Component {
	constructor(props) {
    super(props);
    };
  componentDidMount() {
  }
  render() {
    return (
	      <Grid fluid>
    <Row className="show-grid">
      <Col xs={12}>
	    <div className="test-card-list">
	    <Panel className="test-card" shaded>
        <header className="test-card-header">
          <h2>Add Account</h2>
        </header>
        <div className="test-tags">
          <button onClick={this.open}>click here</button>
        </div>
</Panel>
	    <Panel className="test-card" shaded>
        <header className="test-card-header">
          <h2>Add Account</h2>
        </header>
        <div className="test-tags">
          <button onClick={this.open}>click here</button>
        </div>
</Panel>
	    <Panel className="test-card" shaded>
        <header className="test-card-header">
          <h2>Add Account</h2>
        </header>
        <div className="test-tags">
          <button onClick={this.open}>click here</button>
        </div>
</Panel>
            </div>
	    </Col>
    </Row>
	    </Grid>
  );
  }

}
