import React from 'react';
import "../css/accounts.css";

export default class Cards extends React.Component {

  render() {
	      const accountItems = this.props.accounts.map((account, index) => (
		            <article className="account-card" key={index}>

		              <header className="account-card-header">
		      {account.default ? (
			      <p>default</p>
			      ) : (
				      <p>{account.id}</p>
			      )}
          <h2>{account.name}</h2>
        </header>
        <div className="account-tags">
          <a href={`/${account.id}`}>view</a>
		      {account.default ? (
		      " " ) : (
			      <>
          <a href={`/${account.id}`}>edit</a>
          <a href={`/${account.id}`}>delete</a>
			      </>
		      )}
        </div>
      </article>
    ));
    return (
	<div className="account-card-list">
	    {accountItems}
 	</div>
    );
  }
}
