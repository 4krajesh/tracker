import React, { Component } from 'react';
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell, Pagination } = Table;

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
			<div>
        <Table
          height={400}
          data={this.props.transactions}
          onRowClick={data => {
            console.log(data);
          }}
        >
          <Column width={70} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={200} fixed>
            <HeaderCell>Created At</HeaderCell>
            <Cell dataKey="created_at" />
          </Column>

          <Column width={200}>
            <HeaderCell>Value</HeaderCell>
            <Cell dataKey="value" />
          </Column>

          <Column width={120} fixed="right">
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
      </div>
                );
        }
}

export default Transactions;
