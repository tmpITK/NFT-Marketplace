import React, { Component } from "react";
import { Form, Input, Grid, Button } from "semantic-ui-react";
import EthereumAdapter from "../src/chain/adapters/EthereumAdapter";

const ChainAdapter = EthereumAdapter;

class ListNftForm extends Component {
    state = {
        marketAddress: "",
        nftAddress: "",
        price: "",
    };

  componentDidMount() {
    this.setState({marketAddress: this.props.marketAddress, nftAddress: this.props.nftAddress});
  }

  onSubmit = async (event) => {
    event.preventDefault();
    if(this.state.price == "") {
        console.log("Null price");
        return;
    }
    
    try{
        console.log(this.state.nftAddress);
        console.log(this.state.marketAddress);
        console.log(this.state.price);
        await ChainAdapter.listNftForSale(this.state.marketAddress, this.state.nftAddress, this.state.price);
    }catch (err){
        console.error(err);
    }

  };

  render() {
    return (
    <Grid>
        <Grid.Column width={8}>
            <Form style={{marginLeft: "10px"}} onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Price of NFT</label>
                    <Input
                        value={this.state.price}
                        onChange={(event) => {
                            this.setState({price: event.target.value});
                            console.log(event.target.value);
                        }}  
                        label="eth"
                        labelPosition="right"
                    />
                </Form.Field>
                <Button primary>
                    List nft
                </Button>
            </Form>
        </Grid.Column>
    </Grid>
    
    );
    }
}

export default ListNftForm;
