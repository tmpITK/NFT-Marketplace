import React, { Component } from "react";
import { Form, Input, Grid, Button, Message } from "semantic-ui-react";
import EthereumAdapter from "../src/chain/adapters/EthereumAdapter";
import { Router } from '../routes';

const ChainAdapter = EthereumAdapter;

class MintForm extends Component {
  state = {
    name: "",
    url: "",
    loading: false,
    error: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading: true});
    try{
        await ChainAdapter.mint(process.env.MARKET_ADDRESS, this.state.name, this.state.url);
        this.setState({error: ""});
        Router.replaceRoute("/nft/new");
    }catch (err){
        this.setState({error: err.message});
    }
    this.setState({loading: false});

  };

  render() {

    return (
    <Grid>
        <Grid.Column width={8}>
            <Form style={{marginLeft: "10px"}} onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
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
                <Message error header="Oops!" content={this.state.errorMessage} />

                <Button loading={this.state.loading} primary>
                    Mint!
                </Button>
            </Form>
        </Grid.Column>
    </Grid>
    
    );
    }
}

export default MintForm;
