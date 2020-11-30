import React, { Component } from "react";
import { BsStarHalf } from "react-icons/bs";

import {
	Table,
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
const { Column, HeaderCell, Cell,  Pagination } = Table;


class Home extends Component {
	  constructor(props) {
    super(props);
    this.state = { accounts: [], id: 'all' , current: {}, transactions: [], changeDetails: false, addColumn: false, page: 1, displayLength: 10, sortColumn: 'created_at', sortType: 'desc'};
    this.handleSortColumn = this.handleSortColumn.bind(this);
		      this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeLength = this.handleChangeLength.bind(this);
  }

  setDefaultVal(value, defaultValue) {
    return value === undefined ? defaultValue : value;
  }

 stateUpdater(id, t){
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

  handleChangePage(dataKey) {
    this.setState({
      page: dataKey
    });
  }
  handleChangeLength(dataKey) {
    this.setState({
      page: 1,
      displayLength: dataKey
    });
  }
	getData() {
    const { transactions, sortColumn, sortType, page, displayLength } = this.state;

    if (sortColumn && sortType) {
      return transactions.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
	if( sortColumn == 'created_at' ) {
		x = new Date(x);
		y = new Date(y);
	}
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      }).filter((v, i) => {
      const start = displayLength * (page - 1);
      const end = start + displayLength;
      return i >= start && i < end;
    });
    }
      return transactions.filter((v, i) => {
      const start = displayLength * (page - 1);
      const end = start + displayLength;
      return i >= start && i < end;
    });
  }

  handleSortColumn(sortColumn, sortType) {
	  console.log(sortColumn, sortType);
    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        sortColumn,
        sortType,
        loading: false
      });
    }, 500);
  }


  render() {
	                  const items = []
                for (const [index, value] of this.state.transactions.entries()) {
                        if (index === 0)
                                items.push(<tr key={index}><td colSpan="2" style={{ background: "lightblue" }}>Date: {value.created_at}</td></tr>)
                        else if (this.state.transactions[index >= 1 ? index - 1 : 0].created_at !== value.created_at)
                                items.push(<tr key={index}><td colSpan="2" style={{ background: "lightblue" }}>Date: {value.created_at}</td></tr>)
                        items.push(<tr key={index + 'a' }><td>{value.id}</td><td>{value.value}</td></tr>)
                }

	  	     var accountItems = this.state.accounts.map((account, index) => (
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
	  const { changeDetails, displayLength, page } = this.state;
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

              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
	    <Col style={{ display: 'flex'}}>
	    <Panel header={this.state.current.name} shaded className="details change">
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
	            <SwitchTransition mode='out-in'>
          <CSSTransition
            key={changeDetails}
            addEndListener={(node, done) => {

              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            <Col>
	    <Panel header="Transactions" shaded style={{ margin: "10px", borderRadius: "16px"}} className="change" bodyFill>
	    <Table
	    virtualized
          height={420}
          data={this.getData()}
          sortColumn={this.state.sortColumn}
          sortType={this.state.sortType}
          onSortColumn={this.handleSortColumn}
          loading={this.state.loading}
          onRowClick={data => {
            console.log(data);
          }}
        >
          <Column width={300} align="center" >
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

          <Column width={120}>
            <HeaderCell>Action</HeaderCell>

            <Cell>
              {rowData => {
                function handleAction() {
                  alert(`id:${rowData.id}`);
                }
                return (
                  <span>
                    <a onClick={handleAction}> Edit </a> |{' '}
                    <a onClick={handleAction}> Remove </a>
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
              label: 10
            },
            {
              value: 20,
              label: 20
            }
          ]}
          activePage={page}
          displayLength={displayLength}
          total={this.state.transactions.length}
          onChangePage={this.handleChangePage}
          onChangeLength={this.handleChangeLength}
        />
			</Panel>

            </Col>
	</CSSTransition>
        </SwitchTransition>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
