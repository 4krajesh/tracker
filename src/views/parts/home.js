import React, { Component } from "react";

import { BsLock, BsTrashFill } from "react-icons/bs";
import { FaAngleDoubleRight } from "react-icons/fa";


import {  ButtonToolbar, Notification, Button, Table, Grid, Panel, Row, Col } from "rsuite";

import "../css/home.css";
import "../css/accounts.css";

import NewAccount from "./newaccount";
import NewTransaction from "./newtransaction";
import EditTransaction from "./edittransaction";

import { DOMHelper } from 'rsuite';
import { SwitchTransition, CSSTransition } from "react-transition-group";
const { Column, HeaderCell, Cell, Pagination } = Table;

const { removeClass, hasClass, toggleClass, getOffsetParent } = DOMHelper;


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      id: "all",
      current: {},
      transactions: [],
      changeDetails: false,
      addColumn: false,
      page: 1,
      displayLength: 10,
      length: 0,
      sortColumn: "created_at",
      sortType: "desc",
      edit: false,
    };
    this.handleSortColumn = this.handleSortColumn.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeLength = this.handleChangeLength.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.checkLength = this.checkLength.bind(this);
  }

deleteAccount(id, index) {
  const { accounts } = this.state;
  Notification.warning({
    title: 'Account Delete - ID ' + id,
    duration: 10000,
    description: (
      <div>
        <p>Are you sure?</p>
        <p>All transactions related to the account will be deleted.</p>
	    <br/>
            <ButtonToolbar>
          <Button
            onClick={() => { 
		    Notification.close();
		    if (hasClass(getOffsetParent(this.accountRefs[index]), 'active')) {
			    this.accountDetails('all', 0);
		    }
		    this.setState({accounts: accounts.filter(account => account.id !== id)}); }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              Notification.close();
            }}
          >
            Cancel
          </Button>
            </ButtonToolbar>
      </div>
    )
  });
}

  handleAction(action, id) {
    if (action === "edit") {
      this.setState({ edit: true, editTransId: id });
	    setTimeout(() => {
      this.setState({edit: false });
    }, 100);
    }
  }

  setDefaultVal(value, defaultValue) {
    return value === undefined ? defaultValue : value;
  }

  stateUpdater(id) {
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
		Notification.error({
    title: 'Error',
    description:(
            <>
                <p>Unable to retrive accounts data.</p>
                <p>Please verify if your server API is working.</p>
            </>
                  )
  });
          this.setState({
            error,
          });
        }
      );
  }
  componentDidMount() {
    this.stateUpdater(this.state.id, false);
  }

  handleChangePage(dataKey) {
    this.setState({
      page: dataKey,
    });
  }

  checkLength() {
    const { transactions, current } = this.state;
    if (current.id !== 'all')
            return transactions.filter((v, i) => {
                    return v.account === current.name
            }).length;
    return transactions.length
  }

  handleChangeLength(dataKey) {
    this.setState({
      page: 1,
      displayLength: dataKey,
    });
  }

  getData() {
    const {
      transactions,
      sortColumn,
      sortType,
      page,
      displayLength,
      current,
    } = this.state;
    let sorted = [];

    if (sortColumn && sortType) {
      sorted = transactions
        .sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          if (sortColumn === "created_at") {
            x = new Date(x);
            y = new Date(y);
          }
          if (typeof x === "string") {
            x = x.charCodeAt();
          }
          if (typeof y === "string") {
            y = y.charCodeAt();
          }
          if (sortType === "asc") {
            return x - y;
          } else {
            return y - x;
          }
        })
    }
	if (current.id !== 'all')
	    sorted = sorted.filter((v, i) => { 
		    return v.account === current.name 
	    });

        return sorted.filter((v, i) => {
          const start = displayLength * (page - 1);
          const end = start + displayLength;
          return i >= start && i < end;
        });
  }

  handleSortColumn(sortColumn, sortType) {
    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        sortColumn,
        sortType,
        loading: false,
      });
    }, 500);
  }

  accountRefs = [];

  setRef = (ref) => {
      this.accountRefs.push(ref);
  };

  accountDetails(id, index) {
        const account = this.state.accounts.filter(
            (account, index) => account.id === id
        );

        this.setState({ current: account[0] });
        this.setState({ changeDetails: !this.state.changeDetails });
	for (var x in this.accountRefs) {
		removeClass(getOffsetParent(this.accountRefs[x]), 'active');
	}
	toggleClass(getOffsetParent(this.accountRefs[index]), 'active');
  }


   render() {
    const items = [];
    for (const [index, value] of this.state.transactions.entries()) {
      if (index === 0)
        items.push(
          <tr key={index}>
            <td colSpan="2" style={{ background: "lightblue" }}>
              Date: {value.created_at}
            </td>
          </tr>
        );
      else if (
        this.state.transactions[index >= 1 ? index - 1 : 0].created_at !==
        value.created_at
      )
        items.push(
          <tr key={index}>
            <td colSpan="2" style={{ background: "lightblue" }}>
              Date: {value.created_at}
            </td>
          </tr>
        );
      items.push(
        <tr key={index + "a"}>
          <td>{value.id}</td>
          <td>{value.value}</td>
        </tr>
      );
    }

    var accountItems = this.state.accounts.map((account, index) => (
      <Panel shaded className={account.id === 'all' ? "account-card active" : "account-card"} key={index} >
        <header className="account-card-header" ref={this.setRef}>
          {account.default ? (
            <p>
              <BsLock /> ID {account.id}
            </p>
          ) : (
		  <>
	    <Button className="account-delete-button" onClick={() => this.deleteAccount(account.id, index)}><BsTrashFill/></Button>
            <p>ID {account.id}</p>
		  </>
          )}
          <h2>{account.name}</h2>
        </header>
	<div className="account-body">
	    <Grid>
	    <Row className="show-grid">
	    <Col xs={12} md={2}>
	    <p>Balance</p>
	    <h6>{account.balance}</h6>
	    <p>Type</p>
	    <h6>{account.type}</h6>
	    </Col>
	    <Col xs={12} md={2}>
            { account.limit ? ( <>
		    <p>Credit Limit</p>
	    	    <h6>{account.limit}</h6> </>
            ) : (<></>)
            }
            { account.provider ? ( <>
                          <p>Provider</p>
                          <h6>{account.provider}</h6> </>
	) : (<></>)
            }
	    </Col>
	    </Row>
	    </Grid>
	</div>
        <div className="account-tags">
          <Button onClick={() => this.accountDetails(account.id, index)}>
            view
          </Button>
          {account.default ? (
            " "
          ) : (
            <>
              <Button>edit</Button>
            </>
          )}
        </div>
      </Panel>
    ));
    const { changeDetails, displayLength, page } = this.state;
    return (
      <div>
        <Grid fluid>
          <Row className="show-grid">
            <Col>
	    <div className="adder">
	    <div>
	    <NewAccount/>
	    <NewTransaction/>
	    </div>
	    <div className="adiv">
	    <Button className="animate"> <FaAngleDoubleRight/> </Button>
	    </div>
	    </div>
              <div className="account-card-list">{accountItems}</div>
            </Col>
          </Row>
	    </Grid>
	                          <SwitchTransition mode="out-in">
              <CSSTransition
                key={changeDetails}
                addEndListener={(node, done) => {
                  node.addEventListener("transitionend", done, false);
                }}
                classNames="fade"
              >
        <Grid fluid>
	      <Row className="show-grid slots change">
      <Col xs={24} sm={24} md={8}>
	      <Panel header="Expense" className="slot" shaded>
  </Panel>
      </Col>
      <Col xs={24} sm={24} md={8}>
	      <Panel header="Income" className="slot" shaded>
  </Panel>
      </Col>
      <Col xs={24} sm={24} md={8}>
	      <Panel header="Transfer" className="slot" shaded>
  </Panel>
      </Col>
    </Row>
          <Row className="show-grid change change-1">
                <Col >
                  <Panel
                    header="Transactions"
                    shaded
                    style={{ margin: "10px", borderRadius: "16px" }}
                    bodyFill
                  >
                    <EditTransaction
                      open={this.state.edit}
                      id={this.state.editTransId}
                    />
                    <Table
                      virtualized
                      height={420}
                      data={this.getData()}
                      sortColumn={this.state.sortColumn}
                      sortType={this.state.sortType}
                      onSortColumn={this.handleSortColumn}
                      loading={this.state.loading}
                      onRowClick={(data) => {
                        console.log(data);
                      }}
                    >
                      <Column width={300} align="center">
                        <HeaderCell>Id</HeaderCell>
                        <Cell dataKey="id" />
                      </Column>

                      <Column width={200} sortable>
                        <HeaderCell>Created At</HeaderCell>
                        <Cell dataKey="created_at" />
                      </Column>

                      <Column width={200} sortable>
                        <HeaderCell>Value</HeaderCell>
                        <Cell dataKey="value" />
                      </Column>
                      
	    	      <Column width={200} sortable>
                        <HeaderCell>Account Name</HeaderCell>
                        <Cell dataKey="account" />
                      </Column>

                      <Column width={120}>
                        <HeaderCell>Action</HeaderCell>

                        <Cell>
                          {(rowData) => {
                            return (
                              <span>
                                <a
                                  onClick={() =>
                                    this.handleAction("edit", rowData.id)
                                  }
                                >
                                  {" "}
                                  Edit{" "}
                                </a>{" "}
                                |{" "}
                                <a
                                  onClick={() =>
                                    this.handleAction("remove", rowData.id)
                                  }
                                >
                                  {" "}
                                  Remove{" "}
                                </a>
                              </span>
                            );
                          }}
                        </Cell>
                      </Column>
                    </Table>
                    <Pagination
                      lengthMenu={[
                        {
                          value: 10,
                          label: 10,
                        },
                        {
                          value: 20,
                          label: 20,
                        },
			{
                          value: 50,
                          label: 50,
                        },
                        {
                          value: 100,
                          label: 100,
                        },
                      ]}
                      activePage={page}
                      displayLength={displayLength}
                      total={this.checkLength()}
                      onChangePage={this.handleChangePage}
                      onChangeLength={this.handleChangeLength}
                    />
                  </Panel>
                </Col>
          </Row>
        </Grid>
              </CSSTransition>
            </SwitchTransition>
      </div>
    );
  }
}

export default Home;
