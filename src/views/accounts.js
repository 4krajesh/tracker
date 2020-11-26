import React, { Component } from "react";

import {
  Card,
  Modal,
  Button,
  Row,
  Col,
  Container,
  Table,
  Form,
} from "react-bootstrap";

//import "./accounts.css";
import Cards from "./cards";

function NewAccount() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
	  setShow(true);
	  console.log("show");
  };
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
	    const requestOptions = {
      		method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
        	body: JSON.stringify({name: document.getElementById('formAccountName').value,
		balance: document.getElementById('formCurrentBalance').value,
		type: document.getElementById('formAccountType').value
		})
	    };
	fetch('http://192.168.0.104:3001/createaccount', requestOptions)
        .then(response => response.json())
        .then(function(data){
		if(data.status === 'success'){
			alert('Account added successfully.');
		} else
		{
			alert("Something went wrong.")
		}
	});
    }
    setValidated(true);
  };
  

  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow}>Add Account</Button>
      <Modal show={show} onHide={handleClose} animation={true}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="formAccountName">
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-dark" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
      </Modal>
    </>
  );
}

class Accounts extends Component {
	  constructor(props) {
    super(props);
    this.state = { accounts: [], current: {} , transactions: []};
  }

  setDefaultVal(value, defaultValue) {
    return value === undefined ? defaultValue : value;
  }

  componentDidMount() {
    fetch("http://192.168.0.104:3001/accounts")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            accounts: result.accounts,
	    transactions: result.transactions,
          });
          const current = this.setDefaultVal(
            this.props.match.params.accountId,
            "all"
          );
          const account = result.accounts.filter(
            (account) => account.id === current
          );
          this.setState({ current: account[0] });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            error,
          });
        }
      );
	  console.log(this.state);
	  console.log(this.props.match.params);
  }

  render() {
	  const transactionItems = this.state.transactions.map((transaction, index) => (
	  <tr key={index}>
                    <td>{transaction.id}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.value}</td>
                  </tr>
	));

    return (
      <div>
        <h1 className="text-center" style={{ padding: "20px" }}>
          Accounts
        </h1>
        <Container fluid>
          <div className="account-group">
            <Row>
              <Col xs>
                <NewAccount />
	    <Cards />
              </Col>
            </Row>
          </div>
          <Row>
            <Card style={{ margin: "10px", width: "50%" }}>
              <Card.Body>
	    {this.state.current.name}
	    {this.state.current.balance}
	    {this.state.current.type}
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>Date</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
	    {transactionItems}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Accounts;
