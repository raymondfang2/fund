import React from "react";
//Semantic UI
import { Card, Form, Grid, Button, Input, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
//React-Route
import { Link} from 'react-router-dom'

import web3 from "../web3";
import factory from "../factory";
import Barchart from "./Barchart";
import Fund from "../fund";

class Welcome extends React.Component {
    //1. This is part of the constructor will be invoked when page launch index.js
    state = {
        charityOwner: '',
        funds:[],
        //For raising fund
        fundName: '',
        errorMessage: '',
        loading: false,
        //For Barchart, init with empty
        chartData: ''
    };



    //3. This will be invoked after rendering
    //state.manager changed
    //4. state change will cause the re-render!
    async componentDidMount() {
        const charityOwner = await factory.methods.charityOwner().call();
        const funds = await factory.methods.getFunds().call();
        console.log("=====>");
        console.log(charityOwner);
        //Chartbar: 1. Fetch the following data from funds object 2. Push to Github 3. Test
        //rotate color is more than 7
        const bckColor = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ];
        const labels = [];
        const data = [];
        const backgroundColor=[];
        //use fund to fetch 'name' and 'amount'
        let currentBckColor=0;
        for (let i = 0; i < funds.length; i++) {
            let currentAddress = funds[i];
            let fund = Fund(currentAddress);
            let currentSummary = await fund.methods.getSummary().call(); //0 - name, 1- balance
            labels.push(currentSummary[0]);
            data.push(currentSummary[1]);
            backgroundColor.push(bckColor[currentBckColor]);
            currentBckColor++;
            if (currentBckColor==bckColor.length) {
                currentBckColor = 0; //rotate from 0 again
            }
        }

        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Funds',
                data: data,
                backgroundColor: backgroundColor,
                borderWidth: 1
            }]
        };

        this.setState({ charityOwner, funds, chartData });

        console.log(this.state.chartData);

    }

    onSubmit = async (event) => {
        event.preventDefault(); //Not classical html way
        this.setState({loading: true, errorMessage: ''});

        try {
            //const accounts = await web3.eth.getAccounts();
            const currentAccount = await web3.givenProvider.selectedAddress;
            console.log("<======");
            console.log(currentAccount);

            await factory.methods.raiseFund(this.state.fundName).send({
                //from: accounts[0]
                from: currentAccount
            });
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
        window.location.reload(); //refresh the page to show the new Fund raised!
    }


    renderFunds()  {
        const items = this.state.funds.map((address)=> {
            const link = "/detail/"+address;
            return {
                header: address,
                description: <Link to={link}>View Fund Detail</Link>,
                fluid: true
            }
        });
        return <Card.Group items={items} />;
    }




    //2. render to be called
    render() {
        return (
            <div >
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column width={6} >
                            <h2>Raise a new Fund</h2>
                            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                                <Form.Field>
                                    <label>Fund Name:</label>
                                    <Input
                                        value={this.state.fundName}
                                        onChange={(event)=> {
                                            this.setState({fundName: event.target.value})
                                        }}
                                    />
                                </Form.Field>
                                <Message error header="Oops!" content={this.state.errorMessage}/>
                                <Button loading={this.state.loading} primary>Create!</Button>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={10}> </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={6} >
                            <h2>Fund List.</h2>

                            <p>This contract is managed by {this.state.charityOwner}</p>
                            <p>There are currently {this.state.funds.length} funds</p>
                            <div>{this.renderFunds()}</div>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            {/*Only show BarChart when chartData is ready*/}
                            {this.state.chartData && <Barchart chartData={this.state.chartData}/>}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        );
    }
}
export default Welcome;
