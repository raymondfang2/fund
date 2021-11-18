import React, {Component} from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";

import web3 from "../web3";
import Fund from "../fund";

class RequestForm extends Component {
    state = {
        value: "",
        description: "",
        recipient: "",
        loading: false,
        errorMessage: ''
    };


    onSubmit = async (event) => {
        event.preventDefault();

        const fund = Fund(this.props.address);
        const { description, value, recipient } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const currentAccount = await web3.givenProvider.selectedAddress;
            await fund.methods
                .createRequest(description, value, recipient)
                .send({ from: currentAccount });

            window.location.reload(); //refresh the current detail page -> show the donated amount inside
        } catch (err) {
            console.log("===========>");
            console.log(err.message);
            this.setState({ errorMessage: err.message});
        }

        this.setState({loading: false});
    };


    render() {
        return (
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={(event) =>
                                this.setState({ description: event.target.value })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value</label>
                        <Input
                            value={this.state.value}
                            onChange={(event) => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={(event) =>
                                this.setState({ recipient: event.target.value })
                            }
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Create!</Button>
                </Form>
        )
    }
};

export default RequestForm;
