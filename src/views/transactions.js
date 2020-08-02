import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

class Transactions extends Component {
	constructor(props) {
    super(props);
		this.state = {transactions: [{id:'111',created_at:'20-01-1995',value:'1234'},{id:'222',created_at:'20-01-1995',value:'4293'},{id:'333',created_at:'21-01-1995',value:'84723'},{id:'444',created_at:'21-01-1995',value:'78942'}]};
  }
	componentDidMount() {
/*    const apiUrl = 'https://api.github.com/users/hacktivist123/repos';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({transactions1: data}));
  }*/
	render() {
		//console.log(this.state.transactions);
		const listItems = this.state.transactions.map((transaction, index) =>
			<>
			{[index === 0 ? <tr><td colSpan="2" >Date: {transaction.created_at}</td></tr> : '']}
      {this.state.transactions[index >= 1 ? index - 1 : 0].created_at !== transaction.created_at ? <tr><td>Date: {transaction.created_at}</td></tr> : ''}
			    <tr key={transaction.id}>
      <td>{transaction.id}</td>
      <td>{transaction.value}</td>
    </tr>
			</>
                );
		

		return (
                <div>
                        <h1 className="text-center" style={{padding: '20px'}}>Transactions</h1>
			<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
{listItems}
  </tbody>
</Table>

                </div>
                );
        }

}

export default Transactions;
