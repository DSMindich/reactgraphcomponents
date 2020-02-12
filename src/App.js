import React, { Component } from 'react';
import './App.css';
import './style.css';
import Nav from './components/Nav/Nav.js';
import Tbutton from './components/Tbutton/Tbutton.js';

class App extends Component {

  state = {
    baseSet : "USD",
    currentcy : "USD",
    rates : [],
    availBtns: [],
    selectedBtns:[],
  }
// Sets up initial data with USD as base 
componentDidMount(){
  this.dofetch()
}

 dofetch(){
  let currency = this.state.baseSet
    this.setState({
      currentcy: currency,
    });  
  const url = "https://api.exchangeratesapi.io/latest?base=" + currency
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("Got the data!");
      console.log(data.rates);
      this.setState({
        rates : data.rates,
        availBtns: Object.entries(data.rates),
      });
      console.log('THIS ONE', this.state.availBtns)
      console.log(this.state.selectedBtns)
  });
  }
// Changes data to typed in base 
  onBaseChange = () => {
    console.log('hitting refresh', this.state.baseSet);
    let currency = this.state.baseSet
    this.setState({
      currentcy: currency,
    });
    const url = "https://api.exchangeratesapi.io/latest?base=" + currency
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('receiving data', data);
        this.setState({
          rates: data.rates,
        }); 

        // 404 (not working) might try and find time to fix about this
        if (!data.main) {
          this.setState({
            location: "Not found.",
          });
          return;
        };
      });
    }

// Hooks up input typing
onInputChange = (ev) => {
  let value = ev.target.value;
  console.log('getting a new value!', value);
  this.setState({
    baseSet: value,
  });
}
//Moves button from top to bottom, "activated," section
onBtnSelect(index){
  let availBtns = this.state.availBtns.slice();
  let selectedBtns = this.state.selectedBtns.slice();
  let mvBtn = availBtns[index];
  selectedBtns.push(mvBtn);
  availBtns.splice(index,1);
  this.setState({
    availBtns : availBtns,
    selectedBtns: selectedBtns,
  });
  console.log('this.state.availablebuttons', this.state.availablebuttons);
  console.log('selected btns', this.state.selectedBtns)
}
  //Moves buttons back to top, "inactive," state
   onBtnDeselect(index){
      let selectedBtns = this.state.selectedBtns.slice();
      let availBtns = this.state.availBtns.slice();
      let mvBtn = selectedBtns[index];
      availBtns.push(mvBtn);
      selectedBtns.splice(index, 1);
      this.setState({
        availBtns : availBtns,
        selectedBtns: selectedBtns,
      });
      console.log('this.state.availablebuttons', this.state.availablebuttons);
      console.log('selected btns', this.state.selectedBtns)
    }
  
  render() {
  return (
    <div className="App">
    <div className="Container">
     <div className="NavBuff"></div>

  <Nav
    onInputChange = {this.onInputChange}
    onBaseChange = {this.onBaseChange}
    />
  <Tbutton
    availBtns = {this.state.availBtns}
    onBtnSelect = {this.onBtnSelect.bind(this)}
    />

    <div className="Chart-header">
            <p> Exchange Rate of 1 {this.state.currentcy} in Other Countries</p>
     </div> 
     <div className="Chart"> 
            {
                this.state.selectedBtns.map((ctry) => (
                    <div className="Chart-bar"style= {{height: (this.state.rates[ctry[0]] * 10) + 'px'}}>
                    {ctry[0]} {(this.state.rates[ctry[0]]).toFixed(2)}
                    </div>               
                ))
            }
       </div>     
       <div className="Chart--buttonBtm">
            {
              this.state.selectedBtns.map((ctry, index) => ( 
                <div>
                    <button onClick={() => this.onBtnDeselect(index)} class="Chart-navButton">
                        {ctry[0]}
                    </button>
                </div>
              ))
            } 
        </div>
    </div>
    </div>
  );
}
}
export default App;
