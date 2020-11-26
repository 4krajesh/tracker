import React from 'react';
import "./cards.css";

export default class Cards extends React.Component {
constructor(props) {
    super(props);
    this.state = { accounts: []};
  }


  componentDidMount() {
    fetch("http://192.168.0.104:3001/accounts")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            accounts: result.accounts,
          });
		
	  console.log(result.accounts);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  render() {
	      const accountItems = this.state.accounts.map((account, index) => (
		            <article class="account-card" key={index}>

		              <header class="account-card-header">
		      {account.default ? (
			      <p>default</p>
			      ) : (
				      <p>{account.id}</p>
			      )}
          <h2>{account.name}</h2>
        </header>
        <div class="account-tags">
          <a href={`/accounts/${account.id}`}>view</a>
		      {account.default ? (
		      " " ) : (
			      <>
          <a href={`/accounts/${account.id}`}>edit</a>
          <a href={`/accounts/${account.id}`}>delete</a>
			      </>
		      )}
        </div>
      </article>
    ));
    return (
	<div class="account-card-list">
	    {accountItems}
 	</div>
    );
  }
}
