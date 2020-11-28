import React from 'react';

import { Button, ButtonToolbar, Modal, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Schema, RadioGroup, Radio, Alert} from 'rsuite';

import { Notification } from 'rsuite';

function onClick(event) {
  console.log(event.type);
  const eventType = event.type;

  setTimeout(function() {
    console.log(event.type);
    console.log(eventType);
  }, 0);
}

export default class Test extends React.Component {

  render() {
    return (
	    <span ><div><img/></div></span>
	    
    );
  }
}
