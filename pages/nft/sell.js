import React, { Component } from "react";

import ListNftForm from "../../components/dynamic/DynamicListNftForm";
import Layout from "../../components/dynamic/DynamicLayout";

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
                    marketAddress={process.env.MARKET_ADDRESS}
                    nftAddress={this.props.nftAddress}
                />
            </h1>
          </Layout> 
        );
    }
};

export default ListNftForSale;