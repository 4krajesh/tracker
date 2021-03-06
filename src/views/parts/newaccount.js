import React, { Component } from "react";

import { BsCreditCard } from "react-icons/bs";

import {
  Whisper,
  Tooltip,
  SelectPicker,
  Button,
  Modal,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Schema,
  RadioGroup,
  Radio,
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
        {message ? <HelpBlock tooltip>{message}</HelpBlock> : <></>}
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

class NewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        provider: "Kotak",
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
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
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
    const providers = [
      {
        label: "Kotak",
        value: "Kotak",
      },
      {
        label: "Citi",
        value: "Citi",
      },
    ];
    return (
      <>
        <Whisper
          placement="right"
          trigger="hover"
          speaker={<Tooltip>New Account</Tooltip>}
        >
          <Button onClick={this.open}>
            {" "}
            <BsCreditCard />{" "}
          </Button>
        </Whisper>

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
            }}
            onChange={this.handleChange}
            formValue={this.state.formValue}
            model={model}
          >
            <Modal.Header>
              <Modal.Title>New Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Account Name</ControlLabel>
                <FormControl
                  name="accountname"
                  errorPlacement={errorPlacement}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Current Balance</ControlLabel>
                <FormControl
                  name="currentbal"
                  type="number"
                  min={1}
                  errorPlacement={errorPlacement}
                />
              </FormGroup>
              <CustomField
                name="provider"
                label="Provider Name"
                accepter={SelectPicker}
                data={providers}
	        block
		message={
		  "If your provider is not available, please go to settings and add the provider."
		}
              ></CustomField>

              <CustomField
                name="accounttype"
                label="Account Type"
                accepter={RadioGroup}
                inline
                appearance="picker"
              >
                <Radio value="General">General</Radio>
                <Radio value="Cash">Cash</Radio>
                <Radio value="ewallet">E-Wallet</Radio>
                <Radio value="Credit Card">Credit Card</Radio>
                <Radio value="Savings">Savings Account</Radio>
                <Radio value="Current">Current Account</Radio>
                <Radio value="Investment">Investment</Radio>
                <Radio value="Loan">Loan</Radio>
              </CustomField>
            </Modal.Body>
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
export default NewAccount;
