import React from 'react';

import { Button, ButtonToolbar, Modal, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Schema, RadioGroup, Radio, Alert} from 'rsuite';

import { Notification, DatePicker} from 'rsuite';

import "./test.css"

export default class Test extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      backdrop: false,
      show: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }
  render() {
    const { backdrop, show } = this.state;
    return (
      <div className="modal-container">
	    <h1>Testing</h1>
        <span>Backdrop: </span>

        <RadioGroup
          name="radioList"
          inline
          value={backdrop}
          onChange={value => {
            this.setState({ backdrop: value });
          }}
        >
          <Radio value={true}>true</Radio>
          <Radio value={false}>false</Radio>
          <Radio value="static">static</Radio>
        </RadioGroup>
        <hr />
        <ButtonToolbar>
          <Button onClick={this.open}> Open</Button>
        </ButtonToolbar>

        <Modal backdrop={backdrop} show={show} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} appearance="primary">
              Ok
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}
