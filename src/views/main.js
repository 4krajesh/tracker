import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import Home from "./parts/home";
import Settings from "./parts/settings";
import Test from "./parts/test";

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
          <Navbar.Collapse className="justify-content-end">
	    <Nav className="mr-auto">
              <Nav.Link href="/settings">Settings</Nav.Link>
              <Nav.Link href="/test">Test</Nav.Link>
	    </Nav>
          </Navbar.Collapse>
        </Navbar>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/home/:accountId" component={Home} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/test" component={Test} />
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
