import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

class Transactions extends Component {
	render() {
		const items = []
		for (const [index, value] of this.props.transactions.entries()) {
			if (index === 0)
				items.push(<tr key={index}><td colSpan="2" style={{ background: "lightblue" }}>Date: {value.created_at}</td></tr>)
			else if (this.props.transactions[index >= 1 ? index - 1 : 0].created_at !== value.created_at)
				items.push(<tr key={index}><td colSpan="2" style={{ background: "lightblue" }}>Date: {value.created_at}</td></tr>)
			items.push(<tr key={index + 'a' }><td>{value.id}</td><td>{value.value}</td></tr>)
		}
		

		return (
		<Table hover>
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
			{items}
                </tbody>
              </Table>
                );
        }
}

export default Transactions;
