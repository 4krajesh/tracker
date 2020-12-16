import React, { Component } from "react";

import "rsuite/dist/styles/rsuite-default.css";

import Home from "./parts/home";
import Settings from "./parts/settings";
import Graphs from "./parts/graphs";
import Test from "./parts/test";

import "./css/main.css";

import { Navbar, Nav, Tag } from "rsuite";

import { Route, BrowserRouter } from "react-router-dom";
import { BsFillTerminalFill, BsWrench, BsFillHouseFill } from "react-icons/bs";
import { FaChartPie } from "react-icons/fa";
import { DOMHelper } from "rsuite";

const { addClass } = DOMHelper;

class Main extends Component {
  componentDidMount() {
    setTimeout(() => {
      addClass(document.body, "loaded");
    }, 100);
  }
  render() {
    return (
      <>
        <Navbar id="navbar">
          <Navbar.Body>
            <Nav>
              <Tag>Home</Tag>
              <Nav.Item href="/">
                <BsFillHouseFill />
              </Nav.Item>
            </Nav>
            <Nav>
              <Tag>Testing</Tag>
              <Nav.Item href="/test" className="inner-1">
                <BsFillTerminalFill />
              </Nav.Item>
            </Nav>
            <Navbar.Header>
              <a href="#" className="navbar-brand">
                Tracker
              </a>
            </Navbar.Header>
            <Nav>
              <Tag>Graphs</Tag>
              <Nav.Item href="/graphs" className="inner-1">
                <FaChartPie />
              </Nav.Item>
            </Nav>
            <Nav>
              <Tag>Settings</Tag>
              <Nav.Item href="/settings">
                <BsWrench />
              </Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>

        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/home/:accountId" component={Home} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/graphs" component={Graphs} />
          <Route exact path="/test" component={Test} />
        </BrowserRouter>
      </>
    );
  }
}

export default Main;
