import React, { Component } from "react";

import 'rsuite/dist/styles/rsuite-default.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min';


import Home from "./parts/home";
import Settings from "./parts/settings";
import Test from "./parts/test";

import "./css/main.css"

import { Icon, Navbar, Nav, Tooltip, Whisper, Popover} from "rsuite";

import { Route, BrowserRouter } from "react-router-dom";
import { BsFillTerminalFill, BsWrench, BsFillHouseFill } from "react-icons/bs";
import { FaChartPie } from "react-icons/fa";


class Main extends Component {
	  constructor(props) {
    super(props);
    this.mainRef = React.createRef();
  }
  render() {
    return (
      <>
	    <Navbar>
    <Navbar.Body>
      <Nav>
	<p>Home</p>
        <Nav.Item href="/" ><BsFillHouseFill /></Nav.Item>
      </Nav>
        <Nav>
        <p>Testing</p>
        <Nav.Item href="/test" className="inner-1" ><BsFillTerminalFill /></Nav.Item>
      </Nav>
    <Navbar.Header>
      <a href="/" className="navbar-brand">Tracker</a>
    </Navbar.Header>
        <Nav >
            <p>Charts</p>
        <Nav.Item href="/test" className="inner-1" ><FaChartPie /></Nav.Item>
	    </Nav>
      <Nav>
	    <p>Settings</p>
        <Nav.Item href="/settings"><BsWrench/></Nav.Item>
      </Nav>
    </Navbar.Body>
  </Navbar>

        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/home/:accountId" component={Home} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/test" component={Test} />
        </BrowserRouter>
      </>
    );
  }
}

export default Main;
