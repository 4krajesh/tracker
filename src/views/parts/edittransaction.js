import React, { Component } from "react";

import {
  Button,
  Modal,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Schema,
  Notification,
} from "rsuite";

import "../css/new.css";

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  accountname: StringType().isRequired("This field is required."),
  currentbal: NumberType().isRequired("This field is required."),
});

class CustomField extends React.PureComponent {
  render() {
    const { name, message, label, accepter, error, ...props } = this.props;
    return (
      <FormGroup className={error ? "has-error" : ""}>
        <ControlLabel>{label} </ControlLabel>
        <FormControl
          name={name}
          accepter={accepter}
          errorMessage={error}
          {...props}
        />
        <HelpBlock>{message}</HelpBlock>
      </FormGroup>
    );
  }
}

function open(funcName, msg) {
  Notification[funcName]({
    title: funcName,
    description: <p style={{ width: "300px" }}>{msg}</p>,
  });
}

class EditTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        accountname: "",
        currentbal: "",
        accounttype: "General",
      },
      show: false,
      formError: {},
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  close() {
    console.log("testing");
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.open) this.open();
  }
  handleChange(value) {
    console.log(value);
    this.setState({
      formValue: value,
    });
  }
  handleSubmit() {
    const { formValue } = this.state;
    if (!this.form.check()) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With",
      },
      body: JSON.stringify({
        name: formValue.accountname,
        balance: formValue.currentbal,
        type: formValue.accounttype,
      }),
    };
    fetch("http://0.0.0.0:3001/createaccount", requestOptions)
      .then((response) => response.json())
      .then(function (data) {
        open(data.status, data.msg);
      });
  }

  render() {
    const errorPlacement = "bottomEnd";
    const backdrop = true;
    return (
      <>
        <Modal
          backdrop={backdrop}
          show={this.state.show}
          onHide={this.close}
          size="xs"
        >
          <Form
            ref={(ref) => (this.form = ref)}
            fluid
            onCheck={(formError) => {
              this.setState({ formError });
              console.log(formError);
            }}
            onChange={this.handleChange}
            formValue={this.state.formValue}
            model={model}
          >
            <Modal.Header>
              <Modal.Title>Edit Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>ID: {this.props.id}</Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                appearance="primary"
                onClick={this.handleSubmit}
              >
                Confirm
              </Button>
              <Button onClick={this.close} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}
export default EditTransaction;
