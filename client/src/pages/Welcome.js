import React from "react";
//Semantic UI
import { Card, Form, Grid, Button, Input, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
//React-Route
import { Link} from 'react-router-dom'

import web3 from "../web3";
import factory from "../factory";
import fund from "../fund";

class Welcome extends React.Component {
    //1. This is part of the constructor will be invoked when page launch index.js
    state = {
        charityOwner: '',
        funds:[],
        //For raising fund
        fundName: '',
        errorMessage: '',
        loading: false
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
                        <Grid.Column width={10} >
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
                        <Grid.Column width={6}> </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10} >
                            <h2>Fund List.</h2>

                            <p>This contract is managed by {this.state.charityOwner}</p>
                            <p>There are currently {this.state.funds.length} funds</p>
                            <div>{this.renderFunds()}</div>
                        </Grid.Column>
                        <Grid.Column width={6}> </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        );
    }
}
export default Welcome;
