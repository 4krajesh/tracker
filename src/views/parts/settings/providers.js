import React, { Component } from "react";

import {List, Button, Notification, ButtonToolbar} from "rsuite";

import {  AiOutlineMinusCircle} from "react-icons/ai";

import { DOMHelper } from 'rsuite';

import '../../css/providers.css';

const { toggleClass } = DOMHelper;


class Providers extends Component {
  constructor(props) {
    super(props);
	  this.state = { data: [ 'CITI', 'SBI', 'KOTAK', 'ICICI', 'HDFC']}
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick(action) {
	  var { data, inputvalue} = this.state;
	  if(action) {
		  if(inputvalue){
          data = data.concat([inputvalue]);
	  this.setState({data: data, inputvalue: ''});
		  }
	  } else {
	  toggleClass(this.pinput, 'active');
	  toggleClass(this.psbutton, 'active');
	  toggleClass(this.pbutton, 'active');
	  }
  }

deleteProvider(name) {
  const { data } = this.state;
  Notification.warning({
    title: 'Provider Delete - ' + name,
    duration: 10000,
    description: (
      <div>
        <p style={{width: '250px'}}>Are you sure?</p>
            <br/>
            <ButtonToolbar>
          <Button
            onClick={() => {
                    Notification.close();
		    this.setState({data: data.filter(provider => provider !== name)}); }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              Notification.close();
            }}
          >
            Cancel
          </Button>
            </ButtonToolbar>
      </div>
    )
  });
}

  handleChange(event) {
	  console.log(event.target.value);
	  this.setState({inputvalue: event.target.value});
  }
  render() {
    const { data } = this.state;
    const items = this.state.data.map((item, index) => (
	       <List.Item key={index} index={index}>
                  {item}
	    	{index >= 5 ? (
	        <Button onClick={() => this.deleteProvider(item)} className="provider-delete"><AiOutlineMinusCircle/></Button>) : 
				(<></>)
		}
                </List.Item>
    ));
    const styles = { 
	    providerHeader: { fontWeight: 'bold', fontSize: '16px'},
	    rightChevron: { top: '0px', position: 'absolute', fontSize: '46px', fontWeight: '700', color: '#333'}
    }

    return (
            <List hover bordered style={{margin: '10px'}}>
	      <List.Item style={styles.providerHeader}>
	    Providers
              </List.Item>
	    <div style={{ overflowY: 'auto', height: '230px' }}>
	    {items}
	    </div>
              <List.Item className="provider-footer">
	    	<input placeholder="Enter Provider" type="text" className="provider-input" onChange={this.handleChange} ref={ref => {
            this.pinput = ref;
          }}/>
                <button onClick={() => this.handleClick('submit')} className="provider-button provider-submit-button" ref={ref => {
            this.psbutton = ref;
          }}></button>
                <button onClick={() => this.handleClick()} className="icon icon-plus provider-button" ref={ref => {
            this.pbutton = ref;
          }}></button>
              </List.Item>
            </List>
    );
  }
}

export default Providers;
