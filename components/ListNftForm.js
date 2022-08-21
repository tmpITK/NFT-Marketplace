import React, { Component } from "react";
import { Form, Input, Grid, Button, Message } from "semantic-ui-react";
import EthereumAdapter from "../src/chain/adapters/EthereumAdapter";
import { Router } from '../routes';

const ChainAdapter = EthereumAdapter;

class ListNftForm extends Component {
    state = {
        marketAddress: "",
        nftAddress: "",
        price: "",
        loading: false,
    };

  componentDidMount() {
    this.setState({marketAddress: this.props.marketAddress, nftAddress: this.props.nftAddress});
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading: true});
    try{
        await ChainAdapter.listNftForSale(this.state.marketAddress, this.state.nftAddress, this.state.price);
        this.setState({error: ""});
        Router.replaceRoute("/market");
    }catch (err){
        this.setState({error: err.message});
    }
    this.setState({loading:false});

  };

  render() {
    return (
    <Grid>
        <Grid.Column width={8}>
            <Form style={{marginLeft: "10px"}} onSubmit={this.onSubmit}  error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Price of NFT</label>
                    <Input
                        value={this.state.price}
                        onChange={(event) => {
                            this.setState({price: event.target.value});
                        }}  
                        label="eth"
                        labelPosition="right"
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary>
                    List nft
                </Button>
            </Form>
        </Grid.Column>
    </Grid>
    
    );
    }
}

export default ListNftForm;
