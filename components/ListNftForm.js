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

  onSubmit = async (event) => {
    event.preventDefault();
    if(price == "") {
        return;
    }
    
    try{
        await ChainAdapter.listNftForSale(this.state.marketAddress, this.state.nftAddress, this.state.price);
    }catch (err){
        console.error(err);
    }

  };

  render(props) {
    this.setState({marketAddress: props.marketAddress, nftAddress: props.nftAddress});
    return (
    <Grid>
        <Grid.Column width={8}>
            <Form style={{marginLeft: "10px"}} onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Price of NFT in eth</label>
                    <Input
                        value={this.state.price}
                        onChange={(event) => this.setState({ url: event.target.value })}
                        label="eth price"
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

export default MintForm;
