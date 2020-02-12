import React, { Component } from 'react';

import './Tbutton.css';

class Tbutton extends Component {
  render() {
    return (
      <div className="Chart-buttonSpace">
      {
        this.props.availBtns.map(info=>info[0]).sort().map((ctry, index) => ( 
          <div>
              <button onClick={() => this.props.onBtnSelect(index)} class="Chart-navButton">
                  {ctry}
              </button>
          </div>
        ))
      } 
</div>
    );
  }
}
export default Tbutton;