import React, { Component } from 'react';
import Layout from '../components/Layout';
import EthereumAdapter from '../src/chain/adapters/EthereumAdapter';

const ChainAdapter = EthereumAdapter;

class UserComponent extends Component {

    static async getInitialProps(props) {

        

        return {
            userAddress: props.query.userAddress
        };
    }

    render() {
        return (
        <Layout>
            {this.props.userAddress}
        </Layout>
        )
    }
};

export default UserComponent;