import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import Home from "./parts/home";
import Accounts from "./parts/accounts";
import Settings from "./parts/settings";
import NewAccount from "./parts/newaccount";

import { Nav, Navbar } from "react-bootstrap";

import { Route, BrowserRouter } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          sticky="top"
        >
          <Navbar.Brand href="/">Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/:accountId" component={Home} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/new" component={NewAccount} />
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
