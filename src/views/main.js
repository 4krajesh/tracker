import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import { BsGearFill } from "react-icons/bs";

import Accounts from "./accounts";
import Settings from "./settings";
import Cards from "./cards";

import { Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";

import { Route, BrowserRouter } from "react-router-dom";

class Main extends Component {
  render() {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Settings
      </Tooltip>
    );
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
              <Nav.Link href="/accounts">Accounts</Nav.Link>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Nav.Link href="/settings">
                  <BsGearFill />
                </Nav.Link>
              </OverlayTrigger>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <BrowserRouter>
          <Route exact path="/" component={Accounts} />
          <Route exact path="/accounts" component={Accounts} />
          <Route exact path="/cards" component={Cards} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/accounts/:accountId" component={Accounts} />
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
