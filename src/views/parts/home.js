import React, { Component } from "react";

import {
  Card,
  Modal,
  Button,
  Row,
  Col,
  Container,
  Form,
} from "react-bootstrap";

import "../css/home.css";

import Accounts from "./accounts";
import NewAccount from "./newaccount";
import Transactions from "./transactions";
import NewTransaction from "./newtransaction";


class Home extends Component {
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
  }

  render() {

    return (
      <div>
        <Container fluid>
          <div className="account-group">
            <Row>
              <Col xs>
	    <Accounts accounts={this.state.accounts}/>
              </Col>
            </Row>
          </div>
          <Row>
	    <Col>
            <Card className="account-details" style={{ margin: "10px", width: "100%", height: "150px" }}>
              <Card.Body>
	      <h3>{this.state.current.name}</h3>
	      <div className="elements">
	    <div className="element">
	    <p>Balance</p>
	    <h6>{this.state.current.balance}</h6>
	    </div>
	    <div className="element">
	    <p>Type</p>
	    <h6>{this.state.current.type}</h6>
	    </div>
	    </div>
              </Card.Body>
            </Card>
	    </Col>
	    <Col xs lg="3">
	            <div className="button-card-list">
                <NewAccount />
                <NewTransaction />
        </div>
	    </Col>
          </Row>
          <Row>
            <Col>
	    <Transactions transactions={this.state.transactions}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
