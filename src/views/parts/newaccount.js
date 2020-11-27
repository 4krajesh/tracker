import React, { Component } from 'react';
import {
  Form,
} from "react-bootstrap";

import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import '../css/new.css';

class NewAccount extends Component {
	constructor(props) {
    super(props);
    this.state = { validated: false , showT: false };
  }
	handleSubmit = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":  "*", "Access-Control-Allow-Headers": "X-Requested-With"},
                body: JSON.stringify({name: document.getElementById('formAccountName').value,
                balance: document.getElementById('formCurrentBalance').value,
                type: document.getElementById('formAccountType').value
                })
            };
        fetch('http://192.168.0.104:3001/createaccount', requestOptions)
        .then(response => response.json())
        .then(function(data){
		toaster.notify(data.status, {position: 'top-right', duration: 1500});
        });
    }
    this.setState({validated: false});
  };
	render() {
		return (
			<>
<article className="button-card">
	<header className="button-card-header">
          <h2>Add Account</h2>
        </header>
	<div className="button-tags">
          <button data-toggle="modal" data-target="#accountModal">click here</button>
        </div>
</article>

<div className="modal fade" id="accountModal">
  <div className="modal-dialog">
    <div className="modal-content">

      <div className="modal-header">
        <h4 className="modal-title">New Account Details</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>

			<Form>
      <div className="modal-body">
			<Form.Group controlId="formAccountName" >
              <Form.Label>Account name</Form.Label>
              <Form.Control type="text" placeholder="Account name" required/>
            </Form.Group>
            <Form.Group controlId="formCurrentBalance">
              <Form.Label>Current balance</Form.Label>
              <Form.Control type="number" placeholder="Current balance" maxLength="3" required/>
            </Form.Group>
            <Form.Group controlId="formAccountType">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select">
                <option>General</option>
                <option>Cash</option>
                <option>Credit card</option>
                <option>Savings account</option>
                <option>Current account</option>
                <option>Investment</option>
              </Form.Control>
            </Form.Group>

      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
			<button type="button" className="btn btn-secondary" onClick={this.handleSubmit}>Submit</button>
      </div>
			</Form>

    </div>
  </div>
</div>
			</>
                );
        }
}
export default NewAccount;

