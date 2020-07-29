import React, { Component } from 'react';

class Transactions extends Component {
	constructor(props) {
    super(props);
		this.state = {transactions: [{id: '111'}, {id: '222'}]};
  }
	componentDidMount() {
    const apiUrl = 'https://api.github.com/users/hacktivist123/repos';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({transactions: data}));
  }
	render() {
		const listItems = this.state.transactions.map((transaction, index) =>
                        <p key={transaction.id} >{transaction.id}</p>
                );
		

		return (
                <div>
                        <h1>Tracker Transactions</h1>
			{listItems}

                </div>
                );
        }

}

export default Transactions;
