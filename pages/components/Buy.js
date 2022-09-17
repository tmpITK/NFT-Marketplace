
import React, { Component } from "react";
import { Form, Button, Message } from 'semantic-ui-react';
import ChainAdapter from '../../src/chain/adapters/ChainAdapter';
import { Router } from '../../routes';

class Buy extends Component {

    state = {
        loading: false,
        errorMessage: "",
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true});
        try{
            await ChainAdapter.buyNft(this.props.nftAddress);
            this.setState({errorMessage: ""});
            Router.pushRoute(`/nft/${this.props.nftAddress}`);
        }catch (err){
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    }

    render() {
        return(
            <Form style={{marginLeft: "10px"}} onSubmit={this.onSubmit}  error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary>
                    Buy me
                </Button>
            </Form>
        );
    }
}

export default Buy;