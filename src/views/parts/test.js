import React from 'react';

//import { Button, ButtonToolbar, Modal, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Schema, RadioGroup, Radio, Alert} from 'rsuite';

import { Panel,Container, Notification, DatePicker} from 'rsuite';
import { Grid, Row, Col } from 'rsuite';

import "./test.css"


export default class Test extends React.Component {
	constructor(props) {
    super(props);
		this.state = { edit: false };
		this.editAction = this.editAction.bind(this);
    };
  editAction(){
	  this.setState({edit: true});
  }
  render() {
    return (
	      <Grid fluid>
	    <Row className="show-grid">
	    <h1>Test</h1>
	    </Row>
    <Row className="show-grid">
	    <Col>
	    </Col>
    </Row>
	    </Grid>
  );
  }

}
