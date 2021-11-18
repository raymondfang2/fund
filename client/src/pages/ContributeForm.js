import React, { Component } from "react";
import {Form, Input, Message, Button} from "semantic-ui-react";

import web3 from "../web3";
import factory from "../factory";
import Fund from "../fund";


class ContributeForm extends  Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        const fund = Fund(this.props.address);
        this.setState({loading: true, errorMessage: ''});
        try {
            console.log("=========> contribution...");
            //const accounts = await  web3.eth.getAccounts();
            const currentAccount = await web3.givenProvider.selectedAddress;
            console.log("=========>");
            console.log(currentAccount);
            console.log("=========>")
            await  fund.methods.contribute().send({
                from: currentAccount,
                value: this.state.value
            });
            window.location.reload(); //refresh the current detail page -> show the donated amount inside
        } catch (err) {
            console.log("==============>");
            console.log(err.message);
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false, value: ''});

    }

    render() {
        return(
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event=>this.setState({value: event.target.value})} />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage}/>
                <Button primary loading={this.state.loading}>Contribute!</Button>
            </Form>
        );
    }
}

export default ContributeForm;
