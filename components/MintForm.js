import React, { Component } from "react";
import { Form, Input, Grid, Button, Message } from "semantic-ui-react";
import DfinityAdapter from "../src/chain/adapters/DfinityAdapter";
import { Router } from '../routes';

class MintForm extends Component {
  state = {
    name: "",
    url: "",
    loading: false,
    errorMessage: "",
  };

onSubmit = async (event) => {
    if(typeof window !== "undefined") {
        const marketplace = (await import('../src/declarations/marketplace')).marketplace;
        console.log(marketplace)
        const chainAdapter = new DfinityAdapter(marketplace);

        event.preventDefault();
        this.setState({loading: true});
        try{
            const userAddress = await chainAdapter.getUserAddress();
            await chainAdapter.mint(this.state.name, this.state.url);
            this.setState({errorMessage: ""});
            Router.pushRoute(`/user/${userAddress}`);
        }catch (err){
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    }


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
