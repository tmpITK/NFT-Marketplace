
import React, { Component } from "react";
import { Form, Button } from 'semantic-ui-react';
import EthereumAdapter from '../src/chain/adapters/EthereumAdapter';
import { Router } from '../routes';

const ChainAdapter = EthereumAdapter;

class Buy extends Component {

    state = {
        loading: false,
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true});
        try{
            await ChainAdapter.buyNft(this.props.marketAddress, this.props.nftAddress);
            Router.pushRoute(`/nft/${this.props.nftAddress}`);
        }catch (err){
            console.error(err);
        }
        this.setState({loading: false});
    }

    render() {
        return(
            <Form style={{marginLeft: "10px"}} onSubmit={this.onSubmit}>
                <Button loading={this.state.loading} primary>
                    Buy me
                </Button>
            </Form>
        );
    }
}

export default Buy;