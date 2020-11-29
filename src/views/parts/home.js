import React, { Component } from "react";
import { BsStarHalf } from "react-icons/bs";

import {
	Grid,
	Panel,
  Row,
  Col,
  Container,
} from "rsuite";

import "../css/home.css";
import "../css/accounts.css";

import BarChart from "./bar";
import NewAccount from "./newaccount";
import Transactions from "./transactions";
import NewTransaction from "./newtransaction";


class Home extends Component {
	  constructor(props) {
    super(props);
    this.state = { accounts: [], id: 'all' , current: {}, transactions: []};
  }

  setDefaultVal(value, defaultValue) {
    return value === undefined ? defaultValue : value;
  }

 stateUpdater(id){
	 console.log("updater");
	     fetch("http://192.168.0.104:3001/accounts")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            accounts: result.accounts,
            transactions: result.transactions,
          });
          const account = result.accounts.filter(
            (account) => account.id === id
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

  componentDidMount() {
	   console.log('mount');
             fetch("http://192.168.0.104:3001/accounts")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            accounts: result.accounts,
            transactions: result.transactions,
          });
          const account = result.accounts.filter(
            (account) => account.id === 'all'
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
		            <Panel shaded className="account-card" key={index}>

		              <header className="account-card-header">
		      {account.default ? (
				      <p><BsStarHalf /> {account.id}</p>
			      ) : (
				      <p>{account.id}</p>

			      )}
          <h2>{account.name}</h2>
        </header>
        <div className="account-tags">
          <a href="#" onClick={() => this.stateUpdater(account.id)}>view</a>
		      {account.default ? (
		      " " ) : (
			      <>
          <a href="#">edit</a>
          <a href="#">delete</a>
			      </>
		      )}
        </div>
      </Panel>
    ));

    return (
      <div>
        <Grid fluid>
            <Row className="show-grid">
              <Col >
	    <div className="account-card-list">
	    {accountItems}
 	</div>
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
	    <Row className="show-grid">
            <Col xs={24}>
	    <BarChart/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
