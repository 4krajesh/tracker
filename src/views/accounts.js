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
	  <Card border="dark" style={{ width: '18rem', margin: '10px' }} onClick={handleShow}>
    <Card.Body>
      <Card.Text>Add Account</Card.Text>
    </Card.Body>
  </Card>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
		this.state = {accounts: [{ name: "Kotak" }, { name: "Citi" }]};
  }
	render() {
		const listItems = this.state.accounts.map((account, index) =>
			<Col xs={{span: 0, offset: 0}} md={{ span: 4, offset: 1 }} lg={{ span: 0, offset: 0 }} key={index}>
  			  <Card border="dark" style={{ width: '18rem', margin: '10px'}}>
    <Card.Body>
      <Card.Title>{account.name}</Card.Title>
      <Card.Text>
			In Progress.
      </Card.Text>
    </Card.Body>
  </Card>
			</Col>
		);
		

		return (
                <div>
                        <h1>Tracker Accounts</h1>
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
