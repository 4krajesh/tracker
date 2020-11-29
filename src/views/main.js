import React, { Component } from "react";

import 'rsuite/dist/styles/rsuite-default.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min';


import Home from "./parts/home";
import Settings from "./parts/settings";
import Test from "./parts/test";

import { Icon, Navbar, Nav } from "rsuite";

import { Route, BrowserRouter } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div>
	    <Navbar>
    <Navbar.Header>
      <a href="/" className="navbar-brand logo">Tracker</a>
    </Navbar.Header>
    <Navbar.Body>
      <Nav>
        <Nav.Item icon={<Icon icon="home" />} href="/test" >Test</Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<Icon icon="cog" />} href="/settings">Settings</Nav.Item>
      </Nav>
    </Navbar.Body>
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
