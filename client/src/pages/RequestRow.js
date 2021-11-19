import React, {Component} from "react";
import {Table, Button, Message} from "semantic-ui-react";

import web3 from "../web3";
import Fund from "../fund";

class RequestRow extends  Component {
    state = {
        loading: false,
        errorMessage: ''
    };
    onApprove = async () => {
        console.log("======================>")
        console.log(this.props);
        console.log("======================>")
        this.setState({loading: true, errorMessage: ''});

        const fund = Fund(this.props.address);
        try {
            const currentAccount = await web3.givenProvider.selectedAddress;
            await fund.methods.approveRequest(this.props.id).send({
                from: currentAccount
            });

            window.location.reload(); //refresh the current detail page -> show the donated amount inside
        }
        catch (err) {
            console.log("======================>")
            console.log(err.message);
            console.log("======================>")
            this.setState({ errorMessage: err.message});
        }
        this.setState({loading: false});
    };


    render() {
        const { Row, Cell } = Table;
        const {id, request, donatorsCount } = this.props;
        return (
            <Row>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value,'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{donatorsCount}</Cell>
                <Cell>
                    <Button color="blue" basic loading={this.state.loading} onClick={this.onApprove}>Approve</Button>
                </Cell>
            </Row>
        );
    }
}
export default  RequestRow;
