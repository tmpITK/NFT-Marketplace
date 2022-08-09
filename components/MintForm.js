import React, { Component } from "react";
import { Form, Input, Grid, Button } from "semantic-ui-react";
import Market from "../src/chain/ethereum/market";
import web3 from "../src/chain/ethereum/web3";
import EthereumAdapter from "../src/chain/adapters/EtehreumAdapter";

const ChainAdapter = EthereumAdapter;

class MintForm extends Component {
  state = {
    name: "",
    url: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();
    try{
        await ChainAdapter.mint("0xD79aD96386972832232D1E2EB292E20291be1cd4");
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
                    <label>Name of Nft</label>
                    <Input
                        value={this.state.name}
                        onChange={(event) => this.setState({ name: event.target.value })}
                        label="name"
                        labelPosition="right"
                    />
                </Form.Field>
                <Form.Field>
                    <label>IPFS url of image</label>
                    <Input
                        value={this.state.url}
                        onChange={(event) => this.setState({ url: event.target.value })}
                        label="ipfs url"
                        labelPosition="right"
                    />
                </Form.Field>
                <Button primary>
                    Mint!
                </Button>
            </Form>
        </Grid.Column>
    </Grid>
    
    );
    }
}

export default MintForm;
