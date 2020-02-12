import React, { Component } from 'react';

import './Nav.css';


class Nav extends Component {
  render() {
    return (
<div className="Nav">
      <div className="Nav-item">
       <a href="App.js">Currency Exchange</a>
      </div>
      <div className="Nav-search"> Set base currency:
      <input placeholder="Enter Currency"
            onChange={this.props.onInputChange}/>
        <button onClick={this.props.onBaseChange}>Select</button>
      </div>
     </div>
    );
  }
}

export default Nav;