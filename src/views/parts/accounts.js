import React from 'react';
import "../css/accounts.css";
import { BsStarHalf } from "react-icons/bs";

export default class Cards extends React.Component {

  render() {
	      const accountItems = this.props.accounts.map((account, index) => (
		            <article className="account-card" key={index}>

		              <header className="account-card-header">
		      {account.default ? (
				      <p><BsStarHalf /> {account.id}</p>
			      ) : (
				      <p>{account.id}</p>

			      )}
          <h2>{account.name}</h2>
        </header>
        <div className="account-tags">
          <a href={`/home/${account.id}`}>view</a>
		      {account.default ? (
		      " " ) : (
			      <>
          <a href={`/home/${account.id}`}>edit</a>
          <a href={`/home/${account.id}`}>delete</a>
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
