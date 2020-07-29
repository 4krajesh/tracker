import React, { Component } from 'react';
  
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';


import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";

import Accounts from "./views/accounts";
import Transactions from "./views/transactions";

function App() {
    return (
             <div>
	    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
  <Navbar.Brand href="/">Tracker</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/accounts">Accounts</Nav.Link>
      <Nav.Link href="/transactions">Transactions</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
                          <BrowserRouter>
	    <Route exact path="/" component={Accounts}/>
	    <Route exact path="/accounts" component={Accounts}/>
	    <Route exact path="/transactions" component={Transactions}/>
                          </BrowserRouter>
            </div>
    );
}


export default App;
