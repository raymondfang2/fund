import logo from "./logo.svg";
import "./App.css";
import React from "react";

import web3 from "./web3";
import factory from "./factory";
import fund from "./fund";

class App extends React.Component {
  //1. This is part of the constructor will be invoked when page launch index.js
  state = {
    charityOwner: '',
    funds:[],
    fundName: '',
  };

  //3. This will be invoked after rendering
  //state.manager changed
  //4. state change will cause the re-render!
  async componentDidMount() {
    const charityOwner = await factory.methods.charityOwner().call();
    const funds = await factory.methods.getFunds().call();
    console.log("=====>");
    console.log(charityOwner);
    this.setState({ charityOwner, funds });
  }

  onSubmit = async (event) => {
    event.preventDefault(); //Not classical html way

    //const accounts = await web3.eth.getAccounts();
    const currentAccount = await web3.givenProvider.selectedAddress;
    console.log("<======");
    console.log(currentAccount);

    await factory.methods.raiseFund(this.state.fundName).send({
      //from: accounts[0]
      from: currentAccount
    });


  }



  //2. render to be called
  render() {
    return (
        <div >
          <h2>Charity - Everything in this charity is transparent and can be audited in the Ethereum!.</h2>

            <p>This contract is managed by {this.state.charityOwner}</p>
            <p>There are currently {this.state.funds.length} funds</p>

          <hr />
          <form onSubmit={this.onSubmit}>
            <h4>Raise a new Fund</h4>
            <div>
              <label>Fund Name:</label>
              <input
                  value = {this.state.fundName}
                  onChange={event => {this.setState({fundName: event.target.value} )}}
              />
            </div>
            <button>Raise Fund</button>
          </form>

        </div>
    );
  }
}
export default App;
