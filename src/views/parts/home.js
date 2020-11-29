import React, { Component } from "react";

import {
	Grid,
	Panel,
  Row,
  Col,
  Container,
} from "rsuite";

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
        <Grid fluid>
            <Row className="show-grid">
              <Col >
	    <Accounts accounts={this.state.accounts}/>
              </Col>
            </Row>
          <Row className="show-grid account-details">
	    <Col xs={18}>
	    <Panel header={this.state.current.name} shaded className="details">
              <div>
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
              </div>
	    </Panel>
	    </Col>
	    <Col xs={6} className="button-card-list">
                <NewAccount />
                <NewTransaction />
	    </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={24}>
	    <Transactions transactions={this.state.transactions}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
