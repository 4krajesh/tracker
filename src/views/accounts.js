import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function Example() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
	  <Button variant="outline-dark" onClick={handleShow} style={{ width: '300px', margin: '10px'}} >Add Account</Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-dark" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


class Accounts extends Component {
	constructor(props) {
    super(props);
		this.state = {accounts: [{ name: "Account2", type: "Credit", balance: "10000", limit: "15000"}, { name: "Account1", type: "Debit", balance: "300000"}]};
  }
	render() {
		const listItems = this.state.accounts.map((account, index) =>
			<Col xs={{span: 0, offset: 0}} md={{ span: 4, offset: 1 }} lg={{ span: 0, offset: 0 }} key={index}>
  			  <Card className="text-center" text="light" bg="dark" style={{ width: '300px', height: '200px', margin: '10px'}}>
			 <Card.Header>{account.name}</Card.Header>
    <Card.Body>
      <Card.Text>
			<p>Type: {account.type}</p>
			<p>Balance: {account.balance}</p>
			<p>{account.limit ? 'Limit:' : ''} {account.limit}</p>
      </Card.Text>
    </Card.Body>
  </Card>
			</Col>
		);
		

		return (
                <div>
                        <h1 className="text-center" style={{padding: '20px'}}>Accounts</h1>
			<Container>
			<Row xs={1} md={4}>
			{listItems}
			</Row>
			<Example />
			</Container>

                </div>
                );
        }

}

export default Accounts;
