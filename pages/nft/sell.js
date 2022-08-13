import React, { Component } from "react";

import ListNftForm from "../../components/listNftForm";
import Layout from "../../components/Layout";

class ListNftForSale extends Component {

    static async getInitialProps(props) {
        console.log(process.env.MARKET_ADRESS);
        return {
            nftAddress: props.query.address,
        }
    }

    render() {
        return(
          <Layout>          
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