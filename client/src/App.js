//React-Route
import React from "react";
import {Redirect, Route} from 'react-router-dom'
import Welcome from "./pages/Welcome";
import FundDetail from "./pages/FundDetail";

class App extends React.Component {

  render() {
    return (
        <div >
            <Route exact path="/">
                <Welcome/>
            </Route>
            <Route exact path="/fund">
                <Welcome/>
            </Route>
            <Route exact path="/detail/:fundAddress">
                    <FundDetail/>
            </Route>


        </div>
    );
  }
}
export default App;
