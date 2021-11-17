import React from "react";
//Semantic UI
import { Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
//React-Route
import { withRouter } from 'react-router-dom'

import web3 from "../web3";
import Fund from "../fund";

class FundDetail extends React.Component {
    //1. This is part of the constructor will be invoked when page launch index.js
    state = {
        fundAddress: '',
        fundName: '',
        balance: '',
        numRequests: '',
        donatorsCount: '',
        manager: ''
    };



    //3. This will be invoked after rendering
    //state.manager changed
    //4. state change will cause the re-render!
    async componentDidMount() {
        const fundAddress = this.props.match.params.fundAddress; //Passed from Welcome.js
        this.setState({fundAddress});

        const fund = Fund(fundAddress);

        const summary = await fund.methods.getSummary().call();

        console.log("=====>");
        console.log(summary[0]);

        this.setState({
            fundAddress: fundAddress,
            fundName: summary[0],
            balance: summary[1],
            numRequests: summary[2],
            donatorsCount: summary[3],
            manager: summary[4]
        })

    }

    renderFunds() {
        const items = [{
            header: this.state.manager,
            meta: "Address of Manager",
            description:
                "The manager created this Fund and can create requests to withdraw money",
            style: { overflowWrap: "break-word" },
        },
            {
                header: this.state.numRequests,
                meta: "Number of Requests",
                description:
                    "A request tries to withdraw money from the contract. Requests must be approved by donators",
            },
            {
                header: this.state.donatorsCount,
                meta: "Number of Donators",
                description:
                    "Number of people who have already donated to this fund",
            },
            {
                header: web3.utils.fromWei(this.state.balance, "ether"),
                meta: "Fund Balance (ether)",
                description:
                    "The balance is how much money this fund has left to spend.",
            },
        ];

        return <Card.Group items={items}/>;
    }

    //2. render to be called
    render() {
        return (
            <div >

                <hr/>
                <h2>Fund Detail:</h2>
                <div>{this.renderFunds()}</div>
                <hr />
            </div>
        );
    }
}
export default withRouter(FundDetail);

