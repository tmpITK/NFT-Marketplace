import React, { Component } from "react";

import ListNftForm from "../../components/listNftForm";
import Layout from "../../components/Layout";

class ListNftForSale extends Component {

    static async getInitialProps(props) {
        const nftAddress = Nft(props.query.address);
        return {
            nftAddress: nftAddress,
        }
    }

    render() {
        return(
          <Layout>          
            <h1>
                <ListNftForm 
                    marketAddress={process.env.MARKET_ADRESS}
                    nftAddress={this.props.nftAddress}
                />
            </h1>
          </Layout> 
        );
    }
};

export default ListNftForSale;