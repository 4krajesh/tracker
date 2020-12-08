import React, { Component } from "react";

import {
  Tooltip,
  Whisper,
  DatePicker,
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

import { FcMoneyTransfer } from "react-icons/fc";

import { isAfter } from "date-fns";

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
    description: <p style={{ width: "300px" }}>msg</p>,
  });
}

class NewTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        date: new Date(),
        account: "Eugenia",
        amount: "",
        type: "Expense",
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
    fetch("http://192.168.0.104:3001/createaccount", requestOptions)
      .then((response) => response.json())
      .then(function (data) {
        open("error", data.msg);
      });
  }

  render() {
    const errorPlacement = "bottomEnd";
    const backdrop = true;
    const data = [
      {
        label: "Eugenia",
        value: "Eugenia",
        role: "Master",
      },
      {
        label: "Kariane",
        value: "Kariane",
        role: "Master",
      },
    ];
    return (
      <>
        <Whisper
          placement="top"
          trigger="hover"
          speaker={<Tooltip>New Transaction</Tooltip>}
        >
          <Button onClick={this.open}>
            {" "}
            <FcMoneyTransfer />{" "}
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
              <Modal.Title>New Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CustomField
                name="type"
                label="Transaction Type"
                accepter={RadioGroup}
                inline
                appearance="picker"
              >
                <Radio value="Expense">Expense</Radio>
                <Radio value="Income">Income</Radio>
                <Radio value="Transfer">Transfer</Radio>
              </CustomField>
              <CustomField
                name="account"
                label="Select Account"
                accepter={SelectPicker}
                data={data}
                defaultValue={"Eugenia"}
                block
              ></CustomField>
              <CustomField
                name="date"
                label="Transaction Date"
                placeholder="Transaction Date"
                disabledDate={(date) => isAfter(date, new Date())}
                accepter={DatePicker}
                block
              ></CustomField>
              <FormGroup>
                <ControlLabel>Transaction Amount</ControlLabel>
                <FormControl
                  name="amount"
                  type="number"
                  min={1}
                  errorPlacement={errorPlacement}
                />
              </FormGroup>
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
export default NewTransaction;
