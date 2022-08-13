import React, { Component } from "react";

import ListNftForm from "../../components/listNftForm";
import Layout from "../../components/Layout";

class ListNftForSale extends Component {

    static async getInitialProps(props) {
        return {
            nftAddress: props.query.address,
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