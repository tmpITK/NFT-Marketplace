
import React, { Component } from "react";
import { Form, Button } from 'semantic-ui-react';
import EthereumAdapter from '../src/chain/adapters/EthereumAdapter';

const ChainAdapter = EthereumAdapter;

class Buy extends Component {

    onSubmit = async (event) => {
        event.preventDefault();
        try{
            console.log(this.props.marketAddress);
            console.log(this.props.nftAddress);
            await ChainAdapter.buyNft(this.props.marketAddress, this.props.nftAddress);
        }catch (err){
            console.error(err);
        }
    }

    render() {
        return(
            <Form style={{marginLeft: "10px"}} onSubmit={this.onSubmit}>
                <Button primary>
                    Buy me
                </Button>
            </Form>
        );
    }
}

export default Buy;