import React, { Component } from "react";
import { Form, Input, Grid, Button } from "semantic-ui-react";
import EthereumAdapter from "../src/chain/adapters/EthereumAdapter";

const ChainAdapter = EthereumAdapter;

class MintForm extends Component {
  state = {
    name: "",
    url: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();
    try{
        await ChainAdapter.mint(process.env.MARKET_ADDRESS);
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
