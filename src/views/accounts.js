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
import { BsFillPlusCircleFill } from "react-icons/bs";

import "./accounts.css";

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
    }

    setValidated(true);
  };
  

  return (
    <>
      <Card className="account-card card-hover" onClick={handleShow}>
        <Card.Body>
          <Card.Title>
            <BsFillPlusCircleFill />
          </Card.Title>
          <Card.Title>Add Account</Card.Title>
        </Card.Body>
      </Card>
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
              <Form.Control type="number" placeholder="Current balance" required/>
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
    this.state = { accounts: [], current: {} };
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
  }

  render() {
    const accountItems = this.state.accounts.map((account, index) => (
      <Col xs key={index}>
        <Card className="account-card">
          <Card.Body>
            <Card.Title>{account.name}</Card.Title>
            {account.default ? (
              <Card.Subtitle className="mb-2 text-muted">default</Card.Subtitle>
            ) : (
              ""
            )}
          </Card.Body>
          <Card.Link className="card-hover" href={`/accounts/${account.id}`}>
            <Card.Footer className="text-muted">#id-{account.id}</Card.Footer>
          </Card.Link>
        </Card>
      </Col>
    ));

    return (
      <div>
        <h1 className="text-center" style={{ padding: "20px" }}>
          Accounts
        </h1>
        <Container fluid>
          <div className="account-group">
            <Row>
              {accountItems}
              <Col xs>
                <NewAccount />
              </Col>
            </Row>
          </div>
          <Row>
            <Card style={{ margin: "10px", width: "100%" }}>
              <Card.Body>
                <Card.Title>{this.state.current.name}</Card.Title>
                <h6>Balance: {this.state.current.balance}</h6>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
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
