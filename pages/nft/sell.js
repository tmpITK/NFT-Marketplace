import React, { Component } from "react";

import ListNftForm from "../../components/ListNftForm";
import Layout from "../../components/Layout";

class ListNftForSale extends Component {

    static async getInitialProps(props) {
        return {
            nftAddress: props.query.address,
        }
    }

    render() {
        return(
          <Layout LOCAL_II_CANISTER_ID={process.env.LOCAL_II_CANISTER_ID}>          
            <h1>
                <ListNftForm 
                    marketAddress={process.env.MARKET_ADDRESS}
                    nftAddress={this.props.nftAddress}
                />
            </h1>
          </Layout> 
        );
    }
};

export default ListNftForSale;