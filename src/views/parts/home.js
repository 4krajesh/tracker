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

import NewAccount from "./newaccount";
import Transactions from "./transactions";
import NewTransaction from "./newtransaction";

import { SwitchTransition, CSSTransition } from "react-transition-group";


class Home extends Component {
	  constructor(props) {
    super(props);
    this.state = { accounts: [], id: 'all' , current: {}, transactions: [], changeDetails: false};
  }

  setDefaultVal(value, defaultValue) {
    return value === undefined ? defaultValue : value;
  }

 stateUpdater(id, t){
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
	 if(t)
	   this.setState({changeDetails: !this.state.changeDetails});
 }
  componentDidMount() {
	  this.stateUpdater(this.state.id, false);
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
          <a href="#" onClick={() => this.stateUpdater(account.id, true)}>view</a>
		      {account.default ? (
		      " " ) : (
			      <>
          <a href="#">edit</a>
          <a href="#">remove</a>
			      </>
		      )}
        </div>
      </Panel>
    ));

	  const { changeDetails } = this.state;
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
	<SwitchTransition mode='out-in'>
          <CSSTransition
            key={changeDetails}
            addEndListener={(node, done) => {
              console.log(node, done);

              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
	    <Col style={{ display: 'flex'}}>
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
	    <NewAccount />
                <NewTransaction />
	    </Col>
	</CSSTransition>
        </SwitchTransition>
          </Row>
          <Row className="show-grid">
            <Col>
	    <Transactions transactions={this.state.transactions}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
