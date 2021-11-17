import React from "react";
//Semantic UI
import { Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
//React-Route
import { useParams, withRouter } from 'react-router-dom'

import web3 from "../web3";
import factory from "../factory";
import fund from "../fund";

class FundDetail extends React.Component {
    //1. This is part of the constructor will be invoked when page launch index.js
    state = {
        charityOwner: '',
        funds:[],
        fundName: '',
        fundAddress: '',
    };



    //3. This will be invoked after rendering
    //state.manager changed
    //4. state change will cause the re-render!
    async componentDidMount() {
        //const fundAddress = useParams().fundAddress;
         const fundAddress = this.props.match.params.fundAddress;
         this.setState({fundAddress});
        const charityOwner = await factory.methods.charityOwner().call();
        const funds = await factory.methods.getFunds().call();
        console.log("=====>");
        console.log(charityOwner);
        //this.setState({ charityOwner, funds });
    }



    //2. render to be called
    render() {
        return (
            <div >

                <hr/>
                <h2>Fund Detail:</h2>
                <p>{this.state.fundAddress}</p>
                <hr />
            </div>
        );
    }
}
export default withRouter(FundDetail);


